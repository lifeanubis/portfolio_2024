"use client"

// import CubeTemplate from "@/Components/cubeTemplate"
// import ParticleModule from "@/Components/particleModule"
// import TitleDisplay from "@/Components/titleDisplay"
// import AnimatedModel from "@/Components/animatedModel"
import ShaderdModel from "@/Components/shaderModel"
import dynamic from "next/dynamic"

const SolarSystemModule = dynamic(
  () => import("@/Components/solarSystemModule"),
  {
    ssr: false,
  }
)

const CameraTestModule = dynamic(() => import("@/Components/cameraTest"), {
  ssr: false,
})

import React from "react"

export default function Home() {
  // useEffect(() => {
  if (typeof window !== "undefined") {
    return (
      <div className="">
        {/* <SolarSystemModul e /> */}
        <CameraTestModule />

        {/* <h1>asdasd</h1> */}
        {/* <ParticleModule /> */}
        {/* <Table /> */}
        {/* <CubeTemplate /> */}
        {/* <TitleDisplay /> */}
        {/* <AnimatedModel /> */}
        {/* <ShaderdModel /> */}
      </div>
    )
  } else {
    return <h1>loading..............</h1>
  }

  // }, [])
}
