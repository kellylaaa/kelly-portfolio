document.addEventListener("DOMContentLoaded", function () {

  const cursor = document.querySelector(".custom-cursor");
  const cursorText = document.querySelector(".cursor-text");
  const aboutLink = document.querySelector(".to-abtme");

  const offsetY = -55;
  const offsetX= -55;

  // Move cursor
  document.addEventListener("mousemove", function (e) {
    if (cursor) {
      cursor.style.left = e.clientX + offsetX + "px";
      cursor.style.top = e.clientY + offsetY + "px";
    }
  });

  if (aboutLink) {
    aboutLink.addEventListener("mouseenter", function () {
      cursor.style.opacity = "1";
cursor.style.transform = "scale(1)";
    });

    aboutLink.addEventListener("mouseleave", function () {
      cursor.style.opacity = "0";
cursor.style.transform = "scale(0.9)";
    });
  }

});

const faders = document.querySelectorAll('.fade-in, .fade-up, .fade-inmore');

const appearOptions = {
    threshold: 0.2
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        // Only stagger fade-up elements
        if (entry.target.classList.contains('fade-up')) {
            const fadeUps = [...document.querySelectorAll('.fade-up')];
            const index = fadeUps.indexOf(entry.target);

            // 0.5s initial delay + 0.5s stagger
            entry.target.style.transitionDelay = `${0.5 + index * 0.5}s`;
        }

        entry.target.classList.add('show');
        observer.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

document.getElementById("year").textContent = new Date().getFullYear();


function updateTime() {
    const now = new Date();

    const options = {
        timeZone: "America/Los_Angeles",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    };

    const sfDate = new Date(
        now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
    );

    const sfHour = sfDate.getHours();

    document.getElementById("live-time").textContent =
        now.toLocaleTimeString("en-US", options);

    const body = document.body;

    if (sfHour >= 6 && sfHour < 18) {
        body.classList.add("day");
        body.classList.remove("night");
    } else {
        body.classList.add("night");
        body.classList.remove("day");
    }
}

updateTime();
setInterval(updateTime, 60000);