import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import gsap from "gsap";

const gltfLoader = new GLTFLoader();

const MobileSection = () => {
  const [scene] = useState(new THREE.Scene());
  const [camera] = useState(
    new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )
  );
  const [renderer] = useState(
    new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
  );

  useEffect(() => {
    // Debug
    /*   setGui(new dat.GUI()); */
    // Inside your useEffect
    // Load your BMFont file

    // Canvas
    const canvas = renderer.domElement;
    const container = document.getElementById("canvas-container");
    container.appendChild(canvas);

    // Load the 3D model
    let tl = gsap.timeline();
    gltfLoader.load("/mobile-flutter3.gltf", (gltf) => {
      scene.add(gltf.scene);
      gltf.scene.scale.set(0.3, 0.3, 0.3);
      gltf.scene.rotation.set(0, 3.3, 0);

      tl.to(gltf.scene.rotation, { y: 4.7, duration: 1 });
      tl.to(gltf.scene.scale, { x: 0.2, y: 0.2, z: 0.2, duration: 1 }, "-=1");
      tl.to(gltf.scene.position, { x: 0.5 });
      tl.to(gltf.scene.rotation, { y: 4.1, duration: 1 });
      tl.to(
        gltf.scene.scale,
        { x: 0.25, y: 0.25, z: 0.25, duration: 1 },
        "-=1"
      );

      /*   gui.add(gltf.scene.rotation, "x").min(0).max(9);
      gui.add(gltf.scene.rotation, "y").min(0).max(9);
      gui.add(gltf.scene.rotation, "z").min(0).max(9); */
    });

    // Lights
    const pointLight = new THREE.AmbientLight(0xffffff, 1);
    pointLight.position.x = 2;
    pointLight.position.y = 3;
    pointLight.position.z = 4;
    scene.add(pointLight);

    /**
     * Sizes
     */
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    window.addEventListener("resize", () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    /**
     * Camera
     */
    // Base camera
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 1;
    scene.add(camera);

    // Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    /**
     * Renderer
     */
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Append renderer to the container
    container.appendChild(renderer.domElement);

    /**
     * Animate
     */

    const tick = () => {
      // Update Orbital Controls
      controls.update();

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }, [scene, camera, renderer]);

  return <div id="canvas-container" />;
};

export default MobileSection;
