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

                <div className="flex flex-wrap w-full rounded-none p-2">
                  <span className="w-1/4 flex justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="4em"
                      height="4em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="green"
                        d="M2.2 16.06L3.88 12L2.2 7.94l4.06-1.68L7.94 2.2L12 3.88l4.06-1.68l1.68 4.06l4.06 1.68L20.12 12l1.68 4.06l-4.06 1.68l-1.68 4.06L12 20.12L7.94 21.8l-1.68-4.06zM13 17v-2h-2v2zm0-4V7h-2v6z"
                      />
                    </svg>
                  </span>
                  <span className="w-3/4">{offer.content}</span>
                </div>
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
