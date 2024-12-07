"use client"

// import CubeTemplate from "@/Components/cubeTemplate"
// import ParticleModule from "@/Components/particleModule"
// import TitleDisplay from "@/Components/titleDisplay"
// import AnimatedModel from "@/Components/animatedModel"
// import ShaderdModel from "@/Components/shaderModel"
// import ShaderdModel from "@/Components/jetShader"

import dynamic from "next/dynamic"

import { earthMesh } from "@/Components/earthScene"
import { marsMesh } from "@/Components/marsScene"
import { jupiterMesh } from "@/Components/jupiterScene"

import {
  saturnMesh,
  asteroidGeometry,
  asteroidMaterial,
} from "@/Components/saturnScene"

import { sunMesh, sunMaterial } from "@/Components/sunScene"

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

const SolarSystemModule = dynamic(
  () => import("@/Components/solarSystemModule"),
  {
    ssr: false,
    loading: () => <p>loading.......</p>,
  }
)

import React from "react"

export default function Home() {
  return (
    <div className="">
      <SolarSystemModule />
    </div>
  )
  {
    /* <ShaderdModel /> */
  }

  {
    /* <SpaceShipModule /> */
  }

  {
    /* <TextLoadModule /> */
  }

  {
    /* <CircleRotationModule /> */
  }

  {
    /* <PhysicsModule /> */
  }
  {
    /* <MovingLightModule /> */
  }

  {
    /* <CameraTestModule /> */
  }

  {
    /* <h1>asdasd</h1> */
  }
  {
    /* <ParticleModule /> */
  }
  {
    /* <Table /> */
  }
  {
    /* <CubeTemplate /> */
  }
  {
    /* <TitleDisplay /> */
  }
  {
    /* <AnimatedModel /> */
  }
  {
    /* <ShaderdModel /> */
  }
}
