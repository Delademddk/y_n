let noCount = 0;
let musicStarted = false;

const sadVideos = [
  "y2.mp4", "y1.mp4", "y3.mp4", "y4.mp4", "y5.mp4"
];

const sadTexts = [
  "Oh c'mon… give it a try, i promise you won't regret🥲",
  "I even imagined our cute selfies 😭",
  "I had a whole speech prepared though ",
  "I was planning on buying you lots of ice cream💔",
  "Plot twist… you're actually supposed to say yes",
  "Okay last try… slow blink… 🥺"
];

const yesVideo = "yes.mp4";

const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;

function switchPage(fromId, toId) {
  document.getElementById(fromId).classList.remove('active');
  document.getElementById(toId).classList.add('active');
}

function playVideo(src) {
  const video = document.getElementById("reactionVideo");
  video.src = src;
  video.load();
  video.play().catch(() => {});
}

function startExperience() {
  const music = document.getElementById("bgMusic");
  if (!musicStarted) {
    music.play().catch(() => {});
    musicStarted = true;
  }
  switchPage("page1", "page2");
  playVideo("neutral.mp4");
}

function sayYes() {
  document.getElementById("responseText").innerText =
    `You just made me the happiest person ever 🥹💘`;

  switchPage("page2", "page3");

  const yesPlayer = document.getElementById("yesVideoPlayer");
  yesPlayer.src = yesVideo;
  yesPlayer.load();
  yesPlayer.play().catch(() => {});

  launchSimpleConfetti();

  setTimeout(() => {
    const yourNumber = "233595738686"; 
    const waMessage = encodeURIComponent(
      "I said YES 💖🥹 Just wanted you to know!"
    );
    window.open(
      `https://wa.me/${yourNumber}?text=${waMessage}`,
      "_blank"
    );
  }, 2800);
}

function sayNo() {
  if (noCount < sadVideos.length) {
    playVideo(sadVideos[noCount]);
    document.getElementById("responseText").innerText = sadTexts[noCount];
    noCount++;
  } else {
    playVideo("g1.mp4");
    document.getElementById("responseText").innerText =
      `Okay… I’ll stop asking now 💔 But you’ll always be special to me.`;

    setTimeout(() => {
      const yourNumber = "233595738686"; 
      const waMessage = encodeURIComponent(
        "I'm sorry, but it's a no... 💔" 
      );
      window.open(
        `https://wa.me/${yourNumber}?text=${waMessage}`,
        "_blank"
      );
    }, 2800);
  }
}

function launchSimpleConfetti() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 6 + 3,
    color: `hsl(${Math.random() * 360},90%,60%)`,
    vx: Math.random() * 8 - 4,
    vy: Math.random() * 5 + 2,
    rot: Math.random() * 360,
    rotSpeed: Math.random() * 10 - 5
  }));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.15;
      p.rot += p.rotSpeed;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.r, -p.r, p.r * 2, p.r * 2);
      ctx.restore();
    });

    if (pieces.some(p => p.y < canvas.height + 50)) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}

// Add event listeners
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('startButton').addEventListener('click', startExperience);
  document.getElementById('yesButton').addEventListener('click', sayYes);
  document.getElementById('noButton').addEventListener('click', sayNo);

  // Floating hearts
  setInterval(() => {
    if (isMobile && Math.random() > 0.4) return;

    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = Math.random() > 0.5 ? "💖" : "🫶";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (14 + Math.random() * 20) + "px";
    heart.style.animationDuration = (6 + Math.random() * 6) + "s";
    heart.style.color = `hsl(${Math.random()*60 + 320}, 90%, 65%)`;
    document.getElementById("hearts").appendChild(heart);
    setTimeout(() => heart.remove(), 10000);
  }, isMobile ? 800 : 400);

  // Handle resize for confetti canvas
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
});

