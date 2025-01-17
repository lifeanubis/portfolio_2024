"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NavBarPc({}) {
  const router = usePathname()
  return (
    <div className=" text-white  w-full relative    min-h-20  bg-gradient-to-r from-gray-900 to-black  grid grid-cols-4  place-items-center">
      <div className="   ">
        <Link href={"/landing"}>
          <h1
            className={`cursor-pointer w-max tracking-widest leading-10  hover:scale-y-150   font-bold text-xl  ${
              router === "/landing"
                ? "bg-gradient-to-r from-orange-400  to-red-500 bg-clip-text text-transparent"
                : ""
            } `}
          >
            site intro
          </h1>
        </Link>
      </div>
      <div>
        <Link href={"/"}>
          <h1
            className={`cursor-pointer w-max tracking-widest leading-10 hover:scale-y-150   font-bold text-xl  ${
              router === "/"
                ? "bg-gradient-to-r from-orange-400  to-red-500 bg-clip-text text-transparent"
                : ""
            } `}
          >
            deep space
          </h1>
        </Link>
      </div>
      <div>
        <Link href={"/projects"}>
          <h1
            className={`cursor-pointer w-max tracking-widest leading-10 hover:scale-y-150   font-bold text-xl  ${
              router === "/projects"
                ? "bg-gradient-to-r from-orange-400  to-red-500 bg-clip-text text-transparent"
                : ""
            } `}
          >
            projects
          </h1>
        </Link>
      </div>
      <div>
        <Link href={"/resume"}>
          <h1
            className={`cursor-pointer w-max tracking-widest leading-10 hover:scale-y-150   font-bold text-xl  ${
              router === "/resume"
                ? "bg-gradient-to-r from-orange-400  to-red-500 bg-clip-text text-transparent"
                : ""
            } `}
          >
            resume
          </h1>
        </Link>
      </div>
    </div>
  )
}
