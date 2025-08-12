// ===== MOBILE MENU TOGGLE =====
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Create close button for mobile menu
    const closeMenu = document.createElement('div');
    closeMenu.classList.add('close-menu', 'mobile-only');
    closeMenu.innerHTML = '<i class="fas fa-times"></i>';
    navMenu.appendChild(closeMenu);
    
    // Toggle menu
    menuToggle.addEventListener('click', function() {
        navMenu.classList.add('active');
    });
    
    // Close menu
    closeMenu.addEventListener('click', function() {
        navMenu.classList.remove('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });
});

// ===== VIDEO FILTERING =====
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const videoCards = document.querySelectorAll('.video-card');
    
    if (filterButtons.length > 0 && videoCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Show/hide videos based on filter
                videoCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        // Add animation
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.opacity = '1';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
});

// ===== CONTACT FORM HANDLING =====
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showFormMessage('Please fill in all required fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission (would be replaced with actual API call)
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            setTimeout(() => {
                showFormMessage('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }, 1500);
        });
    }
    
    function showFormMessage(message, type) {
        // Remove any existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageElement = document.createElement('div');
        messageElement.classList.add('form-message', type === 'error' ? 'error' : 'success');
        messageElement.textContent = message;
        
        // Add to form
        contactForm.insertBefore(messageElement, contactForm.firstChild);
        
        // Remove after 5 seconds
        setTimeout(() => {
            messageElement.classList.add('fade-out');
            setTimeout(() => {
                messageElement.remove();
            }, 300);
        }, 5000);
    }
});

// ===== SCROLL ANIMATIONS =====
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.category-card, .video-card, .playlist-card, .benefit-card, .info-card');
    
    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.95; // Increased from 0.8 to 0.95 to trigger earlier
        
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('show');
            }
        });
    }
    
    // Initial check - run after a small delay to ensure DOM is fully rendered
    setTimeout(function() {
        checkScroll();
    }, 100);
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
});

// ===== DYNAMIC YEAR FOR COPYRIGHT =====
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// ===== LAZY LOADING IMAGES =====
document.addEventListener('DOMContentLoaded', function() {
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const lazyImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(image => {
            lazyImageObserver.observe(image);
        });
    }
});

// ===== BACK TO TOP BUTTON =====
document.addEventListener('DOMContentLoaded', function() {
    // Create back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.classList.add('back-to-top');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add styles for the button
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            background-color: var(--golden-yellow);
            color: var(--deep-navy);
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .back-to-top.show {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top:hover {
            background-color: var(--deep-navy);
            color: var(--text-light);
            transform: translateY(-3px);
        }
        
        .form-message {
            padding: 10px 15px;
            margin-bottom: 15px;
            border-radius: var(--radius-sm);
            font-weight: 500;
            transition: opacity 0.3s ease;
        }
        
        .form-message.success {
            background-color: rgba(76, 175, 80, 0.1);
            color: #4CAF50;
            border: 1px solid #4CAF50;
        }
        
        .form-message.error {
            background-color: rgba(244, 67, 54, 0.1);
            color: #F44336;
            border: 1px solid #F44336;
        }
        
        .form-message.fade-out {
            opacity: 0;
        }
        
        /* Animation for scroll reveal */
        .category-card, .video-card, .playlist-card, .benefit-card, .info-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .category-card.show, .video-card.show, .playlist-card.show, .benefit-card.show, .info-card.show {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});

// ===== CSV DATA LOADER =====
document.addEventListener('DOMContentLoaded', function() {
    // Only run this on the videos page
    if (!document.querySelector('.videos-section')) return;
    
    // Function to fetch and parse CSV data
    async function loadCSVData() {
        try {
            const response = await fetch('my_data.csv');
            const data = await response.text();
            const rows = data.split('\n');
            
            const videoData = [];
            
            rows.forEach(row => {
                if (row.trim() === '') return; // Skip empty rows
                
                // Better parsing that handles commas within titles
                // Look for the last comma that separates the title from the URL
                const lastCommaIndex = row.lastIndexOf(',');
                if (lastCommaIndex > 0) {
                    // Get everything before the last comma as the title
                    const title = row.substring(0, lastCommaIndex).trim();
                    // Get everything after the last comma as the URL
                    const url = row.substring(lastCommaIndex + 1).trim();
                    
                    if (title && url) {
                        videoData.push({
                            title: title,
                            url: url,
                            category: 'picture' // Default to picture books as requested
                        });
                    }
                }
            });
            
            return videoData;
        } catch (error) {
            console.error('Error loading CSV data:', error);
            return [];
        }
    }
    
    // Function to create video cards from data
    function createVideoCards(data) {
        const videoGrid = document.querySelector('.video-grid');
        
        // Clear existing placeholder cards
        videoGrid.innerHTML = '';
        
        data.forEach(item => {
            // Extract video ID from URL for thumbnail
            let videoId = '';
            if (item.url.includes('youtu.be/')) {
                videoId = item.url.split('youtu.be/')[1].split('?')[0];
            } else if (item.url.includes('youtube.com/watch')) {
                videoId = item.url.split('v=')[1].split('&')[0];
            }
            
            // Create video card element
            const card = document.createElement('div');
            card.className = 'video-card';
            card.setAttribute('data-category', item.category);
            
            card.innerHTML = `
                <div class="video-thumbnail">
                    <img src="https://img.youtube.com/vi/${videoId}/mqdefault.jpg" alt="${item.title}">
                    <div class="play-button">
                        <i class="fas fa-play"></i>
                    </div>
                    <a href="${item.url}" class="video-link" target="_blank" rel="noopener noreferrer"></a>
                </div>
                <div class="video-info">
                    <h3>${item.title}</h3>
                    <span class="video-category">Picture Book</span>
                </div>
            `;
            
            videoGrid.appendChild(card);
        });
        
        // Initialize filter functionality
        initializeFilters();
    }
    
    // Load data and create cards
    loadCSVData().then(data => {
        if (data.length > 0) {
            createVideoCards(data);
        }
    });
    
    // Function to initialize filter buttons
    function initializeFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const videoCards = document.querySelectorAll('.video-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Show/hide cards based on filter
                videoCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
});
// ===== FAQ ACCORDION =====
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', function() {
                // Toggle active class on the clicked item
                item.classList.toggle('active');
                
                // Update the icon
                const icon = item.querySelector('.faq-toggle i');
                if (item.classList.contains('active')) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                } else {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                }
                
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        const otherIcon = otherItem.querySelector('.faq-toggle i');
                        otherIcon.classList.remove('fa-minus');
                        otherIcon.classList.add('fa-plus');
                    }
                });
            });
        });
        
        // Open the first FAQ item by default
        faqItems[0].classList.add('active');
        const firstIcon = faqItems[0].querySelector('.faq-toggle i');
        firstIcon.classList.remove('fa-plus');
        firstIcon.classList.add('fa-minus');
    }
});

