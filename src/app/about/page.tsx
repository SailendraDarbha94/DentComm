import {
  ABOUT_INTRO,
  ABOUT_JOIN_US,
  ABOUT_MISSION,
  ABOUT_OFFERINGS,
  Offering,
} from "@/constants/texts";
import { Divider, Spacer } from "@nextui-org/react";

const Page = () => {
  return (
    <div className="w-full min-h-screen p-10 flex flex-wrap">
      <div>
        <h1 className="w-full text-center font-bold text-3xl">
          Welcome To KSDC Community
        </h1>
        <Divider />
        <p className="w-full my-2">{ABOUT_INTRO}</p>
      </div>
      <div className="w-[80%] mx-auto">
        <h1 className="w-full text-center font-bold text-3xl">Our offerings</h1>
        {ABOUT_OFFERINGS.map((offer: Offering) => {
          return (
            <>
              <div
                key={offer.id}
                className="mx-auto my-2 p-4 bg-slate-200 rounded-lg shadow-lg"
              >
                <h1 className="w-full text-center font-semibold text-xl border-b-1 border-black">
                  {offer.title}
                </h1>

                <p className="">{offer.content}</p>
              </div>
              <Spacer y={3} />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
