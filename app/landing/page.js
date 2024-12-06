"use client"

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"

import dynamic from "next/dynamic"
const LandingPageComponent = dynamic(
  () => import("@/Components/LandingPageComponent"),
  {
    ssr: false,
  }
)
const LandingPage = () => {
  return (
    <div className="">
      <LandingPageComponent />
    </div>
  )
}

export default LandingPage
