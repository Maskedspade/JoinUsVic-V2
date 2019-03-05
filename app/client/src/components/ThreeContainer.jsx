import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import axios from 'axios';

import * as THREE from 'three';

export default class ThreeContainer extends Component {
  componentDidMount() {
      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

      var renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      // create the shape
      var geometry = new THREE.BoxGeometry(1,1,1);

      // create a material, colour or image texture
      var material = new THREE.MeshBasicMaterial({color: 0xFFFFFF, wireframe: false});

      var cube = new THREE.Mesh( geometry, material)

      scene.add(cube);

      // game logic
      var update = function() {};
      var render = function() {};

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

