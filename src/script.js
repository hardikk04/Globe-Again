// Importing the libraries

import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// // Lenis js
// window.onbeforeunload = function () {
//   window.scrollTo(0, 0);
// };

const lenisJs = () => {
  const lenis = new Lenis();

  lenis.on("scroll", (e) => {});

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 500);
  });

  gsap.ticker.lagSmoothing(0);
};
lenisJs();

const clutterAnimation = (element) => {
  const htmlTag = document.querySelector(element);
  let clutter = "";

  // Wraps each letter in a div with a class for animation
  htmlTag.textContent.split("").forEach((word) => {
    clutter += `<div class="inline-block">${word}</div>`;
  });

  // Replaces the element's content with the animated divs
  htmlTag.innerHTML = clutter;
};

const page1Animation = () => {
  clutterAnimation(".page1-main-line1>h1");
  clutterAnimation(".page1-main-line2>h1");
  const page1Tl = gsap.timeline();
  page1Tl.from(
    ".page1-main-line1>h1>div",
    {
      y: 60,
      opacity: 0,
      stagger: {
        amount: 1,
      },
      onComplete: () => {
        // document.querySelector(".v1").play();
      },
    },
    "main"
  );

  page1Tl.from(
    ".page1-main-line2>h1>div",
    {
      y: 60,
      opacity: 0,
      stagger: {
        amount: 1,
      },
    },
    "main"
  );

  page1Tl.from(".scroll-down", {
    opacity: 0,
  });
};
page1Animation();

const page1Canvas = () => {
  const canvas = document.querySelector(".page1 canvas");
  const context = canvas.getContext("2d");

  // const page2Right = document
  //   .querySelector(".page2-right")
  //   .getBoundingClientRect();

  // const mediaQuery = window.matchMedia("(max-width: 768px)");

  // Function to handle changes
  // function handleViewportChange(event) {
  //   if (event.matches) {
  //     // The viewport is 768px or less
  //     console.log("Viewport is 768px or less");
  //     // Add your code here to handle the change
  //   } else {
  //     // The viewport is wider than 768px
  //     console.log("Viewport is wider than 768px");
  //     // Add your code here to handle the change
  //   }
  // }

  // Check the initial state
  // if (mediaQuery.matches) {
  //   canvas.width = page2Right.width + 750;
  //   canvas.height = page2Right.height + 100;
  // } else {
  //   canvas.width = page2Right.width + 350;
  //   canvas.height = page2Right.height + 100;
  // }

  // Add event listener
  // mediaQuery.addEventListener("change", handleViewportChange);

  // window.addEventListener("resize", function () {
  //   canvas.width = page2Right.width + 350;
  //   canvas.height = page2Right.height + 100;
  //   render();
  // });

  const frameCount = 244;

  let renderImg = ``;
  for (let i = 0; i < frameCount; i++) {
    renderImg += `canvas/canvas (${i}).png
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
      trigger: `.page1 canvas`,
      //   set start end according to preference
      start: `top top`,
      end: `top -200%`,
      scroller: `body`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  const textAnimations = () => {
    const page1Tl = gsap.timeline({
      scrollTrigger: {
        scrub: 0.15,
        trigger: `.page1 canvas`,
        //   set start end according to preference
        start: `top top`,
        end: `top -180%`,
        scroller: `body`,
      },
    });
    clutterAnimation(".page1-para1-line1>h3");
    clutterAnimation(".page1-para1-line2>h3");

    page1Tl.to(".scroll-down", {
      opacity: 0,
    });

    page1Tl.from(
      ".page1-para1-line1>h3>div",
      {
        y: 60,
        opacity: 0,
        stagger: {
          amount: 1,
        },
      },
      "para1"
    );

    page1Tl.from(
      ".page1-para1-line2>h3>div",
      {
        y: 60,
        delay: 0.4,
        opacity: 0,
        stagger: {
          amount: 1,
        },
      },
      "para1"
    );

    page1Tl.to(
      ".page1-para1-line1>h3>div",
      {
        y: 20,
        opacity: 0,
        delay: -0.1,
        stagger: {
          amount: -1,
        },
      },
      "para1-p"
    );

    page1Tl.to(
      ".page1-para1-line2>h3>div",
      {
        y: 20,
        delay: -0.1,
        opacity: 0,
        stagger: {
          amount: -1,
        },
      },
      "para1-p"
    );

    clutterAnimation(".page1-para2-line1>h3");
    clutterAnimation(".page1-para2-line2>h3");
    page1Tl.to(".page1-para2", {
      opacity: 1,
    });

    page1Tl.from(
      ".page1-para2-line1>h3>div",
      {
        y: 60,
        opacity: 0,
        delay: -0.4,
        stagger: {
          amount: 1.2,
        },
      },
      "para2"
    );

    page1Tl.from(
      ".page1-para2-line2>h3>div",
      {
        y: 60,
        opacity: 0,
        delay: -0.2,
        stagger: {
          amount: 1.2,
        },
      },
      "para2"
    );

    page1Tl.to(
      ".page1-main-line1>h1>div",
      {
        y: 60,
        opacity: 0,
        stagger: {
          amount: -1,
        },
        onComplete: () => {
          // document.querySelector(".v1").play();
        },
      },
      "main"
    );

    page1Tl.to(
      ".page1-main-line2>h1>div",
      {
        y: 60,
        opacity: 0,
        stagger: {
          amount: -1,
        },
      },
      "main"
    );

    page1Tl.to(
      ".page1-para2-line1>h3>div",
      {
        y: 60,
        opacity: 0,
        delay: -0.1,
        stagger: {
          amount: -1.2,
        },
      },
      "para2-out"
    );

    page1Tl.to(
      ".page1-para2-line2>h3>div",
      {
        y: 60,
        opacity: 0,
        delay: -0.1,
        stagger: {
          amount: -1.2,
        },
      },
      "para2-out"
    );
  };

  textAnimations();
  function render() {
    scaleImage(images[imageSeq.frame], context);
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
    trigger: ".page1",
    pin: true,
    // markers:true,
    scroller: `body`,
    //   set start end according to preference
    start: `top top`,
    end: `top -250%`,
  });
};
page1Canvas();

const page2Animation = () => {
  clutterAnimation(".page2-heading-line1>h1");
  clutterAnimation(".page2-heading-line2>h1");
  clutterAnimation(".page2-heading-line3>h1");

  const page2Tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".page2",
      scroller: "body",
      start: "top 0",
      end: "top -200%",
      scrub: 1,
      pin: true,
      // markers: true,
    },
  });

  page2Tl.from(
    ".page2-heading-line1>h1>div",
    {
      opacity: 0,
      y: 60,
      stagger: {
        amount: 1,
        from: "x",
      },
    },
    "line1"
  );
  page2Tl.from(
    ".page2-heading-line2>h1>div",
    {
      opacity: 0,
      y: 60,
      stagger: {
        amount: 1,
        from: "x",
      },
    },
    "line1"
  );
  page2Tl.from(
    ".page2-heading-line3>h1>div",
    {
      opacity: 0,
      y: 60,
      stagger: {
        amount: 1,
        from: "x",
      },
    },
    "line1"
  );

  page2Tl.from(".c1", {
    opacity: 0,
  });

  page2Tl.from(".main-circle", {
    opacity: 0,
  });

  page2Tl.from(".interval-line", {
    width: "0",
  });

  page2Tl.from(".c2", {
    opacity: "0",
  });

  clutterAnimation(".y2024>h3");
  clutterAnimation(".y2030>h3");
  clutterAnimation(".y2040>h3");
  clutterAnimation(".y2050>h3");
  clutterAnimation(".y2060>h3");
  clutterAnimation(".y2070>h3");
  clutterAnimation(".y2080>h3");
  clutterAnimation(".y2090>h3");
  clutterAnimation(".y2100>h3");

  page2Tl.from(".y2024>h3>div", {
    y: 20,
    opacity: 0,
    stagger: {
      amount: 0.5,
      from: "x",
    },
  });

  page2Tl.from(".y2030>h3>div", {
    y: 20,
    opacity: 0,
    stagger: {
      amount: 0.5,
      from: "x",
    },
  });

  page2Tl.from(".y2040>h3>div", {
    y: 20,
    opacity: 0,
    stagger: {
      amount: 0.5,
      from: "x",
    },
  });

  page2Tl.from(".y2050>h3>div", {
    y: 20,
    opacity: 0,
    stagger: {
      amount: 0.5,
      from: "x",
    },
  });

  page2Tl.from(".y2060>h3>div", {
    y: 20,
    opacity: 0,
    stagger: {
      amount: 0.5,
      from: "x",
    },
  });

  page2Tl.from(".y2070>h3>div", {
    y: 20,
    opacity: 0,
    stagger: {
      amount: 0.5,
      from: "x",
    },
  });

  page2Tl.from(".y2080>h3>div", {
    y: 20,
    opacity: 0,
    stagger: {
      amount: 0.5,
      from: "x",
    },
  });

  page2Tl.from(".y2090>h3>div", {
    y: 20,
    opacity: 0,
    stagger: {
      amount: 0.5,
      from: "x",
    },
  });

  page2Tl.from(".y2100>h3>div", {
    y: 20,
    opacity: 0,
    stagger: {
      amount: 0.5,
      from: "x",
    },
  });

  clutterAnimation(".switch-heat>h1");
  clutterAnimation(".switch-co2>h1");

  page2Tl.from(
    ".switch-heat>h1>div",
    {
      y: 20,
      opacity: 0,
      stagger: {
        amount: 0.5,
        from: "x",
      },
    },
    "blue-line"
  );

  page2Tl.from(
    ".blue-bar",
    {
      width: "0",
    },
    "blue-line"
  );

  page2Tl.from(".bar", {
    y: 20,
    opacity: 0,
  });

  page2Tl.from(".switch-co2>h1>div", {
    y: 20,
    opacity: 0,
    stagger: {
      amount: 0.5,
      from: "x",
    },
  });

  page2Tl.to(
    ".page2-heading-line1>h1>div",
    {
      opacity: 0,
      y: 60,
      stagger: {
        amount: -1,
        from: "x",
      },
    },
    "line1-to"
  );
  page2Tl.to(
    ".page2-heading-line2>h1>div",
    {
      opacity: 0,
      y: 60,
      stagger: {
        amount: -1,
        from: "x",
      },
    },
    "line1-to"
  );
  page2Tl.to(
    ".page2-heading-line3>h1>div",
    {
      opacity: 0,
      y: 60,
      stagger: {
        amount: -1,
        from: "x",
      },
    },
    "line1-to"
  );

  page2Tl.to(".c1", {
    opacity: 0,
  });

  page2Tl.to(".main-circle", {
    opacity: 0,
  });

  page2Tl.to(".interval-line", {
    width: "0",
  });

  page2Tl.to(".c2", {
    opacity: "0",
  });

  page2Tl.to(".y2100>h3>div", {
    y: 20,
    opacity: 0,
    stagger: {
      amount: -0.5,
      from: "x",
    },
  });

  page2Tl.to(".y2090>h3>div", {
    y: 20,
    opacity: 0,
    stagger: {
      amount: -0.5,
      from: "x",
    },
  });

  page2Tl.to(".y2080>h3>div", {
    y: 20,
    opacity: 0,
    stagger: {
      amount: -0.5,
      from: "x",
    },
  });

  page2Tl.to(".y2070>h3>div", {
    y: 20,
    opacity: 0,
    stagger: {
      amount: -0.5,
      from: "x",
    },
  });

  page2Tl.to(".y2060>h3>div", {
    y: 20,
    opacity: 0,
    stagger: {
      amount: -0.5,
      from: "x",
    },
  });

  page2Tl.to(".y2050>h3>div", {
    y: 20,
    opacity: 0,
    stagger: {
      amount: -0.5,
      from: "x",
    },
  });

  page2Tl.to(".y2040>h3>div", {
    y: 20,
    opacity: 0,
    stagger: {
      amount: -0.5,
      from: "x",
    },
  });
  page2Tl.to(".y2030>h3>div", {
    y: 20,
    opacity: 0,
    stagger: {
      amount: -0.5,
      from: "x",
    },
  });

  page2Tl.to(".y2024>h3>div", {
    y: 20,
    opacity: 0,
    stagger: {
      amount: -0.5,
      from: "x",
    },
  });

  page2Tl.to(".switch-co2>h1>div", {
    y: 20,
    opacity: 0,
    stagger: {
      amount: -0.5,
      from: "x",
    },
  });
  page2Tl.to(".bar", {
    y: 20,
    opacity: 0,
  });

  page2Tl.to(
    ".switch-heat>h1>div",
    {
      y: 20,
      opacity: 0,
      stagger: {
        amount: -0.5,
        from: "x",
      },
    },
    "blue-line-to"
  );

  page2Tl.to(
    ".blue-bar",
    {
      width: "0",
    },
    "blue-line-to"
  );
};
page2Animation();
