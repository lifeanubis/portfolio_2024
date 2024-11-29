"use client"

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"
import { OBJLoader } from "three/addons/loaders/OBJLoader.js"
import gsap from "gsap"

import dynamic from "next/dynamic"
const LandingPageComponent = dynamic(
  () => import("@/Components/LandingPageComponent"),
  {
    ssr: false,
    loading: () => <p>loading.......</p>,
  }
)
const LandingPage = () => {
  return <LandingPageComponent />
}

export default LandingPage
