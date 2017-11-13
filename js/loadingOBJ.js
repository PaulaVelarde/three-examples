/**
 * Chapter 7. Loading OBJ.
 */

/* global $, THREE */
'use strict';

var scene, camera, renderer;
var controls;
var canvas;

function setup () {
  scene = new THREE.Scene();

  var aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000);
  camera.position.z = 10;

  controls = new THREE.TrackballControls(camera);

  canvas = document.getElementsByTagName('canvas')[0];
  renderer = new THREE.WebGLRenderer({
    canvas    : canvas,
    antialias : true,
    alpha     : true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  $(window).on('resize', onWindowResize);
}

function lightSetup() {
  var ambient = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambient);

  // Key fill rim
  var keyLight = new THREE.DirectionalLight(0xffffff, 0.7);
  keyLight.position.set( -35, 30, 35 );

  var fillLight = new THREE.DirectionalLight(0xffffff, 0.1);
  fillLight.position.set(30, 20, 20);

  var rimLight = new THREE.DirectionalLight(0xffffff, 0.3);
  rimLight.position.set( -10, 30, -30 );

  scene.add(keyLight);
  scene.add(fillLight);
  scene.add(rimLight);
}

function onLoadOBJ ( group ) {
  headMesh = group.children[0];
  headMesh.position.y += 6;

  // Transform from buffergeometry to geometry
  var headGeometry = new THREE.Geometry();
  headGeometry.fromBufferGeometry(headMesh.geometry);
  headGeometry.mergeVertices();

  headMesh.geometry = headGeometry;

  // Change the material of the mesh
  headMesh.material = new THREE.MeshPhongMaterial({
    color        : 0x42c2d1,
    emissive     : 0x00ffd8,
    shininess    : 40,
    shading      : THREE.SmoothShading,
    envMap       : scene.background,
    reflectivity : 0.6
  });

  headMesh.scale.set(5, 5, 5);

  scene.add(headMesh);
}

function loadCubeMap (prefix, format) {
  var urls = [
    prefix + 'px' + format,
    prefix + 'nx' + format,
    prefix + 'py' + format,
    prefix + 'ny' + format,
    prefix + 'pz' + format,
    prefix + 'nz' + format
  ];

  var envCube = new THREE.CubeTextureLoader().load( urls );
  envCube.format = THREE.RGBFormat;
  scene.background = envCube;
}

function onWindowResize () {
  var aspectRatio = window.innerWidth / window.innerHeight;
  camera.aspect = aspectRatio;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate () {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

$(document).ready(function () {
  setup();
  lightSetup();

  animate();
});
