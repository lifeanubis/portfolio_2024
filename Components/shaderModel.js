"use client"

// import { Box, OrbitControls } from "@react-three/drei"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"

import { useEffect } from "react"
import * as THREE from "three"

// import spotlightAud from ""

const ShaderdModel = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
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

        controls.update()
        renderer.render(scene, camera)
      }

      animate()
    }
  }, [])

  return <div className="bg-red-800 absolute top-52   "></div>
}

export default ShaderdModel
