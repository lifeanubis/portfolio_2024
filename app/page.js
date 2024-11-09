"use client"

// import CubeTemplate from "@/Components/cubeTemplate"
// import ParticleModule from "@/Components/particleModule"
// import TitleDisplay from "@/Components/titleDisplay"
// import AnimatedModel from "@/Components/animatedModel"
// import ShaderdModel from "@/Components/shaderModel"
// import ShaderdModel from "@/Components/jetShader"

import dynamic from "next/dynamic"

const SolarSystemModule = dynamic(
  () => import("@/Components/solarSystemModule"),
  {
    ssr: false,
  }
)

// const CameraTestModule = dynamic(() => import("@/Components/cameraTest"), {
//   ssr: false,
// })

// const PhysicsModule = dynamic(() => import("@/Components/physicsModule"), {
//   ssr: false,
// })

// const MovingLightModule = dynamic(() => import("@/Components/movingLight"), {
//   ssr: false,
// })

// const CircleRotationModule = dynamic(
//   () => import("@/Components/circleRotationModule"),
//   {
//     ssr: false,
//   }
// )

// const TextLoadModule = dynamic(() => import("@/Components/textLoadModule"), {
//   ssr: false,
// })

import React from "react"

export default function Home() {
  // useEffect(() => {
  // if (typeof window !== "undefined") {

  return (
    <div className="">
      <SolarSystemModule />
      {/* <ShaderdModel /> */}

      {/* <SpaceShipModule /> */}

      {/* <TextLoadModule /> */}

      {/* <CircleRotationModule /> */}

      {/* <PhysicsModule /> */}
      {/* <MovingLightModule /> */}

      {/* <CameraTestModule /> */}

      {/* <h1>asdasd</h1> */}
      {/* <ParticleModule /> */}
      {/* <Table /> */}
      {/* <CubeTemplate /> */}
      {/* <TitleDisplay /> */}
      {/* <AnimatedModel /> */}
      {/* <ShaderdModel /> */}
    </div>
  )
}
