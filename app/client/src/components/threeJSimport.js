// this file is the workaround for the existing issue:
// currently it's not possible to import the files within the "examples/js" directory in this way.
// This is due to some of the files relying on global namespace pollution of THREE.
import * as THREE from 'three';
window.THREE = THREE;
require('three/examples/js/controls/OrbitControls.js');
require('three/examples/js/loaders/GLTFLoader');
require('three/examples/js/objects/Sky');

require('three/examples/js/objects/Water');


export default THREE;

