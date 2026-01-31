

 
 // Mobile Menu Toggle 
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');
        
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            menuToggle.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target) && window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                navbar.style.height = '70px';
                document.querySelector('.nav-container').style.height = '70px';
            } else {
                navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                navbar.style.height = '90px';
                document.querySelector('.nav-container').style.height = '90px';
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (navLinks.classList.contains('active') && window.innerWidth <= 768) {
                        navLinks.classList.remove('active');
                        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }
            });
        });
        
        // Animated Counter for Stats
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const animateCounter = (element, target, duration = 2000) => {
            let start = 0;
            const increment = target / (duration / 16);
            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    element.textContent = target + (element.textContent.includes('%') ? '%' : '+');
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(start) + (element.textContent.includes('%') ? '%' : '+');
                }
            }, 16);
        };
        
        // Start counter animation when stats are in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    statNumbers.forEach(stat => {
                        const target = parseInt(stat.getAttribute('data-count'));
                        animateCounter(stat, target, 1500);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        const heroSection = document.querySelector('.hero');
        if (heroSection) observer.observe(heroSection);

        // Add hover effect to about list items
        document.querySelectorAll('.about-list li').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.querySelector('i').style.transform = 'scale(1.2)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.querySelector('i').style.transform = 'scale(1)';
            });
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });



         // Back to Top Button
        document.addEventListener('DOMContentLoaded', function() {
            const backToTopButton = document.getElementById('backToTop');
            
            // Show/hide button based on scroll position
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    backToTopButton.classList.add('visible');
                } else {
                    backToTopButton.classList.remove('visible');
                }
            });
            
            // Scroll to top when clicked
            backToTopButton.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            // Smooth scroll for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Handle window resize
            let resizeTimer;
            window.addEventListener('resize', function() {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function() {
                    AOS.refresh();
                }, 250);
            });
        });



//Testimonals
        
const track = document.getElementById("sliderTrack");
  const cards = document.querySelectorAll(".testimonial-card");
  const prev = document.getElementById("prevBtnn");
  const next = document.getElementById("nextBtnn");
    
  let slidesPerViewValue = 3;

  let index = 0;
  slidesPerViewValue = window.innerWidth < 768 ? 1 : 2;

  function updateSlidesPerView() {
    slidesPerViewValue = window.innerWidth < 768 ? 1 : 2;
  }

  function updateSlider() {
    if (cards.length === 0) return;
    
    const cardWidth = cards[0].offsetWidth + (window.innerWidth < 768 ? 16 : 24);
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  }

  function nextSlide() {
    const maxIndex = Math.max(0, cards.length - slidesPerViewValue);
    if (index < maxIndex) {
      index += 1;
    } else {
      index = 0;
    }
    updateSlider();
  }

  function prevSlide() {
    const maxIndex = Math.max(0, cards.length - slidesPerViewValue);
    if (index > 0) {
      index -= 1;
    } else {
      index = maxIndex;
    }
    updateSlider();
  }

  next.addEventListener("click", nextSlide);
  prev.addEventListener("click", prevSlide);

  // Handle resize
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateSlidesPerView();
      updateSlider();
      AOS.refresh(); // Refresh AOS on resize
    }, 250);
  });

  // Initialize slider on load
  window.addEventListener('load', () => {
    updateSlidesPerView();
    updateSlider();
  });

  // Also update on DOM content loaded
  document.addEventListener('DOMContentLoaded', updateSlider);











