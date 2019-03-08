import React, { Component } from 'react';
import THREE from './threeJSimport';

export default class ThreeContainer extends Component {
  componentDidMount() {
    // call the method in order to execute across the state
    this.setupTHREE();

    // because we don't have access to tag 'canvas' before realy DOM finishes its rendering,
    // we wait till DOM's rendered and then add inline CSS by appending attribtues to 'canvas' tag
    const canvas = document.querySelector('canvas');
    canvas.style.width='100%';
    canvas.style.height='100%';

    // setTimeout(()=>{document.getElementById('messager').dataset.highlights = "1,2"}, 5000);

  }

  setupTHREE() {
    // prepare renderer, camera and scene for webGL canvas
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // append 'canvas' tag inside the 'main-model' div
    const mainModel = document.getElementsByClassName('main-model')[0];
    mainModel.appendChild(renderer.domElement);

    // append messager tag inside the 'main-model' div in order for canvas children
    // to know when they need to partially highlight themselves
    const messager = document.createElement("div");
    messager.setAttribute("id", "messager1");
    messager.setAttribute("data-highlights", "0");
    mainModel.appendChild(messager);

    const config = {attributes: true};
    const cb = function(mutationsList, observer) {
      for (let mutation of mutationsList) {
        if (mutation.type == 'attributes') {
          console.log(cube1);
        }
      }
    };

    const observer = new MutationObserver(cb);
    observer.observe(messager, config);






    // ** DYNAMIC: adjust renderer and camera according to the event of window resizing **
    window.addEventListener('resize', function() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });

    const axis = new THREE.AxisHelper(10);
    scene.add(axis);

    // *******************************************************************

    // create shapes
    const geometry = new THREE.BoxGeometry(1,1,1);

    // create a material, colour or image texture
    const material1 = new THREE.MeshLambertMaterial({color: 0xFFFFFF, wireframe: false});
    const material2 = new THREE.MeshLambertMaterial({color: 0xFFFFFF, wireframe: false});
    const material3 = new THREE.MeshLambertMaterial({color: 0xFFFFFF, wireframe: false});

    const cube1 = new THREE.Mesh( geometry, material1);
    cube1.name = 1;

    const cube2 = new THREE.Mesh( geometry, material2);
    cube2.name = 2;
    cube2.position.x = 3;

    const cube3 = new THREE.Mesh( geometry, material3);
    cube3.name = 3;
    cube3.position.x = -3;

    scene.add(cube1);
    scene.add(cube2);
    scene.add(cube3);

    const light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add(light);

    // *******************************************************************

    // set up the initial camera position and orbit controls
    camera.position.z = 10;
    camera.lookAt(scene.position);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);

    // add raycaster and mouse as 2D vector
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onMouseMove(event) {
      // calculate mouse position in normalized device coordinates
      // (-1 to +1) for both components
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    }

    function onDocumentTouchStart(event) {
      event.preventDefault();

      event.clientX = event.touches[0].clientX;
      event.clientY = event.touches[0].clientY;

      onDocumentMouseDown(event);
    }

    function onDocumentMouseDown(event) {
      // update the picking ray with the camera and mouse position
      raycaster.setFromCamera( mouse, camera );

      // calculate objects intersecting the picking ray
      const intersects = raycaster.intersectObjects( scene.children );

      for ( let i = 0; i < intersects.length; i++ ) {
        if (intersects[i].object.type == 'Mesh') {
          // console.log(intersects[i].object.material);
        intersects[ i ].object.material.color.set( 0xff0000 );
        }
      }
    }

    window.addEventListener( 'mousemove', onMouseMove, false );
    window.addEventListener( 'mousedown', onDocumentMouseDown, false );
    window.addEventListener( 'touchstart', onDocumentTouchStart, false );

    // *******************************************************************

    window.requestAnimationFrame(render);

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
    }

    // run game loop (update, render, repeat)
    const GameLoop = function() {
      requestAnimationFrame(GameLoop);

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