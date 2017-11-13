/**
 * Chapter 7. Simple example.
 *
 * This script setup a simple configuration for a ThreeJS scene.
 */

/* global $, THREE */
'use strict';

var scene, camera, renderer;
var box;

function setup () {
  scene = new THREE.Scene();

  var aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
