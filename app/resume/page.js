"use client"

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
    <div>
      <ResumePageComponent />
    </div>
  )
}

export default ResumePage
