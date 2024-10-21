"use client"

import * as THREE from "three"

const LatheGeometry = new THREE.BoxGeometry(1, 1, 1)
const Lathematerial = new THREE.MeshStandardMaterial({
  // wireframe: true,
  // emissive: "red",
  // emissiveIntensity: 1,
  // color: "red",
})
const latheR = new THREE.Mesh(LatheGeometry, Lathematerial)
// scene.add(ambientLight)
// scene.add(lathe)
latheR.position.set(0, -1, 2)
// const Ranimate = () => {
//   //   requestAnimationFrame(animate)

//   // addItems().update()
//   renderer.render(scene, camera)
// }
export { latheR }

// animate()
