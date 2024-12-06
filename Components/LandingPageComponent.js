import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"

import gsap from "gsap"

import { useRouter } from "next/navigation"

const LandingPageComponent = () => {
  const rendererRef = useRef(null)
  const animationIdRef = useRef(null)
  let scene, group, canvas, renderer

  const threeUi = () => {
    if (typeof window !== "undefined") {
      //   container = containerRef.current

      const width = window.innerWidth
      const height = window.innerHeight
      canvas = document.createElement("canvas")
      canvas.height = height
      canvas.width = width

      scene = new THREE.Scene()
      group = new THREE.Group()
      const loader = new GLTFLoader()
      // const directional = new THREE.DirectionalLight(0xeb9c50, 20)

      const directional = new THREE.DirectionalLight(0xeb9c50, 5)
      const directionalZ = new THREE.DirectionalLight(0xeb9c50, 20)
      const timeLine = gsap.timeline()

      loader.load(
        "./model/spaceShip/scene.gltf", // Path to the GLB file
        (gltf) => {
          const model = gltf.scene
          group.add(model)

          // Optional: Position, scale, and rotate the model
          model.position.set(-30, 0, -10)
          model.scale.set(0.02, 0.02, 0.02)
          //   model.rotation.y = Math.PI / 4
          directional.position.set(5, 5, 10)
          directionalZ.position.set(-5, -5, -10)

          model.add(directional)
          model.add(directionalZ)
          timeLine.to(model.position, {
            x: 20,
            duration: 15.0,
          })
        },
        (xhr) => {
          // Progress callback
          console.log(
            `Model loading progress: ${(xhr.loaded / xhr.total) * 100}%`
          )
        },
        (error) => {
          // Error callback
          console.error("An error occurred while loading the model:", error)
        }
      )
      scene.add(group)
      // Camera
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
      renderer = new THREE.WebGLRenderer()
      renderer.setSize(width, height)
      camera.position.z = 1

      rendererRef.current = renderer

      document.body.appendChild(renderer.domElement)

      const textureLoader = new THREE.TextureLoader()

      textureLoader.load(
        "./model/galaxy/galaxy_texture.jpg",
        function name(texture) {
          scene.background = texture
          scene.environment = texture
        }
      )

      const axisHelper = new THREE.AxesHelper(200)

      const animate = () => {
        animationIdRef.current = requestAnimationFrame(animate)
        renderer.render(scene, camera)
      }

      animate()
    }
  }
  const audioRef = useRef(null)

  const [alterText, setAlterText] = useState("")
  const [startShow, setStartShow] = useState(null)

  const router = useRouter()

  const scramble = (textArg) => {
    const tempString = textArg?.split("")
    setTimeout(() => {
      tempString?.map((item, index) => {
        setTimeout(() => {
          tempString[index] = Math.floor(Math.random() * 10).toString()
          setAlterText(tempString?.join(""))
          setTimeout(() => {
            tempString[index] = item
            setAlterText(tempString?.join(""))
          }, 75)
        }, (index + 1) * 150)
      })
    }, 75)
  }
  useEffect(() => {
    if (typeof window !== "undefined" && startShow !== null) {
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
  }, [startShow])

  useEffect(() => {
    if (startShow !== null) {
      router.prefetch("/")
      scramble("hello there fellow voyager")
      setTimeout(() => {
        scramble("lets begin our journey")
      }, 7000)
      setTimeout(() => {
        scramble("buckle up")
      }, 12000)
      setTimeout(() => {
        router.push("/")
      }, 15000)
      return () => {
        scramble("")
        setStartShow(false)
      }
    }
  }, [startShow])

  let playTimeout
  const playAudioSnippet = (start, end) => {
    if (audioRef.current && startShow === true) {
      audioRef.current.currentTime = start
      audioRef.current.play()

      const duration = (end - start) * 1000
      playTimeout = setTimeout(() => {
        audioRef.current.pause()
      }, duration)
    }
  }
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      clearTimeout(playTimeout)
    }
  }
  useEffect(() => {
    playAudioSnippet(1, 20)
  }, [startShow])

  if (startShow === null) {
    return (
      <div className="absolute overflow-hidden  w-screen h-screen  bg-[url('/model/galaxy/galaxy_texture.jpg')] bg-cover bg-center ">
        <div>
          <img
            src="./model/spaceMan/hero_image.png"
            width={800}
            height={800}
            alt="asdasd"
            className="absolute overflow-y-hidden  -left-44 w-[33vw] h-screen  scale-150   "
          />
        </div>
        <div className="text-center mt-10 place-self-center gap-10 text-white font-bold  grid grid-cols-1">
          <div className="w-full  btn-glow-yes  rounded-lg  ">
            <h1 className="">Do you want to play audio?</h1>
          </div>
          <div className="w-full h-full ">
            <button
              className="btn-glow-yes"
              onClick={() => {
                setStartShow(true)
              }}
            >
              YES
            </button>
            <audio ref={audioRef}>
              <source src="/sounds/typing.mp3" type="audio/mp3" />
            </audio>
          </div>
          <div className="w-full h-full ">
            <button className="btn-glow-no" onClick={() => setStartShow(false)}>
              NO{" "}
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (startShow !== null) {
    return (
      <div className=" absolute w-screen h-screen  overflow-hidden ">
        <img
          src="./model/spaceMan/hero_image.png"
          width={800}
          height={800}
          alt="asdasd"
          className=" absolute  -left-44 w-[33vw] h-screen  scale-150   "
        />
        <div className="w-full  grid grid-cols-1  text-white p-5 ">
          <div>
            {/* <div class="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"> */}

            <h1 className="text-4xl tracking-widest  leading-10 glow-text font-bold  w-full h-full flex justify-end">
              {/* <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-400 via-white to-blue-500 bg-clip-text text-transparent w-full h-full flex justify-end"> */}
              {alterText}
            </h1>
          </div>

          <audio ref={audioRef}>
            <source src="/sounds/typing.mp3" type="audio/mp3" />
          </audio>
          <div className="text-lg font text-white right-0 w-full  flex gap-10 mt-16 justify-end">
            <button
              className="btn-glow-yes"
              onClick={() => playAudioSnippet(1, 12)}
            >
              Play audio
            </button>
            <button className="btn-glow-no" onClick={() => stopAudio()}>
              Stop Audio
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default LandingPageComponent
