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
    // Animation for the title
    gsap.from(".text-animation", {
      duration: 1.4,
      y: -50, // Start from a specific Y position, e.g., off-screen
      opacity: 0, // Start with 0 opacity
      stagger: 0.1, // Stagger the animations by 0.1 seconds between elements
      ease: "power2.inOut", // Use the "power2.inOut" easing function
    });
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
    controls.enableZoom = false; // Disable zoom

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

  return (
    <div className="container relative w-full h-full">
      <div className="ml-20 text absolute top-0 left-0 w-1/2 h-full flex flex-col justify-center text-animation ">
        <h1 className="text-6xl font-customFont font-bold text-black text-center pb-5 text-animation">
          <span className="text-animation text-6xl font-customFont font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent text-center pb-5">
            Flutter&nbsp;
          </span>
          Development Services
        </h1>
        <p className="text-animation px-0 mb-8 text-lg text-black-600 md:text-xl lg:px-24 text-center">
          Powered by Google, Flutter is an open-source UI framework to build
          native-like, flexible, and graphically-enhanced cross-platform apps
          for web, mobile, and desktop using a single codebase
        </p>
      </div>

      <div id="canvas-container" />
    </div>
  );
};

export default MobileSection;
