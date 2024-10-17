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

const ShaderdModel = () => {
  const [alterText, setAlterText] = useState("")
  const [value, setValue] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const vertexShaderOne = `
  
precision mediump float;

void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

`
      const vertexShaderTwo = `
uniform float timeR;

void main() {
  float wave = sin(position.x * 5.0 + timeR) * 0.2;

  vec3 newPosition = vec3(position.x, position.y + wave, position.z);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}

`

      const fragmentShaderOne = `
  precision mediump float;
    
  uniform float time;

    void main() {
        vec3 color = vec3(
            sin(time * 2.0),         // Red channel
            sin(time * 2.0 + 2.0),   // Green channel
            sin(time * 2.0 + 4.0)    // Blue channel
        );

        // Adjust the sine wave range from [-1.0, 1.0] to [0.0, 1.0]
        color = (color + 1.0) * 0.5;

        gl_FragColor = vec4(color, 1.0);  // Set the color and full opacity
    }
`
      // scene.rotation
      const vertexShaderThree = `
precision mediump float;
uniform float time;
varying vec2 vUv;

void main() {
    float wave = sin(position.x * 1.0  + time  ) * 0.1;  
    vec3 newPosition = vec3( position.x + wave , position.y + wave   ,  position.z);  

    vUv = uv;  

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`

      // Fragment shader that samples the texture
      const fragmentShaderThree = `
precision mediump float;

uniform sampler2D texture1; 
varying vec2 vUv;          
void main() {
    vec4 texColor = texture(texture1, vUv); 
    gl_FragColor = vec4(texColor);
}

`
      const vertexShader = `
    precision mediump float;
    uniform float time;
    varying vec2 vUv;

    float rand(vec2 co) {
        return fract(sin(dot(co.xy ,vec2(0.200,2.2))) * 700.0);
    }

    void main() {
        float noise = rand(position.xx + time / 10.50 * 0.002) * 0.09 ;

        float wave = sin(position.x * 0.1 + time) * 0.4 + noise * 0.001 ;

        vec3 newPosition = vec3(position.x - noise / 7.5 , position.y - noise / 15.5   , position.z + noise / 5.5  );

        vUv = uv;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
`

      // Fragment shader with texture distortion and noise
      const fragmentShader = `
    precision mediump float;
    uniform sampler2D texture1;
    uniform float time;
    varying vec2 vUv;

    float rand(vec2 co) {
        return fract(sin(dot(co.xy ,vec2(20.9898,7.233))) * -40.5453);
    }

    void main() {
        float noise = rand(vUv + time * 0.93) * 0.0007;

        vec2 noisyUv = vUv + vec2(noise, noise);

        vec4 texColor = texture(texture1, noisyUv);

        gl_FragColor = texColor;
    }
`

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

      const ambient = new THREE.AmbientLight("white", 2)
      scene.add(ambient)

      const textureLoader = new THREE.TextureLoader()
      let sunGeometry, sunMaterial

      textureLoader.load("./model/sun/sun_texture.jpg", (texture) => {
        sunGeometry = new THREE.IcosahedronGeometry(2, 50)
        sunMaterial = new THREE.ShaderMaterial({
          // wireframe: true,
          wireframeLinewidth: 0.5,
          // vertexColors: true,
          // vertexShader: vertexShader,
          vertexShader: vertexShader,
          fragmentShader: fragmentShader,
          uniforms: {
            time: { value: 0.0 },
            // timeR: { value: 0.0 },
            texture1: { value: texture },

            // Initialize the time uniform
            // color: { value: new THREE.Vector4(1.0, 0.5, 1.0, 1.0) }, // Green color
          },
        })

        // texture.colorSpace = THREE.SRGBColorSpace
        // texture.wrapS = texture.wrapT = THREE.WrapAroundEnding

        let sunMesh = new THREE.Mesh(sunGeometry, sunMaterial)
        // sunMesh.position.set(0, -1, -1)
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

      let posZ = 0

      const cameraRotate = () => {
        // let posX = Math.sin(clock.getElapsedTime()) * Math.PI * 0.2
        // let posY = Math.sin(clock.getElapsedTime()) * Math.PI * 0.2
        // group.rotation.x = posZ += 0.001
        // group.rotation.y = posZ += 0.001
        // camera.lookAt(planeMesh)
        // console.log(posZ, "----")
        // group.children[1].rotation.x = posZ += 0.01
        // console.log(group.children[0], "----------------")
        group.children[0].rotation.y = posZ += 0.0005
      }
      const controls = new OrbitControls(camera, renderer.domElement)

      const animate = (time) => {
        requestAnimationFrame(animate)
        if (sunMaterial && sunGeometry) {
          cameraRotate()
          sunMaterial.uniforms.time.value = time * 0.005 // Time in seconds
          // sunMaterial.uniforms.timeR.value = time * 0.001 // Time in seconds
        }
        // for (let i = 0; i < group.children.length; i++) {
        //   const child = group.children[i]
        //   child.rotation.y += 0.005
        // }

        controls.update()
        renderer.render(scene, camera)
      }

      animate()
    }
  }, [])

  return <div className="bg-red-800 absolute top-52   "></div>
}

export default ShaderdModel
