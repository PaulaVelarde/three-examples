/**
 * Chapter 7. Branch.
 *
 * This script create a fractal of branchs showing how use the THREE.Object3D
 * module to grouping objects.
 */

/* global $, THREE */
'use strict';

var scene, camera, renderer;
var canvas;

function setup () {
  scene = new THREE.Scene();

  var aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
  camera.position.z = 55;

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

// Recursive function to create a branch:
//  1. Put a box in the parent
//  2. Create four objects (branch)
//    2.1 Each branch is translated the length of the box to up
//    2.2 Scaled with an amount
//    2.3 And rotated!
function createBranch (root, depth) {
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
