/**
 * SMRITI - PREMIUM INTERACTION SCRIPT
 * High-performance UI interactions, custom cursors, animations, sliders,
 * and standard multi-page click delegations.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     0. PRELOADER & SCROLL PROGRESS
     ========================================================================= */
  const preloader = document.getElementById('preloader');
  const scrollProgress = document.getElementById('scroll-progress');

  // Fade out preloader when page is fully loaded
  window.addEventListener('load', () => {
    if (preloader) {
      preloader.classList.add('opacity-0');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }
  });

  // Fallback for preloader if load event takes too long
  setTimeout(() => {
    if (preloader && preloader.style.display !== 'none') {
      preloader.classList.add('opacity-0');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }
  }, 3000);

  /* ==========================================================================
     1. CUSTOM CURSOR SYSTEM
     ========================================================================= */
  const cursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.custom-cursor-dot');
  
  if (cursor && cursorDot && window.innerWidth > 1024) {
    // Reveal cursor elements
    cursor.style.opacity = '1';
    cursorDot.style.opacity = '1';

    let cursorX = 0, cursorY = 0; // Current cursor position
    let targetX = 0, targetY = 0; // Mouse position
    const delay = 0.15; // Smooth trailing delay factor

    document.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      // Dot matches cursor instantly
      cursorDot.style.left = `${targetX}px`;
      cursorDot.style.top = `${targetY}px`;
    });

    // Lagged animation loop for outer ring
    const animateCursor = () => {
      const dx = targetX - cursorX;
      const dy = targetY - cursorY;
      
      cursorX += dx * delay;
      cursorY += dy * delay;
      
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      
      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Hover states for interactive elements
    const interactiveSelector = 'a, button, select, input, textarea, .spotlight-card, .spotlight-card-dark, .faq-header, .clickable, .project-filter-btn';
    
    const attachHoverEvents = () => {
      const hoverables = document.querySelectorAll(interactiveSelector);
      hoverables.forEach(el => {
        el.addEventListener('mouseenter', onMouseEnter);
        el.addEventListener('mouseleave', onMouseLeave);
        el.addEventListener('mousedown', onMouseDown);
        el.addEventListener('mouseup', onMouseUp);
      });
    };

    function onMouseEnter() { cursor.classList.add('hovering'); }
    function onMouseLeave() { cursor.classList.remove('hovering'); }
    function onMouseDown() { cursor.classList.add('clicking'); }
    function onMouseUp() { cursor.classList.remove('clicking'); }

    attachHoverEvents();

    // Re-bind hover events on dynamic layout updates
    window.addEventListener('resize', attachHoverEvents);
  }


  /* ==========================================================================
     2. STICKY HEADER AND SCROLL SPY
     ========================================================================= */
  const header = document.querySelector('header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const onPageScroll = () => {
    if (!header) return;

    // Sticky header
    if (window.scrollY > 30) {
      header.classList.add('py-3', 'bg-white/80', 'backdrop-blur-md', 'shadow-sm', 'border-b', 'border-gray-100');
      header.classList.remove('py-5', 'bg-transparent');
    } else {
      header.classList.add('py-5', 'bg-transparent');
      header.classList.remove('py-3', 'bg-white/80', 'backdrop-blur-md', 'shadow-sm', 'border-b', 'border-gray-100');
    }

    // Scroll progress bar
    if (scrollProgress) {
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollable = docHeight - windowHeight;
      const scrolled = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      scrollProgress.style.width = `${scrolled}%`;
    }

    // Scroll Spy Active Link Indicator
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 150; // offset

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('text-green-500', 'font-semibold');
        link.classList.add('text-gray-600');
        if (link.getAttribute('href') === `#${currentSectionId}` || link.getAttribute('href').endsWith(`#${currentSectionId}`)) {
          link.classList.remove('text-gray-600');
          link.classList.add('text-green-500', 'font-semibold');
        }
      });
    }
  };

  window.addEventListener('scroll', onPageScroll);
  onPageScroll(); // Call immediately


  /* ==========================================================================
     3. MOBILE NAVIGATION BUTTON HANDLER
     ========================================================================= */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    const hamburgerIcon = mobileMenuBtn.querySelector('i');
    
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('translate-x-0');
      if (isOpen) {
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('translate-x-full');
        hamburgerIcon.className = 'fa-solid fa-bars text-2xl';
      } else {
        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.classList.add('translate-x-0');
        hamburgerIcon.className = 'fa-solid fa-xmark text-2xl';
      }
    });

    const mobileNavLinks = mobileMenu.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('translate-x-full');
        hamburgerIcon.className = 'fa-solid fa-bars text-2xl';
      });
    });
  }


  /* ==========================================================================
     4. INTERACTIVE CARD SPOTLIGHT COORDINATORS
     ========================================================================= */
  const spotlightCards = document.querySelectorAll('.spotlight-card, .spotlight-card-dark');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    });
  });


  /* ==========================================================================
     5. PROJECT FILTER SYSTEM & CARD REDIRECTION
     ========================================================================= */
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('#projects-grid > div');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Reset classes for all filter buttons
      filterBtns.forEach(b => {
        b.className = 'project-filter-btn px-5 py-2 rounded-full text-xs font-semibold bg-gray-50 text-gray-500 border border-gray-150 hover:bg-gray-100 hover:text-dark transition-all cursor-none';
      });
      // Add active classes to current button
      btn.className = 'project-filter-btn px-5 py-2 rounded-full text-xs font-semibold bg-brand text-white border border-brand transition-all cursor-none';
      
      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Spotlight card click delegation
  spotlightCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // If user clicks a button, select, or nested anchor link inside card, let that action fire instead
      if (e.target.closest('a') || e.target.closest('button') || e.target.closest('select') || e.target.closest('input') || e.target.closest('textarea')) {
        return;
      }
      const href = card.getAttribute('data-href');
      if (href) {
        window.location.href = href;
      }
    });
  });


  /* ==========================================================================
     6. SCROLL REVEAL & STATS COUNTER OBSERVER
     ========================================================================= */
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        
        // Progress bar loading animation support
        const progressBar = entry.target.querySelector('.progress-bar-fill');
        if (progressBar) {
          const width = progressBar.dataset.width;
          progressBar.style.width = width;
        }
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // Stats Strip Counter Logic
  const counterNumbers = document.querySelectorAll('.counter-number');
  const statsStrip = document.getElementById('stats-strip');
  let countersAnimated = false;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    
    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(ease * target);
      
      el.textContent = currentVal;
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        el.textContent = target;
      }
    };
    
    requestAnimationFrame(updateCount);
  };

  if (statsStrip && counterNumbers.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
          countersAnimated = true;
          counterNumbers.forEach(num => animateCounter(num));
          statsObserver.unobserve(statsStrip);
        }
      });
    }, { threshold: 0.1 });
    statsObserver.observe(statsStrip);
  }


  /* ==========================================================================
     7. TESTIMONIALS SLIDE CAROUSEL
     ========================================================================= */
  const sliderInner = document.getElementById('testimonials-slider-inner');
  const slides = document.querySelectorAll('#testimonials-slider-inner > div');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');
  const dotsContainer = document.getElementById('slider-dots');

  if (sliderInner && slides.length > 0 && dotsContainer) {
    let currentSlide = 0;
    const slideCount = slides.length;

    dotsContainer.innerHTML = '';
    for (let i = 0; i < slideCount; i++) {
      const dot = document.createElement('button');
      dot.className = `w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === 0 ? 'bg-green-500 w-6' : 'bg-gray-300 hover:bg-gray-400'}`;
      dot.setAttribute('aria-label', `Go to testimonial slide ${i + 1}`);
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }

    const dots = dotsContainer.querySelectorAll('button');

    const updateSlider = () => {
      sliderInner.style.transform = `translateX(-${currentSlide * 100}%)`;
      dots.forEach((dot, idx) => {
        if (idx === currentSlide) {
          dot.className = 'w-2.5 h-2.5 rounded-full transition-all duration-300 bg-green-500 w-6';
        } else {
          dot.className = 'w-2.5 h-2.5 rounded-full transition-all duration-300 bg-gray-300 hover:bg-gray-400';
        }
      });
    };

    const goToSlide = (index) => {
      currentSlide = (index + slideCount) % slideCount;
      updateSlider();
      resetAutoplay();
    };

    const nextSlide = () => { goToSlide(currentSlide + 1); };
    const prevSlide = () => { goToSlide(currentSlide - 1); };

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    let autoplayInterval = setInterval(nextSlide, 6000);

    const resetAutoplay = () => {
      clearInterval(autoplayInterval);
      autoplayInterval = setInterval(nextSlide, 6000);
    };

    // Mobile Touch Swipes
    let touchStartX = 0;
    let touchEndX = 0;

    sliderInner.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderInner.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const distance = touchStartX - touchEndX;
      if (distance > 50) nextSlide();
      else if (distance < -50) prevSlide();
    }, { passive: true });
  }


  /* ==========================================================================
     8. FAQ ACCORDION HANDLER
     ========================================================================= */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const faqHeader = item.querySelector('.faq-header');
    if (faqHeader) {
      faqHeader.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('open');
            otherItem.querySelector('.faq-header').setAttribute('aria-expanded', 'false');
          }
        });

        if (isOpen) {
          item.classList.remove('open');
          faqHeader.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('open');
          faqHeader.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });


  /* ==========================================================================
     9. CONTACT FORM SIMULATOR
     ========================================================================= */
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit');
  const responseMsg = document.getElementById('contact-response-message');

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="mr-2">Sending Brief</span>
        <i class="fa-solid fa-circle-notch fa-spin text-lg"></i>
      `;

      if (responseMsg) {
        responseMsg.className = 'mt-4 text-sm font-medium hidden';
        responseMsg.textContent = '';
      }

      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const projectTypeEl = document.getElementById('form-type');
      const projectType = projectTypeEl ? projectTypeEl.options[projectTypeEl.selectedIndex].text : '';
      const budgetEl = document.getElementById('form-budget');
      const budget = budgetEl ? budgetEl.options[budgetEl.selectedIndex].text : '';
      const details = document.getElementById('form-details').value.trim();

      setTimeout(() => {
        if (responseMsg) {
          if (name && email && projectType && budget && details) {
            responseMsg.className = 'mt-4 text-sm font-semibold p-4 rounded-xl border border-green-200/50 bg-green-50 text-green-700 flex items-start gap-3 text-left';
            responseMsg.innerHTML = `
              <i class="fa-solid fa-circle-check text-green-500 mt-0.5 text-base flex-shrink-0"></i>
              <div>
                <p class="font-bold">Project Request Sent Successfully!</p>
                <p class="font-normal text-xs text-green-600 mt-1">Thank you, ${name}. I have received your request for a <strong>${projectType}</strong> project with an estimated budget of <strong>${budget}</strong>.</p>
                <p class="font-normal text-xs text-green-600 mt-1">I will review your description: <em>"${details.substring(0, 100)}${details.length > 100 ? '...' : ''}"</em> and respond to <strong>${email}</strong> with a detailed proposal and contract link within 12 hours.</p>
              </div>
            `;
            contactForm.reset();
          } else {
            responseMsg.className = 'mt-4 text-sm font-semibold p-4 rounded-xl border border-red-200/50 bg-red-50 text-red-700 flex items-start gap-3 text-left';
            responseMsg.innerHTML = `
              <i class="fa-solid fa-circle-exclamation text-red-500 mt-0.5 text-base flex-shrink-0"></i>
              <div>
                <p class="font-bold">Submission Incomplete.</p>
                <p class="font-normal text-xs text-red-600 mt-1">Please select all dropdown options and fill out the details before submitting.</p>
              </div>
            `;
          }
        }
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 1500);
    });
  }


  /* ==========================================================================
     10. CASE STUDY MODAL DYNAMIC INJECTOR
     ========================================================================= */
  const projectDetails = {
    novacam: {
      title: "NovaCam Pro",
      category: "Mobile UI / Premium App",
      image: "assets/novacam_ui.png",
      client: "Fiverr Client (USA)",
      duration: "10 Days",
      stack: ["HTML5", "Vanilla CSS", "JavaScript", "AI APIs", "Web Audio"],
      challenge: "The client wanted an ultra-futuristic, interactive mobile camera interface inspired by high-end DSLR apps and professional screen viewfinders. It needed to show simulated 2K/4K/8K options, manual exposure controls, ambient grids, and real-time canvas filters that respond to user adjustments without lagging the browser.",
      solution: "I engineered a custom web-based simulation utilizing HTML5 Canvas and advanced CSS filters. I created dials for ISO, shutter speed, and focus, and mapped them to CSS custom property values. I integrated the Web Audio API to generate satisfying synthetic shutter clicks and feedback tones, elevating the app's premium tactility.",
      results: "Delivered a pixel-perfect layout that was validated to load under 300ms. The client received a 5-star rating on Fiverr and praised the ultra-premium feeling, using the interface to pitch their app idea to venture capitalists.",
      liveUrl: "novacam.html"
    },
    flowsync: {
      title: "FlowSync AI",
      category: "SaaS / Dashboard",
      image: "assets/flowsync_ui.png",
      client: "BrightScale SaaS (UK)",
      duration: "7 Days",
      stack: ["Next.js", "Tailwind CSS", "Framer Motion", "Recharts"],
      challenge: "BrightScale needed a marketing page that instantly conveys the complexity of their AI synchronization dashboard. The layout had to be clean, and load speeds had to remain high despite heavy graphic widgets and interactive analytics charts.",
      solution: "I structured the page in Next.js using Tailwind CSS for modular styling. I coded SVG-based mini graphs with floating indicators and integrated subtle entry animations to make the layout feel alive. High-resolution layout elements were optimized to minimize CLS (Cumulative Layout Shift).",
      results: "PageSpeed scores reached 98 on desktop. The client saw a 38% increase in email subscriptions for their beta launch due to improved design credibility.",
      liveUrl: "flowsync.html"
    },
    pixelforge: {
      title: "PixelForge Studio",
      category: "Agency Portfolio",
      image: "assets/pixelforge_ui.png",
      client: "PixelForge (Germany)",
      duration: "6 Days",
      stack: ["React JS", "GSAP", "Tailwind CSS", "Webpack"],
      challenge: "A creative agency wanted a visual portfolio that breaks traditional grid designs. They requested complex scroll-tied animations, mouse-glow tiles, and a slide-out case studies drawer to showcase their interactive marketing campaign designs.",
      solution: "I integrated GSAP for scroll-tied animations and parallax shifts. I built mouse spotlight gradients using CSS variables and handled page-navigation delays to ensure custom transition loops fired correctly.",
      results: "The website won a CSS design nod and led to a 45% increase in visitor session duration, reducing agency client acquisition bounce rate significantly.",
      liveUrl: "pixelforge.html"
    },
    greenbite: {
      title: "GreenBite Restaurant",
      category: "Restaurant UI",
      image: "assets/greenbite_ui.png",
      client: "GreenBite Co. (Germany)",
      duration: "5 Days",
      stack: ["HTML5 / CSS3", "JavaScript", "AOS", "Local API"],
      challenge: "GreenBite required a conversion-focused landing page showcasing a fresh, green aesthetic. Key needs were an interactive food menu with filtering controls, a reservation form, and a responsive visual layout that works on tablet menus.",
      solution: "I developed a highly visual single-page application with scroll reveal animations (AOS) and backdrop filters. The menu filters instantly update the grid layout without reloading, using vanilla JavaScript arrays. Tap targets were sized to meet strict mobile ergonomic standards.",
      results: "Online bookings doubled within the first month. Responsive performance across mobile phones scored a perfect 100 on Google PageSpeed.",
      liveUrl: "greenbite.html"
    },
    powerfit: {
      title: "PowerFit Gym",
      category: "Fitness Landing Page",
      image: "assets/powerfit_ui.png",
      client: "PowerFit Club (Canada)",
      duration: "6 Days",
      stack: ["Vite JS", "Tailwind CSS", "Framer Motion", "Vanilla JS"],
      challenge: "The gym owner wanted a dark-themed page with neon accents to appeal to high-performance athletes. It needed to contain class calendars, trainer profiles, pricing boxes, and a fully functional interactive BMI calculator widget.",
      solution: "I built the app structure in Vite JS for near-instant rendering. I implemented the BMI math utility in vanilla JS to provide immediate feedback. For styling, I used a premium charcoal-and-lime color scheme, layering glassmorphic containers over slow floating backdrop blobs.",
      results: "Membership sign-ups rose by 22%. Mobile conversion rates improved as athletes could calculate their BMI and sign up directly on their phones.",
      liveUrl: "powerfit.html"
    },
    urbannest: {
      title: "UrbanNest Realty",
      category: "Real Estate Marketplace",
      image: "assets/urbannest_ui.png",
      client: "UrbanNest Group (USA)",
      duration: "12 Days",
      stack: ["WordPress", "Elementor Pro", "Custom Widgets", "REST API"],
      challenge: "A luxury brokerage wanted a premium listing directory. They required map integration, client booking calendars, detailed filtering categories (price, bedrooms, location), and editable backends so agents could add listings manually.",
      solution: "I developed a custom WordPress theme utilizing Elementor Pro. I wrote a PHP helper block to hook into the listing database, enabling quick clientside filtering. I optimized WP database queries and configured CDN pipelines to ensure page speeds loaded under 1.2s.",
      results: "Inquiries increased by 52% as a result of the simple listing filters. The client was able to manage and scale listings without needing any coding support.",
      liveUrl: "urbannest.html"
    },
    alexcarter: {
      title: "Alex Carter Portfolio",
      category: "Personal Portfolio",
      image: "assets/alexcarter_ui.png",
      client: "Freelance Designer (Australia)",
      duration: "4 Days",
      stack: ["JavaScript", "HTML5", "CSS3", "EmailJS"],
      challenge: "Alex needed a clean, developer-focused portfolio landing page mirroring Apple's minimalist aesthetic, complete with a timeline of work milestones, smooth transitions, and high-performance load times.",
      solution: "I authored a highly semantic layout, using CSS flexbox/grid exclusively to achieve layouts without heavy libraries. I integrated EmailJS directly into the frontend, enabling direct client messaging without a complex backend server.",
      results: "Alex received multiple job invitations immediately after sharing the site, citing the smooth animations and premium typography choices.",
      liveUrl: "alexcarter.html"
    },
    growthedge: {
      title: "GrowthEdge Consulting",
      category: "Corporate Business",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      client: "GrowthEdge LLC (New York)",
      duration: "5 Days",
      stack: ["HTML5", "Tailwind CSS", "JavaScript", "Intersection Observer"],
      challenge: "The client needed a premium, trust-building corporate website with dynamic sections, modern scroll animations, and a fully responsive professional layout.",
      solution: "I built a highly performant static site using Tailwind CSS for rapid styling and custom JavaScript intersection observers for smooth scroll-reveal animations. The design utilizes a clean emerald green and slate color palette.",
      results: "The new website successfully established a premium brand identity, leading to a significant increase in client inquiries through the optimized contact form.",
      liveUrl: "growthedge.html"
    },
    greencart: {
      title: "GreenCart Store",
      category: "E-Commerce",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
      client: "GreenCart Organics (Canada)",
      duration: "8 Days",
      stack: ["HTML5", "Tailwind CSS", "Vanilla JS", "DOM Manipulation"],
      challenge: "The client needed a responsive, modern e-commerce front-end for their organic grocery store. Key requirements included a dynamic sliding shopping cart, functional product filtering, a quick-view modal, and a clean white/green aesthetic.",
      solution: "I developed a highly interactive UI using Vanilla JavaScript for all cart logic and modals to ensure maximum performance. I used Tailwind CSS to rapidly build out the complex product grids, custom hover states, and smooth CSS transitions.",
      results: "The fast interface significantly improved the user shopping experience. The quick-view modal and smooth cart drawer reduced friction, leading to a projected 30% increase in cart completion rates.",
      liveUrl: "greencart.html"
    },
    crystaltech: {
      title: "Crystal Tech",
      category: "AI & Technology",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
      client: "Crystal Tech Solutions",
      duration: "9 Days",
      stack: ["React", "Vite", "Tailwind CSS"],
      challenge: "Needed a highly modern, dark-themed AI network interface that conveys technical sophistication and innovation.",
      solution: "I engineered a dynamic React and Vite application with Tailwind CSS, delivering a highly modern, dark-themed AI network interface. The sophisticated layout uses smooth interactions and responsive design principles.",
      results: "The application provides a seamless and futuristic user experience, immediately capturing user attention and establishing strong technical credibility for the brand.",
      liveUrl: "crystal-tech/index.html"
    }
  };

  const modal = document.getElementById('case-study-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalContainer = document.getElementById('modal-container');
  const modalClose = document.getElementById('modal-close');
  
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalImage = document.getElementById('modal-image');
  const modalStack = document.getElementById('modal-stack');
  const modalClient = document.getElementById('modal-client');
  const modalDuration = document.getElementById('modal-duration');
  const modalChallenge = document.getElementById('modal-challenge');
  const modalSolution = document.getElementById('modal-solution');
  const modalResults = document.getElementById('modal-results');
  const modalLiveLink = document.getElementById('modal-live-link');

  const openModal = (projectId) => {
    const data = projectDetails[projectId];
    if (!data || !modal) return;

    // Populate dynamic data
    modalTitle.textContent = data.title;
    modalCategory.textContent = data.category;
    modalImage.src = data.image;
    modalImage.alt = `${data.title} Visual Showcase`;
    modalClient.textContent = data.client;
    modalDuration.textContent = data.duration;
    modalChallenge.textContent = data.challenge;
    modalSolution.textContent = data.solution;
    modalResults.textContent = data.results;
    modalLiveLink.href = data.liveUrl;

    // Clear and build tech stack badges
    modalStack.innerHTML = '';
    data.stack.forEach(tech => {
      const span = document.createElement('span');
      span.className = 'text-[9px] font-bold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-md uppercase tracking-wider font-space';
      span.textContent = tech;
      modalStack.appendChild(span);
    });

    // Animate Modal Open
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Lock background scrolling

    setTimeout(() => {
      if (modalBackdrop) {
        modalBackdrop.classList.remove('opacity-0');
        modalBackdrop.classList.add('opacity-100');
      }
      if (modalContainer) {
        modalContainer.classList.remove('scale-95', 'opacity-0');
        modalContainer.classList.add('scale-100', 'opacity-100');
      }
    }, 50);
  };

  const closeModal = () => {
    if (!modal) return;
    
    if (modalBackdrop) {
      modalBackdrop.classList.remove('opacity-100');
      modalBackdrop.classList.add('opacity-0');
    }
    if (modalContainer) {
      modalContainer.classList.remove('scale-100', 'opacity-100');
      modalContainer.classList.add('scale-95', 'opacity-0');
    }

    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.style.overflow = ''; // Unlock scroll
    }, 300);
  };

  // Bind click to View Case Study buttons
  document.querySelectorAll('.view-case-study-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // Stop click from triggering parent card redirection
      const projectId = btn.getAttribute('data-project-id');
      if (projectId) {
        openModal(projectId);
      }
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

});
