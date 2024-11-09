"use client"

// import { Box, OrbitControls } from "@react-three/drei"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"

import { useEffect } from "react"
import * as THREE from "three"

const CircleRotationModule = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth
      const height = window.innerHeight

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
      camera.position.z = 4
      const renderer = new THREE.WebGLRenderer()
      renderer.setSize(width, height)
      document.body.appendChild(renderer.domElement)
      renderer.setClearColor("darkblue")

      const asteroidGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
      const asteroidMaterial = new THREE.MeshNormalMaterial({
        // wireframe: true,
        // side: THREE.DoubleSide,
        color: "red",
      })

      const controls = new OrbitControls(camera, renderer.domElement)
      // cameraControls.addEventListener("change", renderer)

      // scene.add(box)
      // const box = new THREE.Mesh(geometry, material)
      const time = new THREE.Clock()

      function addAsteroid(index) {
        const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial)
        // const boxRotation = box.rotation
        let x = 0.1 + index
        let y = 0.1 + index
        let z = 0.1 + index
        asteroid.position.x = x
        asteroid.position.y = y
        asteroid.position.z = z
        // asteroid.position.x = THREE.MathUtils.randFloatSpread(Math.PI * 3)
        // asteroid.position.y = THREE.MathUtils.randFloatSpread(Math.PI * 2)
        // asteroid.position.z = THREE.MathUtils.randFloatSpread(Math.PI * 2)
        function updateAstro() {
          ref.map((elementR, indexx) => {
            // elementR.rotation.z += 0.01
            // elementR.rotation.y += 0.01
            // elementR.rotation.x += 0.01
            // elementR.position.z += Math.sin(z) * 0.1
            // elementR.position.y = Math.cos(time.getElapsedTime() * 4)
            // elementR.position.z = Math.sin(time.getElapsedTime() * 4)
            elementR.position.z = Math.cos(time.getElapsedTime() * indexx)
            elementR.position.x = Math.sin(time.getElapsedTime() * indexx)

            // if (elementR.position.z > 3) {
            //   elementR.position.z = -5
            // }
          })
        }

        return { asteroid, updateAstro }
      }

      const ref = []

      for (let index = 0; index < 10; index++) {
        const element = addAsteroid(index).asteroid
        ref.push(element)
        scene.add(element)
      }

      const animate = () => {
        requestAnimationFrame(animate)

        controls.update()
        addAsteroid().updateAstro()
        renderer.render(scene, camera)
      }

      animate()
    }
  }, [])
}

export default CircleRotationModule
