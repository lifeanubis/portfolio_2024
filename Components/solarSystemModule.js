"use client"

import { OrbitControls } from "three/addons/controls/OrbitControls.js"

import { useEffect, useState } from "react"
import * as THREE from "three"

import { earthMesh } from "./earthScene"
import { marsMesh } from "./marsScene"
import { jupiterMesh } from "./jupiterScene"

import { saturnMesh, asteroidGeometry, asteroidMaterial } from "./saturnScene"

import { sunMesh, sunMaterial } from "./sunScene"

import * as CANNON from "cannon-es"

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"
import gsap from "gsap"

const SolarSystemModule = () => {
  const [loader, setloader] = useState(false)

  setTimeout(() => {
    setloader(true)
  }, 4000)

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      asteroidMaterial &&
      asteroidGeometry &&
      marsMesh &&
      jupiterMesh &&
      sunMesh &&
      earthMesh &&
      saturnMesh &&
      loader === true
    ) {
      const width = window.innerWidth
      const height = window.innerHeight
      const canvas = document.createElement("canvas")
      canvas.height = height
      canvas.width = width

      const world = new CANNON.World({
        gravity: new CANNON.Vec3(0, 0, 0),
      })
      const timeStamp = 1 / 60

      const scene = new THREE.Scene()
      const group = new THREE.Group()
      const textureLoader = new THREE.TextureLoader()

      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
      const renderer = new THREE.WebGLRenderer()
      renderer.setSize(width, height)
      camera.position.z = -40
      // set(cam_posx, cam_posy, cam_posz)

      document.body.appendChild(renderer.domElement)

      // const LatheGeometry = new THREE.BoxGeometry(5, 1, 1)
      // const Lathematerial = new THREE.MeshStandardMaterial({
      //   // wireframe: true,
      //   // emissive: "red",
      //   // emissiveIntensity: 1,
      //   // color: "red",
      // })
      const controls = new OrbitControls(camera, renderer.domElement)

      const pointLight = new THREE.PointLight(0xff09107, 1, 0, 0)
      const pointLightStar = new THREE.PointLight("cyan", 15, 10, 0)

      const ambientLight = new THREE.AmbientLight("white", 1)

      // scene.background = new THREE.Color().setHSL(
      //   0.821,
      //   0.9,
      //   0.05,
      //   THREE.SRGBColorSpace
      // )
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

      // const lathe = new THREE.Mesh(LatheGeometry, Lathematerial)
      const time = new THREE.Clock()
      // lathe.add(pointLightStar)
      // lathe.add(pointLight)
      // scene.add(pointLight)
      // let saturn = earthMesh.clone()

      const ref = []
      // const astroRef = []

      function addAsteroid(index, radius) {
        let angle = (index / 40) * Math.PI * 2 // Calculate angle in radians
        let x = Math.sin(angle) * radius // X position based on angle and radius
        let z = Math.cos(angle) * radius // Z position based on angle and radius

        const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial)
        asteroid.position.x = x
        asteroid.position.y = 0
        asteroid.position.z = z

        function updateAstro() {
          ref.map((elementR) => {
            elementR.position.z +=
              Math.cos(time.getElapsedTime() * (Math.random() * 10)) / 100
            elementR.position.x +=
              Math.sin(time.getElapsedTime() * (Math.random() * 10)) / 100
          })
        }

        return { asteroid, updateAstro }
      }

      for (let index = 0; index < 4000; index++) {
        const elementinner = addAsteroid(index, 20).asteroid
        const elementOuter = addAsteroid(index, 22).asteroid

        ref.push(elementinner)
        ref.push(elementOuter)
        saturnMesh?.add(elementinner, elementOuter)
      }
      ////////////////////////////////////

      let projectile = []

      let projectileRef = []

      for (let index = 0; index < 500; index++) {
        const singleProjectile = new THREE.Mesh(
          asteroidGeometry,
          asteroidMaterial
        )
        const singleProjectileBody = new CANNON.Body({
          shape: new CANNON.Sphere(0.1),
          mass: 0.02,
          position: new CANNON.Vec3(
            THREE.MathUtils.randFloatSpread(width / 50),
            THREE.MathUtils.randFloatSpread(height / 10),

            THREE.MathUtils.randFloatSpread(10)
          ),
        })

        // asteroidBody.linearDamping = 0.4
        projectileRef.push(singleProjectile)
        projectile.push(singleProjectileBody)
        // group.add(singleProjectile)
        world.addBody(singleProjectileBody)
      }

      //
      // const update = () => {
      //   for (let index = 0; index < 500; index++) {
      //     projectile[index].position.x -= 0.5
      //     projectile[index].position.z += 0.5

      //     if (projectile[index].position.x < -50) {
      //       projectile[index].position.z = THREE.MathUtils.randFloatSpread(10)
      //       projectile[index].position.y = THREE.MathUtils.randFloatSpread(
      //         height / 10
      //       )
      //       projectile[index].position.x = THREE.MathUtils.randFloatSpread(
      //         width / 50
      //       )
      //     }
      //   }
      // }

      ////////////////////////////////
      // group.add(lathe)
      // earthMesh.add(pointLight)
      // if (earthMaterial && earthGeometry && earthMesh) {
      const saturnBody = new CANNON.Body({
        shape: new CANNON.Sphere(5),
        mass: 1,
        // position: new CANNON.Vec3(70, 0, 50),
        // type: CANNON.Body.KINEMATIC,
      })
      if (
        asteroidMaterial &&
        asteroidGeometry &&
        marsMesh &&
        jupiterMesh &&
        sunMesh &&
        earthMesh &&
        saturnMesh
      ) {
        group.add(saturnMesh)
        group.add(jupiterMesh)
        group.add(sunMesh)
        group.add(marsMesh)
        group.add(earthMesh)
        world.addBody(saturnBody)
        marsMesh.position.set(-200, 0, -15)
        sunMesh.position.set(0, 0, 4)
        earthMesh?.position.set(100, 0, 0)
        saturnBody.position.set(200, 0, 50)
      }
      ambientLight.position.set(-25, 0, 0)
      // group.children[0].add(ambientLight)
      group.add(ambientLight)
      const timeLine = gsap.timeline()

      /////////////////// ship render

      const loader = new GLTFLoader()
      let model
      const directional = new THREE.DirectionalLight(0xeb9c50, 10)
      const directionalZ = new THREE.DirectionalLight(0xeb9c50, 2)

      loader.load("./model/spaceShip/scene.gltf", (gltf) => {
        model = gltf.scene
        model.add(directional)
        model.add(directionalZ)

        directional.position.set(300, 200, 0)
        directionalZ.position.set(0, 0, -200)
        model.position.x = 600
        model.scale.set(0.02, 0.02, 0.02)
        group.add(model)
        timeLine
          .to(model.rotation, {
            y: 3.2,
            delay: 2,
            duration: 3.0,
          })
          .to(camera.position, {
            y: 40,
            // delay: 2,
            duration: 4.0,
          })
          .to(camera.position, {
            y: 10,
            x: 610,
            z: 1,
            // delay: 2,
            duration: 4.0,
          })
          .add("start")
          .to(
            model.position,
            {
              x: 40,
              duration: 15.0,
            },
            "start"
          )
          .to(
            camera.position,
            {
              x: 70,
              duration: 20.0,
            },
            "start"
          )
      })

      /////////////////// ship render

      // const axisHelper = new THREE.AxesHelper(200)

      // scene.add(axisHelper)

      scene.add(group)

      const sunMovement = (time) => {
        sunMesh.rotation.y += 0.0005

        sunMaterial.uniforms.time.value = time * 0.005
        saturnBody.angularVelocity.y += 0.00005
        earthMesh.rotation.y += 0.01
        marsMesh.rotation.y += 0.01
        jupiterMesh.rotation.y += 0.01
      }

      const camControlls = () => {
        timeLine.to(camera.position, {
          x: 650,
          z: -50,
          duration: 2,
          onUpdate: () => camera.lookAt(sunMesh.position),
        })
        // .to(camera.position, {
        //   x: mars.position.x - 4,
        //   duration: 4,
        //   onUpdate: () => camera.lookAt(mars.position),
        // })
        // .to(camera.position, {
        //   z: mars.position.z,
        //   duration: 4,
        //   onUpdate: () => camera.lookAt(mars.position),
        // })
        // .to(camera.position, {
        //   z: 16,
        //   duration: 4,
        //   onUpdate: () => camera.lookAt(saturnBody.position),
        // })
      }
      controls.enableDamping = true
      controls.dampingFactor = 0.009
      // camControllShip()
      camControlls()

      //      quaternions rotation
      const quaternion = new CANNON.Quaternion()
      quaternion.setFromAxisAngle(new CANNON.Vec3(0, -1, 0), 0.0008)

      const position = new CANNON.Vec3(1, 0, 0)
      const rotatedPosition = new CANNON.Vec3()
      quaternion.vmult(position, rotatedPosition)

      function rotateAroundAxis() {
        const quaternionO = new THREE.Quaternion().setFromAxisAngle(
          new THREE.Vector3(0, -1, 0).normalize(),
          0.0008
        )

        earthMesh.position.applyQuaternion(quaternionO)
        marsMesh.position.applyQuaternion(quaternionO)
        jupiterMesh.position.applyQuaternion(quaternionO)
      }
      //     quaternions rotation

      const animate = (time) => {
        requestAnimationFrame(animate)

        sunMovement(time)
        world.step(timeStamp)
        saturnMesh.position.copy(saturnBody.position)
        saturnMesh.quaternion.copy(saturnBody.quaternion)
        quaternion.vmult(saturnBody.position, saturnBody.position) // Apply the rotation

        for (let index = 0; index < 100; index++) {
          projectileRef[index].position.copy(projectile[index].position)
          projectileRef[index].quaternion.copy(projectile[index].quaternion)
        }
        rotateAroundAxis()
        addAsteroid().updateAstro()
        controls.update()
        renderer.render(scene, camera)
      }

      animate()
    }
  }, [loader])
  return (
    loader === false && (
      <h1 className="bg-gray-700 w-full h-screen text-white flex justify-center pt-52  text-4xl ">
        loading.... assets
      </h1>
    )
  )
}

export default SolarSystemModule
