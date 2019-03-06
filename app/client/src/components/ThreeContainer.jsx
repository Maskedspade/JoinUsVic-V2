import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import axios from 'axios';

import THREE from './threeJSimport';

export default class ThreeContainer extends Component {
  componentDidMount() {
    this.setupTHREE();

    // because we don't have access to tag 'canvas' before realy DOM finishes its rendering,
    // we wait till DOM's rendered and then add inline CSS by appending attribtues to 'canvas' tag
    const canvas = document.querySelector('canvas');

    canvas.style.width='100%';
    canvas.style.height='100%';
  }

  setupTHREE() {
    // prepare renderer, camera and scene for webGL canvas
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // append 'canvas' tag inside the 'main-wrapper' div
    const mainWrapper = document.getElementsByClassName('main-model')[0];
    mainWrapper.appendChild(renderer.domElement);

    window.addEventListener('resize', function() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });

    const controls = new THREE.OrbitControls(camera, renderer.domElement);

    // create the shape
    const geometry = new THREE.BoxGeometry(1,1,1);

    // create a material, colour or image texture
    const material = new THREE.MeshLambertMaterial({color: 0xFFFFFF, wireframe: false});

    const cube1 = new THREE.Mesh( geometry, material);

    const cube2 = new THREE.Mesh( geometry, material);
    cube2.position.x = -4;

    const cube3 = new THREE.Mesh( geometry, material);
    cube3.position.x = -8;

    scene.add(cube1);
    scene.add(cube2);
    scene.add(cube3);

    camera.position.z = 10;

    // create light
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 5.0);
    scene.add(ambientLight);

    // add raycaster and mouse as 2D vector
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

    function onDocumentTouchStart(event) {
      event.preventDefault();

      event.clientX = event.touches[0].clientX;
      event.clientY = event.touches[0].clientY;

      onDocumentMouseDown(event);
    }

    function onDocumentMouseDown(event) {
      event.preventDefault();

      mouse.x = (event.clientX / renderer.domElement.width) * 2 - 1;
      mouse.y = (event.clientY / renderer.domElement.height) * 2 + 1;

      // update the picking ray with the camera and mouse position
      raycaster.setFromCamera( mouse, camera );

      var intersects = raycaster.intersectObjects(scene.children);
      var color = (Math.random() * 0xFFFFFF);

      for ( var i = 0; i < intersects.length; i++ ) {
        intersects[ i ].object.material.color.set( 0xff0000 );
      }
    }

    window.addEventListener( 'mousedown', onDocumentMouseDown, false );
    window.addEventListener( 'touchstart', onDocumentTouchStart, false );
    // window.addEventListener( 'mousemove', onMouseMove, false );

    // game logic
    const update = function() {
      cube1.rotation.x += 0.01;
      cube1.rotation.y += 0.005;

      cube2.rotation.x += 0.01;
      cube2.rotation.y += 0.005;

      cube3.rotation.x += 0.01;
      cube3.rotation.y += 0.005;

    };

    // draw scene
    function render() {

      renderer.render( scene, camera );

    };

    window.requestAnimationFrame(render);

    // run game loop (update, render, repeat)
    const GameLoop = function() {
      requestAnimationFrame( GameLoop );

      update();
      render();
    };

    GameLoop();
  }

  render () {
      return (
        <div>
        </div>
      );
  }
}