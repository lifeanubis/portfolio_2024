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
// import { CameraControls } from "three/addons/controls/"

const CameraTestmModule = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth
      const height = window.innerHeight
      const canvas = document.createElement("canvas")
      canvas.height = height
      canvas.width = width
      let cam_posx = 0
      let cam_posy = -17
      let cam_posz = 2

      const scene = new THREE.Scene()
      const group = new THREE.Group()
      const textureLoader = new THREE.TextureLoader()

      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
      camera.position.set(cam_posx, cam_posy, cam_posz)

      const renderer = new THREE.WebGLRenderer()
      renderer.setSize(width, height)

      document.body.appendChild(renderer.domElement)

      const LatheGeometry = new THREE.BoxGeometry(5, 1, 1)
      const Lathematerial = new THREE.MeshStandardMaterial({
        // wireframe: true,
        // emissive: "red",
        // emissiveIntensity: 1,
        // color: "red",
      })

      const Box2Geometry = new THREE.BoxGeometry(1, 1, 1)
      const Box2material = new THREE.MeshStandardMaterial({
        // wireframe: true,
        // emissive: "red",
        // emissiveIntensity: 1,
        // color: "red",
      })
      const boxMesh = new THREE.Mesh(LatheGeometry, Lathematerial)

      const box2Mesh = new THREE.Mesh(Box2Geometry, Box2material)
      const controls = new OrbitControls(camera, renderer.domElement)
      boxMesh.position.set(1, 0, 2)
      const flyControls = new FlyControls(camera, renderer.domElement)

      // const CameraControl =  CameraControls(camera, renderer.domElement)
      // console.log(CameraControl, "CameraControl--------------------")

      // cameraControls.addEventListener("change", renderer) 0xff9000
      const pointLight = new THREE.PointLight(0xff09107, 15, 30, 1)
      const pointLightStar = new THREE.PointLight("cyan", 15, 10, 0)
      const starLight = new THREE.PointLight("green", 15, 10, 0)

      const hemisphere = new THREE.HemisphereLight("purple", "green", 2)
      scene.add(hemisphere)
      scene.background = new THREE.Color().setHSL(
        0.821,
        0.9,
        0.05,
        THREE.SRGBColorSpace
      )
      // const ambientLight = new THREE.AmbientLight("white", 5)
      // scene.add(ambientLight)
      // ambientLight.position.z = -12
      group.add(boxMesh)
      box2Mesh.position.set(-20, 0, 0)

      group.add(box2Mesh)

      group.add(pointLight)

      textureLoader.load(
        "./model/galaxy/galaxy_texture.jpg",
        function name(texture) {
          scene.background = texture
          scene.environment = texture
        }
      )

      const time = new THREE.Clock()
      //   const lightHelperr = new THREE.CameraHelper(camera)
      //   scene.add(lightHelperr)
      scene.add(group)
      camera.position.z = 5
      let planetRotation = 0
      let posZ = 0
      let cam_posZ = 0

      function rotateBox(time) {
        const angle = time * 0.002 // Control rotation speed
        // group.rotation.y = -angle // Rotate around the Z-axis
        // camera.lookAt(boxMesh.position)
        camera.rotation.y = angle
        // box2Mesh.position.x = angle // Rotate around the Z-axis
      }

      const timeLine = gsap.timeline()

      const camControlls = (second) => {
        timeLine
          .to(camera.position, {
            y: -4,
            duration: 2,
            onUpdate: () => camera.lookAt(boxMesh.position),
            ease: true,
          })
          .to(camera.position, {
            x: 5,
            duration: 2,
            onUpdate: () => camera.lookAt(boxMesh.position),
          })
          .to(camera.position, {
            z: 4,
            x: -15,
            duration: 4,
            // onUpdate: () => camera.lookAt(box2Mesh.position),
          })

        // timeLine.progress(1)
      }
      camControlls()

      const animate = (time) => {
        requestAnimationFrame(animate)
        renderer.render(scene, camera)

        // boxMesh.rotateZ(0.01)
        // boxMesh.rotateX(0.01)
        // if (cam_posy > -4) {
        //   camera.position.set(cam_posx, cam_posy, cam_posz)
        //   rotateBox(time)
        //   // camera.lookAt(boxMesh.position)
        //   //   camera.position.set(cam_posx, cam_posy, cam_posz)

        //   // camera.rotation.set(
        //   //   cam_posx,
        //   //   cam_posy,
        //   //   cam_posz
        //   //   //   (cam_posz -= Math.PI * 0.02)
        //   //   // "ZYX"
        //   // )
        // } else {
        //   camera.position.set(cam_posx, (cam_posy += 0.07), cam_posz)
        // }

        console.log(cam_posy, "------------")
        // scene.rotation.set(box2Mesh.position.x, (cam_posy -= 0.01), 4, "YZX")
        // camera.rotation.set((cam_posx -= 0.001), cam_posy, cam_posz, "XYZ")
      }

      animate()
    }
  }, [])
}

export default CameraTestmModule
