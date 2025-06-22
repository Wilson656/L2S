document.addEventListener("DOMContentLoaded", function () {
  // ========== FIXED HEADER & SMOOTH SCROLL ==========
  const header = document.querySelector(".header");
  const navLinks = document.querySelectorAll(".nav-link");
  const headerHeight = header.offsetHeight;

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const targetPosition = targetElement.offsetTop - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }

      if (mainNav.classList.contains("active")) {
        mainNav.classList.remove("active");
        mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  });

  window.addEventListener("scroll", () => {
    let current = "";
    document.querySelectorAll("section[id]").forEach((section) => {
      const sectionTop = section.offsetTop - headerHeight - 50;
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active");
      }
    });
  });

  // ========== MOBILE NAVIGATION TOGGLE ==========
  const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (mobileNavToggle && mainNav) {
    mobileNavToggle.addEventListener("click", () => {
      mainNav.classList.toggle("active");
      if (mainNav.classList.contains("active")) {
        mobileNavToggle.innerHTML = '<i class="fas fa-times"></i>';
      } else {
        mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  }

  // ========== TESTIMONIAL CAROUSEL ==========
  const carouselContainer = document.querySelector(
    ".testimonial-carousel-container"
  );
  const carousel = document.querySelector(".testimonial-carousel");
  const carouselItems = document.querySelectorAll(".testimonial-card");
  const prevButton = document.querySelector(".carousel-control.prev");
  const nextButton = document.querySelector(".carousel-control.next");

  let currentIndex = 0;
  const totalItems = carouselItems.length;
  let autoSlideInterval;
  const slideDuration = 3000;

  function updateCarousel() {
    if (carousel && carouselItems.length > 0) {
      const itemWidth = carouselItems[0].offsetWidth;
      carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
  }

  function startAutoSlide() {
    stopAutoSlide();
    if (totalItems > 1) {
      autoSlideInterval = setInterval(nextSlide, slideDuration);
    }
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  if (carousel && prevButton && nextButton && totalItems > 0) {
    nextButton.addEventListener("click", () => {
      nextSlide();
      startAutoSlide();
    });

    prevButton.addEventListener("click", () => {
      prevSlide();
      startAutoSlide();
    });

    if (carouselContainer) {
      carouselContainer.addEventListener("mouseenter", stopAutoSlide);
      carouselContainer.addEventListener("mouseleave", startAutoSlide);
    }

    updateCarousel();
    startAutoSlide();

    window.addEventListener("resize", () => {
      updateCarousel();
    });
  }

  // ========== FAQ ACCORDION ==========
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (question && answer) {
      question.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active");
            const otherAnswer = otherItem.querySelector(".faq-answer");
            if (otherAnswer) {
              otherAnswer.style.maxHeight = null;
              otherAnswer.style.paddingTop = "0";
              otherAnswer.style.paddingBottom = "0";
            }
          }
        });

        if (isActive) {
          item.classList.remove("active");
          answer.style.maxHeight = null;
          answer.style.paddingTop = "0";
          answer.style.paddingBottom = "0";
        } else {
          item.classList.add("active");
          answer.style.maxHeight = answer.scrollHeight + 40 + "px";
          answer.style.paddingTop = "20px";
          answer.style.paddingBottom = "20px";
        }
      });
    }
  });

  // ========== SCROLL ANIMATIONS (Intersection Observer) ==========
  const animatedElements = document.querySelectorAll(".animate-on-scroll");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  animatedElements.forEach((element) => {
    observer.observe(element);
  });

  // ========== UPDATE CURRENT YEAR IN FOOTER ==========
  const currentYearSpan = document.getElementById("currentYear");
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});
