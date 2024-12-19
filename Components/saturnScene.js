"use client"

import * as THREE from "three"

let saturnGeometry, saturnMaterial, saturnMesh

let asteroidGeometry, asteroidMaterial, asteroidMesh

if (typeof window !== "undefined") {
  asteroidGeometry = new THREE.SphereGeometry(0.1)

  asteroidMaterial = new THREE.MeshStandardMaterial({
    color: "white",
  })

  const textureLoader = new THREE.TextureLoader()
  textureLoader.load("./model/saturn/saturn_texture.jpg", (texture) => {
    saturnGeometry = new THREE.IcosahedronGeometry(15, 50)

    saturnMaterial = new THREE.MeshStandardMaterial({
      map: texture,
    })
    saturnMesh = new THREE.Mesh(saturnGeometry, saturnMaterial)
    asteroidMesh = new THREE.Mesh(asteroidGeometry, asteroidMaterial)
  })
}
export {
  saturnMesh,
  saturnMaterial,
  saturnGeometry,
  asteroidGeometry,
  asteroidMaterial,
  asteroidMesh,
}
