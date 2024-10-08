"use client"

import CubeTemplate from "@/Components/cubeTemplate"
import ParticleModule from "@/Components/particleModule"
import TitleDisplay from "@/Components/titleDisplay"

import { useEffect, useRef, useState } from "react"

export default function Home() {
  // let player = new Audio("./sounds/spot.mp3")
  // player.play()

  return (
    <div className="">
      {/* <Table /> */}
      {/* <CubeTemplate /> */}
      <TitleDisplay />
      {/* <ParticleModule /> */}
    </div>
  )
}
