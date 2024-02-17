import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ThemeToggler } from "./theme-toggler";

function Header() {
  return (
    <header className="flex items-center justify-between">
      <Link href={`/`} className="flex items-center space-x-2">
        <div className="bg-[#0160FE]">
            <Image
            src={'https://www.shareicon.net/data/512x512/2016/11/14/852442_get_512x512.png'}
            alt="Dropbox Logo"
            className="invert"
            width={50}
            height={50}
            />
        </div>
        <h1 className="font-bold text-xl">{process.env.NEXT_PUBLIC_APP_NAME}</h1>
      </Link>

      <div className="px-5 flex space-x-2 items-center">
        <ThemeToggler />

        <UserButton />

        <SignedOut>
          <SignInButton afterSignInUrl="/dashboard" mode="modal"/>
        </SignedOut>
      </div>
    </header>
  );
}

export default Header;
