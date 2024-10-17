"use client"

// import { Box, OrbitControls } from "@react-three/drei"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"

import { useCallback, useEffect, useState } from "react"
import * as THREE from "three"

import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js"
import { RenderPass } from "three/addons/postprocessing/RenderPass.js"
import { GlitchPass } from "three/addons/postprocessing/GlitchPass.js"
import { OutputPass } from "three/addons/postprocessing/OutputPass.js"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"
import {
  CSS2DObject,
  CSS2DRenderer,
} from "three/addons/renderers/CSS2DRenderer.js"
import ParticleModule from "./particleModule"
import { mx_fractal_noise_vec3, normalWorld, timerLocal } from "three/tsl"

// import spotlightAud from ""

const AnimatedModel = () => {
  const [alterText, setAlterText] = useState("")
  const [value, setValue] = useState(false)

  //
  const FS = /*glsl*/ `
  float PI = 3.141592653589793238;
  varying float perlin;
  
  void main() {
      gl_FragColor = vec4(perlin/2., 0., 1. - perlin/2., .2);
  }			}
  `
  const VS = /*glsl*/ `
  float PI = 3.141592653589793238;
  uniform float u_time;
  uniform float perlinFactor;
  uniform float randomFactor;
  attribute vec2 reference;
  varying float perlin;
  
  vec3 mod289(vec3 x)
  {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  
  vec4 mod289(vec4 x)
  {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  
  vec4 permute(vec4 x)
  {
    return mod289(((x*34.0)+10.0)*x);
  }
  
  vec4 taylorInvSqrt(vec4 r)
  {
    return 1.79284291400159 - 0.85373472095314 * r;
  }
  
  vec3 fade(vec3 t) {
    return t*t*t*(t*(t*6.0-15.0)+10.0);
  }
  
  // Classic Perlin noise
  float cnoise(vec3 P)
  {
    vec3 Pi0 = floor(P); // Integer part for indexing
    vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
    Pi0 = mod289(Pi0);
    Pi1 = mod289(Pi1);
    vec3 Pf0 = fract(P); // Fractional part for interpolation
    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;
  
    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);
  
    vec4 gx0 = ixy0 * (1.0 / 7.0);
    vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);
  
    vec4 gx1 = ixy1 * (1.0 / 7.0);
    vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);
  
    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
  
    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;
  
    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);
  
    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
    return 2.2 * n_xyz;
  }
  
  float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))*43758.5453123);
  }
  
  void main() {
    float rF = randomFactor;
    vec3 tweakedPos = position + vec3(random(reference.xy), random(reference.yx * vec2(3.0)), random(reference.xy * vec2(5.0))) * rF;
    vec4 mvPosition = modelViewMatrix * vec4(tweakedPos, 1.);
  
    float fF = 3.;
    perlin = cnoise(position * (perlinFactor + sin(u_time/3.0)) + vec3(sin(u_time/2.7), cos(u_time/3.6), sin(u_time/5.5)) * fF) + 1.0;
  
    gl_PointSize = smoothstep(0.6, 2.0, perlin) * 5.;
  
    gl_Position = projectionMatrix * mvPosition;
  }
  `
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

      const audioLoader = new THREE.AudioLoader()
      const listener = new THREE.AudioListener()
      const sound = new THREE.Audio(listener)
      camera.add(listener)

      //   group.add(lightHelper, lightHelperG)
      window.addEventListener("resize", () => {
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)
      })

      scene.add(group)
      let posZ = 1
      let rotZ = 1

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
