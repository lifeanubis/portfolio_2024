"use client"

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

const SolarSystemModule = dynamic(
  () => import("@/Components/solarSystemModule"),
  {
    ssr: false,
  }
)

import React from "react"

export default function Home() {
  return (
    <div className="">
      <SolarSystemModule />
    </div>
  )
}
