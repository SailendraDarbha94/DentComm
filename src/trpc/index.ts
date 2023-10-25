import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/database";


export const appRouter = router({
    authCallback: publicProcedure.query(async (req) => {
        console.log(req)
        const { getUser } = getKindeServerSession()
        const user = getUser()

        //this ia a guard clause
        if(!user.id || !user.email){
            throw new TRPCError({ code: "UNAUTHORIZED"})
        }

        //find user in database
        const dbUser = await db.user.findFirst({
            where: {
                id: user.id,
            }
        })

        //create user in database if not exisiting already
        if(!dbUser) {
            await db.user.create({
                data: {
                    id: user.id,
                    email: user.email
                }
            })
        }

        return { success: true }
    })
})

export type AppRouter = typeof appRouter