gsap.from(".logo", { duration: 1, x: -100, opacity: 0 });
gsap.from(".settings button", { duration: 1, x: 100, opacity: 0, stagger: 0.2 });
gsap.from(".intro h1", { duration: 1, y: -50, opacity: 0, delay: 0.5 });
gsap.from(".intro p", { duration: 1, y: -30, opacity: 0, delay: 0.7 });
gsap.from(".section", { duration: 1, scale: 0.8, opacity: 0, stagger: 0.3, delay: 1 });
gsap.from(".section1", { duration: 1, scale: 0.8, opacity: 0, delay: 0.7 });
gsap.from(".image", { duration: 1, x: 100, opacity: 0 });

function smoothScroll(trigger, target) {
    const triggerElement = document.querySelector(trigger);
    const targetElement = document.querySelector(target);

    if (triggerElement && targetElement) {
        triggerElement.addEventListener("click", () => {
            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        });
    }
}

smoothScroll("#skills-section", "#technologies-section");
smoothScroll(".sections .section:nth-child(3)", "#projects-section");
smoothScroll(".sections .section:nth-child(4)", "#achievements-section");

const sections = Array.from(
    document.querySelectorAll(".main-content, .technologies, #projects-section, #achievements-section")
);
let currentSectionIndex = 0;
let isScrolling = false;

const achievementsSection = document.querySelector("#achievements-section");
const achievementsList = achievementsSection?.querySelector(".achievements-list");

window.addEventListener(
    "wheel",
    (event) => {

        if (achievementsList?.matches(":hover")) {
            return;
        }

        if (isScrolling) {
            event.preventDefault();
            return;
        }

        isScrolling = true;

        event.preventDefault();

        if (event.deltaY > 0 && currentSectionIndex < sections.length - 1) {
            currentSectionIndex++;
        } else if (event.deltaY < 0 && currentSectionIndex > 0) {
            currentSectionIndex--;
        }

        sections[currentSectionIndex].scrollIntoView({
            behavior: "smooth",
            block: "center",
        });

        setTimeout(() => {
            isScrolling = false;
        }, 500);
    },
    { passive: false }
);

function animateOnVisibility(target, animationConfig, threshold = 0.5) {
    const elements = document.querySelectorAll(target);
    const animation = gsap.from(elements, { ...animationConfig, paused: true });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animation.play();
            }
        });
    }, { threshold });

    elements.forEach((el) => observer.observe(el));
}


animateOnVisibility(".tech", { duration: 1, scale: 0.5, opacity: 0, stagger: 0.2 });
animateOnVisibility(".project", { duration: 1, scale: 0.8, opacity: 0, stagger: 0.3 });

const themeToggleButton = document.querySelector(".theme-toggle");

if (themeToggleButton) {
    themeToggleButton.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");

        themeToggleButton.innerHTML = document.body.classList.contains("light-mode")
            ? "&#9728;"
            : "&#9790;";
    });
}

function animateAchievementsOnVisibility(target, threshold = 0.5) {
    const elements = document.querySelectorAll(target);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                gsap.from(entry.target, {
                    duration: 2,
                    x: -200, 
                    opacity: 1,
                    ease: "elastic.out(-6, 1)",
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold });
    
    elements.forEach((el) => observer.observe(el));
}
animateAchievementsOnVisibility(".achievement-card");

document.addEventListener("DOMContentLoaded", () => {
    const techItems = document.querySelectorAll(".tech");

    techItems.forEach(tech => {
        tech.addEventListener("mousemove", (e) => {
            const { offsetX, offsetY } = e;
            const { offsetWidth, offsetHeight } = tech;
            
            const moveX = (offsetX / offsetWidth) * 30 - 15;
            const moveY = (offsetY / offsetHeight) * 30 - 15;
            
            tech.style.transform = `perspective(200px) rotateY(${moveX}deg) rotateX(${moveY}deg)`;
        });

        tech.addEventListener("mouseleave", () => {
            tech.style.transform = "perspective(200px) rotateY(0deg) rotateX(0deg)";
        });
    });
});

const backToTopButton = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 1) {
        if (!backToTopButton.classList.contains("visible")) {
            backToTopButton.classList.add("visible");
            gsap.fromTo(
                "#backToTop",
                { opacity: 0, y: 100, scale: 0.5 },
                { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "bounce.out", onComplete: () => {
                    gsap.to("#backToTop", { y: -20, duration: 0, ease: "power1.out", yoyo: true, repeat: 2 });
                }}
            );
        }
    } else {
        backToTopButton.classList.remove("visible");
        gsap.to("#backToTop", { opacity: 0, y: 100, scale: 0.5, duration: 0.2, ease: "power2.in" });
    }
});

backToTopButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

document.getElementById("copyEmail").addEventListener("click", (event) => {
    event.preventDefault();

    const email = "22-0149c@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        const copiedMessage = document.getElementById("emailCopied");
        copiedMessage.style.display = "inline";

        setTimeout(() => {
            copiedMessage.style.display = "none";
        }, 2000);
    });
});

// Get the modal
var modal = document.getElementById("imageModal");

// Get the image and insert it inside the modal
var images = document.querySelectorAll(".clickable-image");
var modalImg = document.getElementById("fullImage");
var captionText = document.getElementById("caption");

images.forEach(function(img) {
    img.onclick = function() {
        modal.style.display = "flex";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    };
});

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// Close the modal when clicking outside the image
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
