"use client"

import { OrbitControls } from "three/addons/controls/OrbitControls.js"

import { useEffect } from "react"
import * as THREE from "three"

const ParticleModule = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth
      const height = window.innerHeight
      const canvas = document.createElement("canvas")
      canvas.height = height
      canvas.width = width

      const scene = new THREE.Scene()
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
      // cameraControls.addEventListener("change", renderer)
      const pointLight = new THREE.PointLight(0xff9000, 15, 10, 0)
      const pointLightStar = new THREE.PointLight("cyan", 15, 10, 0)
      // pointLightStar.position.y = 2
      const starLight = new THREE.PointLight("green", 15, 10, 0)

      const hemisphere = new THREE.HemisphereLight("purple", "green", 2)
      scene.add(hemisphere)
      scene.background = new THREE.Color().setHSL(
        0.821,
        0.9,
        0.05,
        THREE.SRGBColorSpace
      )
      // const ambientLight = new THREE.AmbientLight("red", 5)
      // scene.add(ambientLight)
      // ambientLight.position.z = -12
      // scene.add(pointLight)
      const lathe = new THREE.Mesh(LatheGeometry, Lathematerial)
      const time = new THREE.Clock()
      lathe.add(pointLightStar)
      lathe.add(pointLight)
      scene.add(pointLight)

      // pointLightStar.add(lathe)
      scene.add(lathe)

      const lathMovement = () => {
        let posX = Math.sin(time.getElapsedTime()) * Math.PI * 0.2
        let posY = Math.cos(time.getElapsedTime())
        // let posZ = Math.cos(time.getElapsedTime()) * Math.PI * 0.2
        lathe.rotation.y += 0.001
        lathe.rotation.x += 0.02

        // lathe.position.x = posX
        // lathe.position.y = posY
        pointLightStar.position.set(posX, posY, -4)
        pointLight.position.set(-posX, -posY, 1)

        // console.log(time, "dasdads---")
      }

      const vertices = []

      for (let i = 0; i < 100; i++) {
        const x = THREE.MathUtils.randFloatSpread(2000)
        const y = THREE.MathUtils.randFloatSpread(2000)
        const z = THREE.MathUtils.randFloatSpread(2000)
        vertices.push(x, y, z)
        starLight.position.set(x, y, z)
      }

      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3)
      )
      const material = new THREE.PointsMaterial({
        color: "red",
        size: 5,
        transparent: false,
      })
      const points = new THREE.Points(geometry, material)
      points.add(starLight)
      scene.add(starLight)
      scene.add(points)

      function addItems() {
        const box = new THREE.Mesh(geometry, material)
        // const boxRotation = box.rotation
        box.position.x = THREE.MathUtils.randFloatSpread(Math.PI * 3)
        box.position.y = THREE.MathUtils.randFloatSpread(Math.PI * 2)
        box.position.z = THREE.MathUtils.randFloatSpread(Math.PI * 2)
        function update() {
          ref.map((elementR) => {
            elementR.rotation.z += 0.01
            elementR.rotation.y += 0.01
            elementR.rotation.x += 0.01
            elementR.position.z += 0.009
            if (elementR.position.z > 3) {
              elementR.position.z = -5
            }
          })
        }

        return { box, update }
      }

      const ref = []

      for (let index = 0; index < 1; index++) {
        const element = addItems().box
        ref.push(element)
        // scene.add(element)
      }

      const animate = () => {
        requestAnimationFrame(animate)
        lathMovement()

        controls.update()
        // addItems().update()
        renderer.render(scene, camera)
      }

      animate()
    }
  }, [])
}

export default ParticleModule
