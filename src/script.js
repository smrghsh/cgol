import './style.css'

// import * as THREE from 'three'
// import * as dat from 'dat.gui'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
// import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';



// import horizontalGridVertexShader from './shaders/horizontalGrid/vertex.glsl'
// import horizontalGridFragmentShader from './shaders/horizontalGrid/fragment.glsl'

import Experience from './Experience/Experience.js'
const experience = new Experience(document.querySelector('canvas.webgl'))

// let controller1, controller2;
// let controllerGrip1, controllerGrip2;

// // /**
// //  * Base
// //  */
// // // Debug
// const gui = new dat.GUI();

// // Canvas
// const canvas = document.querySelector('canvas.webgl');

// // Scene
// const scene = new THREE.Scene();
// scene.background = new THREE.Color('white');

// scene.add(new THREE.AxesHelper())

// //light
// const light = new THREE.AmbientLight( 0xFFFFFF );
// scene.add(light);


// //grid floorplane
// const geometry = new THREE.PlaneGeometry( 100, 100 );
// const horizontalGridMaterial = new THREE.ShaderMaterial({
//     vertexShader: horizontalGridVertexShader,
//     fragmentShader: horizontalGridFragmentShader,
//     transparent: true,
// });
// const floorPlane = new THREE.Mesh( geometry, horizontalGridMaterial );
// floorPlane.rotation.x -= Math.PI/2;
// scene.add( floorPlane );


// //grid of cubes
// var rows = 20;
// var columns = 20;



// var sim = new Sim(20,20)
// sim.randomize()


// // for (let i = 0; i < columns; i++){
// //     for (let j = 0; j < rows; j++){
// //         let cube = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshBasicMaterial({color: 'red', wireframe:true}));
// //         cube.position.x = i;
// //         cube.position.y = j;
// //         cube.scale.x *= .75
// //         cube.scale.y *= .75
// //         cube.scale.z *= .75
// //         cubeGrid.add(cube)
// //     }
// // }
// // cubeGrid.position.x -= columns/2;
// // scene.add(cubeGrid)








// /**
//  * Sizes
//  */
// const sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight
// }
// /**
//  * Camera
//  */
// // Base camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
// camera.position.x = 0.0;
// camera.position.y = 3.0;
// camera.position.z = 10.0
// camera.lookAt(0,rows/2,0);
// // camera.position.x = 3
// scene.add(camera);

// // Controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;



// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas
// });
// renderer.setSize(sizes.width, sizes.height);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// renderer.xr.enabled = true;
// document.body.appendChild( VRButton.createButton( renderer ) );



// /**
//  * Animate
//  */
// const clock = new THREE.Clock();
// let delta = 0;

// const tick = () =>
// {
//     const elapsedTime = clock.getElapsedTime();
//     // Update controls
//     controls.update();
//     delta += clock.getDelta();
//     // material.uniforms.uTime.value = elapsedTime;
// }

// tick();

// renderer.setAnimationLoop( function () {
//     tick();
// 	renderer.render( scene, camera );
// });