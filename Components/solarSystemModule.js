"use client"

import { OrbitControls } from "three/addons/controls/OrbitControls.js"

import { useEffect } from "react"
import * as THREE from "three"
import { latheR } from "./textExport"
import { earthMesh, earthMaterial, earthGeometry } from "./earthScene"
import { sunMesh, sunMaterial, sunGeometry } from "./sunScene"
import { CameraControls } from "@react-three/drei"
import { FlyControls } from "three/addons/controls/FlyControls.js"
// import { CameraControls } from "three/addons/controls/"

const SolarSystemModule = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth
      const height = window.innerHeight
      const canvas = document.createElement("canvas")
      canvas.height = height
      canvas.width = width

      const scene = new THREE.Scene()
      const group = new THREE.Group()
      const textureLoader = new THREE.TextureLoader()

      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
      camera.position.z = 4
      const renderer = new THREE.WebGLRenderer()
      renderer.setSize(width, height)

      document.body.appendChild(renderer.domElement)

      const LatheGeometry = new THREE.SphereGeometry()
      const Lathematerial = new THREE.MeshStandardMaterial({
        // wireframe: true,
        // emissive: "red",
        // emissiveIntensity: 1,
        // color: "red",
      })
      const controls = new OrbitControls(camera, renderer.domElement)

      const flyControls = new FlyControls(camera, renderer.domElement)

      // const CameraControl =  CameraControls(camera, renderer.domElement)
      // console.log(CameraControl, "CameraControl--------------------")

      // cameraControls.addEventListener("change", renderer) 0xff9000
      const pointLight = new THREE.PointLight(0xff09107, 15, 30, 1)
      const pointLightStar = new THREE.PointLight("cyan", 15, 10, 0)
      const starLight = new THREE.PointLight("green", 15, 10, 0)

      const hemisphere = new THREE.HemisphereLight("purple", "green", 2)
      // scene.add(hemisphere)
      scene.background = new THREE.Color().setHSL(
        0.821,
        0.9,
        0.05,
        THREE.SRGBColorSpace
      )
      // const ambientLight = new THREE.AmbientLight("white", 5)
      // scene.add(ambientLight)
      // ambientLight.position.z = -12
      group.add(pointLight)

      textureLoader.load(
        "./model/galaxy/galaxy_texture.jpg",
        function name(texture) {
          scene.background = texture
          scene.environment = texture
        }
      )

      const lathe = new THREE.Mesh(LatheGeometry, Lathematerial)
      const time = new THREE.Clock()
      // lathe.add(pointLightStar)
      // lathe.add(pointLight)
      // scene.add(pointLight)
      // scene.add(latheR)
      earthMesh.add(pointLight)
      // if (earthMaterial && earthGeometry && earthMesh) {
      group.add(earthMesh)
      // earthMesh.scale(5, 5)
      earthMesh.position.set(-50, 0, -50)
      group.add(sunMesh)
      scene.add(group)

      // }

      // pointLightStar.add(lathe)
      // scene.add(lathe)
      let planetRotation = 0
      let posZ = 0
      let cam_posZ = 0

      const lathMovement = () => {
        let posX = Math.sin(time.getElapsedTime()) * Math.PI * 0.2
        let posY = Math.cos(time.getElapsedTime())
        // let posZ = Math.cos(time.getElapsedTime()) * Math.PI * 0.2
        // lathe.rotation.y += 0.001
        // lathe.rotation.x += 0.02

        // earthMesh.rotation.y += 0.01
        earthMesh.rotation.y = planetRotation += 0.001

        // lathe.position.x = posX
        // lathe.position.y = posY

        pointLightStar.position.set(posX, posY, -4)
        pointLight.position.set(posX, posY, 5)
      }

      const sunMovement = (time) => {
        // let posX = Math.sin(clock.getElapsedTime()) * Math.PI * 0.2
        // let posY = Math.sin(clock.getElapsedTime()) * Math.PI * 0.2
        // group.rotation.x = posZ += 0.001
        // group.rotation.y = posZ += 0.001
        // camera.lookAt(planeMesh)
        // group.children[1].rotation.x = posZ += 0.01
        sunMesh.rotation.y = planetRotation += 0.0005
        sunMaterial.uniforms.time.value = time * 0.005
      }
      const animate = (time) => {
        requestAnimationFrame(animate)
        lathMovement()
        sunMovement(time)
        // earthMaterial.uniforms.timeR.value = time * 0.001 // Time in seconds
        if (group.position.z <= 20) {
          // group.position.z = posZ += 0.1
        }
        // if (group.position.z === 10) {
        // camera.rotation.x = cam_posZ += 0.01
        // }
        // console.log(
        //   group.position.x,
        //   group.position.y,
        //   group.position.z,
        //   "--------------------"
        // )

        // if (group.position.z >= 50) {
        //   // scene.rotation.x = cam_posZ -= 0.1
        //   // group.position.x = posZ += 0.1
        // }
        flyControls.update(0.52)
        // addItems().update()
        renderer.render(scene, camera)
      }

      animate()
    }
  }, [])
}

export default SolarSystemModule
