import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex justify-center flex-col text-white h-[44vh] items-center gap-4 px-5 md:px-0 md:text:lg">
        <div className="font-bold text-center md:text-5xl flex justify-center items-center text-3xl">
          A mission statement{" "}
        </div>
        <div className="text-center md:text-left  md:text:lg px-4 ">
          <p className="md:text-center">
            DashFund is a modern, user-friendly crowdfunding platform that lets
            anyone launch a campaign, 
            </p>
            <p className="text-center">
            share their story, and raise the funds
            they need — all in one streamlined dashboard
          </p>
        </div>
        <div className="flex gap-4">
          <Link href={"/login"}>
            <button
              type="button"
              class="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Start Here
            </button>
          </Link>
          <Link href={"/about"}>
            <button
              type="button"
              class="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read More
            </button>
          </Link>
        </div>
      </div>
      <div className="bg-white h-1 opacity-10"></div>

      <div className="text-white container mx-auto pb-32 pt-14 px-10 md:px-0">
        <h2 className="text-3xl font-bold text-center mb-14">
        Your supporters can help you reach your goal
        </h2>
        <div className="flex gap-5 justify-around">
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img
              className=" bg-slate-400 rounded-full p-2 text-black"
              width={88}
              src="/man.gif"
              alt=""
            />
            <p className="font-bold text-center">Funded in a dash</p>
            <p className="text-center">
             Real support, real funding, right when you need it
            </p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img
              className=" bg-slate-400 rounded-full p-2 text-black"
              width={88}
              src="/coin.gif"
              alt=""
            />
            <p className="font-bold text-center">Frenids want to help</p>
            <p className="text-center">
              Your Freinds are available for you to help you
            </p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img
              className=" bg-slate-400 rounded-full p-2 text-black"
              width={88}
              src="/group.gif"
              alt=""
            />
            <p className="font-bold text-center">Fast. Simple. Funded. </p>
            <p className="text-center">
              No dream too big when you have your people behind you
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white h-1 opacity-10"></div>
      <div className="text-white container mx-auto pb-32 pt-14 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-center mb-14">
          Learn more about us
        </h2>
        <div className="w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] aspect-video relative overflow-hidden">
  <img 
    src="/Logo.png" 
    alt="logo" 
    className="absolute top-0 left-0 w-full h-full object-cover"
  />
  {/* <iframe
    className="absolute top-0 left-0 w-full h-full"
    src="https://www.youtube.com/embed/UoMArcANHO8?si=T5nzUpnKif_GBAsT"
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
  ></iframe> */}
</div>

      </div>
    </>
  );
}
