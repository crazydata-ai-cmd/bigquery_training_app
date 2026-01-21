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
    // Add click event to all images in illustration-container, tech-card, or with 'zoomable-image' class
    const images = document.querySelectorAll('.illustration-container img, .tech-card img, .zoomable-image');
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
    // Zoom functionality
    lightboxImg.onclick = function (e) {
        e.stopPropagation(); // Prevent closing when clicking image
        if (this.classList.contains('zoomed')) {
            this.classList.remove('zoomed');
        } else {
            // Calculate click position relative to the image
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Set transform origin to the click position
            this.style.transformOrigin = `${x}px ${y}px`;
            this.classList.add('zoomed');
        }
    }

    // Close logic
    const closeLightbox = () => {
        lightbox.style.display = "none";
        lightboxImg.classList.remove('zoomed'); // Reset zoom on close
        lightboxImg.style.transformOrigin = 'center center'; // Reset origin
    }

    if (closeBtn) {
        closeBtn.onclick = closeLightbox;
    }

    // Close on click outside
    if (lightbox) {
        lightbox.onclick = function (e) {
            if (e.target !== lightboxImg) {
                closeLightbox();
            }
        }
    }

    // Close on Esc key
    document.addEventListener('keydown', function (event) {
        if (event.key === "Escape" && lightbox) {
            lightbox.style.display = "none";
        }
    });

    // Code Copy Functionality
    const codeExamples = document.querySelectorAll('.code-example');
    codeExamples.forEach(example => {
        // Create container for relative positioning if not already existing
        // (The .code-example class already exists)

        // Find the pre element
        const pre = example.querySelector('pre');
        if (pre) {
            // Create "Copy" button
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-btn';
            copyBtn.innerHTML = '<span class="material-icons" style="font-size: 16px;">content_copy</span> Copy';

            copyBtn.addEventListener('click', () => {
                const code = pre.querySelector('code');
                const text = code ? code.innerText : pre.innerText;

                navigator.clipboard.writeText(text).then(() => {
                    // Success feedback
                    const originalHtml = copyBtn.innerHTML;
                    copyBtn.innerHTML = '<span class="material-icons" style="font-size: 16px;">check</span> Copied!';
                    copyBtn.classList.add('copied');

                    setTimeout(() => {
                        copyBtn.innerHTML = originalHtml;
                        copyBtn.classList.remove('copied');
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                });
            });

            // Make sure the PRE is relative so we can position absolute inside it
            pre.style.position = 'relative';
            pre.appendChild(copyBtn);
        }
    });
});
