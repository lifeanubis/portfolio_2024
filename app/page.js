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
  { ssr: false, loading: () => <p>Loading...</p> }
)

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

// const TextLoadModule = dynamic(() => import("@/Components/textLoadModule"), {
//   ssr: false,
// })

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      asteroidMaterial &&
      asteroidGeometry &&
      marsMesh &&
      jupiterMesh &&
      sunMesh &&
      earthMesh &&
      saturnMesh
    ) {
      router.refresh()
    }
  }, [])

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
