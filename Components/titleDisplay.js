"use client"

// import { Box, OrbitControls } from "@react-three/drei"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"

import { useCallback, useEffect, useState } from "react"
import * as THREE from "three"

import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js"
import { RenderPass } from "three/addons/postprocessing/RenderPass.js"
import { GlitchPass } from "three/addons/postprocessing/GlitchPass.js"
import { OutputPass } from "three/addons/postprocessing/OutputPass.js"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"
import {
  CSS2DObject,
  CSS2DRenderer,
} from "three/addons/renderers/CSS2DRenderer.js"
import ParticleModule from "./particleModule"

const TitleDisplay = () => {
  const [alterText, setAlterText] = useState("")
  const [value, setValue] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth
      const height = window.innerHeight
      const canvas = document.createElement("canvas")
      canvas.height = height
      canvas.width = width
      const scene = new THREE.Scene()
      const group = new THREE.Group()
      const htmlRenderer = new CSS2DRenderer()

      htmlRenderer.setSize(width, height)
      htmlRenderer.domElement.style.position = "absolute"
      htmlRenderer.domElement.style.top = "0px"

      const lightsOnBtn = document.createElement("button")
      const lightsOnBtnDiv = document.createElement("div")
      lightsOnBtnDiv.className = "btnContainer"
      lightsOnBtnDiv.appendChild(lightsOnBtn)
      const btnHtmlHelper = new CSS2DObject(lightsOnBtnDiv)

      lightsOnBtnDiv.textContent = "click to switch on the lights"
      //   lightsOnBtnDiv.style.cursor = "pointer"

      group.add(btnHtmlHelper)

      const camera = new THREE.PerspectiveCamera(100, width / height, 0.1, 1000)
      camera.position.z = 4
      const renderer = new THREE.WebGLRenderer()
      renderer.setSize(width, height)

      document.body.appendChild(renderer.domElement)
      document.body.appendChild(htmlRenderer.domElement)
      //   model loader

      const gltfLoader = new GLTFLoader()

      gltfLoader.load("./model/base_basic_pbr.glb", (gltf) =>
        group.add(gltf.scene.children[0])
      )
      //   console.log(gltfLoader)

      //   model loader

      // audio
      const audioLoader = new THREE.AudioLoader()
      const listener = new THREE.AudioListener()
      const sound = new THREE.Audio(listener)
      camera.add(listener)

      const audioBox = (path, duration) => {
        audioLoader.load(path, (buffer) => {
          sound.setBuffer(buffer)
          sound.setVolume(0.5)
          if (duration) {
            sound.duration = duration
          }
          //   sound.autoplay = true
          if (!sound.isPlaying) return sound.play()
        })
      }

      // create a global audio source

      // load a sound and set it as the Audio object's buffer

      const planeGeometry = new THREE.PlaneGeometry(10, 2, 2, 2)
      const planeMaterial = new THREE.MeshStandardMaterial({
        side: 2,
      })
      const bulbGeometry = new THREE.CircleGeometry(0.5)
      const bulbMaterial = new THREE.MeshStandardMaterial()
      const bulb_left = new THREE.Mesh(bulbGeometry, bulbMaterial)
      const bulb_right = new THREE.Mesh(bulbGeometry, bulbMaterial)

      bulb_left.position.x = -4
      bulb_left.position.y = 2.5
      bulb_left.rotation.x = -0.5

      bulb_right.position.x = 4
      bulb_right.position.y = 2.5
      bulb_right.rotation.x = -0.5

      const pointLightBox = new THREE.PointLight(0xf6ff94, 15, 10, 0)
      pointLightBox.position.y = 2
      pointLightBox.position.x = 4
      pointLightBox.position.z = 4

      group.add(bulb_right)
      group.add(bulb_left)

      const plane = new THREE.Mesh(planeGeometry, planeMaterial)
      plane.rotation.x = -4
      plane.position.y = -2

      group.add(plane)

      const controls = new OrbitControls(camera, renderer.domElement)

      const spotLightRed = new THREE.SpotLight(0xf6ff94, 50)
      spotLightRed.position.set(2.5, 5, 2.5)
      spotLightRed.angle = Math.PI / 10
      spotLightRed.penumbra = 1
      spotLightRed.decay = 2
      spotLightRed.distance = 0

      spotLightRed.castShadow = false
      spotLightRed.shadow.mapSize.width = 1024
      spotLightRed.shadow.mapSize.height = 1024
      spotLightRed.shadow.camera.near = 1
      spotLightRed.shadow.camera.far = 10
      spotLightRed.shadow.focus = 1

      //   document.addEventListener("mousemove", (e) =>
      //     e.clientY > 100
      //       ? bulb_left.add(pointLightBox)
      //       : bulb_left.remove(pointLightBox)
      //   )

      //
      const spotLightGreen = new THREE.SpotLight(0xffffff, 100)
      spotLightGreen.position.set(-3.5, 3, 2.5)
      spotLightGreen.angle = Math.PI / 10
      spotLightGreen.penumbra = 1
      spotLightGreen.decay = 3
      spotLightGreen.distance = 0

      spotLightGreen.castShadow = false
      spotLightGreen.shadow.mapSize.width = 1024
      spotLightGreen.shadow.mapSize.height = 1024
      spotLightGreen.shadow.camera.near = 1
      spotLightGreen.shadow.camera.far = 10
      spotLightGreen.shadow.focus = 1

      const lightHelper = new THREE.SpotLightHelper(spotLightRed)
      const lightHelperG = new THREE.SpotLightHelper(spotLightGreen)

      //   group.add(lightHelper, lightHelperG)
      const hemisphere = new THREE.HemisphereLight("purple", "green", 2)
      //   group.add(hemisphere)
      scene.background = new THREE.Color().setHSL(
        0.821,
        0.9,
        0.05,
        THREE.SRGBColorSpace
      )
      const ambient = new THREE.AmbientLight(0xffffff, 0x8d8d8d, 0.15)
      //   group.add(ambient)
      //   const ambientLight = new THREE.AmbientLight("red", 5)
      //   ambientLight.position.z = -12

      //   plane.add(spotlight)

      //   ambientLight.position.z = -12
      //   group.add(pointLight)
      controls.enablePan = false
      controls.enableZoom = false
      const scramble = (textArg) => {
        const tempString = textArg?.split("")
        setTimeout(() => {
          tempString?.map((item, index) => {
            setTimeout(() => {
              tempString[index] = Math.floor(Math.random() * 10).toString()
              setAlterText(tempString?.join(""))
              setTimeout(() => {
                tempString[index] = item
                setAlterText(tempString?.join(""))
              }, 100)
            }, (index + 1) * 100)
          })
        }, 100)
      }
      let arr = [
        "Welcome to my world",
        "it holds no screte",
        "lets doo ittttt.",
      ]

      lightsOnBtnDiv.addEventListener("click", () => {
        htmlRenderer.domElement.style.display = "none"
        audioBox("./sounds/spot.mp3", 1)
        bulb_left.add(pointLightBox)
        arr.map((element, index) => {
          setTimeout(() => {
            scramble(element)
          }, (index + 1) * 1500)
          setTimeout(() => {
            audioBox("./sounds/typing.mp3", 4)
          }, 1500)
        })
      })

      window.addEventListener("resize", () => {
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)
        htmlRenderer.setSize(width, height)
      })

      scene.add(group)
      // scene.add(<ParticleModule />)

      // scene.add(a)
      // setTimeout(() => , 7000)

      const introMovement = () => {
        group.position.z += 0.01
      }

      const animate = () => {
        requestAnimationFrame(animate)
        controls.update()
        if (!sound.isPlaying) {
          setTimeout(() => {
            introMovement()
          }, 7000)
        }
        // addItems().update()
        htmlRenderer.render(scene, camera)
        renderer.render(scene, camera)
      }

      animate()
    }
  }, [])

  // useEffect(() => {
  //     if (typeof window !== "undefined") {
  //         audioBox("./sounds/spot.mp3")
  //     }
  // }, [])

  return (
    <div className="bg-red-800 absolute top-52   ">
      <h1 className="text-6xl font">{alterText}</h1>
    </div>
  )
}

export default TitleDisplay
