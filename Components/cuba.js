import { useEffect } from "react"
import * as THREE from "three"

import Stats from "three/addons/libs/stats.module.js"

let SCREEN_WIDTH = window.innerWidth
let SCREEN_HEIGHT = window.innerHeight
let aspect = SCREEN_WIDTH / SCREEN_HEIGHT

let container, stats
let camera, scene, renderer, mesh
let cameraRig, activeCamera, activeHelper
let cameraPerspective, cameraOrtho
let cameraPerspectiveHelper, cameraOrthoHelper
const frustumSize = 600

const Juba = () => {
  container = document.createElement("div")
  document.body.appendChild(container)

  scene = new THREE.Scene()

  //

  // camera = new THREE.PerspectiveCamera(50, 0.5 * aspect, 1, 10000)
  const camera = new THREE.PerspectiveCamera(
    75,
    window?.innerWidth / window.innerHeight,
    0.1,
    1000
  )

  camera.position.z = 2500

  // cameraPerspective = new THREE.PerspectiveCamera(50, 0.5 * aspect, 150, 1000)
  const cameraPerspective = new THREE.PerspectiveCamera(
    75,
    window?.innerWidth / window.innerHeight,
    0.1,
    1000
  )

  cameraPerspectiveHelper = new THREE.CameraHelper(cameraPerspective)
  // scene.add(cameraPerspectiveHelper)

  //
  cameraOrtho = new THREE.OrthographicCamera(
    (0.5 * frustumSize * aspect) / -2,
    (0.5 * frustumSize * aspect) / 2,
    frustumSize / 2,
    frustumSize / -2,
    150,
    1000
  )

  cameraOrthoHelper = new THREE.CameraHelper(cameraPerspective)
  // scene.add(cameraOrthoHelper)

  //

  activeCamera = cameraPerspective
  activeHelper = cameraPerspectiveHelper

  // counteract different front orientation of cameras vs rig

  cameraOrtho.rotation.y = Math.PI
  cameraPerspective.rotation.y = Math.PI

  cameraRig = new THREE.Group()

  cameraRig.add(cameraPerspective)
  cameraRig.add(cameraOrtho)

  scene.add(cameraRig)

  //

  mesh = new THREE.Mesh(
    new THREE.SphereGeometry(100, 16, 8),
    new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
  )
  scene.add(mesh)

  const mesh2 = new THREE.Mesh(
    new THREE.SphereGeometry(50, 16, 8),
    new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
  )
  mesh2.position.y = 150
  mesh.add(mesh2)

  // cameraRig.add(mesh3)

  //

  const geometry = new THREE.BufferGeometry()
  const vertices = []

  for (let i = 0; i < 10000; i++) {
    vertices.push(THREE.MathUtils.randFloatSpread(2000)) // x
    vertices.push(THREE.MathUtils.randFloatSpread(2000)) // y
    vertices.push(THREE.MathUtils.randFloatSpread(2000)) // z
  }

  geometry.setAttribute(
    // "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  )

  const particles = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({ color: 0x888888 })
  )
  scene.add(particles)

  //

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT)
  renderer.setAnimationLoop(animate)
  container.appendChild(renderer.domElement)
  renderer.setScissorTest(true)

  //

  stats = new Stats()
  container.appendChild(stats.dom)

  //

  window.addEventListener("resize", onWindowResize)
  document.addEventListener("keydown", onKeyDown)
}

//

function onKeyDown(event) {
  switch (event.keyCode) {
    case 79 /*O*/:
      activeCamera = cameraOrtho
      activeHelper = cameraOrthoHelper

      break

    case 80 /*P*/:
      activeCamera = cameraPerspective
      activeHelper = cameraPerspectiveHelper

      break
  }
}

//

function onWindowResize() {
  SCREEN_WIDTH = window.innerWidth
  SCREEN_HEIGHT = window.innerHeight
  aspect = SCREEN_WIDTH / SCREEN_HEIGHT

  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT)

  camera.aspect = aspect
  camera.updateProjectionMatrix()

  cameraPerspective.aspect = aspect
  cameraPerspective.updateProjectionMatrix()
}

//

function animate() {
  render()
  stats.update()
}

function render() {
  //

  activeHelper.visible = false

  renderer.setClearColor(0x000000, 1)
  renderer.setScissor(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
  renderer.setViewport(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
  renderer.render(scene, activeCamera)

  // renderer.render(scene, camera)
}

const Cuba = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      Juba()
    }
  }, [])
}

export default Cuba
