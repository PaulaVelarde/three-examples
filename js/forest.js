/**
 * Chapter 7. Branch.
 *
 * This script create a tree and show how have multiple cameras.
 */

/* global $, THREE */
'use strict';

var scene, renderer, camera;
var canvas;

var geometry;
var material;

// Fractal parameters
var fractalParams = {
  length : 20,
  scale  : 0.6,
  theta  : 0.5
};

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

function setupObjects() {
  geometry = new THREE.BoxGeometry(1, fractalParams.length, 1);
  material = new THREE.MeshNormalMaterial();

  // Crate a "forest"
  var nTrees = 20;
  for (var i = 0; i < nTrees; i++) {
    var tree = new THREE.Object3D();
    createBranch(tree, 3);
    scene.add(tree);

    tree.position.y = -fractalParams.length;
    tree.position.x = (Math.random() * 100) - 50;
    tree.position.z = (Math.random() * 100) - 50;

    tree.rotation.y = Math.random() * Math.PI * 2.0;
  }
}

// Recursive function to create a branch:
//  1. Put a box in the parent
//  2. Create four objects (branch)
//    2.1 Each branch is translated the length of the box to up
//    2.2 Scaled with an amount
//    2.3 And rotated!
function createBranch (root, depth) {
  var box = new THREE.Mesh(geometry, material);
  box.position.y = fractalParams.length / 2;
  root.add(box);

  // Verify if the depth is reach.
  // BEWARE: This condition allow us avoid an infinite loop
  if (depth > 0) {

    // Create the four branches
    var branchA = new THREE.Object3D();
    branchA.position.y = fractalParams.length;
    branchA.scale.set(fractalParams.scale, fractalParams.scale, fractalParams.scale);
    branchA.rotation.z = fractalParams.theta;

    var branchB = new THREE.Object3D();
    branchB.position.y = fractalParams.length;
    branchB.scale.set(fractalParams.scale, fractalParams.scale, fractalParams.scale);
    branchB.rotation.z = -fractalParams.theta;

    var branchC = new THREE.Object3D();
    branchC.position.y = fractalParams.length;
    branchC.scale.set(fractalParams.scale, fractalParams.scale, fractalParams.scale);
    branchC.rotation.x = fractalParams.theta;

    var branchD = new THREE.Object3D();
    branchD.position.y = fractalParams.length;
    branchD.scale.set(fractalParams.scale, fractalParams.scale, fractalParams.scale);
    branchD.rotation.x = -fractalParams.theta;

    // Add the four new branch objects to the parent (that itself is a branch)
    root.add(branchA);
    root.add(branchB);
    root.add(branchC);
    root.add(branchD);

    // WTF! A function calling itself => Yeah! RECURSION! :)
    createBranch(branchA, depth - 1);
    createBranch(branchB, depth - 1);
    createBranch(branchC, depth - 1);
    createBranch(branchD, depth - 1);
  }
}

function onWindowResize () {
  var aspectRatio = window.innerWidth / window.innerHeight;
  for (var i = 0; i < cameras.length; i++) {
    cameras[i].aspect = aspectRatio;
    cameras[i].updateProjectionMatrix();
  }

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate () {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

$(document).ready(function () {
  setup();
  setupObjects();

  animate();
});
