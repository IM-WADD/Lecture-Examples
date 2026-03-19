/**
 * This example draws on the ThreeJS documentation and the source code for 
 * this ThreeJS powered GLTF model viewer: https://gltf-viewer.donmccurdy.com/
 * Viewer source code: https://github.com/donmccurdy/three-gltf-viewer/blob/main/src/viewer.js
 */

// Import the core ThreeJS library
import * as THREE from "three";
// OrbitControls allow the user to move the camera
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// GLTFLoader is for loading external models (e.g. those created in Blender) exported in glTF format (extension .glb or .gltf)
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// ThreeJS requires a camera, an overall scene, and a renderer
let camera, scene, renderer;

/**
 * Set up the scene and model
 */
function init() {
    // Create a div element that will show the ThreeJS player. You can also select an existing element
	const container = document.createElement( 'div' );
	document.body.appendChild( container );

    // Initialise the camera. See the ThreeJS docs for more cameras and their settings.
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 20 );

    // Create the scene.
	scene = new THREE.Scene();

    // Set the background colour. A light colour is suggested to start with 
    // to make it easier to tell if the model has loaded correctly.
    // If there are any problems with the model, lighting, or textures, the model 
    // will appear black.
    scene.background = new THREE.Color("#cccccc");

    // Create the renderer
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    // Make sure the renderer displays pixels in the same way as the user's device
    renderer.setPixelRatio( window.devicePixelRatio );
    // Set the size of the ThreeJS player to match the browser window
    renderer.setSize( window.innerWidth, window.innerHeight );

    // Render settings (see the docs)
    renderer.toneMapping = THREE.LinearToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputEncoding = THREE.sRGBEncoding; 
    // Start the player and add it to the HTML element created / selected at the start of this function 
    container.appendChild( renderer.domElement );

    // Create the OrbitControls
    const controls = new OrbitControls( camera, renderer.domElement );
    // Important - call the render() function every time the controls are used to move the camera
    controls.addEventListener( 'change', render ); // use if there is no animation loop
    controls.update();

    // Load the model
    const loader = new GLTFLoader();
    // Change the path to match the location of your model. The models folder in this example also includes the default cube provided when starting a new model in Blender.
    loader.load( 'models/brick_building.glb', async function ( gltf ) {
        // Save the model as a constant. This assumes the model is exported as a "scene". There are other possibilities: https://threejs.org/docs/#examples/en/loaders/GLTFLoader
        const model = gltf.scene;

        /**
         * The following code is used to position a model of any size in the centre of 
         * the scene then adjust the controls and camera
         */
        const box = new THREE.Box3().setFromObject(model);
		const size = box.getSize(new THREE.Vector3()).length();
		const center = box.getCenter(new THREE.Vector3());
        model.position.x -= center.x;
		model.position.y -= center.y;
		model.position.z -= center.z;

        controls.maxDistance = size * 10;

		camera.near = size / 100;
		camera.far = size * 100;
		camera.updateProjectionMatrix();

        camera.position.copy(center);
		camera.position.x += size / 2.0;
		camera.position.y += size / 5.0;
		camera.position.z += size / 2.0;
        // Point the camera at the centre of the model
		camera.lookAt(center);

        // If your model is showing but appears black, the problem is likely caused by lighting issues.
        const hemiLight = new THREE.HemisphereLight();
		hemiLight.name = 'hemi_light';
		scene.add(hemiLight);

        // wait until the model can be added to the scene without blocking due to shader compilation
        await renderer.compileAsync( model, camera, scene );

        scene.add( model );

        render();
    
    } );


    window.addEventListener( 'resize', onWindowResize );

}

/**
 * Window resize event handler to update the display when the window 
 * changes size.
 */
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    render();

}

/**
 * Render the scene
 */
function render() {
    renderer.render( scene, camera );
}

init();