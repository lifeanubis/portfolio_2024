"use client"

import * as THREE from "three"
let sunGeometry, sunMaterial, sunMesh
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

  //

  const textureLoader = new THREE.TextureLoader()
  textureLoader.load("./model/sun/sun_texture.jpg", (texture) => {
    sunGeometry = new THREE.IcosahedronGeometry(100, 50)
    sunMaterial = new THREE.ShaderMaterial({
      vertexColors: true,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        time: { value: 0.0 },
        // timeR: { value: 0.0 },
        texture1: { value: texture },
      },
    })

    sunMesh = new THREE.Mesh(sunGeometry, sunMaterial)
  })
}

export { sunMesh, sunMaterial, sunGeometry }

// animate()
