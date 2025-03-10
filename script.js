// Floating Parallax Gallery - Interactive gallery with GSAP parallax effect
// Tech: HTML5, CSS3 (Flexbox), JavaScript, GSAP

const gallery = document.getElementById("gallery");
const customCursor = document.getElementById("custom-cursor");
const blocks = document.querySelectorAll(".block");

// Entrance Animation
gsap.from(blocks, {
  opacity: 0,
  scale: 0.8,
  y: 50,
  stagger: 0.1, // Stagger each block's animation
  duration: 1,
  ease: "bounce.out",
  onComplete: () => console.log("Entrance animation complete"),
});

window.onmousemove = (e) => {
  const mouseX = e.clientX,
    mouseY = e.clientY;

  const xDecimal = mouseX / window.innerWidth,
    yDecimal = mouseY / (window.innerHeight + 100); // Adjusted for padding-bottom

  const maxX = gallery.offsetWidth - window.innerWidth,
    maxY = gallery.offsetHeight - (window.innerHeight + 100); // Adjusted for padding

  const panX = maxX * xDecimal * -1,
    panY = maxY * yDecimal * -1;

  gallery.animate(
    {
      transform: `translate(${panX}px, ${panY}px)`,
    },
    {
      duration: 4000,
      fill: "forwards",
      easing: "ease",
    }
  );

  // Move custom cursor
  customCursor.style.left = `${mouseX}px`;
  customCursor.style.top = `${mouseY}px`;
};

const radius = 300,
  maxScale = 1.5, // Reduced from 3 for smoother hover
  radius2 = radius * radius,
  container = document.querySelector("#gallery");

blocks.forEach((block) => {
  let b = block.getBoundingClientRect();
  (block.cx = b.left + b.width / 2 + window.pageXOffset),
    (block.cy = b.top + b.height / 2 + window.pageYOffset);

  block.tween = gsap
    .to(block, { scale: maxScale, ease: "power1.out", paused: true })
    .progress(1)
    .progress(0);

  // Hover events for cursor
  block.addEventListener("mouseover", () => {
    customCursor.style.width = "20px";
    customCursor.style.height = "20px";
    customCursor.style.background = "rgba(163, 71, 255, 0.5)"; // Vivid Purple, semi-transparent
  });

  block.addEventListener("mouseout", () => {
    customCursor.style.width = "10px";
    customCursor.style.height = "10px";
    customCursor.style.background = "#878A83"; // Muted Purple
  });
});

document.addEventListener("mousemove", (e) => {
  let i = blocks.length,
    dx,
    dy,
    block;
  while (i--) {
    block = blocks[i];
    dx = (block.cx - e.pageX) ** 2;
    dy = (block.cy - e.pageY) ** 2;
    block.tween.progress(1 - (dx + dy) / radius2);
  }
});