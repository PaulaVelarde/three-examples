/**
 * Chapter 7. Interactive.
 *
 * This script show how use Raycaster module from THREEJS.
 */

/* global $, THREE, AudioContext */
'use strict';

var scene, camera, renderer;
var controls;

var heads, monkeys, musicians;
var headGeom, monkeyGeom, beethovenGeom;

var materials = {
  head : new THREE.MeshLambertMaterial({
    color   : 0x0bd1ef,
    shading : THREE.SmoothShading,
    side    : THREE.DoubleSide
  }),

  beethoven : new THREE.MeshLambertMaterial({
    color    : 0xb20091,
    emissive : 0x1e0060,
    side     : THREE.DoubleSide
  }),

  monkey    :  new THREE.MeshLambertMaterial({
    color    : 0xffff00,
    emissive : 0x9b2c00,
    side     : THREE.DoubleSide
  }),

  selected : new THREE.MeshLambertMaterial({
    color : 0xff0000,
    side  : THREE.DoubleSide
  })
};

function setup () {
  scene = new THREE.Scene();

  var aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(70, aspect, 1, 10000);
  camera.position.z = 300;

  var canvas = document.getElementsByTagName('canvas')[0];
  renderer = new THREE.WebGLRenderer({
    canvas    : canvas,
    antialias : true,
    alpha     : true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  controls = new THREE.TrackballControls( camera );
  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;
  controls.noZoom = false;
  controls.noPan = false;
  controls.staticMoving = true;
  controls.dynamicDampingFactor = 0.3;

  $(window).on('resize', onWindowResize);

  // Lights
  scene.add(new THREE.AmbientLight(0x505050, 0.5));

  var light = new THREE.DirectionalLight(0xffffff, 1.1);
  light.position.set(1, 1, 1).normalize();
  scene.add(light);
}

function setupObjects() {
  // Create objects
  heads     = new THREE.Object3D();
  monkeys   = new THREE.Object3D();
  musicians = new THREE.Object3D();

  scene.add(heads);
  scene.add(monkeys);
  scene.add(musicians);

  var onLoadModels = function () {
    for (var i = 0; i < 100; i++) {
      var head = new THREE.Mesh(headGeom, materials.head);
      randomize(head, 3.0, 4.0);
      heads.add(head);

      var musician = new THREE.Mesh(beethovenGeom, materials.beethoven);
      randomize(musician, 1.0, 3.0);
      musicians.add(musician);

      var monkey = new THREE.Mesh(monkeyGeom, materials.monkey);
      randomize(monkey, 1.0, 10.0);
      monkeys.add(monkey);
    }
  };

  loadModels(onLoadModels);
}

function randomize (mesh, minScale, maxScale) {
  mesh.position.x = Math.random() * 250 - 125;
  mesh.position.y = Math.random() * 250 - 125;
  mesh.position.z = Math.random() * 250 - 125;

  var scale = (Math.random() * (maxScale - minScale)) + minScale;
  mesh.scale.set(scale, scale, scale);
  mesh.originalScale = scale;

  mesh.rotation.x = Math.random() * 2 * Math.PI;
  mesh.rotation.y = Math.random() * 2 * Math.PI;
  mesh.rotation.z = Math.random() * 2 * Math.PI;
}

function loadModels (callback) {
  var manager = new THREE.LoadingManager();
  manager.onProgress = function ( item, loaded, total ) {
    console.log(item, loaded, total);

    if (loaded === total) {
      callback();
    }
  };

  var loader = new THREE.OBJLoader(manager);
  loader.load('models/head.obj', function (object) {
    headGeom = getGeometry(object.children[0]);
  });

  loader.load('models/beethoven.obj', function (object) {
    beethovenGeom = getGeometry(object.children[0]);
  });

  loader.load('models/monkey.obj', function (object) {
    monkeyGeom = getGeometry(object.children[0]);
  });
}

function getGeometry (mesh) {
  var geometry = new THREE.Geometry();
  geometry.fromBufferGeometry(mesh.geometry);
  geometry.mergeVertices();

  return geometry;
}

function animate () {
  controls.update();

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function onWindowResize () {
  var aspectRatio = window.innerWidth / window.innerHeight;
  camera.aspect = aspectRatio;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

$(document).ready(function () {
  setup();
  setupObjects();

  animate();
});
