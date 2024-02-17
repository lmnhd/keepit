import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="">
      <div className="flex flex-col lg:flex-row items-center bg-[#1E1919] dark:bg-slate-800">
        <div className="p-10 flex flex-col  bg-[#2B2929] dark:bg-slate-800 text-white space-y-5">
          <h1 className="text-5xl font-bold">
            Welcome to {process.env.NEXT_PUBLIC_APP_NAME} <br />
            <br />
            Your one stop storage spot! Like Dropbox but NOT!
          </h1>
          <p className="font-light">
            Store your files and access them from anywhere, we provide a simple
            and efficient way to upload, organize, and access files from
            anywhere. Securely store important documents and media, and
            experience the convenience of easy file management and sharing in
            one centralized solution.{" "}
          </p>
          <p className="pb-20 font-extralight">
            Enhance your personal storage with{" "}
            {process.env.NEXT_PUBLIC_APP_NAME}
          </p>

          <Link
            href={`/dashboard`}
            className="flex cursor-pointer bg-blue-500 p-5 w-fit"
          >
            <p>I&apos;m there!</p>
            <ArrowRight className="" />
          </Link>
        </div>
        <div className="bg-[#1E1919] dark:bg-slate-800 h-full p-10">
          <video
            autoPlay
            loop
            muted
            src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4"
            className="rounded-lg"
          >
            Your browser does not support the video tag.
          </video>
        </div>
        
      </div>
      <p className="text-center font-bold text-xl pt-5">Disclaimer</p>
        <p className="text-center font-light p-2">
          This fully functioning Storage App is designed to showcase the skills
          of Nate but feel free to store some of your files on me! 😊{" "}
        </p>
    </main>
  );
}
