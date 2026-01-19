document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-sidebar');
    const openBtn = document.getElementById('open-sidebar');
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');

    // Sidebar Toggle Logic
    const toggleSidebar = () => {
        sidebar.classList.toggle('closed');

        // Handle responsive behavior manually if needed, or rely on CSS classes
        if (sidebar.classList.contains('closed')) {
            openBtn.classList.remove('hidden');
        } else {
            // If overlapping on mobile, this logic might differ, 
            // but for desktop 'closed' means width 0
            openBtn.classList.remove('hidden'); // Actually we usually hide hamburger when sidebar is open on desktop? 
            // Let's refine:
            // On Desktop: Sidebar open -> hamburger hidden. Sidebar closed -> hamburger shown.
            if (window.innerWidth > 768) {
                openBtn.classList.add('hidden');
            }
        }
    };

    const openSidebar = () => {
        sidebar.classList.remove('closed');
        sidebar.classList.add('open'); // For mobile specific CSS
        if (window.innerWidth > 768) {
            openBtn.classList.add('hidden');
        }
    };

    toggleBtn.addEventListener('click', toggleSidebar);
    openBtn.addEventListener('click', openSidebar);

    // Initial check for desktop
    if (window.innerWidth > 768) {
        openBtn.classList.add('hidden');
    } else {
        sidebar.classList.add('closed'); // Start closed on mobile
        openBtn.classList.remove('hidden');
    }

    // Navigation Logic
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all
            navItems.forEach(n => n.classList.remove('active'));
            contentSections.forEach(s => s.style.display = 'none');

            // Activate clicked
            item.classList.add('active');

            // Show content
            const targetId = item.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.display = 'block';
                targetSection.classList.add('active');
            }

            // On mobile, close sidebar after selection
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
                sidebar.classList.add('closed');
            }
        });
    });
    // Lightbox Functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const captionText = document.getElementById('caption');
    const closeBtn = document.getElementsByClassName("close-lightbox")[0];

    // Add click event to all images in illustration-container or with 'zoomable-image' class
    const images = document.querySelectorAll('.illustration-container img, .zoomable-image');
    images.forEach(img => {
        img.onclick = function () {
            lightbox.style.display = "block";
            lightboxImg.src = this.src;
            // Use the next sibling (caption) or alt text
            const captionElement = this.nextElementSibling;
            captionText.innerHTML = captionElement ? captionElement.innerHTML : this.alt;
        }
    });

    // Close logic
    if (closeBtn) {
        closeBtn.onclick = function () {
            lightbox.style.display = "none";
        }
    }

    // Close on click outside
    if (lightbox) {
        lightbox.onclick = function (e) {
            if (e.target !== lightboxImg) {
                lightbox.style.display = "none";
            }
        }
    }

    // Close on Esc key
    document.addEventListener('keydown', function (event) {
        if (event.key === "Escape" && lightbox) {
            lightbox.style.display = "none";
        }
    });
});
