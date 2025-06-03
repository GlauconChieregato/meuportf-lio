
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle') as HTMLButtonElement | null;
    const bodyElement = document.getElementById('body-theme-handler') as HTMLBodyElement | null;

    if (!bodyElement) {
        
        return;
    }

    
    if (themeToggleButton) {
        const applyTheme = (theme: 'light' | 'dark') => {
            if (theme === 'dark') {
                bodyElement.classList.add('dark-mode');
                themeToggleButton.setAttribute('aria-label', 'Mudar para tema claro');
                themeToggleButton.setAttribute('aria-pressed', 'true');
            } else {
                bodyElement.classList.remove('dark-mode');
                themeToggleButton.setAttribute('aria-label', 'Mudar para tema escuro');
                themeToggleButton.setAttribute('aria-pressed', 'false');
            }
        };

        const toggleTheme = () => {
            const currentIsDark = bodyElement.classList.contains('dark-mode');
            const newTheme = currentIsDark ? 'light' : 'dark';
            applyTheme(newTheme);
            
        };

        themeToggleButton.addEventListener('click', toggleTheme);

        
        const preferredTheme: 'light' | 'dark' = 'light';
        applyTheme(preferredTheme);
    }


    
    document.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    });
    document.addEventListener('copy', (event) => {
        event.preventDefault();
    });
    document.addEventListener('selectstart', (event) => {
        if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
            return;
        }
        event.preventDefault();
    });
    document.addEventListener('dragstart', (event) => {
        if (event.target instanceof HTMLImageElement || event.target instanceof HTMLAnchorElement) {
            event.preventDefault();
        }
    });

    
    
    
    

    
    function updateLayoutForFixedHeader() {
        const header = document.querySelector('.site-header') as HTMLElement | null;
        
        if (!header || !bodyElement) return;

        
        const headerHeight = header.offsetHeight; 
        const headerCssTop = parseFloat(getComputedStyle(header).top) || 0; 
        const topSpacingForContent = headerHeight + headerCssTop + 15; 

        const mainElement = document.querySelector('main') as HTMLElement | null;
        if (mainElement) {
            mainElement.style.paddingTop = `${topSpacingForContent}px`;
        }

        const scrollTargets = document.querySelectorAll('section[id]');
        scrollTargets.forEach(section => {
            (section as HTMLElement).style.scrollMarginTop = `${topSpacingForContent}px`;
        });

        
        const headerRect = header.getBoundingClientRect();
        const headerBottom = headerRect.bottom; 

        const mobileMenuTopOffset = headerBottom + 10; 
        
        bodyElement.style.setProperty('--mobile-menu-top-offset', `${mobileMenuTopOffset}px`);
    }

    updateLayoutForFixedHeader();
    window.addEventListener('resize', updateLayoutForFixedHeader);
    setTimeout(updateLayoutForFixedHeader, 100); 

    
    const animatedElements = document.querySelectorAll('.animate-init');
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observerInstance.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        animatedElements.forEach(el => {
            el.classList.add('is-visible');
        });
    }

    
    const hamburgerButton = document.getElementById('hamburger-menu') as HTMLButtonElement | null;
    const mobileMenu = document.getElementById('main-navigation-menu') as HTMLElement | null;

    if (hamburgerButton && mobileMenu && bodyElement) { 
        const toggleMobileMenu = () => {
            const isMenuOpen = bodyElement.classList.contains('is-mobile-menu-open');
            bodyElement.classList.toggle('is-mobile-menu-open');
            hamburgerButton.classList.toggle('is-active');
            hamburgerButton.setAttribute('aria-expanded', String(!isMenuOpen));
            mobileMenu.setAttribute('aria-hidden', String(isMenuOpen));
        };

        hamburgerButton.addEventListener('click', toggleMobileMenu);

        const navLinksInMenu = mobileMenu.querySelectorAll<HTMLAnchorElement>('.nav-link[href^="#"]');
        navLinksInMenu.forEach(link => {
            link.addEventListener('click', (event: MouseEvent) => {
                const href = link.getAttribute('href');

                
                if (href && href.startsWith('#') && href.length > 1) {
                    event.preventDefault(); 
                    const targetId = href.substring(1); 
                    const targetElement = document.getElementById(targetId);

                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                        
                        
                        if (window.location.hash !== href) {
                           window.location.hash = href;
                        }
                    }
                }
                
                

                
                if (bodyElement.classList.contains('is-mobile-menu-open')) {
                    toggleMobileMenu();
                }
            });
        });
        
        const themeToggleInMobileMenu = mobileMenu.querySelector('#theme-toggle');
        if (themeToggleInMobileMenu) {
            themeToggleInMobileMenu.addEventListener('click', () => {
                 
            });
        }

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && bodyElement.classList.contains('is-mobile-menu-open')) {
                toggleMobileMenu();
            }
        });

        document.addEventListener('click', (event) => {
            if (bodyElement.classList.contains('is-mobile-menu-open')) {
                const target = event.target as HTMLElement;
                if (!mobileMenu.contains(target) && !hamburgerButton.contains(target)) {
                     toggleMobileMenu();
                }
            }
        });

    } else {
        
    }

    
    
    
    
    const initialTargetElement = document.getElementById('about');
    if (initialTargetElement) {
        
        
        
        window.location.hash = '#about';
    }
});
