import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import { Draggable } from "gsap/Draggable";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";

gsap.registerPlugin(ScrollTrigger, Draggable);

const clutterAnimation = (element) => {
  const htmlTag = document.querySelector(element);
  let clutter = "";

  // Wraps each letter in a div with a class for animation
  htmlTag.textContent
    .trim()
    .split("")
    .forEach((word) => {
      clutter += `<div class="inline-block">${word}</div>`;
    });

  // Replaces the element's content with the animated divs
  htmlTag.innerHTML = clutter;
};

gsap.registerPlugin(ScrollTrigger);

/**
 * Scene
 */
const scene = new THREE.Scene();
const heatGlobeGroup = new THREE.Group();
scene.add(heatGlobeGroup);

// const gui = new GUI();

// Canvas
const canvas = document.querySelector(".webgl");

/**
 * Loader
 */
const textureLoader = new THREE.TextureLoader();
const heathyTexture = textureLoader.load("textures/heathy.jpg");

// Heat textures
const heatTextures = [
  "textures/Heat/2024.png",
  "textures/Heat/2030.png",
  "textures/Heat/2040.png",
  "textures/Heat/2050.png",
  "textures/Heat/2060.png",
  "textures/Heat/2070.png",
  "textures/Heat/2080.png",
  "textures/Heat/2090.png",
  "textures/Heat/2100.png",
];

const loadedHeatTextures = heatTextures.map((texture) => {
  const t = textureLoader.load(texture);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
});

// CO2 textures
const CO2Textures = [
  "textures/CO2/2024.png",
  "textures/CO2/2030.png",
  "textures/CO2/2040.png",
  "textures/CO2/2050.png",
  "textures/CO2/2060.png",
  "textures/CO2/2070.png",
  "textures/CO2/2080.png",
  "textures/CO2/2090.png",
  "textures/CO2/2100.png",
];

const loadedCO2Textures = CO2Textures.map((texture) => {
  const t = textureLoader.load(texture);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
});

/**
 * heatGlobe
 */
const heatGlobeGeometry = new THREE.IcosahedronGeometry(1.6, 32);
const heatGlobeMaterial = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    uTextures: new THREE.Uniform(loadedHeatTextures[0]),
    uPrevTextures: new THREE.Uniform(loadedHeatTextures[0]),
    uAlpha: new THREE.Uniform(1),
  },
});

const heatGlobe = new THREE.Mesh(heatGlobeGeometry, heatGlobeMaterial);
heatGlobe.scale.set(0.8, 0.8, 0.8);
// heatGlobe.position.y = 0.4;
heatGlobe.position.x = 0;
heatGlobeGroup.add(heatGlobe);
heatGlobe.rotation.z = 0.4;

/**
 * Sizes
 */
const canvasContainer = document.querySelector(".globe-model");
const sizes = {};

sizes.width = canvasContainer.offsetWidth;
sizes.height = canvasContainer.offsetHeight;

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 4.5;
// camera.position.y = 2;
// camera.position.x = -2;
scene.add(camera);

/**
 * Resize
 */
window.addEventListener("resize", () => {
  sizes.width = canvasContainer.offsetWidth;
  sizes.height = canvasContainer.offsetHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
  renderer.setSize(sizes.width, sizes.height);
});

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: true,
});
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
renderer.setSize(sizes.width, sizes.height);

/**
 * Controls
 */
const controls = new OrbitControls(camera, canvas);
controls.enableZoom = false;
controls.enablePan = false;
controls.enableDamping = true;
controls.minPolarAngle = 0.4 * Math.PI;
controls.maxPolarAngle = 0.4 * Math.PI;
controls.dampingFactor = 0.05;

/**
 * Clock
 */
let time = Date.now();

const clock = new THREE.Clock();
/**
 * Tick
 */
const tick = () => {
  // Time
  const currentTime = Date.now();
  const deltaTime = currentTime - time;
  time = currentTime;

  const getElaspedTime = clock.getElapsedTime();

  heatGlobe.rotation.y = getElaspedTime * 0.4;

  renderer.render(scene, camera);
  controls.update();
  requestAnimationFrame(tick);
};
tick();

const page2Tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".page2",
    scroller: "body",
    start: "top 0",
    end: "top -50%",
    scrub: 1,
    // markers: true,
  },
});

page2Tl.from(
  heatGlobe.position,
  {
    x: 2,
  },
  "g"
);

page2Tl.from(
  heatGlobe.scale,
  {
    x: 0,
    y: 0,
    z: 0,
  },
  "g"
);

let flag = "heat";
let globalIndex = 0;
let prevIndex = 0;
const switchHeatAndCO2 = () => {
  const heat = document.querySelector(".heat");
  heat.addEventListener("click", () => {
    console.log(prevIndex, globalIndex);
    gsap.from(heatGlobeMaterial.uniforms.uAlpha, {
      value: 0,
      duration: 1,
    });
    heatGlobeMaterial.uniforms.uPrevTextures.value =
      loadedHeatTextures[prevIndex];
    heatGlobeMaterial.uniforms.uTextures.value =
      loadedHeatTextures[globalIndex];

    const tl = gsap.timeline();
    tl.to(".switch-co2-bar", {
      width: "0",
    });
    tl.to(".switch-heat-bar", {
      width: "100%",
    });
    flag = "heat";
  });
  const co2 = document.querySelector(".co2");
  co2.addEventListener("click", () => {
    console.log(prevIndex, globalIndex);
    gsap.from(heatGlobeMaterial.uniforms.uAlpha, {
      value: 0,
      duration: 1,
    });
    heatGlobeMaterial.uniforms.uPrevTextures.value =
      loadedCO2Textures[prevIndex];
    heatGlobeMaterial.uniforms.uTextures.value = loadedCO2Textures[globalIndex];

    const tl = gsap.timeline();
    tl.to(".switch-heat-bar", {
      width: "0%",
    });
    tl.to(".switch-co2-bar", {
      width: "100%",
    });

    flag = "co2";
  });

  const heat2 = document.querySelector(".heat2");
  heat2.addEventListener("click", () => {
    heatGlobeMaterial.uniforms.uTextures.value =
      loadedHeatTextures[canvasIndex];
    if (canvasIndex === 0) {
      heatGlobeMaterial.uniforms.uTextures.value = loadedHeatTextures[0];
      heatGlobeMaterial.uniforms.uAlpha.value = 1;
    } else if (canvasIndex === 1) {
      heatGlobeMaterial.uniforms.uTextures.value = heathyTexture;
      heatGlobeMaterial.uniforms.uAlpha.value = 0.3;
    } else if (canvasIndex === 2) {
      heatGlobeMaterial.uniforms.uTextures.value = heathyTexture;
      heatGlobeMaterial.uniforms.uAlpha.value = 0.4;
    } else if (canvasIndex === 3) {
      heatGlobeMaterial.uniforms.uTextures.value = heathyTexture;
      heatGlobeMaterial.uniforms.uAlpha.value = 0.5;
    } else if (canvasIndex === 4) {
      heatGlobeMaterial.uniforms.uTextures.value = heathyTexture;
      heatGlobeMaterial.uniforms.uAlpha.value = 0.6;
    } else if (canvasIndex === 5) {
      heatGlobeMaterial.uniforms.uTextures.value = heathyTexture;
      heatGlobeMaterial.uniforms.uAlpha.value = 0.7;
    } else if (canvasIndex === 6) {
      heatGlobeMaterial.uniforms.uTextures.value = heathyTexture;
      heatGlobeMaterial.uniforms.uAlpha.value = 0.8;
    } else if (canvasIndex === 7) {
      heatGlobeMaterial.uniforms.uTextures.value = heathyTexture;
      heatGlobeMaterial.uniforms.uAlpha.value = 0.9;
    } else if (canvasIndex === 8) {
      heatGlobeMaterial.uniforms.uTextures.value = heathyTexture;
      heatGlobeMaterial.uniforms.uAlpha.value = 1;
    }

    const tl = gsap.timeline();
    tl.to(".switch-co2-bar2", {
      width: "0",
    });
    tl.to(".switch-heat-bar2", {
      width: "100%",
    });
    flag = "heat";
  });
  const co22 = document.querySelector(".co22");
  co22.addEventListener("click", () => {
    heatGlobeMaterial.uniforms.uTextures.value = loadedCO2Textures[canvasIndex];
    if (canvasIndex === 0) {
      heatGlobeMaterial.uniforms.uTextures.value = loadedCO2Textures[0];
      heatGlobeMaterial.uniforms.uAlpha.value = 1;
    } else if (canvasIndex === 1) {
      heatGlobeMaterial.uniforms.uTextures.value = heathyTexture;
      heatGlobeMaterial.uniforms.uAlpha.value = 0.3;
    } else if (canvasIndex === 2) {
      heatGlobeMaterial.uniforms.uTextures.value = heathyTexture;
      heatGlobeMaterial.uniforms.uAlpha.value = 0.4;
    } else if (canvasIndex === 3) {
      heatGlobeMaterial.uniforms.uTextures.value = heathyTexture;
      heatGlobeMaterial.uniforms.uAlpha.value = 0.5;
    } else if (canvasIndex === 4) {
      heatGlobeMaterial.uniforms.uTextures.value = heathyTexture;
      heatGlobeMaterial.uniforms.uAlpha.value = 0.6;
    } else if (canvasIndex === 5) {
      heatGlobeMaterial.uniforms.uTextures.value = heathyTexture;
      heatGlobeMaterial.uniforms.uAlpha.value = 0.7;
    } else if (canvasIndex === 6) {
      heatGlobeMaterial.uniforms.uTextures.value = heathyTexture;
      heatGlobeMaterial.uniforms.uAlpha.value = 0.8;
    } else if (canvasIndex === 7) {
      heatGlobeMaterial.uniforms.uTextures.value = heathyTexture;
      heatGlobeMaterial.uniforms.uAlpha.value = 0.9;
    } else if (canvasIndex === 8) {
      heatGlobeMaterial.uniforms.uTextures.value = heathyTexture;
      heatGlobeMaterial.uniforms.uAlpha.value = 1;
    }

    // heatGlobeMaterial.uniforms.uTextures.value = loadedCO2Textures[canvasIndex];

    const tl = gsap.timeline();
    tl.to(".switch-heat-bar2", {
      width: "0%",
    });
    tl.to(".switch-co2-bar2", {
      width: "100%",
    });
    flag = "co2";
  });
};
switchHeatAndCO2();

const scrubableBar = () => {
  function getNormalizedLeftValue(element, minRange, maxRange) {
    // Get the bounding client rectangle of the element
    var rect = element.getBoundingClientRect();

    // Get the left position
    var left = rect.left;

    // Define the maximum and minimum possible values for the left position in the current viewport
    var minValue = 0; // Minimum value of the left position
    var maxValue = window.innerWidth; // Maximum value of the left position, assuming full viewport width

    // Normalize the left position to a value between minRange and maxRange
    var normalizedLeft =
      ((left - minValue) / (maxValue - minValue)) * (maxRange - minRange) +
      minRange;

    // Round the normalized value to get an integer between minRange and maxRange
    normalizedLeft = Math.round(normalizedLeft);

    return normalizedLeft;
  }

  Draggable.create(".main-circle", {
    type: "x",
    bounds: ".bound",
    onDrag: () => {
      const bar = document.querySelector(".main-circle");

      console.log(bar.style.transform);

      var normalizedLeft = getNormalizedLeftValue(bar, -2, 24);
      // prevIndex = globalIndex;

      if (flag === "heat") {
        gsap.from(heatGlobeMaterial.uniforms.uAlpha, {
          value: 0,
          duration: 1,
        });
        heatGlobeMaterial.uniforms.uPrevTextures.value =
          loadedHeatTextures[Math.abs(normalizedLeft)];
        heatGlobeMaterial.uniforms.uTextures.value =
          loadedHeatTextures[Math.abs(normalizedLeft - 1)];
      } else if (flag === "co2") {
        gsap.from(heatGlobeMaterial.uniforms.uAlpha, {
          value: 0,
          duration: 1,
        });
        heatGlobeMaterial.uniforms.uPrevTextures.value =
          loadedCO2Textures[Math.abs(normalizedLeft)];
        heatGlobeMaterial.uniforms.uTextures.value =
          loadedCO2Textures[Math.abs(normalizedLeft - 1)];
      }

      prevIndex = Math.abs(normalizedLeft - 1);
      globalIndex = Math.abs(normalizedLeft);
    },
  });
};
scrubableBar();

const pointerBlinkWithCicrcle = () => {
  const tl = gsap.timeline();

  tl.to(".main-circle", {
    scale: 0.3,
    ease: "linear",
    duration: 0.5,
  });

  tl.to(
    ".main-circle",
    {
      scale: 1,
      ease: "linear",
      duration: 0.5,
    },
    "same"
  );
  tl.from(
    ".inner-circle",
    {
      height: "300%",
      width: "300%",
      opacity: 1,
      ease: "power3.out",
      duration: 0.5,
    },
    "same"
  );
  tl.to(".main-circle", {
    scale: 0.3,
    ease: "linear",
    duration: 0.5,
  });
  tl.to(".main-circle", {
    scale: 1,
    ease: "linear",
    duration: 0.5,
  });
  tl.from(
    ".inner-circle",
    {
      height: "300%",
      width: "300%",
      opacity: 1,
      ease: "power3.out",
      duration: 0.5,
    },
    "same"
  );
  tl.to(".main-circle", {
    scale: 0.3,
    ease: "linear",
    duration: 0.5,
  });
  tl.to(".main-circle", {
    scale: 1,
    ease: "linear",
    duration: 0.5,
  });
  tl.from(
    ".inner-circle",
    {
      height: "300%",
      width: "300%",
      opacity: 1,
      ease: "power3.out",
      duration: 0.5,
    },
    "same"
  );
  tl.to(".inner-circle", {
    opacity: 0,
  });
};
const pointerBlinkWithoutCicrcle = () => {
  const tl = gsap.timeline();

  tl.to(".main-circle", {
    scale: 0.3,
    ease: "linear",
    duration: 0.5,
  });

  tl.to(
    ".main-circle",
    {
      scale: 1,
      ease: "linear",
      duration: 0.5,
    },
    "same"
  );

  tl.to(".main-circle", {
    scale: 0.3,
    ease: "linear",
    duration: 0.5,
  });
  tl.to(".main-circle", {
    scale: 1,
    ease: "linear",
    duration: 0.5,
  });

  tl.to(".main-circle", {
    scale: 0.3,
    ease: "linear",
    duration: 0.5,
  });
  tl.to(".main-circle", {
    scale: 1,
    ease: "linear",
    duration: 0.5,
  });

  tl.to(".inner-circle", {
    opacity: 0,
  });
};

const yearsAnimation = () => {
  const allYears = document.querySelectorAll(".years > div");
  allYears.forEach((year, index) => {
    year.addEventListener("click", () => {
      prevIndex = globalIndex;
      if (index === 0) {
        gsap.to(".main-circle", {
          transform: "translate3d(1px, 0px, 0px)",
          // left: 0 + "%",
          onComplete: () => {
            if (index === 0 || index === 8) {
              pointerBlinkWithoutCicrcle();
            } else {
              pointerBlinkWithCicrcle();
            }
          },
        });
      } else if (index === 1) {
        gsap.to(".main-circle", {
          transform: "translate3d(78px, 0px, 0px)",

          // left: 12 + "%",
          onComplete: () => {
            if (index === 0 || index === 8) {
              pointerBlinkWithoutCicrcle();
            } else {
              pointerBlinkWithCicrcle();
            }
          },
        });
      } else if (index === 2) {
        gsap.to(".main-circle", {
          transform: "translate3d(154px, 0px, 0px)",
          // left: 24.2 + "%",
          onComplete: () => {
            if (index === 0 || index === 8) {
              pointerBlinkWithoutCicrcle();
            } else {
              pointerBlinkWithCicrcle();
            }
          },
        });
      } else if (index === 3) {
        gsap.to(".main-circle", {
          // left: 36.5 + "%",
          transform: "translate3d(230px, 0px, 0px)",

          onComplete: () => {
            if (index === 0 || index === 8) {
              pointerBlinkWithoutCicrcle();
            } else {
              pointerBlinkWithCicrcle();
            }
          },
        });
      } else if (index === 4) {
        gsap.to(".main-circle", {
          // left: 48.6 + "%",
          transform: "translate3d(308px, 0px, 0px)",

          onComplete: () => {
            if (index === 0 || index === 8) {
              pointerBlinkWithoutCicrcle();
            } else {
              pointerBlinkWithCicrcle();
            }
          },
        });
      } else if (index === 5) {
        gsap.to(".main-circle", {
          // left: 60.4 + "%",
          transform: "translate3d(385px, 0px, 0px)",

          onComplete: () => {
            if (index === 0 || index === 8) {
              pointerBlinkWithoutCicrcle();
            } else {
              pointerBlinkWithCicrcle();
            }
          },
        });
      } else if (index === 6) {
        gsap.to(".main-circle", {
          // left: 72.9 + "%",
          transform: "translate3d(461px, 0px, 0px)",

          onComplete: () => {
            if (index === 0 || index === 8) {
              pointerBlinkWithoutCicrcle();
            } else {
              pointerBlinkWithCicrcle();
            }
          },
        });
      } else if (index === 7) {
        gsap.to(".main-circle", {
          // left: 85 + "%",
          transform: "translate3d(538px, 0px, 0px)",

          onComplete: () => {
            if (index === 0 || index === 8) {
              pointerBlinkWithoutCicrcle();
            } else {
              pointerBlinkWithCicrcle();
            }
          },
        });
      } else if (index === 8) {
        gsap.to(".main-circle", {
          // left: 96.9 + "%",
          transform: "translate3d(615px, 0px, 0px)",

          onComplete: () => {
            if (index === 0 || index === 8) {
              pointerBlinkWithoutCicrcle();
            } else {
              pointerBlinkWithCicrcle();
            }
          },
        });
      }
      if (flag === "heat") {
        gsap.from(heatGlobeMaterial.uniforms.uAlpha, {
          value: 0,
          duration: 1.5,
        });
        heatGlobeMaterial.uniforms.uPrevTextures.value =
          loadedHeatTextures[prevIndex];
        heatGlobeMaterial.uniforms.uTextures.value = loadedHeatTextures[index];
      }
      if (flag === "co2") {
        gsap.from(heatGlobeMaterial.uniforms.uAlpha, {
          value: 0,
          duration: 1.5,
        });
        heatGlobeMaterial.uniforms.uPrevTextures.value =
          loadedCO2Textures[prevIndex];
        heatGlobeMaterial.uniforms.uTextures.value = loadedCO2Textures[index];
      }
      globalIndex = index;
    });
  });
};
yearsAnimation();

let canvasIndex = 0;
const canvasAnimation = () => {
  const canvas = document.querySelector(".page3 canvas");
  const context = canvas.getContext("2d");

  const page2Right = document
    .querySelector(".page3-right")
    .getBoundingClientRect();

  const mediaQuery = window.matchMedia("(max-width: 768px)");

  // // Function to handle changes
  function handleViewportChange(event) {
    if (event.matches) {
      // The viewport is 768px or less
      console.log("Viewport is 768px or less");
      // Add your code here to handle the change
    } else {
      // The viewport is wider than 768px
      console.log("Viewport is wider than 768px");
      // Add your code here to handle the change
    }
  }

  // // Check the initial state
  if (mediaQuery.matches) {
    canvas.width = page2Right.width + 750;
    canvas.height = page2Right.height + 100;
  } else {
    canvas.width = page2Right.width + 350;
    canvas.height = page2Right.height + 100;
  }

  // // Add event listener
  mediaQuery.addEventListener("change", handleViewportChange);

  window.addEventListener("resize", function () {
    canvas.width = page2Right.width + 350;
    canvas.height = page2Right.height + 100;
    render();
  });

  let renderImg = ``;
  const frameCount = 320;

  for (let i = 0; i < frameCount; i++) {
    renderImg += `temp/frame${i}.png
    `;
  }

  function files(index) {
    var data = renderImg;
    return data.split("\n")[index];
  }

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: 0.15,
      trigger: `.page3 canvas`,
      //   set start end according to preference
      start: `top top`,
      end: `top -250%`,
      scroller: `body`,
    },
    onUpdate: render,
  });

  gsap.to(".page3-line", {
    width: "0%",
    scrollTrigger: {
      scrub: 0.15,
      trigger: `.page3 canvas`,
      //   set start end according to preference
      start: `top top`,
      end: `top -250%`,
      scroller: `body`,
    },
  });

  images[1].onload = render;

  clutterAnimation(".page3-right-point1>h3");

  clutterAnimation(".page3-right-point2>.para2-text>.f");
  clutterAnimation(".page3-right-point2>.para2-text>.s");
  clutterAnimation(".page3-right-point2>.para2-text>.j");
  clutterAnimation(".page3-right-para1>h3");

  const tl = gsap.timeline({
    scrollTrigger: {
      scrub: 0.15,
      trigger: `.page3 canvas`,
      //   set start end according to preference
      start: `top -30%`,
      end: `top -50%`,
      scroller: `body`,
    },
  });

  tl.from(".page3-right-para1>h3>div", {
    opacity: 0,
    stagger: {
      amount: 0.8,
      from: "x",
    },
  });

  tl.to(".page3-line-point1", {
    scale: 1,
  });
  tl.to(".page3-right-point1>h3>div", {
    opacity: 1,
    scale: 1,
    stagger: {
      amount: 0.5,
    },
  });

  const tl2 = gsap.timeline({
    scrollTrigger: {
      scrub: 0.15,
      trigger: `.page3 canvas`,
      //   set start end according to preference
      start: `top -170%`,
      end: `top -200%`,
      scroller: `body`,
    },
  });
  tl2.to(".page3-line-point2", {
    scale: 1,
  });
  tl2.to(
    ".page3-right-point2>.para2-text>.f>div",
    {
      opacity: 1,
      scale: 1,
      stagger: {
        amount: 0.5,
      },
    },
    "k"
  );
  tl2.to(
    ".page3-right-point2>.para2-text>.s>div",
    {
      opacity: 1,
      scale: 1,
      stagger: {
        amount: 0.5,
      },
    },
    "k"
  );

  tl2.to(
    ".page3-right-point2>.para2-text>.j>div",
    {
      opacity: 1,
      scale: 1,
      stagger: {
        amount: 0.5,
      },
    },
    "k"
  );

  function render() {
    scaleImage(images[imageSeq.frame], context);

    if (flag === "heat") {
      if (imageSeq.frame < 36) {
        canvasIndex = 0;
        heatGlobeMaterial.uniforms.uTextures.value = loadedHeatTextures[0];
        heatGlobeMaterial.uniforms.uAlpha.value = 1;
      } else if (imageSeq.frame < 72) {
        canvasIndex = 1;
        heatGlobeMaterial.uniforms.uTextures.value = heathyTexture;
        heatGlobeMaterial.uniforms.uAlpha.value = 0.3;
      } else if (imageSeq.frame < 108) {
        canvasIndex = 2;
        heatGlobeMaterial.uniforms.uTextures.value = heathyTexture;
        heatGlobeMaterial.uniforms.uAlpha.value = 0.4;
      } else if (imageSeq.frame < 144) {
        canvasIndex = 3;
        heatGlobeMaterial.uniforms.uTextures.value = heathyTexture;
        heatGlobeMaterial.uniforms.uAlpha.value = 0.5;
      } else if (imageSeq.frame < 180) {
        canvasIndex = 4;
        heatGlobeMaterial.uniforms.uTextures.value = heathyTexture;
        heatGlobeMaterial.uniforms.uAlpha.value = 0.6;
      } else if (imageSeq.frame < 216) {
        canvasIndex = 5;
        heatGlobeMaterial.uniforms.uTextures.value = heathyTexture;
        heatGlobeMaterial.uniforms.uAlpha.value = 0.7;
      } else if (imageSeq.frame < 252) {
        canvasIndex = 6;
        heatGlobeMaterial.uniforms.uTextures.value = heathyTexture;
        heatGlobeMaterial.uniforms.uAlpha.value = 0.8;
      } else if (imageSeq.frame < 288) {
        canvasIndex = 7;
        heatGlobeMaterial.uniforms.uTextures.value = heathyTexture;
        heatGlobeMaterial.uniforms.uAlpha.value = 0.9;
      } else {
        canvasIndex = 8;
        heatGlobeMaterial.uniforms.uTextures.value = heathyTexture;
        heatGlobeMaterial.uniforms.uAlpha.value = 1;
      }
    } else {
      if (imageSeq.frame < 36) {
        canvasIndex = 0;
        heatGlobeMaterial.uniforms.uTextures.value = loadedCO2Textures[0];
        heatGlobeMaterial.uniforms.uAlpha.value = 1;
      } else if (imageSeq.frame < 72) {
        canvasIndex = 1;
        heatGlobeMaterial.uniforms.uTextures.value = heathyTexture;
        heatGlobeMaterial.uniforms.uAlpha.value = 0.3;
      } else if (imageSeq.frame < 108) {
        canvasIndex = 2;
        heatGlobeMaterial.uniforms.uTextures.value = heathyTexture;
        heatGlobeMaterial.uniforms.uAlpha.value = 0.4;
      } else if (imageSeq.frame < 144) {
        canvasIndex = 3;
        heatGlobeMaterial.uniforms.uTextures.value = heathyTexture;
        heatGlobeMaterial.uniforms.uAlpha.value = 0.5;
      } else if (imageSeq.frame < 180) {
        canvasIndex = 4;
        heatGlobeMaterial.uniforms.uTextures.value = heathyTexture;
        heatGlobeMaterial.uniforms.uAlpha.value = 0.6;
      } else if (imageSeq.frame < 216) {
        canvasIndex = 5;
        heatGlobeMaterial.uniforms.uTextures.value = heathyTexture;
        heatGlobeMaterial.uniforms.uAlpha.value = 0.7;
      } else if (imageSeq.frame < 252) {
        canvasIndex = 6;
        heatGlobeMaterial.uniforms.uTextures.value = heathyTexture;
        heatGlobeMaterial.uniforms.uAlpha.value = 0.8;
      } else if (imageSeq.frame < 288) {
        canvasIndex = 7;
        heatGlobeMaterial.uniforms.uTextures.value = heathyTexture;
        heatGlobeMaterial.uniforms.uAlpha.value = 0.9;
      } else {
        canvasIndex = 8;
        heatGlobeMaterial.uniforms.uTextures.value = heathyTexture;
        heatGlobeMaterial.uniforms.uAlpha.value = 1;
      }
    }
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({
    trigger: ".page3",
    pin: true,
    // markers:true,
    scroller: `body`,
    //   set start end according to preference
    start: `top top`,
    end: `top -250%`,
  });
};

canvasAnimation();

const page3Animation = () => {
  clutterAnimation(".page3-left-headline>h1");
  clutterAnimation(".page3-left-headline>.p3-text2");
  const tl = gsap.timeline();
  gsap.from(".page3-left-headline>h1>div", {
    opacity: 0,
    scaleY: 0,
    y: 10,
    stagger: {
      amount: 1,
    },
    scrollTrigger: {
      scroller: "body",
      trigger: ".page3",
      start: "top 0%",
      end: "top -30%",
      scrub: 1,
      // markers: true,
    },
  });
  gsap.from(".page3-left-headline>.p3-text2>div", {
    opacity: 0,
    scaleY: 0,
    y: 10,
    stagger: {
      amount: 1,
    },
    scrollTrigger: {
      scroller: "body",
      trigger: ".page3",
      start: "top 0%",
      end: "top -20%",
      scrub: 1,
      // markers: true,
    },
  });

  clutterAnimation(".heat2");
  clutterAnimation(".co22");

  tl.from(
    ".switch2>.heat2-switch>h1>div,.switch2>h1:nth-child(2),.co22>div,.switch-co22 small",
    {
      opacity: 0,
      scaleY: 0,
      y: 10,
      stagger: {
        amount: 0.5,
      },
      scrollTrigger: {
        scroller: "body",
        trigger: ".page3",
        start: "top 0%",
        end: "top -30%",
        scrub: 1,
        // markers: true,
      },
    }
  );
  tl.from(".switch-heat-bar2", {
    width: "0",
    scrollTrigger: {
      scroller: "body",
      trigger: ".page3",
      start: "top 0%",
      end: "top -30%",
      scrub: 1,
      // markers: true,
    },
  });

 

  tl.to(".globe-model", {
    top: "5%",
    zIndex: 101,
    scrollTrigger: {
      scroller: "body",
      trigger: ".page3",
      start: "top 100%",
      end: "top 0%",
      scrub: 1,
    },
  });

  clutterAnimation(".page3-right-para1>h3");
  clutterAnimation(".page3-right-end>h3");
  gsap.from(".page3-right-para1>h3>div,.page3-right-end>h3>div", {
    opacity: 0,
    scaleY: 0,
    y: 10,
    stagger: { amount: 1 },
    scrollTrigger: {
      scroller: "body",
      trigger: ".page3",
      start: "top 0%",
      end: "top -30%",
      scrub: 1,
    },
  });
  gsap.from(".page3-line", {
    scale: 0,
    scrollTrigger: {
      scroller: "body",
      trigger: ".page3",
      start: "top 0%",
      end: "top -30%",
      scrub: 1,
    },
  });
};
page3Animation();
