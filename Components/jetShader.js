"use client"

// import { Box, OrbitControls } from "@react-three/drei"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"

import { useEffect } from "react"
import * as THREE from "three"
// import { sunGeometry, sunMesh } from "./earthScene"

// import spotlightAud from ""

const ShaderdModel = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth
      const height = window.innerHeight
      const canvas = document.createElement("canvas")
      canvas.height = height
      canvas.width = width
      const scene = new THREE.Scene()
      const group = new THREE.Group()

      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
      camera.position.z = 4
      const renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(width, height)
      document.body.appendChild(renderer.domElement)

      // lightings

      const ambient = new THREE.AmbientLight("white", 5)
      scene.add(ambient)

      const textureLoader = new THREE.TextureLoader()
      let sunGeometry, sunMaterial

      textureLoader.load("./model/sun/sun_texture.jpg", () => {
        sunGeometry = new THREE.SphereGeometry(2, 50)
        // sunGeometry.isBufferGeometry = true
        // console.log(sunGeometry.attributes.position.count)
        sunMaterial = new THREE.ShaderMaterial({
          wireframe: true,
          //   vertexShader: vertexShader,
          fragmentShader: fragmentShader,
          uniforms: {
            time: { value: 0.0 },
            u_mouse: { type: "v2", value: new THREE.Vector2() },
            // timeR: { value: 0.0 },
            // texture1: { value: texture },
          },
        })

        // texture.colorSpace = THREE.SRGBColorSpace
        // texture.wrapS = texture.wrapT = THREE.WrapAroundEnding

        let sunMesh = new THREE.Mesh(sunGeometry, sunMaterial)
        group.add(sunMesh)
      })
      textureLoader.load("./model/sun/sun_texture.jpg", function name(texture) {
        const sunCoreGeometry = new THREE.IcosahedronGeometry(1.1, 50)
        const sunCoreMaterial = new THREE.MeshPhongMaterial({
          // vertexShader: ver,
          // fragmentShader: ver,
          // map: texture,
          // alphaMap: texture,
          // bumpMap: texture,
          aoMap: texture,
          aoMapIntensity: 10,
          clipIntersection: true,
          clippingPlanes: true,
          // alpha
        })
        // texture.colorSpace = THREE.SRGBColorSpace
        // texture.wrapS = texture.wrapT = THREE.WrapAroundEnding

        let sunCoreMesh = new THREE.Mesh(sunCoreGeometry, sunCoreMaterial)
        sunCoreMesh.position.set(0, -1, -1)
        // group.add(sunCoreMesh)
      })

      textureLoader.load(
        "./model/galaxy/galaxy_texture.jpg",
        function name(texture) {
          scene.background = texture
          scene.environment = texture
        }
      )

      //   group.add(lightHelper, lightHelperG)
      window.addEventListener("resize", () => {
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)
      })

      scene.add(group)

      const controls = new OrbitControls(camera, renderer.domElement)

      const animate = (time) => {
        requestAnimationFrame(animate)
        if (sunMaterial && sunGeometry) {
          sunMaterial.uniforms.time.value = time * 0.005 // Time in seconds
          // sunMaterial.uniforms.timeR.value = time * 0.001 // Time in seconds
        }

        controls.update()
        renderer.render(scene, camera)
      }

      animate()
    }
  }, [])
}

export default ShaderdModel
