/**
 * Chapter 7. Object 3D.
 *
 * This script show how use the THREE.Object3D module to grouping objects.
 * Groping four boxes in the following graph:
 *
 *         (scene)
 *       /         \
 *    (group1)    (group2)
 *    /      \     /     \
 * (boxA) (boxB) (boxC) (boxD)
 */

/* global $, THREE */
'use strict';

var scene, camera, renderer;
var canvas;

function setup () {
  scene = new THREE.Scene();

  var aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
  camera.position.z = 30;

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

function animate () {
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
  animate();
});
