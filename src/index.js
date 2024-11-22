// Import the required modules from three.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(2, 2, 5);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add OrbitControls so the user can rotate the scene
const controls = new OrbitControls(camera, renderer.domElement);

// Create axis lines to help visualize the coordinate system
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Create the vector line
let vectorGeometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(1, 1, 1)
]);
const vectorMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
let vectorLine = new THREE.Line(vectorGeometry, vectorMaterial);
scene.add(vectorLine);

// Function to update the vector based on slider values
function updateVector(x, y, z) {
    scene.remove(vectorLine);
    vectorGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(x, y, z)
    ]);
    vectorLine = new THREE.Line(vectorGeometry, vectorMaterial);
    scene.add(vectorLine);
}

// Create the sliders for adjusting the vector coordinates
const sliders = ['x', 'y', 'z'].map(axis => {
    const container = document.createElement('div');
    container.style.marginBottom = '10px';

    const label = document.createElement('label');
    label.innerText = `${axis.toUpperCase()}: `;
    container.appendChild(label);

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '0';
    slider.max = '1';
    slider.step = '0.01';
    slider.value = '1';
    slider.style.width = '200px';

    container.appendChild(slider);
    document.body.appendChild(container);

    return { axis, slider };
});

// Add event listeners to sliders to update the vector
sliders.forEach(({ axis, slider }) => {
    slider.addEventListener('input', () => {
        const x = parseFloat(sliders[0].slider.value);
        const y = parseFloat(sliders[1].slider.value);
        const z = parseFloat(sliders[2].slider.value);
        updateVector(x, y, z);
    });
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
