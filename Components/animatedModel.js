"use client"

// import { Box, OrbitControls } from "@react-three/drei"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"

import { useEffect } from "react"
import * as THREE from "three"

// import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js"
// import { RenderPass } from "three/addons/postprocessing/RenderPass.js"
// import { GlitchPass } from "three/addons/postprocessing/GlitchPass.js"
// import { OutputPass } from "three/addons/postprocessing/OutputPass.js"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"
// import ParticleModule from "./particleModule"

// import spotlightAud from ""

const AnimatedModel = () => {
  // const [alterText, setAlterText] = useState("")
  // const [value, setValue] = useState(false)

  //

  //

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
      //   const camera = new THREE.OrthographicCamera(0.05, 10, 10, -0.5, 0.1)
      camera.position.z = 4
      const renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(width, height)
      document.body.appendChild(renderer.domElement)

      // lightings

      // let particleLight = new THREE.Mesh(
      //   new THREE.SphereGeometry(0.4, 8, 8),
      //   new THREE.MeshBasicMaterial({ color: 0xffffff })
      // )
      // scene.add(particleLight)

      const ambient = new THREE.AmbientLight(0xffffff, 2)
      //   const ambientLight = new THREE.AmbientLight("red", 5)
      scene.add(ambient)
      // lightings
      // planet texttures

      //   const texture = new THREE.TextureLoader().load(
      //     "./model/sun/sun_texture.png"
      //   )

      const textureLoader = new THREE.TextureLoader()
      let sunMesh
      // load a resource
      textureLoader.load("./model/sun/sun_texture.jpg", function name(texture) {
        const sunGeometry = new THREE.IcosahedronGeometry(1, 50)
        const sunMaterial = new THREE.MeshStandardMaterial({
          map: texture,
        })

        texture.colorSpace = THREE.SRGBColorSpace
        texture.wrapS = texture.wrapT = THREE.WrapAroundEnding

        sunMesh = new THREE.Mesh(sunGeometry, sunMaterial)
        sunMesh.position.set(0, -1, 10)

        group.add(sunMesh)
      })

      textureLoader.load(
        "./model/galaxy/galaxy_texture.jpg",
        function name(texture) {
          scene.background = texture
          scene.environment = texture
        }
      )
      // plane
      const planeGeometry = new THREE.PlaneGeometry(10, 2, 2, 2)
      const planeMaterial = new THREE.MeshStandardMaterial()
      const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
      planeMesh.rotation.set(-1, 0, 0)
      planeMesh.position.set(0, -1, 0)

      //   planeMesh.add(pointLightBox)

      group.add(planeMesh)

      let mixer

      const controls = new OrbitControls(camera, renderer.domElement)

      const loader = new GLTFLoader()
      let model
      loader.load("./model/robot/source/robot.gltf", (gltf) => {
        model = gltf.scene
        group.add(model)
        mixer = new THREE.AnimationMixer(model)
        model.scale.set(0.2, 0.2, 0.2)
        model.position.y = -1
        const clips = gltf.animations

        model.rotation.y = Math.PI

        let currentAction = mixer.clipAction(clips[0])
        currentAction.play()

        currentAction = mixer.clipAction(clips[0])
        currentAction.setLoop(THREE.LoopOnce) // Play once, not in a loop
        // currentAction.clampWhenFinished = true // Stop at the last frame when finished
        currentAction.play()

        // Listen for the "finished" event on the mixer
        mixer.addEventListener("finished", () => {
          // Find the next animation
          const currentIndex = clips.indexOf(currentAction.getClip())
          const nextIndex = (currentIndex + 1) % clips.length // Cycle through the animations

          // Play the next animation
          currentAction = mixer.clipAction(clips[nextIndex])
          currentAction.reset() // Reset the action to its starting state
          currentAction.setLoop(THREE.LoopOnce) // Play once
          //   currentAction.clampWhenFinished = true // Stop at the last frame when finished
          //   currentAction.play()
        })
      })
      const clock = new THREE.Clock()

      // const audioLoader = new THREE.AudioLoader()
      // const listener = new THREE.AudioListener()
      // const sound = new THREE.Audio(listener)
      // camera.add(listener)

      //   group.add(lightHelper, lightHelperG)
      window.addEventListener("resize", () => {
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)
      })

      scene.add(group)
      let posZ = 1

      const cameraRotate = () => {
        // let posX = Math.sin(clock.getElapsedTime()) * Math.PI * 0.2
        // let posY = Math.sin(clock.getElapsedTime()) * Math.PI * 0.2
        // group.rotation.x = posZ += 0.001
        // group.rotation.y = posZ += 0.001
        // camera.lookAt(planeMesh)
        // console.log(posZ, "----")

        // group.children[1].rotation.x = posZ += 0.01
        group.children[1].rotation.y = posZ += 0.001

        if (posZ <= 3) {
          group.rotation.y = posZ += 0.01
        }

        if (posZ >= 3 && group.position.z <= 10) {
          group.position.z = posZ += 0.01
        }
      }

      const animate = () => {
        requestAnimationFrame(animate)

        for (let i = 0; i < group.children.length; i++) {
          const child = group.children[i]
          child.rotation.y += 0.005
        }
        if (mixer) {
          mixer.update(clock.getDelta())
          cameraRotate()
        }
        controls.update()
        renderer.render(scene, camera)
      }

      animate()
    }
  }, [])

  return <div className="bg-red-800 absolute top-52   "></div>
}

export default AnimatedModel
