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

const ProjectComponent = () => {
  const rendererRef = useRef(null)
  const cssRendererRef = useRef(null)

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
        console.log(`Loading progress: ${(xhr.loaded / xhr.total) * 100}%`)
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
      const iframeGeometry = new THREE.PlaneGeometry(10, 10)
      const iframeMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        side: 2,
      })
      const iframe = document.createElement("iframe")
      iframe.src = iframeUrl
      iframe.style.border = "none"
      iframe.style.width = "100%"
      iframe.style.height = "100vh"
      iframe.style.transformOrigin = "0 0"
      iframe.style.transform = "scale(0.2)"
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
    addIframes(28, 2, -10, "https://www.nattyhatty.com/")
    addIframes(28, -9, -10, "https://www.fpslounge.com/")
    addIframes(0, -9, -10, "https://mern-cms.netlify.app/")

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
          // objModel.rotation.x = Math.sin((elapsedTime / 10) * Math.PI)
          objModel.rotation.y = Math.cos((elapsedTime / 10) * Math.PI)
          objModel.rotation.z = Math.cos((elapsedTime / 10) * Math.PI)
          objModel.position.x = Math.sin((elapsedTime / 10) * Math.PI * 2)
          objModel.position.y = Math.cos((elapsedTime / 10) * Math.PI * 2)
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
    if (typeof window !== "undefined") {
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
}

export default ProjectComponent
