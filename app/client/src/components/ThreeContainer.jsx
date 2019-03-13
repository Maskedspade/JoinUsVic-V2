import React, { Component } from 'react';
import THREE from './threeJSimport';

export default class ThreeContainer extends Component {
  componentDidMount() {

    this.detectWebGLContext();
  }

  detectWebGLContext() {
    // Create canvas element for testing
    // The canvas is not added to DOM so it is never displayed
    const canvas = document.createElement("canvas");

    // Get WebGLRenderingContext from canvas element.
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    if (gl && gl instanceof WebGLRenderingContext) {
      // call the method in order to execute across the state of app
      this.setupTHREE();

      // because we don't have access to tag 'canvas' before realy DOM finishes its rendering,
      // we wait till DOM's rendered and then add inline CSS by appending attribtues to 'canvas' tag
      const canvas = document.querySelector('canvas');
      canvas.style.width='100%';
      canvas.style.height='100%';

    } else {
      // report error should WebGL be absent
      alert("Failed to get WebGL context. Your browser or device may not support WebGL.");
    }
  }

  setupTHREE() {

    let anchorIds = [];

    // prepare renderer, camera and scene for webGL canvas
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);

    const renderer = new THREE.WebGLRenderer();
    const loader = new THREE.GLTFLoader();

    renderer.setClearColor(0xdddddd);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // append 'canvas' tag inside the 'main-model' div
    const mainModel = document.getElementsByClassName('main-model')[0];
    mainModel.appendChild(renderer.domElement);

    // append messager tag inside the 'main-model' div in order for canvas children
    // to know when they need to partially highlight themselves
    const messager = document.createElement("div");
    messager.setAttribute("id", "messager");
    mainModel.appendChild(messager);

    const config = {attributes: true};
    const cb = function(mutationsList, observer) {
      for (let mutation of mutationsList) {
        if (mutation.type == 'attributes') {
          // the order might change, depends on where scene children meshes live
          const childrenMeshes = scene.children[2];

          childrenMeshes.traverse((childMesh) => {
            const meshName = childMesh.name;
            if (meshName.substring(0, 6) === "anchor") {
              childMesh.material = new THREE.MeshNormalMaterial({});
            }
          })

          let highlights = document.getElementById('messager').dataset.highlights;
          anchorIds = highlights.split(',');

          childrenMeshes.traverse((childMesh) => {
            const meshName = childMesh.name;
            if (meshName.substring(0, 6) === "anchor") {
              if (anchorIds.includes(meshName.substring(6))) {
                childMesh.material = materialAnchor;
              }
            }
          });
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

    const axes = new THREE.AxesHelper(10);
    scene.add(axes);

    // *******************************************************************
    // define colors

    // create a material, colour or image texture
    const materialAnchor = new THREE.MeshLambertMaterial({color: 0xffffa1, wireframe: false});
    const materialOcean = new THREE.MeshLambertMaterial({color: 0xFFFFFF, wireframe: false});
    const materialDock = new THREE.MeshLambertMaterial({color: 0xFFFFFF, wireframe: false});

    const light = new THREE.AmbientLight(0x404040, 2);
    scene.add(light);

    // *******************************************************************

    // set up the initial camera position and orbit controls
    camera.position.z = -145.03;
    camera.position.x = -63.6;
    camera.position.y = 77.69;
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
      const intersects = raycaster.intersectObjects(scene.children[2].children);

      if (!intersects[0]) {
        return;
      }

      if (intersects[0].object.name.substring(0, 6) === "anchor") {
        console.log(intersects[0].object)

        if (anchorIds.includes(intersects[0].object.name.substring(6))) {
          this.props.getSelectedAnchorId(intersects[0].object.name.substring(6));
        };
      }
    }

    onDocumentMouseDown = onDocumentMouseDown.bind(this);

    window.addEventListener( 'mousemove', onMouseMove, false );
    window.addEventListener( 'mousedown', onDocumentMouseDown, false );
    window.addEventListener( 'touchstart', onDocumentTouchStart, false );

    // *******************************************************************

    window.requestAnimationFrame(render);

    // game logic
    const update = function() {
      // cube1.rotation.x += 0.01;
      // cube1.rotation.y += 0.005;

      // cube2.rotation.x += 0.01;
      // cube2.rotation.y += 0.005;

      // cube3.rotation.x += 0.01;
      // cube3.rotation.y += 0.005;
    };

    const onLoad = gltf => {
      scene.add(gltf.scene);

      gltf.scene.traverse((children) => {

          if (children.type !== 'Mesh') {
            console.log(children);
          }

          // the name of imported model by default comes with the prefix 'G-'
          // in order to remove the first 2 characters we do:
          let childName = children.name.split('');
          childName.splice(0, 2);

          if (childName.join('').substring(0, 6) === "anchor") {
            children.name = childName.join('');
            children.material = new THREE.MeshNormalMaterial({ // scene lights not required
            });
          }

          if (childName.join('') === "ocean") {
            children.name = childName.join('');
            children.material = new THREE.MeshBasicMaterial({ color: 0xa1f1f0 });
            children.material.side = THREE.DoubleSide;
          }

          if (childName.join('') === "dock") {
            children.name = childName.join('');
            children.material = new THREE.MeshBasicMaterial({ color: 0xe7a15e });
            children.material.side = THREE.DoubleSide;
          }

          if (childName.join('') === "green_patch") {
            children.name = childName.join('');
            children.material = new THREE.MeshBasicMaterial({ color: 0x5ee7a1 });
            children.material.side = THREE.DoubleSide;
          }

          if (childName.join('').substring(0, 4) === "grey") {
            children.name = childName.join('');
            children.material = new THREE.MeshBasicMaterial({ color: 0xb0c8bc });
            children.material.side = THREE.DoubleSide;
          }

          if (childName.join('').substring(0, 4) === "dark") {
            children.name = childName.join('');
            children.material = new THREE.MeshBasicMaterial({ color: 0xbabebc });
            children.material.side = THREE.DoubleSide;
          }

      });

      this.props.modelLoaded();

      GameLoop();
    };

    const onProgress = () => {
      // undefined for now
    };

    const handleError = (error) => {
      console.error(error);
    };

    loader.load( "joinusvic_model.gltf", onLoad, onProgress, handleError);

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
  }

  render () {
    return (
      <div>
      </div>
    );
  }
}