"use client"

import { OrbitControls } from "three/addons/controls/OrbitControls.js"

import { useEffect } from "react"
import * as THREE from "three"
import { latheR } from "./textExport"
import { earthMesh, earthMaterial, earthGeometry } from "./earthScene"
import {
  saturnMesh,
  saturnMaterial,
  saturnGeometry,
  asteroidMesh,
  asteroidGeometry,
  asteroidMaterial,
} from "./saturnScene"
import * as CANNON from "cannon-es"

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"
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
      // camera.position.z = -40
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

      const pointLight = new THREE.PointLight(0xff09107, 1, 0, 0)
      const pointLightStar = new THREE.PointLight("cyan", 15, 10, 0)
      const starLight = new THREE.PointLight("green", 15, 10, 0)

      const ambientLight = new THREE.AmbientLight("white", 1)

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
      // let saturn = earthMesh.clone()

      group.add(mars)
      group.add(saturnMesh)
      const ref = []
      const astroRef = []

      function addAsteroid(index, radius) {
        let angle = (index / 40) * Math.PI * 2 // Calculate angle in radians
        let x = Math.sin(angle) * radius // X position based on angle and radius
        let y = Math.cos(angle) * radius // Keeping it on the XZ plane, so Y is 0
        let z = Math.cos(angle) * radius // Z position based on angle and radius

        const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial)
        asteroid.position.x = x
        asteroid.position.y = 0
        asteroid.position.z = z

        function updateAstro() {
          ref.map((elementR, indexx) => {
            elementR.position.z +=
              Math.cos(time.getElapsedTime() * (Math.random() * 10)) / 100
            elementR.position.x +=
              Math.sin(time.getElapsedTime() * (Math.random() * 10)) / 100
          })
        }

        return { asteroid, updateAstro }
      }

      for (let index = 0; index < 400; index++) {
        const elementinner = addAsteroid(index, 7).asteroid
        const elementOuter = addAsteroid(index, 10).asteroid

        ref.push(elementinner)
        ref.push(elementOuter)
        saturnMesh.add(elementinner, elementOuter)
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
      // console.log(model, mixer, "======")

      //
      const update = () => {
        for (let index = 0; index < 500; index++) {
          projectile[index].position.x -= 0.5
          projectile[index].position.z += 0.5

          if (projectile[index].position.x < -50) {
            projectile[index].position.z = THREE.MathUtils.randFloatSpread(10)
            projectile[index].position.y = THREE.MathUtils.randFloatSpread(
              height / 10
            )
            projectile[index].position.x = THREE.MathUtils.randFloatSpread(
              width / 50
            )
          }
        }
      }

      ////////////////////////////////
      group.add(lathe)
      // earthMesh.add(pointLight)
      // if (earthMaterial && earthGeometry && earthMesh) {
      group.add(sunMesh)
      group.add(earthMesh)
      lathe.position.set(0, 0, 0)

      mars.position.set(-25, 0, -15)
      saturnMesh.position.set(-25, 0, 15)

      const saturnBody = new CANNON.Body({
        shape: new CANNON.Sphere(5),
        mass: 100,
        position: new CANNON.Vec3(-25, 0, 15),
        type: CANNON.Body.DYNAMIC,
      })

      world.addBody(saturnBody)

      ambientLight.position.set(-25, 0, 0)
      // group.children[0].add(ambientLight)
      group.add(ambientLight)

      sunMesh.position.set(0, 0, 4)
      earthMesh.position.set(-15, 0, 0)
      const timeLine = gsap.timeline()

      /////////////////// ship render

      const loader = new GLTFLoader()
      let model, mixer
      const directional = new THREE.DirectionalLight(0xeb9c50, 10)
      const directionalZ = new THREE.DirectionalLight(0xeb9c50, 2)

      loader.load("./model/spaceShip/scene.gltf", (gltf) => {
        model = gltf.scene
        model.add(directional)
        model.add(directionalZ)
        mixer = new THREE.AnimationMixer(model)

        directional.position.set(300, 200, 0)
        directionalZ.position.set(0, 0, -200)
        model.position.x = 300
        model.scale.set(0.05, 0.05, 0.05)
        group.add(model)
        timeLine
          .to(model.rotation, {
            y: 3.2,
            delay: 2,
            duration: 4.0,
          })
          .to(camera.position, {
            y: 40,
            // delay: 2,
            duration: 4.0,
          })
          .to(camera.position, {
            x: 305,
            y: 20,
            // delay: 2,
            duration: 4.0,
          })
          .add("start")
          // .to(
          //   model.position,
          //   {
          //     x: 15,
          //     duration: 14.0,
          //   },
          //   "start"
          // )
          .to(
            camera.position,
            {
              x: 15,
              duration: 14.0,
            },
            "start"
          )
      })

      /////////////////// ship render

      const axisHelper = new THREE.AxesHelper(20)

      scene.add(axisHelper)

      scene.add(group)

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
        // sunMesh.rotation.y = planetRotation += 0.0005
        sunMaterial.uniforms.time.value = time * 0.005
        saturnBody.angularVelocity.y += 0.00005

        // model.position.x += 0.01
        // saturnMesh.rotation.set(0, (planetRotation += 0.005), 0.005)
      }
      // if (mixer) {
      // model.position.z += 1
      // model.position.x += 1
      // }

      // console.log(model)

      const camControlls = () => {
        timeLine.to(camera.position, {
          x: 400,
          duration: 1.0,
        })
        // .to(camera.position, {
        //   y: 300,
        //   duration: 1.0,
        // })
        // .to(model.rotation, {
        //   y: 3,
        //   duration: 7.0,
        //   onUpdate: () => camera.lookAt(sunMesh.position),
        // })
        // .to(camera.position, {
        //   x: 300,
        //   duration: 3.0,
        //   // onUpdate: () => camera.lookAt(sunMesh.position),
        // })
        // .to(camera.position, {
        //   x: mars.position.x - 4,
        //   duration: 10.0,
        //   onUpdate: () => camera.lookAt(earthMesh.position),
        // })
        // .to(camera.position, {
        //   z: mars.position.z,
        //   duration: 10.0,
        //   onUpdate: () => camera.lookAt(mars.position),
        // })
        // .to(camera.position, {
        //   z: 16,
        //   duration: 10.0,
        //   onUpdate: () => camera.lookAt(sunMesh.position),
        // })
      }
      controls.enableDamping = true
      controls.dampingFactor = 0.009
      // camControllShip()
      camControlls()

      const animate = (time) => {
        requestAnimationFrame(animate)
        sunMovement(time)
        world.step(timeStamp)
        saturnMesh.position.copy(saturnBody.position)
        saturnMesh.quaternion.copy(saturnBody.quaternion)
        // update()
        for (let index = 0; index < 100; index++) {
          projectileRef[index].position.copy(projectile[index].position)
          projectileRef[index].quaternion.copy(projectile[index].quaternion)
        }
        lathMovement()
        addAsteroid().updateAstro()
        controls.update()
        renderer.render(scene, camera)
      }

      animate()
    }
  }, [])
}

export default SolarSystemModule
