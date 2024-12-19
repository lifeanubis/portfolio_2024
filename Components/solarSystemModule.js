"use client"

import { OrbitControls } from "three/addons/controls/OrbitControls.js"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

import { earthMesh } from "./earthScene"
import { marsMesh } from "./marsScene"
import { jupiterMesh } from "./jupiterScene"

import { saturnMesh, asteroidGeometry, asteroidMaterial } from "./saturnScene"

import { sunMesh, sunMaterial } from "./sunScene"
import {
  portalGeometry,
  portalMaterial,
  portalMesh,
  innerPortalMesh,
  innerPortalMaterial,
} from "./portalScene"

import * as CANNON from "cannon-es"

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"
import gsap from "gsap"
import { useRouter } from "next/navigation"
import GlobalLoader from "@/Components/globalLoader"

const SolarSystemModule = () => {
  // const [loader, setloader] = useState(false)
  const [prompt, setPrompt] = useState(false)
  const [modalLoaded, setModalLoaded] = useState(false)

  const router = useRouter()
  const rendererRef = useRef(null)
  const animationIdRef = useRef(null)
  let scene, group, canvas, renderer
  const audioRef = useRef(null)

  // setTimeout(() => {
  //   setloader(true)
  // }, 4000)
  const threeUi = () => {
    if (
      typeof window !== "undefined" &&
      asteroidMaterial &&
      asteroidGeometry &&
      marsMesh &&
      jupiterMesh &&
      sunMesh &&
      earthMesh &&
      saturnMesh &&
      portalMesh
    ) {
      const width = window.innerWidth
      const height = window.innerHeight
      canvas = document.createElement("canvas")
      canvas.height = height
      canvas.width = width

      const world = new CANNON.World({
        gravity: new CANNON.Vec3(0, 0, 0),
      })
      const timeStamp = 1 / 60

      scene = new THREE.Scene()
      group = new THREE.Group()
      const textureLoader = new THREE.TextureLoader()

      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
      renderer = new THREE.WebGLRenderer()
      renderer.setSize(width, height)
      camera.position.z = -40
      rendererRef.current = renderer

      document.body.appendChild(renderer.domElement)

      const controls = new OrbitControls(camera, renderer.domElement)

      const ambientLight = new THREE.AmbientLight("white", 1)

      textureLoader.load(
        "./model/galaxy/galaxy_texture.jpg",
        function name(texture) {
          scene.background = texture
          scene.environment = texture
        }
      )

      const time = new THREE.Clock()

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
        saturnMesh &&
        portalMesh &&
        innerPortalMesh
      ) {
        group.add(saturnMesh)
        group.add(jupiterMesh)
        group.add(sunMesh)
        group.add(marsMesh)
        group.add(earthMesh)
        group.add(portalMesh)
        group.add(innerPortalMesh)

        world.addBody(saturnBody)
        marsMesh.position.set(-300, 0, -15)
        sunMesh.position.set(0, 0, 4)
        portalMesh.position.set(-300, 0, 4)
        portalMesh.rotation.set(0, -Math.PI / 2, 0)

        innerPortalMesh.position.set(-300, 0, 4)
        innerPortalMesh.rotation.set(0, -Math.PI / 2, 0)

        earthMesh?.position.set(500, 0, 0)
        saturnBody.position.set(700, 0, 50)
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

      loader.load(
        "./model/spaceShip/scene.gltf",
        (gltf) => {
          model = gltf.scene
          model.add(directional)
          model.add(directionalZ)

          directional.position.set(300, 200, 0)
          directionalZ.position.set(0, 0, -200)
          model.position.x = 600
          model.scale.set(0.04, 0.04, 0.04)
          group.add(model)
          timeLine
            .to(model.rotation, {
              y: 3.2,
              delay: 1,
              duration: 1.0,
            })
            .to(camera.position, {
              y: 40,
              duration: 2.0,
            })
            .to(camera.position, {
              y: 10,
              x: 610,
              z: 1,
              duration: 2.0,
            })
            .add("start")
            .to(
              model.position,
              {
                x: -110,
                duration: 5.0,
              },
              "start"
            )
            .to(
              camera.position,
              {
                x: 50,
                duration: 7.0,
              },
              "start"
            )
            .to(camera.position, {
              x: 0,
              y: 60,
              z: 270,
              duration: 5.0,
            })
        },
        (xhr) => {
          // Progress callback
          if (xhr.loaded) {
            setModalLoaded(true)
          }
          // console.log(`Model loading progress: ${}`)
        },
        (error) => {
          // Error callback
          console.error("An error occurred while loading the model:", error)
        }
      )

      const shipper = () => {
        if (model.position) {
          gsap.to(model.position, {
            x: model.position.x - 20.0,
            duration: 1,
          })
        }
      }

      const shipperBack = () => {
        if (model.position) {
          gsap.to(model.position, {
            x: model.position.x + 20.0,
            duration: 1,
          })
        }
      }
      /////////////////// ship render
      document.addEventListener("keydown", (event) => {
        switch (event.key) {
          case "ArrowUp":
            shipper()
            // Move cube forward
            break
          case "ArrowDown":
            shipperBack()
            break
        }
      })

      // const axisHelper = new THREE.AxesHelper(200)

      // scene.add(axisHelper)

      scene.add(group)

      const sunMovement = (time) => {
        sunMesh.rotation.y += 0.0005

        sunMaterial.uniforms.time.value = time * 0.005
        portalMaterial.uniforms.uTime.value = time * 0.005
        innerPortalMaterial.uniforms.uTime.value = time * 0.000005

        saturnBody.angularVelocity.y += 0.0005
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
        animationIdRef.current = requestAnimationFrame(animate)

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
        if (
          model &&
          model.position.x !== undefined &&
          model.position.x <= -185
        ) {
          router.push("/projects")
        }
      }
      animate()
    }
  }

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
      portalMesh
    ) {
      router.prefetch("/projects")

      threeUi()
      return () => {
        cancelAnimationFrame(animationIdRef.current) // Stop animation

        renderer?.dispose() // Dispose renderer
        if (document.body) {
          document.body.removeChild(renderer?.domElement) // Remove canvas
        }
        console.log("Three.js scene cleaned up.")
      }
    }
  }, [modalLoaded])
  let playTimeout
  const playAudioSnippet = (start, end) => {
    if (audioRef.current) {
      audioRef.current.currentTime = start // Set the start time
      audioRef.current.play()

      // Calculate duration and stop playback
      const duration = (end - start) * 1000 // Convert seconds to milliseconds
      playTimeout = setTimeout(() => {
        audioRef.current.pause()
      }, duration)
    }
  }
  useEffect(() => {
    playAudioSnippet(1, 20)
  }, [modalLoaded])

  setTimeout(() => {
    setPrompt(true)
  }, 10000)

  if (!modalLoaded || !sunMesh) {
    return (
      <div className="grid grid-cols-1  bg-black text-white h-screen w-full place-content-center items-center place-items-center">
        <GlobalLoader />
      </div>
    )
  }

  if (modalLoaded === true) {
    return (
      <>
        <audio ref={audioRef} autoPlay loop>
          <source src="/sounds/space.mp3" type="audio/mp3" />
        </audio>
        <div className="absolute top-20 left-0 ">
          {prompt && (
            <button
              // style={{
              //   background:
              //     "linear-gradient(90deg, #FDBB2D 0%, #22C1C3 100%)",
              // }}
              className="p-3 text-xs rounded-full text-white animate-pulse hover:scale-75 font-bold duration-1000"
              onClick={() => router.push("/projects")}
            >
              {" "}
              hold <br /> {`"UP ARROW"`} <br /> to enter portal
              <br />
              or {`"click here"`}
            </button>
          )}
        </div>

        <div className="absolute top-20 right-0 ">
          <div className="text-sm   right-0 w-full  flex gap-10  justify-end">
            <button
              style={{
                background: "linear-gradient(90deg, #FDBB2D 0%, #22C1C3 100%)",
              }}
              className="p-3 rounded-full text-black hover:scale-75 font-bold duration-300  "
              onClick={() => audioRef.current.play()}
            >
              Play audio
            </button>
            <button
              style={{
                background: "linear-gradient(90deg, #FDBB2D 0%, #22C1C3 100%)",
              }}
              className="p-3 rounded-full text-black hover:scale-75 font-bold duration-300  "
              onClick={() => audioRef.current.pause()}
            >
              Stop Audio
            </button>
          </div>
        </div>
      </>
    )
  }
}

export default SolarSystemModule
