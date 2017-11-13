/**
 * Chapter 7. Materials.
 */

/* global $, THREE */
'use strict';

var scene, camera, renderer;
var canvas;

var ambientLight;

function setup () {
  scene = new THREE.Scene();

  var aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000);
  camera.position.z = 10;

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

function onWindowResize () {
  var aspectRatio = window.innerWidth / window.innerHeight;
  camera.aspect = aspectRatio;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate () {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

$(document).ready(function () {
  setup();
  animate();
});
