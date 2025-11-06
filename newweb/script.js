document.addEventListener('DOMContentLoaded', () => {

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.getElementById('main-header');

    // 1. Mobile Menu Toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 2. Sticky Header on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Scroll-in Fade Animations (Advanced)
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.2, // Trigger when 20% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Start loading 50px before it enters view
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');

    // Check for saved theme preference or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'yellow') {
        document.body.classList.add('yellow-theme');
        themeToggle.checked = true;
        themeToggleMobile.checked = true;
    }

    // Sync both toggles
    function handleThemeToggle(isChecked) {
        if (isChecked) {
            document.body.classList.add('yellow-theme');
            localStorage.setItem('theme', 'yellow');
        } else {
            document.body.classList.remove('yellow-theme');
            localStorage.setItem('theme', 'light');
        }
        // Sync both toggles
        themeToggle.checked = isChecked;
        themeToggleMobile.checked = isChecked;
    }

    themeToggle.addEventListener('change', function () {
        handleThemeToggle(this.checked);
    });

    themeToggleMobile.addEventListener('change', function () {
        handleThemeToggle(this.checked);
    });
    // 4. Sidebar Content Toggle (NEWLY ADDED)
    const sidebarLinks = document.querySelectorAll('.sidebar ul li a');
    const contentPanels = document.querySelectorAll('.main-content .content-panel');
    const sidebarListItems = document.querySelectorAll('.sidebar ul li');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Stop the link from jumping to '#'

            // Get the target ID from data-target attribute
            const targetId = link.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);

            // Remove 'active' from all links and panels
            sidebarListItems.forEach(li => li.classList.remove('active'));
            contentPanels.forEach(panel => panel.classList.remove('active'));

            // Add 'active' to the clicked link's parent <li> and the target panel
            link.parentElement.classList.add('active');
            if (targetContent) {
                targetContent.classList.add('active');
                // Re-trigger fade-in for the new active panel
                targetContent.classList.remove('visible'); // Remove to re-animate
                setTimeout(() => targetContent.classList.add('visible'), 10); // Add after a tick
            }
        });
    });

});
