import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"

import gsap from "gsap"

import { useRouter } from "next/navigation"
import Image from "next/image"
import GlobalLoader from "@/Components/globalLoader"
const LandingPageComponent = () => {
  const rendererRef = useRef(null)
  const animationIdRef = useRef(null)
  let scene, group, canvas, renderer
  const [modalLoaded, setModalLoaded] = useState(false)

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
        }, (index + 1) * 75)
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
      }, 3500)
      setTimeout(() => {
        scramble("buckle up")
      }, 6000)
      setTimeout(() => {
        router.push("/")
      }, 9000)
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
  }, [startShow, modalLoaded])

  if (startShow === null) {
    return (
      <div className="absolute overflow-hidden  w-screen h-screen  bg-[url('/model/galaxy/galaxy_texture.jpg')] bg-cover bg-center ">
        <div>
          <Image
            src="/model/spaceMan/hero_image.png"
            width={800}
            height={800}
            alt="asdasd"
            className="absolute overflow-y-hidden  -left-44 w-[33vw] h-screen  scale-150   "
          />
        </div>
        <div className="text-center lg:text-lg text-sm mt-10 place-self-center gap-10 text-white font-bold  grid grid-cols-1">
          <div
            className="w-full  p-10  text-black/60 rounded-lg  "
            style={{
              background: "linear-gradient(90deg, #FDBB2D 0%, #22C1C3 100%)",
            }}
          >
            <h1 className="">Do you want to play audio?</h1>
          </div>
          <audio ref={audioRef}>
            <source src="/sounds/typing.mp3" type="audio/mp3" />
          </audio>
          <div className="w-full h-full ">
            <button
              style={{
                background: "linear-gradient(90deg, #FDBB2D 0%, #22C1C3 100%)",
              }}
              className="p-10 rounded-full hover:scale-75 text-black/60 duration-300"
              onClick={() => {
                setStartShow(true)
                audioRef.current.play()
              }}
            >
              YES
            </button>
          </div>
          <div className="w-full h-full ">
            <button
              style={{
                background: "linear-gradient(90deg, #FDBB2D 0%, #22C1C3 100%)",
              }}
              className="p-10 rounded-full hover:scale-75 text-black/60 duration-300  "
              onClick={() => {
                setStartShow(false)
                audioRef.current.pause()
              }}
            >
              NO{" "}
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (startShow !== null && !modalLoaded) {
    return (
      <div className="grid grid-cols-1  bg-black text-white h-screen w-full place-content-center items-center place-items-center">
        <GlobalLoader />
      </div>
    )
  }

  if (startShow !== null && modalLoaded) {
    return (
      <div className=" absolute w-screen h-screen  overflow-hidden ">
        <Image
          src="/model/spaceMan/hero_image.png"
          width={800}
          height={800}
          alt="asdasd"
          className=" absolute  -left-44 w-[33vw] h-screen  scale-150   "
        />
        <div className="w-full  grid grid-cols-1  text-white p-5 ">
          <div>
            <h1 className="lg:text-3xl text-lg tracking-widest  leading-10 bg-gradient-to-r from-white via-orange-500  to-red-500 bg-clip-text text-transparent  font-bold  w-full h-full flex justify-end">
              {alterText}
            </h1>
          </div>

          <audio ref={audioRef}>
            <source src="/sounds/typing.mp3" type="audio/mp3" />
          </audio>
          <div className="lg:text-lg text-sm font-bold text-black tracking-widest right-0 w-full  flex gap-10 mt-16 justify-end">
            <button
              style={{
                background: "linear-gradient(90deg, #FDBB2D 0%, #22C1C3 100%)",
              }}
              className="p-5 rounded-full  hover:scale-75 text-black/60 duration-300  "
              onClick={() => audioRef.current.play()}
            >
              Play audio
            </button>
            <button
              style={{
                background: "linear-gradient(90deg, #FDBB2D 0%, #22C1C3 100%)",
              }}
              className="p-5 rounded-full hover:scale-75 text-black/60 duration-300  "
              onClick={() => stopAudio()}
            >
              Stop Audio
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default LandingPageComponent
