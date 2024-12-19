"use client"

import * as THREE from "three"

let marsGeometry, marsMaterial, marsMesh

//
if (typeof window !== "undefined") {
  const textureLoader = new THREE.TextureLoader()
  textureLoader.load("./model/planets/mars_texture.jpg", (texture) => {
    marsGeometry = new THREE.IcosahedronGeometry(20, 50)
    marsMaterial = new THREE.MeshStandardMaterial({
      // wireframe: true,
      bumpMap: texture,
      bumpScale: 10,
      map: texture,
    })
    marsMesh = new THREE.Mesh(marsGeometry, marsMaterial)
  })
}
export { marsMesh, marsMaterial, marsGeometry }
