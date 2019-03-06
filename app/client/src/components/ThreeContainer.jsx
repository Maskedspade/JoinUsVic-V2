import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import THREE from './threeJSimport';

export default class ThreeContainer extends Component {
  componentDidMount() {
    this.setupTHREE();
  }

  setupTHREE() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', function() {
      var width = window.innerWidth;
      var height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });

    // var controls = new THREE.OrbitControls(camera, renderer.domElement);

    // create the shape
    var geometry = new THREE.BoxGeometry(1,1,1);

    // create a material, colour or image texture
    var material = new THREE.MeshBasicMaterial({color: 0xFFFFFF, wireframe: false});
    var cube = new THREE.Mesh( geometry, material)

    scene.add(cube);

    camera.position.z = 3;

    // game logic
    var update = function() {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.005;
    };

    // draw scene
    var render = function() {
      renderer.render(scene, camera);
    };

    // run game loop (update, render, repeat)
    var GameLoop = function() {
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

