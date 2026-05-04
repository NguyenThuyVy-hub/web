// mobile-menu.js
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtns = document.querySelectorAll('.md\\:hidden button');
    let mobileMenu = document.getElementById('mobile-menu');

    // Create mobile menu dynamically if it doesn't exist
    if (!mobileMenu) {
        const header = document.querySelector('header');
        const desktopNav = document.querySelector('nav.hidden.md\\:flex');
        const desktopCtaContainer = document.querySelector('header .hidden.md\\:flex.items-center');
        
        if (header && desktopNav) {
            mobileMenu = document.createElement('div');
            mobileMenu.id = 'mobile-menu';
            mobileMenu.className = 'md:hidden hidden-menu absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-xl overflow-hidden';
            
            // Clone links
            const linksHtml = Array.from(desktopNav.children).map(link => {
                return `<a href="${link.getAttribute('href')}" class="block px-6 py-4 text-base font-semibold text-gray-800 hover:bg-blue-50 hover:text-primary transition-colors border-b border-gray-50 uppercase">${link.textContent}</a>`;
            }).join('');
            
            // Add CTA if exists
            let ctaHtml = '';
            if (desktopCtaContainer) {
                const ctaBtn = desktopCtaContainer.querySelector('a');
                if (ctaBtn) {
                    ctaHtml = `<div class="p-6"><a href="${ctaBtn.getAttribute('href')}" class="block w-full text-center bg-gradient-to-r from-blue-700 to-blue-500 text-white px-7 py-4 rounded-xl font-bold transition-all shadow-md hover:shadow-lg">${ctaBtn.textContent}</a></div>`;
                }
            }

            mobileMenu.innerHTML = `<div class="flex flex-col">${linksHtml}${ctaHtml}</div>`;
            header.appendChild(mobileMenu);
        }
    }

    // Toggle menu
    mobileMenuBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (mobileMenu) {
                if (mobileMenu.classList.contains('hidden-menu')) {
                    mobileMenu.classList.remove('hidden-menu');
                    mobileMenu.classList.add('active-menu');
                } else {
                    mobileMenu.classList.remove('active-menu');
                    mobileMenu.classList.add('hidden-menu');
                }
            }
        });
    });

    // Close mobile menu on link click
    if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active-menu');
                mobileMenu.classList.add('hidden-menu');
            });
        });
    }
});
