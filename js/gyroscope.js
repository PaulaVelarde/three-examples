/**
 * Chapter 7. Object 3D.
 *
 * This script show how use the THREE.Object3D module to grouping objects, and
 * create a gyrosope.
 */

/* global $, THREE */
'use strict';

var TWO_PI = Math.PI * 2.0;

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

function createRing (radius) {
  var object = new THREE.Object3D();

  for (var theta = 0; theta <= TWO_PI; theta += 0.01) {
    var box = new THREE.Mesh(geometry, material);

    box.position.x = Math.cos(theta) * radius;
    box.position.y = Math.sin(theta) * radius;

    object.add(box);
  }

  return object;
}

$(document).ready(function () {
  setup();
  animate();
});
