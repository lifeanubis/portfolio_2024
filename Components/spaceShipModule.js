"use client"

import * as THREE from "three"

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"

const loader = new GLTFLoader()
let model, mixer
const directional = new THREE.DirectionalLight(0xeb9c50, 10)
const directionalZ = new THREE.DirectionalLight(0xeb9c50, 2)

const shipView = (group) =>
  loader.load("./model/spaceShip/scene.gltf", (gltf) => {
    model = gltf.scene
    model.add(directional)
    model.add(directionalZ)
    mixer = new THREE.AnimationMixer(model)

    directional.position.set(300, 200, 0)
    directionalZ.position.set(0, 0, -200)
    model.position.x = 300
    // setTimeout(() => {
    //   model.rotation.set(0, -4, 0)
    // }, 8000)
    model.scale.set(0.1, 0.1, 0.1)
    group.add(model)
  })

export { shipView, model, mixer }
