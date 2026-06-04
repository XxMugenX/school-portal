(function () {
  const slider = document.getElementById("heroSlider");
  if (slider) {
    const slides = slider.querySelectorAll(".slide");
    const prev = slider.querySelector(".slider-prev");
    const next = slider.querySelector(".slider-next");
    const dotsWrap = document.getElementById("heroDots");
    let current = 0;
    let interval = null;

    function goTo(index) {
      slides[current].classList.remove("active");
      if (dotsWrap && dotsWrap.children[current]) {
        dotsWrap.children[current].classList.remove("active");
      }
      current = (index + slides.length) % slides.length;
      slides[current].classList.add("active");
      if (dotsWrap && dotsWrap.children[current]) {
        dotsWrap.children[current].classList.add("active");
      }
    }

    function nextSlide() {
      goTo(current + 1);
    }

    function prevSlide() {
      goTo(current - 1);
    }

    function resetInterval() {
      clearInterval(interval);
      interval = setInterval(nextSlide, 6000);
    }

    slides.forEach((_, i) => {
      if (!dotsWrap) return;
      const dot = document.createElement("button");
      dot.className = i === 0 ? "dot active" : "dot";
      dot.setAttribute("aria-label", "Go to slide " + (i + 1));
      dot.addEventListener("click", () => {
        goTo(i);
        resetInterval();
      });
      dotsWrap.appendChild(dot);
    });

    if (next) {
      next.addEventListener("click", () => {
        nextSlide();
        resetInterval();
      });
    }
    if (prev) {
      prev.addEventListener("click", () => {
        prevSlide();
        resetInterval();
      });
    }

    interval = setInterval(nextSlide, 6000);
  }

  const counters = document.querySelectorAll(".stats-ticker [data-target]");
  if (counters && counters.length) {
    const speed = 1600;
    const runCounter = (el) => {
      const target = +el.getAttribute("data-target");
      let start = 0;
      const increment = Math.ceil(target / (speed / 50));
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          el.textContent = target;
          clearInterval(timer);
        } else {
          el.textContent = start;
        }
      }, 50);
    };

    const obs = new IntersectionObserver(
      (entries, o) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            counters.forEach((c) => runCounter(c));
            o.disconnect();
          }
        });
      },
      { threshold: 0.2 },
    );

    const tickerWrap = document.querySelector(".stats-ticker");
    if (tickerWrap) {
      obs.observe(tickerWrap);
    }
  }
})();
