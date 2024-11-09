"use client"

import * as THREE from "three"

let jupiterGeometry, jupiterMaterial, jupiterMesh

//

const textureLoader = new THREE.TextureLoader()
textureLoader.load("./model/planets/jupiter_texture.jpg", (texture) => {
  jupiterGeometry = new THREE.IcosahedronGeometry(15, 50)
  jupiterMaterial = new THREE.MeshStandardMaterial({
    // wireframe: true,
    bumpMap: texture,
    bumpScale: 1,
    map: texture,
  })
  jupiterMesh = new THREE.Mesh(jupiterGeometry, jupiterMaterial)
})
export { jupiterMesh, jupiterMaterial, jupiterGeometry }
