"use client"

import gsap from "gsap"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import AboutMe from "@/Components/aboutMe"
import MyRoles from "@/Components/myRoles"
import TechStack from "@/Components/techStack"

import ContactMe from "@/Components/contactMe"

import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const ResumePageComp = () => {
  const timeLine = gsap.timeline()
  gsap.registerPlugin(ScrollToPlugin)
  const first = () => {
    gsap.from("#kites", {
      y: 0,

      duration: 10,
      repeat: -1,
      ease: "elastic.inOut",
      repeat: -1,
      rotation: (Math.random() - 0.5) * 100,
      yoyo: true,
      rotationY: "-40_short",
      skewY: 3,
    })
    gsap.to("#kites", {
      y: -80,
      duration: 10,
      ease: "elastic.inOut",
      repeat: -1,
      rotationY: "40_short",
      yoyo: true,
      skewY: -3,
    })
    gsap.to("#wind_mill", {
      rotate: "1440",
      repeat: -1,
      duration: 10,
      ease: "none",
    })
    timeLine
      .from("#board", {
        x: window.innerWidth,
        rotate: "20_short",
        duration: 10,
        ease: "elastic",
      })
      .to("#board", {
        x: 0,
        rotate: "0_short",
        duration: 10,
      })
  }

  useEffect(() => {
    first()
  }, [])

  const handleScroll = (divName) => {
    const ele = document.getElementById(divName)
    ele.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    })
  }

  const [currentBg, setCurrentBg] = useState("/model/resume_assets/fair.jpg")

  const backgrounds = [
    "/model/resume_assets/fair.jpg",
    "/model/resume_assets/night_fair.png",
  ]

  const handleBackgroundChange = () => {
    const currentIndex = backgrounds.indexOf(currentBg)
    const nextIndex = (currentIndex + 1) % backgrounds.length
    setCurrentBg(backgrounds[nextIndex])
  }
  return (
    <div
      style={{
        backgroundImage: `url(${currentBg})`,
        transition: "background 2s",
      }}
      className="w-full  text-white max-h-[92vh] 2xl:max-h-[95vh]  bg-center bg-cover  overflow-y-scroll overflow-x-hidden  transition-transform duration-500 ease-in-out"
    >
      <button
        onClick={handleBackgroundChange}
        className={`absolute z-50  top-0  right-4 px-4 py-2   text-white  ${
          currentBg.includes("night") ? "" : "animate-waving-hand"
        }    rounded-full`}
        style={{
          background: "rgb(0,33,36)",
          background:
            "radial-gradient(circle, rgba(0,33,36,1) 0%, rgba(114,121,9,0.4314058875503326) 35%, rgba(227,255,0,1) 100%)",
        }}
      >
        {currentBg.includes("jpg") && <h1 className="text-black">enter</h1>}

        <Image
          src={"/model/resume_assets/bulb_on.png"}
          width={100}
          height={100}
          alt="sdfsdf"
        />

        {currentBg.includes("jpg") && (
          <h1 className="text-black">night mode</h1>
        )}
      </button>

      <div>
        <Image
          src={"/model/resume_assets/wind_mill.png"}
          width={200}
          height={200}
          alt="sdfsdf"
          className=" "
          id="wind_mill"
        />
      </div>
      <div>
        <Image
          src={"/model/resume_assets/kites.png"}
          width={200}
          height={200}
          alt="sdfsdf"
          className="absolute  right-0"
          id="kites"
        />
      </div>
      <div className="flex gap-x-10  h-screen    overflow-x-auto ">
        <div
          className="cursor-pointer max-h-64 min-w-60 text-left bg-center bg-cover bg-[url('/model/resume_assets/board.png')]  "
          id="board"
          onClick={() => handleScroll("about")}
        >
          <h1 className="text-black relative top-1/2 font-pencilFont font-semibold  text-center tracking-widest text-2xl  ">
            ABOUT ME
          </h1>
        </div>
        <div
          className=" cursor-pointer max-h-64 min-w-60 text-left bg-center bg-cover bg-[url('/model/resume_assets/board.png')]  "
          id="board"
          onClick={() => handleScroll("roles")}
        >
          <h1 className="text-black relative top-1/2 font-pencilFont font-semibold  text-center tracking-widest text-2xl  ">
            <h1 className="text-black relative top-1/2 font-pencilFont font-semibold  text-center tracking-widest text-2xl  ">
              PROJECTS
              <br />
              and
              <br />
              INDUSTRIES
            </h1>
          </h1>
        </div>
        <div
          className=" cursor-pointer max-h-64 min-w-60 text-left bg-center bg-cover bg-[url('/model/resume_assets/board.png')]  "
          id="board"
          onClick={() => handleScroll("techStack")}
        >
          <h1 className="text-black relative top-1/2 font-pencilFont font-semibold  text-center tracking-widest text-2xl  ">
            TECHSTACK
          </h1>
        </div>
        <div
          className=" cursor-pointer max-h-64 min-w-60 text-left bg-center bg-cover bg-[url('/model/resume_assets/board.png')]  "
          id="board"
          onClick={() => handleScroll("contact")}
        >
          <h1 className="text-black relative top-1/2 font-pencilFont font-semibold  text-center tracking-widest text-2xl  ">
            CONTACT ME
          </h1>
        </div>
        <div
          className=" cursor-pointer max-h-64 min-w-60 text-left bg-center bg-cover bg-[url('/model/resume_assets/board.png')]  "
          id="board"
        >
          <h1 className="text-black relative top-1/2 font-pencilFont font-semibold  text-center tracking-widest text-2xl  ">
            PROJECTS
            <br />
            and
            <br />
            INDUSTRIES
          </h1>
        </div>
        <div
          className=" cursor-pointer max-h-64 min-w-60 text-left bg-center bg-cover bg-[url('/model/resume_assets/board.png')]  "
          id="board"
          onClick={() => handleScroll("techStack")}
        >
          <h1 className="text-black relative top-1/2 font-pencilFont font-semibold  text-center tracking-widest text-2xl  ">
            TECH STAK
          </h1>
        </div>
        <div
          className=" cursor-pointer max-h-64 min-w-60 text-left bg-center bg-cover bg-[url('/model/resume_assets/board.png')]  "
          id="board"
        >
          <h1 className="text-black relative top-1/2 font-pencilFont font-semibold  text-center tracking-widest text-2xl  ">
            TECH STAK
          </h1>
        </div>
        <div
          className=" cursor-pointer max-h-64 min-w-60 text-left bg-center bg-cover bg-[url('/model/resume_assets/board.png')]  "
          id="board"
        >
          <h1 className="text-black relative top-1/2 font-pencilFont font-semibold  text-center tracking-widest text-2xl  ">
            TECH STAK
          </h1>
        </div>
        <div
          className=" cursor-pointer max-h-64 min-w-60 text-left bg-center bg-cover bg-[url('/model/resume_assets/board.png')]  "
          id="board"
        >
          <h1 className="text-black relative top-1/2 font-pencilFont font-semibold  text-center tracking-widest text-2xl  ">
            TECH STAK
          </h1>
        </div>
      </div>
      <div id="about">
        <AboutMe />
      </div>
      <div id="roles">
        <MyRoles />
      </div>
      <div id="techStack">
        <TechStack />
      </div>
      <div id="contact">
        <ContactMe />
      </div>
    </div>
  )
}

export default ResumePageComp
