"use client"

import { OrbitControls } from "three/addons/controls/OrbitControls.js"

import { useEffect } from "react"
import * as THREE from "three"
import { latheR } from "./textExport"
import { earthMesh, earthMaterial, earthGeometry } from "./earthScene"
import { sunMesh, sunMaterial, sunGeometry } from "./sunScene"
import gsap from "gsap"

const SolarSystemModule = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth
      const height = window.innerHeight
      const canvas = document.createElement("canvas")
      canvas.height = height
      canvas.width = width
      let cam_posx = 0
      let cam_posy = 0
      let cam_posz = 2

      const scene = new THREE.Scene()
      const group = new THREE.Group()
      const textureLoader = new THREE.TextureLoader()

      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
      const renderer = new THREE.WebGLRenderer()
      renderer.setSize(width, height)
      camera.position.z = 4
      // set(cam_posx, cam_posy, cam_posz)

      document.body.appendChild(renderer.domElement)

      const LatheGeometry = new THREE.BoxGeometry(5, 1, 1)
      const Lathematerial = new THREE.MeshStandardMaterial({
        // wireframe: true,
        // emissive: "red",
        // emissiveIntensity: 1,
        // color: "red",
      })
      const controls = new OrbitControls(camera, renderer.domElement)

      const pointLight = new THREE.PointLight(0xff09107, 15, 30, 1)
      const pointLightStar = new THREE.PointLight("cyan", 15, 10, 0)
      const starLight = new THREE.PointLight("green", 15, 10, 0)

      const ambientLight = new THREE.DirectionalLight("white", 5.0)

      scene.background = new THREE.Color().setHSL(
        0.821,
        0.9,
        0.05,
        THREE.SRGBColorSpace
      )
      // const ambientLight = new THREE.AmbientLight("white", 5)
      // scene.add(ambientLight)
      // ambientLight.position.z = -12
      // group.add(pointLight)

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
      let mars = earthMesh.clone()
      let saturn = earthMesh.clone()

      group.add(mars)
      group.add(saturn)

      group.add(lathe)
      // earthMesh.add(pointLight)
      // if (earthMaterial && earthGeometry && earthMesh) {
      group.add(sunMesh)
      group.add(earthMesh)
      lathe.position.set(0, 0, 0)

      mars.position.set(-25, 0, -15)
      saturn.position.set(-25, 0, 15)
      ambientLight.position.set(-25, 0, 0)
      // group.children[0].add(ambientLight)
      group.add(ambientLight)

      sunMesh.position.set(0, 0, 4)
      earthMesh.position.set(-15, 0, 0)

      const axisHelper = new THREE.AxesHelper(20)

      scene.add(axisHelper)

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

        earthMesh.rotation.y = planetRotation += 0.001

        pointLightStar.position.set(posX, posY, -4)
        pointLight.position.set(posX, posY, 5)
      }

      const sunMovement = (time) => {
        sunMesh.rotation.y = planetRotation += 0.0005
        sunMaterial.uniforms.time.value = time * 0.005
      }

      const timeLine = gsap.timeline()

      const camControlls = () => {
        timeLine
          .to(camera.position, {
            x: earthMesh.position.x - 2,
            duration: 4,
            onUpdate: () => camera.lookAt(sunMesh.position),
          })
          .to(camera.position, {
            x: mars.position.x - 4,
            duration: 4,
            // onUpdate: () => camera.lookAt(earthMesh.position),
          })
          .to(camera.position, {
            z: mars.position.z,
            duration: 4,
            // onUpdate: () => camera.lookAt(mars.position),
          })
          .to(camera.position, {
            z: 16,
            duration: 4,
            // onUpdate: () => camera.lookAt(sunMesh.position),
          })
      }

      controls.enableDamping = true
      controls.dampingFactor = 0.009

      camControlls()
      const animate = (time) => {
        requestAnimationFrame(animate)
        lathMovement()
        sunMovement(time)
        controls.update()
        renderer.render(scene, camera)
      }

      animate()
    }
  }, [])
}

export default SolarSystemModule
