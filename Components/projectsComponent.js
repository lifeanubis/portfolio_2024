"use client"

import { OrbitControls } from "three/addons/controls/OrbitControls.js"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

import { TTFLoader } from "three/addons/loaders/TTFLoader.js"
import { TextGeometry } from "three/addons/geometries/TextGeometry.js"
import { FontLoader } from "three/addons/loaders/FontLoader.js"

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"
import { OBJLoader } from "three/addons/loaders/OBJLoader.js"

import gsap from "gsap"

import {
  CSS2DObject,
  CSS2DRenderer,
} from "three/addons/renderers/CSS2DRenderer.js"
import Image from "next/image"
import GlobalLoader from "./globalLoader"

const ProjectComponent = () => {
  const rendererRef = useRef(null)
  const cssRendererRef = useRef(null)
  const [modelLoaded, setModelLoaded] = useState(false)
  const [screenSize, setScreenSize] = useState(768)

  const animationIdRef = useRef(null)
  let scene, group, canvas, renderer, cssRenderer, container

  const threeUi = () => {
    let textGeo, textMesh, textMaterial
    const width = window.innerWidth
    const height = window.innerHeight
    canvas = document.createElement("canvas")
    canvas.height = height
    canvas.width = width

    scene = new THREE.Scene()
    group = new THREE.Group()
    const iframeGroup = new THREE.Group()
    const textGroup = new THREE.Group()
    const loader = new GLTFLoader()
    let model
    // const directional = new THREE.DirectionalLight(0xeb9c50, 20)

    const directional = new THREE.DirectionalLight(0xeb9c50, 5)
    const directionalZ = new THREE.DirectionalLight(0xeb9c50, 20)
    const textureLoader = new THREE.TextureLoader()
    const diffuseMap = textureLoader.load(
      "./model/spaceMan/Pbr/texture_diffuse.png"
    ) // Albedo/Diffuse map
    const metalnessMap = textureLoader.load(
      "./model/spaceMan/Pbr/texture_metallic.png"
    ) // Metalness map
    const roughnessMap = textureLoader.load(
      "./model/spaceMan/Pbr/texture_roughness.png"
    ) // Roughness map
    const normalMap = textureLoader.load(
      "./model/spaceMan/Pbr/texture_normal.png"
    ) // Normal map
    const pbrMaterial = new THREE.MeshStandardMaterial({
      map: diffuseMap, // Albedo or diffuse map
      metalnessMap: metalnessMap, // Metalness map
      roughnessMap: roughnessMap, // Roughness map
      normalMap: normalMap, // Normal map
      metalness: 10, // Default metalness (if no map is applied)
      roughness: 0.5, // Default roughness (if no map is applied)
      // bumpMap: pbrMap,
      // bumpScale: 10,
    })
    // Load the OBJ model
    let objModel
    const objLoader = new OBJLoader()
    objLoader.load(
      "./model/spaceMan/Pbr/base.obj", // Path to your OBJ file
      (object) => {
        objModel = object
        // Traverse the model and apply the custom PBR material
        objModel.traverse((child) => {
          if (child.isMesh) {
            child.material = pbrMaterial // Apply custom material
          }
        })

        // Add the model to the scene
        scene.add(objModel)

        // Adjust position, scale, or rotation if needed
        objModel.position.z = -30

        objModel.scale.set(5.0, 5.0, 5.0)
        directional.position.set(5, 5, 10)
        directionalZ.position.set(-5, -5, -10)
        objModel.add(directional)
        objModel.add(directionalZ)

        console.log("Model loaded successfully:", object)
      },
      (xhr) => {
        // console.log(`Loading progress: ${xhr}%`)
        if (xhr.loaded) {
          setModelLoaded(true)
        }
      },
      (error) => {
        console.error("An error occurred while loading the model:", error)
      }
    )

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    renderer = new THREE.WebGLRenderer()
    renderer.setSize(width, height)
    rendererRef.current = renderer

    camera.position.z = 1

    document.body.appendChild(renderer.domElement)
    const controls = new OrbitControls(camera, renderer.domElement)

    textureLoader.load(
      "./model/galaxy/galaxy_texture.jpg",
      function name(texture) {
        scene.background = texture
        scene.environment = texture
      }
    )

    // const lathe = new THREE.Mesh(LatheGeometry, Lathematerial)
    const time = new THREE.Clock()

    // text mesh

    const fontloader = new FontLoader()
    const ttfLoader = new TTFLoader()
    ttfLoader.load("./fonts/JetBrainsMono-Bold.ttf", (textFont) => {
      const useFont = fontloader.parse(textFont)
      // console.log(textFont, "------------------------")
      textGeo = new TextGeometry(
        "some of my professonal and personal projects",
        {
          depth: 0.05,
          size: 0.81,
          font: useFont,
        }
      )

      textMaterial = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
      })
      textMesh = new THREE.Mesh(textGeo, textMaterial)
      textMesh.position.set(-15, 0, -10)
      textGroup.add(textMesh)
    })
    // text mesh

    const axisHelper = new THREE.AxesHelper(200)

    // scene.add(axisHelper)
    scene.add(textGroup)

    cssRenderer = new CSS2DRenderer()
    cssRenderer.setSize(width, height)
    cssRenderer.domElement.style.position = "absolute"
    cssRenderer.domElement.style.top = 0

    cssRenderer.domElement.style.pointerEvents = "none"
    cssRendererRef.current = cssRenderer

    document.body.appendChild(cssRenderer.domElement)

    const addIframes = (iframePosX, iframePosY, iframePosZ, iframeUrl) => {
      const iframe = document.createElement("iframe")
      iframe.src = iframeUrl
      iframe.style.border = "none"
      iframe.style.width = "100%"
      iframe.style.height = "100vh"
      iframe.style.transformOrigin = "0 0"
      iframe.style.transform = "scale(0.35)"
      iframe.style.pointerEvents = "auto"
      iframe.style.backgroundColor = "purple"
      iframe.style.padding = "10px"
      iframe.style.borderRadius = "50px"
      iframe.style.boxShadow = "5px 10px red"

      container = document.createElement("div")
      container.style.width = "100%"
      container.style.height = "50%"
      container.style.overflow = "hidden"
      container.style.position = "absolute"

      container.appendChild(iframe)
      const cssObject = new CSS2DObject(container)
      cssObject.position.set(iframePosX, iframePosY, iframePosZ)
      cssObject.rotation.set(0, Math.PI, 0)
      iframeGroup.add(cssObject)
    }
    scene.add(iframeGroup)

    addIframes(0, 2, -10, "https://laughing-hugle-9d2e60.netlify.app/")
    addIframes(21, 2, -10, "https://www.nattyhatty.com/")
    addIframes(21, -7, -10, "https://www.fpslounge.com/")
    addIframes(0, -7, -10, "https://mern-cms.netlify.app/")

    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    // Track cursor position
    document.addEventListener("mousemove", (event) => {
      // Convert cursor position to 3D space coordinates
      targetX = (event.clientX / window.innerWidth) * 2 - 1
      targetY = -(event.clientY / window.innerHeight) * 2 + 1
    })
    const smoothness = 0.05 // Adjust f
    controls.enableDamping = true
    controls.dampingFactor = 0.009
    controls.enableRotate = false

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)

      renderer.render(scene, camera)

      if (textMaterial) {
        // Calculate the elapsed time
        const elapsedTime = time.getElapsedTime()

        // Map time to a value between 0 and 1 that resets every second
        const t = (elapsedTime % 1) / 1 // Normalized time between 0 and 1 every second

        if (objModel) {
          objModel.rotation.x = Math.sin((elapsedTime / 10) * Math.PI)
          objModel.rotation.y = Math.cos((elapsedTime / 10) * Math.PI)
          objModel.rotation.z = Math.cos((elapsedTime / 10) * Math.PI)
          objModel.position.x = Math.sin((elapsedTime / 10) * Math.PI * 2)
          objModel.position.y = Math.cos((elapsedTime / 10) * Math.PI * 2)
          // Smooth movement
          currentX += (targetX - currentX) * smoothness
          currentY += (targetY - currentY) * smoothness

          // Update cube position
          objModel.position.x = currentX * 30 // Multiply by 3 to increase movement range
          objModel.position.y = currentY * 20
          objModel.rotation.x = currentX * 5 // Multiply by 3 to increase movement range
          objModel.rotation.y = currentY * 5
        }
        // Compute the RGB values for the smooth transition
        const r = Math.floor((Math.sin(t * Math.PI * 2) * 0.5 + 0.5) * 255)
        const g = Math.floor(
          (Math.sin(t * Math.PI * 2 + (Math.PI * 2) / 3) * 0.5 + 0.5) * 255
        )
        const b = Math.floor(
          (Math.sin(t * Math.PI * 2 + (Math.PI * 4) / 3) * 0.5 + 0.5) * 255
        )

        // Combine RGB into a hex value
        const hexColor = (r << 16) | (g << 8) | b

        // Set the material's color
        textMaterial.color.setHex(hexColor)
      }

      cssRenderer.render(scene, camera)
    }

    animate()
  }

  useEffect(() => {
    if (window.screen.availWidth > 768) {
      setScreenSize(window.screen.availWidth)
    }

    if (typeof window !== "undefined" && window.screen.availWidth > 786) {
      threeUi()

      return () => {
        cancelAnimationFrame(animationIdRef.current) // Stop animation

        renderer?.dispose() // Dispose renderer

        if (document.body) {
          document.body.removeChild(renderer?.domElement) // Remove canvas
          document.body.removeChild(cssRenderer?.domElement)
        }
        console.log("Three.js scene cleaned up.")
      }
    }
  }, [])

  useEffect(() => {
    gsap.to("#rotater2", {
      rotateX: "-360",
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: "expo",
    })
    gsap.to("#rotater1", {
      rotateX: "-360",
      duration: 5,
      repeat: -1,
      ease: "none",
    })
  }, [])

  if (screenSize > 768 && !modelLoaded) {
    return (
      <div className="grid grid-cols-1  bg-black text-white h-screen w-full place-content-center items-center place-items-center">
        <div className="grid grid-cols-1  bg-black text-white h-screen w-full place-content-center items-center place-items-center">
          <GlobalLoader />
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1  lg:hidden absolute bg-black text-white overflow-scroll h-[99vh] w-full pb-20 pt-5  gap-10 object-center justify-center place-items-center ">
      <div className="bg-green-800 w-full h-60 relative ">
        <div className="bg-green-800 absolute col-span-1 w-full h-60 ">
          <div
            className="bg-purple-800 text-lg col-span-1  absolute w-full h-full "
            style={{
              backfaceVisibility: "hidden",
            }}
          >
            <Image
              src={"/model/resume_assets/natty_sc.png"}
              width={300}
              height={300}
              alt="asdasd"
              className="w-full h-full"
            />
          </div>
          <div
            style={{
              backfaceVisibility: "hidden",
            }}
            id="rotater2"
            className="bg-gradient-to-r from-orange-900 to-black text-lg absolute col-span-1 w-full h-full text-center place-content-center "
          >
            <div>
              {" "}
              <p> Natty Hatty is a sports management platform </p>{" "}
            </div>
            <a
              href="https://www.nattyhatty.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="text-black bg-gradient-to-tr cursor-pointer from-teal-500 to-sky-700 tracking-widest  p-2 rounded-lg hover:scale-75 duration-500">
                {" "}
                visit nattyhatty{" "}
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="bg-green-800 w-full h-60 relative ">
        <div className="bg-green-800 absolute col-span-1 w-full h-60 ">
          <div
            className="bg-purple-800 text-lg col-span-1  absolute w-full h-full "
            style={{
              backfaceVisibility: "hidden",
            }}
          >
            <Image
              src={"/model/resume_assets/fps_sc.png"}
              width={300}
              height={300}
              alt="asdasd"
              className="w-full h-full"
            />
          </div>
          <div
            style={{
              backfaceVisibility: "hidden",
            }}
            id="rotater1"
            className="bg-gradient-to-r from-orange-900 to-black text-lg absolute col-span-1 w-full h-full text-center place-content-center "
          >
            <div>
              {" "}
              <p> fps lounge is an e-sports solutions platform </p>{" "}
            </div>
            <a
              href="https://www.fpslounge.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="text-black bg-gradient-to-tr cursor-pointer from-teal-500 to-sky-700 tracking-widest  p-2 rounded-lg hover:scale-75 duration-500">
                visit fpslounge{" "}
              </div>
            </a>
            {/* <div></div> */}
          </div>
        </div>
      </div>
      <div className="bg-green-800 w-full h-60 relative ">
        <div className="bg-green-800 absolute col-span-1 w-full h-60 ">
          <div
            className="bg-purple-800 text-lg col-span-1  absolute w-full h-full "
            style={{
              backfaceVisibility: "hidden",
            }}
          >
            <Image
              src={"/model/resume_assets/3d_sc.png"}
              width={300}
              height={300}
              alt="asdasd"
              className="w-full h-full"
            />
          </div>
          <div
            style={{
              backfaceVisibility: "hidden",
            }}
            id="rotater2"
            className="bg-gradient-to-r from-orange-900 to-black text-lg absolute col-span-1 w-full h-full text-center place-content-center "
          >
            <div>
              {" "}
              <p> demo project for 3D illustration </p>{" "}
            </div>
            <a
              href="https://www.aughing-hugle-9d2e60.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="text-black bg-gradient-to-tr cursor-pointer from-teal-500 to-sky-700 tracking-widest  p-2 rounded-lg hover:scale-75 duration-500">
                visit haunted house{" "}
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="bg-green-800 w-full h-60 relative ">
        <div className="bg-green-800 absolute col-span-1 w-full h-60 ">
          <div
            className="bg-purple-800 text-lg col-span-1  absolute w-full h-full "
            style={{
              backfaceVisibility: "hidden",
            }}
          >
            <Image
              src={"/model/resume_assets/cms_sc.png"}
              width={300}
              height={300}
              alt="asdasd"
              className="w-full h-full"
            />
          </div>
          <div
            style={{
              backfaceVisibility: "hidden",
            }}
            id="rotater1"
            className="bg-gradient-to-r from-orange-900 to-black text-lg absolute col-span-1 w-full h-full text-center place-content-center "
          >
            <div>
              {" "}
              <p> demo CMS portal with plugins functionality </p>{" "}
            </div>
            <a
              href="https://mern-cms.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="text-black bg-gradient-to-tr cursor-pointer from-teal-500 to-sky-700 tracking-widest  p-2 rounded-lg hover:scale-75 duration-500">
                visit CMS{" "}
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectComponent
