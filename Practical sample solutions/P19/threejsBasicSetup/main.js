/**
 * This example draws on the ThreeJS documentation and the source code for 
 * this ThreeJS powered GLTF model viewer: https://gltf-viewer.donmccurdy.com/
 * Viewer source code: https://github.com/donmccurdy/three-gltf-viewer/blob/main/src/viewer.js
 */

// Import the core ThreeJS library
import * as THREE from "three";

// ThreeJS requires a camera, an overall scene, and a renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();

// Set the size of the ThreeJS player to match the browser window
renderer.setSize( window.innerWidth, window.innerHeight );
// Add the player to the HTML
document.body.appendChild( renderer.domElement );

// Create and add a basic cube
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

// Set the camera position on the z axis
camera.position.z = 5;

/**
 * Create an animation loop
 */
function animate() {
	requestAnimationFrame( animate );

    // Spin the cube around the x and y axes
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

animate();