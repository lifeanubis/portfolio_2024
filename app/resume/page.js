"use client"

import AboutMe from "@/Components/aboutMe"
import MyRoles from "@/Components/myRoles"
import dynamic from "next/dynamic"
import React from "react"

const ResumePageComponent = dynamic(
  () => import("@/Components/resumePageComp"),
  {
    ssr: false,
  }
)

const ResumePage = () => {
  return (
    // <div>
    <div
    //   className="bg-black w-screen h-auto    text-white  bg-[url('/model/resume_assets/fair.jpg')] bg-center bg-cover  overflow-auto"
    >
      <ResumePageComponent />
    </div>
  )
}

export default ResumePage
