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

    // Set initial active section
    const activeNavItem = document.querySelector('.nav-item.active');
    if (activeNavItem) {
        const targetId = activeNavItem.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.style.display = 'block';
            targetSection.classList.add('active');
        }
    }

    // Navigation Logic
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all
            navItems.forEach(n => n.classList.remove('active'));
            contentSections.forEach(s => {
                s.style.display = 'none';
                s.classList.remove('active');
            });

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
    // Presentation Navigation Logic
    const contentContainer = document.querySelector('.content-wrapper'); // The scrollable container
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    const getScrollTargets = () => {
        // Collect all logical stop points in the currently visible section
        const activeSection = document.querySelector('.content-section.active');
        if (!activeSection) {
            console.warn("No active section found for scrolling");
            return [];
        }

        // Define what constitutes a "Stop"
        // 1. The Section Header
        // 2. The Overview
        // 3. Each Topic Block
        // 4. Each H3 (Section titles)
        // 5. Code Examples (optional, maybe too granular?) - Let's stick to H3 and Topic Blocks
        // Expanded list to catch intro pages and cards
        const targets = Array.from(activeSection.querySelectorAll('.section-header-wrapper, .content-overview, .topic-block, .content-split, .concept-card, h3, h4'));

        // Sort by visual position (getBoundingClientRect) to handle nested offsetParents correctly
        return targets.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
    };

    const scrollToTarget = (target) => {
        if (target) {
            // Smooth scroll within the container
            // Use block: 'start' to align top of element with top of container
            // Use behavior: 'smooth'
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    if (prevBtn && nextBtn && contentContainer) {
        console.log("Presentation controls initialized");
        nextBtn.addEventListener('click', () => {
            console.log("Next button clicked");
            const targets = getScrollTargets();
            console.log(`Found ${targets.length} targets`);

            // Current scroll position of the container + a small buffer
            const currentScroll = contentContainer.scrollTop + 20;

            // Find the first target whose top is *significantly* below the current scroll
            // Since elements are inside contentContainer, we check their offsetTop relative to the container? 
            // offsetTop is relative to the *offsetParent*. If contentContainer is positioned, it works.
            // If not, we might need verify. But content-wrapper is usually static. 
            // Actually, getBoundingClientRect is safer.
            const containerRect = contentContainer.getBoundingClientRect();
            console.log("Container Top:", containerRect.top);

            const nextTarget = targets.find(t => {
                const rect = t.getBoundingClientRect();
                console.log(`Check Target: ${t.tagName}.${t.className.split(' ')[0]} Top: ${rect.top}`);
                // t is "Next" if its top is below the container's top + some threshold
                return rect.top > (containerRect.top + 50);
            });

            if (nextTarget) {
                console.log("Scrolling to:", nextTarget);
                scrollToTarget(nextTarget);
            } else {
                console.log("No next target found");
            }
        });

        prevBtn.addEventListener('click', () => {
            console.log("Prev button clicked");
            const targets = getScrollTargets();
            const containerRect = contentContainer.getBoundingClientRect();

            // Find the last target whose top is *above* the current view
            // (Reverse find)
            const prevTarget = [...targets].reverse().find(t => {
                const rect = t.getBoundingClientRect();
                // t is "Prev" if its top is above the container's top - some threshold
                return rect.top < (containerRect.top - 50);
            });

            if (prevTarget) {
                console.log("Scrolling to:", prevTarget);
                scrollToTarget(prevTarget);
            } else {
                console.log("No prev target found");
            }
        });
    } else {
        console.error("Presentation controls or content container not found", { prevBtn, nextBtn, contentContainer });
    }

    // Keyboard Navigation Support
    document.addEventListener('keydown', (e) => {
        // Only trigger if no modifiers are pressed (like Cmd/Ctrl) to avoid conflicting with browser shortcuts
        if (!e.ctrlKey && !e.altKey && !e.metaKey && !e.shiftKey) {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault(); // Prevent default scroll
                if (nextBtn) nextBtn.click();
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault(); // Prevent default scroll
                if (prevBtn) prevBtn.click();
            }
        }
    });
});
