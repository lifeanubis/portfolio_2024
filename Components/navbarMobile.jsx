"use client"

import "@lottiefiles/dotlottie-wc"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NavBarMobile({}) {
  const router = usePathname()
  return (
    <div className=" text-white w-full relative  tracking-widest  h-full   p-4 bg-gradient-to-r from-gray-900 to-black  grid grid-cols-4  place-items-center">
      <div className="   ">
        <Link href={"/landing"}>
          <div
            className={`cursor-pointer ${
              router === "/landing"
                ? "bg-gradient-to-r from-sky-500 to-blue-800/5 rounded-full"
                : ""
            }  `}
          >
            <dotlottie-wc
              src="https://lottie.host/039fb92f-0d5a-48b8-b6d8-5b1c0150ce7b/uwAaIbz7EI.lottie"
              autoplay
              loop
            ></dotlottie-wc>
          </div>
        </Link>
      </div>
      <div>
        <Link href={"/"}>
          <div
            className={`cursor-pointer ${
              router === "/"
                ? "bg-gradient-to-r from-sky-500 to-black rounded-full"
                : ""
            }  `}
          >
            <dotlottie-wc
              src="https://lottie.host/189e67fd-fdaf-4438-8671-8b470e12170d/cPkK3Ny4Bg.lottie"
              autoplay
              loop
            ></dotlottie-wc>
          </div>
        </Link>
      </div>
      <div>
        <Link href={"/projects"}>
          <div
            className={`cursor-pointer ${
              router === "/projects"
                ? "bg-gradient-to-r from-sky-500 to-black rounded-full"
                : ""
            }  `}
          >
            <dotlottie-wc
              src="https://lottie.host/3f542009-a2da-4c06-a488-b73b08918eb1/DUyzzD5Efd.lottie"
              autoplay
              loop
            ></dotlottie-wc>
          </div>
        </Link>
      </div>
      <div>
        <Link href={"/resume"}>
          <div
            className={`cursor-pointer ${
              router === "/resume"
                ? "bg-gradient-to-r from-sky-500 to-black rounded-full"
                : ""
            }  `}
          >
            <dotlottie-wc
              src="https://lottie.host/bf40c5cb-1cb3-4fa5-98a5-7760cd1e05d9/5RQJ1Liznb.lottie"
              autoplay
              loop
            ></dotlottie-wc>
          </div>
        </Link>
      </div>
    </div>
  )
}
