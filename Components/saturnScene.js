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
      // wireframe: true,
      // bumpMap: texture,
      // bumpScale: 20,
      map: texture,
    })
    saturnMesh = new THREE.Mesh(saturnGeometry, saturnMaterial)
    asteroidMesh = new THREE.Mesh(asteroidGeometry, asteroidMaterial)

    //   saturnMesh.rotation.x += 0.1
    //   saturnMesh.position.y -= 1
    //   saturnMesh.position.z -= 1
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
