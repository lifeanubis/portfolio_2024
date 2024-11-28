"use client"

import { OrbitControls } from "three/addons/controls/OrbitControls.js"

import { useEffect, useState } from "react"
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

const ProjectPage = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      let textGeo, textMesh, textMaterial
      const width = window.innerWidth
      const height = window.innerHeight
      const canvas = document.createElement("canvas")
      canvas.height = height
      canvas.width = width

      const scene = new THREE.Scene()
      const group = new THREE.Group()
      const iframeGroup = new THREE.Group()
      const textGroup = new THREE.Group()
      const loader = new GLTFLoader()
      let model
      // const directional = new THREE.DirectionalLight(0xeb9c50, 20)

      const directional = new THREE.DirectionalLight(0xeb9c50, 5)
      const directionalZ = new THREE.DirectionalLight(0xeb9c50, 20)
      // directional.position.set(0, 2, 5)
      // directional.angle = Math.PI / 10
      // directional.penumbra = 10
      // directional.decay = 0
      // directional.distance = 0

      // objLoader.load("./model/spaceMan/Pbr/base.obj", (gltf) => {
      //   model = gltf.scene
      //   directional.position.set(2, 5, 10)
      //   directionalZ.position.set(5, -5, -10)
      //   model.add(directional)
      //   model.add(directionalZ)

      //   model.position.set(2, -1, -10)
      //   model.scale.set(0.01, 0.01, 0.01)
      //   iframeGroup.add(model)
      // })
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
      const pbrMap = textureLoader.load("./model/spaceMan/Pbr/texture_pbr.png") // Normal map
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
      const renderer = new THREE.WebGLRenderer()
      renderer.setSize(width, height)
      camera.position.z = 1

      document.body.appendChild(renderer.domElement)
      const controls = new OrbitControls(camera, renderer.domElement)

      const pointLight = new THREE.PointLight(0xff09107, 1, 0, 0)
      const pointLightStar = new THREE.PointLight("cyan", 15, 10, 0)

      const ambientLight = new THREE.AmbientLight("white", 1)

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

      // ambientLight.position.set(-25, 0, 0)
      // group.children[0].add(ambientLight)
      // group.add(ambientLight)

      const axisHelper = new THREE.AxesHelper(200)

      // scene.add(axisHelper)
      scene.add(textGroup)

      const cssRenderer = new CSS2DRenderer()
      cssRenderer.setSize(width, height)
      cssRenderer.domElement.style.position = "absolute"
      cssRenderer.domElement.style.top = 0

      cssRenderer.domElement.style.pointerEvents = "none"

      document.body.appendChild(cssRenderer.domElement)
      const mouse = new THREE.Vector2()
      const raycaster = new THREE.Raycaster()
      //
      window.addEventListener("mousemove", (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
      })
      const addIframes = (iframePosX, iframePosY, iframePosZ, iframeUrl) => {
        const iframeGeometry = new THREE.PlaneGeometry(10, 10)
        const iframeMaterial = new THREE.MeshBasicMaterial({
          color: 0x00ff00,
          side: 2,
        })
        const iframePlane = new THREE.Mesh(iframeGeometry, iframeMaterial)
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

        const container = document.createElement("div")
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

      addIframes(0, 4, -10, "https://laughing-hugle-9d2e60.netlify.app/")
      addIframes(28, 4, -10, "https://www.nattyhatty.com/")
      addIframes(28, -9, -10, "https://www.fpslounge.com/")
      addIframes(0, -9, -10, "https://mern-cms.netlify.app/")
      // addIframes(
      //   10,
      //   -9,
      //   -10,
      //   "https://docs.google.com/document/d/1nAQnL6PtKYBdutpF7XOg6od6n4rmiyXwrrIBHDw5oFw/edit?tab=t.0"
      // )

      controls.enableDamping = true
      controls.dampingFactor = 0.009
      controls.enableRotate = false
      // controls.enablePan = false
      const planeGeometry = new THREE.PlaneGeometry(30, 30)
      const planeMaterial = new THREE.MeshBasicMaterial({
        color: 0xaaaaaa,
        side: THREE.DoubleSide,
        visible: false,
      })
      const plane = new THREE.Mesh(planeGeometry, planeMaterial)
      plane.rotation.x = -Math.PI / 2 // Flat on the ground
      plane.position.set(0, 0, 0)

      scene.add(plane)

      const animate = () => {
        requestAnimationFrame(animate)

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
        // raycaster.setFromCamera(mouse, camera)
        // const intersects = raycaster.intersectObject(plane)
        // if (intersects.length > 0 && objModel) {
        //   const point = intersects[0].point // Intersection point on the plane
        //   objModel.position.set(point.x, point.y, point.z) // Smoothly move the sphere to the intersection point
        // }
        cssRenderer.render(scene, camera)
      }

      animate()
    }
  }, [])
}

export default ProjectPage
