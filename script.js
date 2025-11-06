// Navigation between pages
function navigateTo(pageId) {
  // Hide all pages
  const pages = document.querySelectorAll(".page")
  pages.forEach((page) => page.classList.add("hidden"))

  // Hide landing page
  const landing = document.getElementById("landing")
  if (landing) landing.classList.add("hidden")

  // Show selected page
  if (pageId === "landing") {
    landing.classList.remove("hidden")
  } else {
    const page = document.getElementById(pageId)
    if (page) page.classList.remove("hidden")
  }

  // Update active nav link
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => link.classList.remove("active"))

  const activeLink = document.querySelector(`.nav-link[onclick*="${pageId}"]`)
  if (activeLink) activeLink.classList.add("active")

  // Scroll to top
  window.scrollTo(0, 0)
}

// Initialize - show landing page on load
document.addEventListener("DOMContentLoaded", () => {
  navigateTo("landing")
})

// Smooth scroll for skill bars on view
const observerOptions = {
  threshold: 0.5,
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const progressBar = entry.target.querySelector(".skill-progress")
      if (progressBar) {
        progressBar.style.animation = "none"
        setTimeout(() => {
          progressBar.style.animation = ""
        }, 10)
      }
    }
  })
}, observerOptions)

// Observe all skill items
document.querySelectorAll(".skill-item").forEach((item) => {
  observer.observe(item)
})

document.querySelectorAll('.gallery-grid img').forEach(img => {
  img.addEventListener('click', function() {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    modalImg.src = this.src;
    modal.setAttribute('aria-hidden', 'false');
    modal.style.display = 'flex';
    // prevent page scroll while modal open
    document.body.style.overflow = 'hidden';
  });
});

// close modal elements
const modal = document.getElementById('modal');
const modalClose = document.querySelector('.image-modal .close');
if (modalClose) {
  modalClose.addEventListener('click', () => {
    modal.setAttribute('aria-hidden', 'true');
    modal.style.display = 'none';
    document.body.style.overflow = '';
  });
}
if (modal) {
  modal.addEventListener('click', function(e) {
    // clicking outside image closes modal
    const modalImg = document.getElementById('modal-img');
    if (e.target !== modalImg && !e.target.classList.contains('modal-close')) {
      modal.setAttribute('aria-hidden', 'true');
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
}

// close with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const m = document.getElementById('modal');
    if (m && m.getAttribute('aria-hidden') === 'false') {
      m.setAttribute('aria-hidden', 'true');
      m.style.display = 'none';
      document.body.style.overflow = '';
    }
  }
});
