"use client"

import { OrbitControls } from "three/addons/controls/OrbitControls.js"

import { useEffect } from "react"
import * as THREE from "three"
import { latheR } from "./textExport"
import { earthMesh, earthMaterial, earthGeometry } from "./earthScene"
import { sunMesh, sunMaterial, sunGeometry } from "./sunScene"
import { CameraControls } from "@react-three/drei"
import { FlyControls } from "three/addons/controls/FlyControls.js"
import gsap from "gsap"
import * as CANNON from "cannon-es"

// import { CameraControls } from "three/addons/controls/"

const MovingLightModule = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth
      const height = window.innerHeight
      const canvas = document.createElement("canvas")
      canvas.height = height
      canvas.width = width

      const timeStamp = 1 / 60

      //   groundBody.quaternion.setFromEuler(Math.PI / 2, 0, 0)

      let cam_posx = 0
      let cam_posy = 1
      let cam_posz = -10

      const scene = new THREE.Scene()
      const group = new THREE.Group()
      const textureLoader = new THREE.TextureLoader()

      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)

      camera.position.z = -4

      const renderer = new THREE.WebGLRenderer()

      renderer.setSize(width, height)

      document.body.appendChild(renderer.domElement)

      const controls = new OrbitControls(camera, renderer.domElement)

      //   const PlaneGeometry = new THREE.PlaneGeometry(30, 30)
      const Planematerial = new THREE.MeshStandardMaterial({
        // color: "red",
        // side: 2,
      })
      //   const PlaneMesh = new THREE.Mesh(PlaneGeometry, Planematerial)

      //   group.add(PlaneMesh)

      const Box2Geometry = new THREE.IcosahedronGeometry(2, 1)
      const Box2material = new THREE.MeshStandardMaterial({
        // wireframe: true,
        color: "cyan",
      })
      const box2Mesh = new THREE.Mesh(Box2Geometry, Box2material)

      const box2MeshClone = box2Mesh.clone()
      box2MeshClone.material.color.set("red")

      box2MeshClone.position.x = 5
      group.add(box2MeshClone)

      const pointLight = new THREE.PointLight("green", 150, 0, 0)
      const directionaL = new THREE.DirectionalLight("red", 1)
      const ambientLight = new THREE.AmbientLight("white", 1)

      const sphereGeometry = new THREE.SphereGeometry(10)
      const sphereMaterial = new THREE.MeshStandardMaterial({
        // wireframe: true,
        color: "red",
      })
      const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial)

      group.add(box2Mesh)

      //   box2Mesh.add(pointLight)
      group.add(directionaL)
      //   group.add(ambientLight)

      directionaL.position.set(
        group.children[0].position.x,
        group.children[0].position.y,
        group.children[0].position.z
      )

      //   pointLight.position.set(
      //     1,
      //     0,
      //     0 // -4
      //   )

      textureLoader.load(
        "./model/galaxy/galaxy_texture.jpg",
        function name(texture) {
          scene.background = texture
          scene.environment = texture
        }
      )

      const time = new THREE.Clock()

      scene.add(group)

      const animate = (time) => {
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
        controls.update()
      }

      animate()
    }
  }, [])
}

export default MovingLightModule
