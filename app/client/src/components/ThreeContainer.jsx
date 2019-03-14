import React, { Component } from 'react';
import THREE from './threeJSimport';
import * as dat from 'dat.gui';

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
          const childrenMeshes = scene.children[5];

          childrenMeshes.traverse((childMesh) => {
            const meshName = childMesh.name;
            if (meshName.substring(0, 6) === "anchor") {
              childMesh.material = materialAnchor;
            }
          })

          let highlights = document.getElementById('messager').dataset.highlights;
          anchorIds = highlights.split(',');

          childrenMeshes.traverse((childMesh) => {
            const meshName = childMesh.name;

            if (meshName.substring(0, 6) === "anchor") {
              if (anchorIds.includes(meshName.substring(6))) {

                childMesh.material = materialHighlight;
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
    const materialHighlight = new THREE.MeshNormalMaterial({ });

    const materialOcean = new THREE.MeshLambertMaterial({ color: 0xa1f1f0 });
    const materialDock = new THREE.MeshLambertMaterial({ color: 0xe7a15e });
    const materialGrey = new THREE.MeshLambertMaterial({ color: 0xb0c8bc });
    const materialDarkGrey = new THREE.MeshLambertMaterial({ color: 0xbabebc });
    const materialGreen = new THREE.MeshLambertMaterial({ color: 0x5ee7a1 });

    // Add Sky
    const sky = new THREE.Sky();
    sky.scale.setScalar( 450000 );
    scene.add( sky );

    // Add Sun Helper
    const sunSphere = new THREE.Mesh(
      new THREE.SphereBufferGeometry( 20000, 16, 8 ),
      new THREE.MeshBasicMaterial( { color: 0xffffff } )
    );
    sunSphere.position.y = - 700000;
    sunSphere.visible = false;
    scene.add( sunSphere );

    const effectController  = {
      turbidity: 10,
      rayleigh: 2,
      mieCoefficient: 0.025,
      mieDirectionalG: 0.562,
      luminance: 0.9,
      inclination: 0.334, // elevation / inclination
      azimuth: 0.2798, // Facing front,
      sun: ! false
    };

    const distance = 400000;

    let uniforms = sky.material.uniforms;
    uniforms[ "turbidity" ].value = effectController.turbidity;
    uniforms[ "rayleigh" ].value = effectController.rayleigh;
    uniforms[ "luminance" ].value = effectController.luminance;
    uniforms[ "mieCoefficient" ].value = effectController.mieCoefficient;
    uniforms[ "mieDirectionalG" ].value = effectController.mieDirectionalG;

    let theta = Math.PI * ( effectController.inclination - 0.5 );
    let phi = 2 * Math.PI * ( effectController.azimuth - 0.5 );
    sunSphere.position.x = distance * Math.cos( phi );
    sunSphere.position.y = distance * Math.sin( phi ) * Math.sin( theta );
    sunSphere.position.z = distance * Math.sin( phi ) * Math.cos( theta );
    sunSphere.visible = effectController.sun;
    uniforms[ "sunPosition" ].value.copy( sunSphere.position );
    renderer.render( scene, camera );

    scene.add( new THREE.AmbientLight( 0xffffff, 0.2 ) );

    const light = new THREE.PointLight( 0xffffff, 0.7 );
    camera.add( light );

    const dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
    dirLight.color.setHSL( 0.1, 1, 0.95 );
    dirLight.position.set( - 1, 1.75, 1 );
    dirLight.position.multiplyScalar( 30 );
    scene.add( dirLight );

    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    let d = 50;
    dirLight.shadow.camera.left = - d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = - d;
    dirLight.shadow.camera.far = 3500;
    dirLight.shadow.bias = - 0.0001;

    // *******************************************************************

    // set up the initial camera position and orbit controls
    camera.position.z = -245.03;
    camera.position.x = -63.6;
    camera.position.y = 77.69;
    camera.lookAt(scene.position);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.maxDistance = 300.0;
    controls.maxPolarAngle = Math.PI * 0.485;

    // add raycaster and mouse as 2D vector
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onMouseMove(event) {
      // calculate mouse position in normalized device coordinates
      // (-1 to +1) for both components
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      if (!scene) {
        return;
      }
      if (!scene.children) {
        return;
      }
      if (!scene.children[5]) {
        return;
      }

      const intersects = raycaster.intersectObjects(scene.children[5].children)
      if (intersects[0] && intersects[0].object.name.substring(0, 6) === "anchor") {

        if (anchorIds.includes(intersects[0].object.name.substring(6))) {
          document.querySelector('*').style.cursor = 'pointer';
        } else {
          document.querySelector('*').style.cursor = 'default';
        }

      } else {
        document.querySelector('*').style.cursor = 'default';
      }
    }

    function onDocumentTouchStart(event) {
      console.log('TOUCH -HAHAHA')
      event.preventDefault();

      event.clientX = event.touches[0].clientX;
      event.clientY = event.touches[0].clientY;

      onDocumentMouseDown(event);
    }

    function onDocumentMouseDown(event) {
      console.log('CLICK');
      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
      // update the picking ray with the camera and mouse position
      raycaster.setFromCamera(mouse, camera);

      if (!scene) {
        return;
      }
      if (!scene.children) {
        return;
      }

      if (!scene.children[5].children) {
        return;
      }


      // calculate objects intersecting the picking ray
      const intersects = raycaster.intersectObjects(scene.children[5].children);

      if (!intersects[0]) {
        return;
      }

      if (intersects[0].object.name.substring(0, 6) === "anchor") {

        if (anchorIds.includes(intersects[0].object.name.substring(6))) {
          this.props.getSelectedAnchorId(intersects[0].object.name.substring(6));
        };
      }
    }

    onDocumentMouseDown = onDocumentMouseDown.bind(this);

    const can = document.getElementsByTagName("canvas")[0];

    can.addEventListener( 'mousemove', onMouseMove, false );
    can.addEventListener( 'mousedown', onDocumentMouseDown, false );
    can.addEventListener( 'touchstart', onDocumentTouchStart, false );

    // *******************************************************************

    window.requestAnimationFrame(render);

    // game logic
    const update = function() {

    };

    const onLoad = gltf => {
      scene.add(gltf.scene);

      gltf.scene.traverse((children) => {
        const extrudeSettings = {
          depth: 16,
          bevelEnabled: true,
          bevelSegments: 1,
          steps: 2,
          bevelSize: 1,
          bevelThickness: 1
        };

        // the name of imported model by default comes with the prefix 'G-'
        // in order to remove the first 2 characters we do:
        let childName = children.name.split('');
        childName.splice(0, 2);

        if (childName.join('').substring(0, 6) === "anchor") {
          children.name = childName.join('');
          children.material = materialAnchor;

          // const originalGeo = children.geometry;

          // const newGeo = new THREE.ExtrudeGeometry(originalGeo, extrudeSettings);
          // newGeo.rotateX( Math.PI );

          // children.geometry = newGeo;
        }

        if (childName.join('') === "ocean") {
          children.name = childName.join('');
          children.material = materialOcean;
          children.material.side = THREE.DoubleSide;
        }

        if (childName.join('') === "dock") {
          children.name = childName.join('');
          children.material = materialDock;
          children.material.side = THREE.DoubleSide;
        }

        if (childName.join('') === "green_patch") {
          children.name = childName.join('');
          children.material = materialGreen;
          children.material.side = THREE.DoubleSide;
        }

        if (childName.join('').substring(0, 4) === "grey") {
          children.name = childName.join('');
          children.material = materialGrey;
          children.material.side = THREE.DoubleSide;
        }

        if (childName.join('').substring(0, 4) === "dark") {
          children.name = childName.join('');
          children.material = materialDarkGrey;
          children.material.side = THREE.DoubleSide;
        }

      });

      this.props.modelLoaded();


      // let waterGeo = scene.children[5].children[225].geometry;
      // let waterPos = scene.children[5].children[225].position;

      // const water = new THREE.Water(
      //   waterGeo,
      //   {
      //     textureWidth: 512,
      //     textureHeight: 512,

      //     waterNormals: new THREE.TextureLoader().load( "waternormals.jpeg", function ( texture ) {
      //       texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      //     } ),

      //     alpha: 1.0,
      //     sunDirection: dirLight.position.clone().normalize(),
      //     sunColor: 0xffffff,
      //     waterColor: 0x001e0f,
      //     distortionScale: 3.7,
      //     fog: scene.fog !== undefined
      //   }
      // );
      // water.rotation.x = - Math.PI / 2;
      // scene.add( water );

      // scene.children[5].children[225].remove();

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