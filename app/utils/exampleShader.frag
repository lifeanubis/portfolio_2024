const vertexShaderOne = `
  
precision mediump float;

void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

`
const vertexShaderTwo = `
uniform float timeR;

void main() {
  float wave = sin(position.x * 5.0 + timeR) * 0.2;

  vec3 newPosition = vec3(position.x, position.y + wave, position.z);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}

`

const fragmentShaderOne = `
  precision mediump float;
    
  uniform float time;

    void main() {
        vec3 color = vec3(
            sin(time * 2.0),         // Red channel
            sin(time * 2.0 + 2.0),   // Green channel
            sin(time * 2.0 + 4.0)    // Blue channel
        );

        // Adjust the sine wave range from [-1.0, 1.0] to [0.0, 1.0]
        color = (color + 1.0) * 0.5;

        gl_FragColor = vec4(color, 1.0);  // Set the color and full opacity
    }
`
// scene.rotation
const vertexShaderThree = `
precision mediump float;
uniform float time;
varying vec2 vUv;

void main() {
    float wave = sin(position.x * 1.0  + time  ) * 0.1;  
    vec3 newPosition = vec3( position.x + wave , position.y + wave   ,  position.z);  

    vUv = uv;  

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`

// Fragment shader that samples the texture
const fragmentShaderThree = `
precision mediump float;

uniform sampler2D texture1; 
varying vec2 vUv;          
void main() {
    vec4 texColor = texture(texture1, vUv); 
    gl_FragColor = vec4(texColor);
}

`
