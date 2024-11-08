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

const PhysicsmModule = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth
      const height = window.innerHeight
      const canvas = document.createElement("canvas")
      canvas.height = height
      canvas.width = width

      const world = new CANNON.World({
        gravity: new CANNON.Vec3(0, -9.8, 0),
      })
      const timeStamp = 1 / 60

      //   groundBody.quaternion.setFromEuler(Math.PI / 2, 0, 0)

      let cam_posx = 0
      let cam_posy = 10
      let cam_posz = -50

      const scene = new THREE.Scene()
      const group = new THREE.Group()
      const textureLoader = new THREE.TextureLoader()

      const camera = new THREE.PerspectiveCamera(
        75,
        width / height,
        0.1,
        100000
      )
      camera.position.set(cam_posx, cam_posy, cam_posz)

      const renderer = new THREE.WebGLRenderer()
      renderer.setSize(width, height)

      document.body.appendChild(renderer.domElement)
      const controls = new OrbitControls(camera, renderer.domElement)

      const PlaneGeometry = new THREE.PlaneGeometry(30, 30)
      const Planematerial = new THREE.MeshStandardMaterial({
        // color: "red",
        // side: 2,
      })
      const PlaneMesh = new THREE.Mesh(PlaneGeometry, Planematerial)

      group.add(PlaneMesh)

      const groundBody = new CANNON.Body({
        shape: new CANNON.Plane(),
        //   mass: 10,
        type: CANNON.Body.STATIC,
      })

      world.addBody(groundBody)

      groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0)
      groundBody.position.set(0, -20, -20)

      const Box2Geometry = new THREE.IcosahedronGeometry(2, 1)
      const Box2material = new THREE.MeshStandardMaterial({
        // wireframe: true,
        // color: "cyan",
      })
      const box2Mesh = new THREE.Mesh(Box2Geometry, Box2material)

      // group.add(box2Mesh)

      // function armagadon(index) {
      //   boxBody.position.set(-index * 2, index, 0)
      // boxBody.velocity.set(25, -25, 0)
      //   return world.addBody(boxBody)
      // }
      const pointLight = new THREE.DirectionalLight("white", 1)
      const pointLightBig = new THREE.PointLight("yellow", 15, 0, 0)

      // group.add(box2Mesh)

      // boxBody2.velocity.set(25, -25, 0)

      // boxBody.angularFactor.set(0.1, 1, 1)

      const sphereGeometry = new THREE.SphereGeometry(30)
      const sphereMaterial = new THREE.MeshStandardMaterial({
        // wireframe: true,
        color: "red",
      })
      const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial)

      // group.add(pointLightBig)

      const sphereBody = new CANNON.Body({
        shape: new CANNON.Sphere(30),
        mass: 50,
        position: new CANNON.Vec3(0, 30, 20),
        // type: CANNON.Body.STATIC,
      })
      world.addBody(sphereBody)
      sphereBody.linearDamping = 0.99
      sphereBody.angularDamping = 0.01

      const hemisphere = new THREE.AmbientLight("white", 1)
      // scene.add(hemisphere)

      //

      textureLoader.load(
        "./model/galaxy/galaxy_texture.jpg",
        function name(texture) {
          scene.background = texture
          scene.environment = texture
        }
      )

      const ref = []
      const astroRef = []

      for (let index = 0; index < 100; index++) {
        let asteroid = new THREE.Mesh(Box2Geometry, Box2material)
        const asteroidBody = new CANNON.Body({
          shape: new CANNON.Sphere(5),
          mass: 0.5,
          position: new CANNON.Vec3(
            THREE.MathUtils.randFloatSpread(width / 50),
            THREE.MathUtils.randFloatSpread(height / 10),

            THREE.MathUtils.randFloatSpread(10000)
          ),
        })

        // asteroidBody.linearDamping = 0.4
        astroRef.push(asteroid)
        ref.push(asteroidBody)
        group.add(asteroid)
        world.addBody(asteroidBody)
      }
      group.add(pointLight)

      const update = () => {
        for (let index = 0; index < 100; index++) {
          ref[index].position.z -= 4
          pointLight.position.z = astroRef[index].position.z
          // pointLightBig.position.x = ref[index].position.x
          // pointLightBig.position.y = ref[index].position.y

          if (ref[index].position.z < -30) {
            ref[index].position.z = THREE.MathUtils.randFloatSpread(10000)
            ref[index].position.y = THREE.MathUtils.randFloatSpread(height)
            ref[index].position.x = THREE.MathUtils.randFloatSpread(width / 10)
          }
        }
      }

      const time = new THREE.Clock()

      group.add(sphereMesh)

      scene.add(group)

      const animate = (time) => {
        requestAnimationFrame(animate)
        world.step(timeStamp)
        update()

        PlaneMesh.position.copy(groundBody.position)
        PlaneMesh.quaternion.copy(groundBody.quaternion)

        for (let index = 0; index < 100; index++) {
          astroRef[index].position.copy(ref[index].position)
          astroRef[index].quaternion.copy(ref[index].quaternion)
        }

        sphereMesh.position.copy(sphereBody.position)
        sphereMesh.quaternion.copy(sphereBody.quaternion)

        renderer.render(scene, camera)
      }

      animate()
    }
  }, [])
}

export default PhysicsmModule
