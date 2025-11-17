// Main JavaScript file
console.log('Script loaded successfully');

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    
    // Initialize all features
    initializeWeatherWidget();
    initializeSearchFeature();
    initializeSmoothScrolling();
    initializeCardAnimations();
    displayCurrentDateTime();
    initializeBackToTop();
});

// Feature 1: Weather Widget using OpenWeather API
function initializeWeatherWidget() {
    const weatherContainer = document.getElementById('weather-widget');
    if (!weatherContainer) return;
    
    // Blue Mountain, MS coordinates
    const lat = 34.6681;
    const lon = -89.0278;
    const apiKey = 'demo'; // Users should get their own API key from openweathermap.org
    
    // Using a free weather API
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=fahrenheit`)
        .then(response => response.json())
        .then(data => {
            const temp = Math.round(data.current_weather.temperature);
            const windSpeed = Math.round(data.current_weather.windspeed);
            
            weatherContainer.innerHTML = `
                <div class="alert alert-info">
                    <strong>🌤️ Blue Mountain Weather:</strong> ${temp}°F | Wind: ${windSpeed} mph
                </div>
            `;
        })
        .catch(error => {
            console.log('Weather data unavailable');
            weatherContainer.innerHTML = '';
        });
}

// Feature 2: Search functionality for pages
function initializeSearchFeature() {
    const searchInput = document.getElementById('site-search');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                card.style.display = 'block';
                card.classList.add('search-highlight');
            } else {
                card.style.display = 'none';
            }
        });
        
        // Remove highlight after a moment
        setTimeout(() => {
            document.querySelectorAll('.search-highlight').forEach(el => {
                el.classList.remove('search-highlight');
            });
        }, 1000);
    });
}

// Feature 3: Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Feature 4: Card hover animations
function initializeCardAnimations() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Feature 5: Display current date and time
function displayCurrentDateTime() {
    const dateTimeElement = document.getElementById('current-datetime');
    if (!dateTimeElement) return;
    
    function updateDateTime() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        dateTimeElement.textContent = now.toLocaleDateString('en-US', options);
    }
    
    updateDateTime();
    setInterval(updateDateTime, 60000); // Update every minute
}

// Feature 6: Back to Top button
function initializeBackToTop() {
    // Create back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.id = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        display: none;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 24px;
        cursor: pointer;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#0056b3';
        this.style.transform = 'scale(1.1)';
    });
    
    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#007bff';
        this.style.transform = 'scale(1)';
    });
}

// Feature 7: Form validation (if forms are added later)
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
            }
        });
        
        if (isValid) {
            alert('Form submitted successfully!');
            form.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

// Feature 8: Loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Fade in animation for main content
    const main = document.querySelector('main');
    if (main) {
        main.style.opacity = '0';
        main.style.transition = 'opacity 0.5s ease-in';
        setTimeout(() => {
            main.style.opacity = '1';
        }, 100);
    }
});
