"use client"

import * as THREE from "three"

let portalGeometry,
  portalMaterial,
  portalMesh,
  innerPortalGeometry,
  innerPortalMaterial,
  innerPortalMesh

//
if (typeof window !== "undefined") {
  const textureLoader = new THREE.TextureLoader()
  innerPortalGeometry = new THREE.CircleGeometry(35)
  innerPortalMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0.0 }, // Pass time to the shader
    },
    vertexShader: `
            varying vec2 vUv;
            varying float vWave;
        
            uniform float uTime;
        
            void main() {
              vUv = uv;
        
              // Add a wave effect based on time
              float wave = sin(position.y * 5.0 + uTime) * 0.5;
              vec3 pos = position + normal * wave;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        
              vWave = wave; // Pass wave to the fragment shader
            }
          `,
    fragmentShader: `
            varying vec2 vUv;
            varying float vWave;
        
            uniform float uTime;
        
            void main() {
                float innerRing = step(0.4, vUv.y); 
      vec3 innerColor = vec3(1.0, 0.0, 0.0); // Red
  
             float dist = length(vUv * uTime);
        float glow =  sin(uTime * 0.5) * cos(uTime * 0.5) ;
             vec3 color = mix(vec3(0.2, 0.7, 0.8), vec3(0.0, 0.1, 0.1), sin( uTime *0.5 ));
   
        gl_FragColor = vec4(color,1.0);
               }
          `,
    side: THREE.DoubleSide,
  })
  innerPortalMesh = new THREE.Mesh(innerPortalGeometry, innerPortalMaterial)

  portalGeometry = new THREE.TorusGeometry(40, 5, 32, 100)
  portalMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0.0 }, // Pass time to the shader
    },
    vertexShader: `
          varying vec2 vUv;
          varying float vWave;
      
          uniform float uTime;
      
          void main() {
            vUv = uv;
      
            // Add a wave effect based on time
            float wave = sin(position.y * 5.0 + uTime) * 0.5;
            vec3 pos = position + normal * wave;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      
            vWave = wave;
          }
        `,
    fragmentShader: `
          varying vec2 vUv;
          varying float vWave;
      
          uniform float uTime;
      
          void main() {
              float innerRing = step(0.4, vUv.y); // Adjust 0.4 based on UV mapping

           float dist = length(vUv * uTime);
           float glow =  sin(uTime * 0.5) * cos(uTime * 0.5) ;
           vec3 color = mix(vec3(0.1, 0.7, 0.7), vec3(0.0, 0.0, 0.0), sin( uTime * dist * 0.005));
 
             gl_FragColor = vec4(color, 5.5);
            // Dynamic color based on the wave and UV
             }
        `,
  })
  // vec3 color = mix(vec3(0.1, 0.2, 0.7), vec3(1.0, 0.0, 0.5), abs(vWave));
  // gl_FragColor = vec4(color, 1.0);
  // vec3 color = vec3(1.0, 0.2, 0.7) * glow  * mix(vec3(0.1, 0.2, 0.7), vec3(1.0, 0.0, 0.5), abs(vWave)) ;

  portalMesh = new THREE.Mesh(portalGeometry, portalMaterial)
  innerPortalMesh = new THREE.Mesh(innerPortalGeometry, innerPortalMaterial)
}
export {
  portalMesh,
  portalMaterial,
  portalGeometry,
  innerPortalGeometry,
  innerPortalMesh,
  innerPortalMaterial,
}
