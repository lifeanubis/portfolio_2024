"use client"

import { useEffect } from "react"
import * as THREE from "three"

const Capsules = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(
        75,
        window?.innerWidth / window.innerHeight,
        0.1,
        1000
      )
      //

      //
      const renderer = new THREE.WebGLRenderer()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setAnimationLoop(animate)
      document.body.appendChild(renderer.domElement)

      const geometry = new THREE.CapsuleGeometry(1, 1, 4, 8)
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
      const capsule = new THREE.Mesh(geometry, material)
      scene.add(capsule)

      camera.position.x = 0.22
      camera.position.z = 7

      function animate() {
        capsule.rotation.x += 0.01
        capsule.rotation.y += 0.01

        renderer.render(scene, camera)
      }
      // return animate()
    }
  }, [])
}

export default Capsules
