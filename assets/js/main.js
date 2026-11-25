/**
 * Mahesh Sea Foods - Master Script (main.js)
 * Shared interactions, responsive menu, quick search, back to top, and WhatsApp integrations.
 */

// Configuration Placeholders (Easily editable by business owner)
const SITE_CONFIG = {
  businessName: "Mahesh Sea Foods",
  whatsappNumber: "917989705005", // Business WhatsApp (Country code 91 + 10 digits)
  businessPhone: "+91 7989705005",
  businessAddress: "H.No: 2-6-3, Near TX Hospital, Bharath Nagar, Uppal, Medchal-Malkajgiri Dist - 500039",
  businessHours: "Mon - Sat: 9:00 AM - 5:00 PM | Sun: Closed",
  googleMapsUrl: "https://maps.app.goo.gl/DNgCmp9HCjLjaLzu8"
};

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initActiveNavLink();
  initHeroCarousel();
  initCategoryTabs();
  initQuickSearchModal();
  initBackToTop();
  initWhatsAppLinks();
  initImageFallbackHandler();
});

/**
 * 1. Sticky Header & Shadow on Scroll
 */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * 2. Responsive Mobile Drawer Navigation
 */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const backdrop = document.querySelector('.mobile-nav-backdrop');
  const closeBtn = drawer ? drawer.querySelector('.mobile-nav-close') : null;

  if (!toggleBtn || !drawer || !backdrop) return;

  const openDrawer = () => {
    toggleBtn.classList.add('open');
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    toggleBtn.setAttribute('aria-expanded', 'true');
  };

  const closeDrawer = () => {
    toggleBtn.classList.remove('open');
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
    toggleBtn.setAttribute('aria-expanded', 'false');
  };

  toggleBtn.addEventListener('click', () => {
    if (drawer.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  backdrop.addEventListener('click', closeDrawer);

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Close when clicking an internal nav link in drawer
  const drawerLinks = drawer.querySelectorAll('.mobile-nav-link');
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/**
 * 3. Active Page Navigation Link Highlighting
 */
function initActiveNavLink() {
  const path = window.location.pathname;
  const page = path.split("/").pop() || 'index.html';

  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPage = href.split("/").pop();

    if (linkPage === page || (page === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * 4. Global Quick Search Modal
 */
function initQuickSearchModal() {
  const searchTriggers = document.querySelectorAll('.js-open-search');
  const modalBackdrop = document.querySelector('.search-modal-backdrop');
  const closeBtn = document.querySelector('.search-modal-close');
  const searchInput = document.querySelector('.search-modal-input');
  const resultsContainer = document.querySelector('.search-modal-results');

  if (!modalBackdrop || !searchInput || !resultsContainer) return;

  const openModal = () => {
    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput.focus(), 100);
    renderSearchResults('');
  };

  const closeModal = () => {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
    searchInput.value = '';
  };

  searchTriggers.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  }));

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
      closeModal();
    }
  });

  searchInput.addEventListener('input', (e) => {
    renderSearchResults(e.target.value.trim());
  });

  function renderSearchResults(query) {
    if (typeof SEAFOOD_PRODUCTS === 'undefined') {
      resultsContainer.innerHTML = '<div style="padding:1rem;color:var(--color-text-muted);">Catalog loading...</div>';
      return;
    }

    if (!query) {
      // Show top suggestions / featured
      const featured = SEAFOOD_PRODUCTS.slice(0, 5);
      resultsContainer.innerHTML = `
        <div style="padding:0.5rem 1rem;font-size:0.75rem;font-weight:700;color:var(--color-text-muted);letter-spacing:0.08em;text-transform:uppercase;">Popular Products</div>
        ${featured.map(renderItemHtml).join('')}
      `;
      return;
    }

    const q = query.toLowerCase();
    const matches = SEAFOOD_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.categoryName.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q)
    );

    if (matches.length === 0) {
      resultsContainer.innerHTML = `
        <div style="padding: 2.5rem 1rem; text-align: center; color: var(--color-text-muted);">
          <p style="margin-bottom:0.5rem;">No seafood products matching "<strong>${escapeHtml(query)}</strong>"</p>
          <a href="products.html" class="btn btn-sm btn-outline" style="margin-top:0.5rem;">View Full Catalog</a>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = `
      <div style="padding:0.5rem 1rem;font-size:0.75rem;font-weight:700;color:var(--color-text-muted);letter-spacing:0.08em;text-transform:uppercase;">${matches.length} Results Found</div>
      ${matches.map(renderItemHtml).join('')}
    `;
  }

  function renderItemHtml(p) {
    return `
      <a href="product-details.html?id=${encodeURIComponent(p.id)}" class="search-result-item">
        <div class="search-result-thumb">
          <img src="${p.image}" alt="${escapeHtml(p.name)}" loading="lazy">
        </div>
        <div class="search-result-info">
          <strong>${escapeHtml(p.name)}</strong>
          <span>${escapeHtml(p.categoryName)} • ${escapeHtml(p.unit)}</span>
        </div>
      </a>
    `;
  }
}

/**
 * 5. Back to Top Button
 */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/**
 * 6. Centralized WhatsApp Enquiry URL Generator
 */
function getWhatsAppUrl(customMessage) {
  const phone = SITE_CONFIG.whatsappNumber;
  const defaultText = customMessage || `Hello ${SITE_CONFIG.businessName}, I would like to enquire about seafood availability and commercial supply.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(defaultText)}`;
}

function initWhatsAppLinks() {
  const genericWhatsAppLinks = document.querySelectorAll('.js-whatsapp-enquiry');
  genericWhatsAppLinks.forEach(link => {
    const customMsg = link.getAttribute('data-message');
    link.href = getWhatsAppUrl(customMsg);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
}

/**
 * 7. Universal Image Fallback Engine
 * Ensures zero broken image icons ever display on the website.
 */
function initImageFallbackHandler() {
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      // If a .jpg failed, try .svg
      if (this.src.endsWith('.jpg')) {
        this.src = this.src.replace(/\.jpg$/, '.svg');
        return;
      }
      // If already tried or still fails, fallback to inline SVG data URI
      this.src = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
          <rect width="100%" height="100%" fill="#292522"/>
          <circle cx="200" cy="130" r="50" fill="rgba(194,89,52,0.15)"/>
          <path d="M170,130 C185,110 215,110 230,130 C215,150 185,150 170,130 Z" fill="#C25934"/>
          <polygon points="230,130 245,120 240,130 245,140" fill="#C25934"/>
          <text x="200" y="210" font-family="sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF" text-anchor="middle">Mahesh Sea Foods</text>
          <text x="200" y="235" font-family="sans-serif" font-size="11" fill="rgba(255,255,255,0.6)" text-anchor="middle">Photo Placeholder</text>
        </svg>
      `);
    });
  });
}

/**
 * 8. Conceptual 16:9 Hero Carousel Engine
 * 4 conceptual stories: Family Emotion, Gym Nutrition, Elders' Eyesight, Brand & Telugu Quote
 */
function initHeroCarousel() {
  const carousel = document.querySelector('.hero-carousel-section');
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.carousel-slide');
  const dots = carousel.querySelectorAll('.carousel-dot');
  const prevBtn = carousel.querySelector('.carousel-prev');
  const nextBtn = carousel.querySelector('.carousel-next');

  if (!slides.length) return;

  let currentIndex = 0;
  let autoplayTimer = null;
  const AUTOPLAY_INTERVAL = 3500; // 3.5 seconds per slide for smooth automatic carousel

  const showSlide = (index) => {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
      dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
    });

    currentIndex = index;
  };

  const nextSlide = () => showSlide(currentIndex + 1);
  const prevSlide = () => showSlide(currentIndex - 1);

  const startAutoplay = () => {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, AUTOPLAY_INTERVAL);
  };

  const stopAutoplay = () => {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  };

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      nextSlide();
      startAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      prevSlide();
      startAutoplay();
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const slideIndex = parseInt(dot.getAttribute('data-slide'), 10);
      if (!isNaN(slideIndex)) {
        showSlide(slideIndex);
        startAutoplay();
      }
    });
  });

  // Keep auto carousel playing continuously without mouse hovering freezing it
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  });

  // Keyboard navigation when focused
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      startAutoplay();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      startAutoplay();
    }
  });

  // Touch swipe support for mobile devices
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) {
      nextSlide();
      startAutoplay();
    } else if (touchEndX - touchStartX > 50) {
      prevSlide();
      startAutoplay();
    }
  }, { passive: true });

  // Initialize first slide and start autoplay immediately
  showSlide(0);
  startAutoplay();
}

/**
 * 9. Interactive Category Buttons & Dynamic Home Products Switcher
 */
function initCategoryTabs() {
  const catButtons = document.querySelectorAll('.cat-btn-pill');
  const gridContainer = document.getElementById('homeCategoryProductsGrid');
  const viewAllBtn = document.getElementById('viewCategoryProductsBtn');

  if (!catButtons.length || !gridContainer || typeof CatalogService === 'undefined') return;

  // Sync count pills with live catalog
  catButtons.forEach(btn => {
    const catId = btn.getAttribute('data-category');
    const countEl = btn.querySelector('.cat-pill-count');
    if (countEl) {
      const cnt = catId === 'all' ? CatalogService.getAllProducts().length : CatalogService.getProductsByCategory(catId).length;
      countEl.textContent = `${cnt} Item${cnt === 1 ? '' : 's'}`;
    }
  });

  const renderProducts = (categoryId) => {
    const products = CatalogService.getProductsByCategory(categoryId);
    const displayProducts = products;

    if (!displayProducts.length) {
      gridContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: var(--color-bg-card); border-radius: var(--radius-lg); border: 1px solid var(--color-border);">
          <p style="font-size: 1.1rem; color: var(--color-text-muted);">No products found in this category.</p>
        </div>
      `;
      return;
    }

    gridContainer.innerHTML = displayProducts.map(p => `
      <article class="product-card" data-category="${escapeHtml(p.category)}">
        <div class="product-img-wrap">
          <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}" loading="lazy">
          <span class="product-category-tag">${escapeHtml(p.categoryName || 'Fresh Catch')}</span>
          <span class="product-badge-fresh">Daily Fresh Catch</span>
        </div>
        <div class="product-card-body">
          <div class="product-rating-row">
            <span class="product-stars">★★★★★</span>
            <span class="product-rating-text">4.9 • Direct Jetty</span>
          </div>
          <h3 class="product-title" title="${escapeHtml(p.name)}">${escapeHtml(p.name)}</h3>
          
          <div class="product-pack-badge">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
            <span>${escapeHtml(p.unit)}</span>
          </div>

          <div class="product-pricing-box">
            <span class="product-price-label">Wholesale Price</span>
            <span class="product-price-val">${escapeHtml(p.priceEstimate || 'Daily Market Rate')}</span>
          </div>

          <div class="product-card-footer">
            <a href="https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hello Mahesh Sea Foods, I would like to order/enquire about ' + p.name + ' (' + p.unit + '). Please share today\'s fresh catch rates.')}" 
               class="btn btn-whatsapp product-buy-btn" 
               target="_blank" 
               rel="noopener noreferrer"
               title="Enquire on WhatsApp">
               <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
               </svg>
               Order / Enquire
            </a>
            <a href="product-details.html?id=${encodeURIComponent(p.id)}" class="btn btn-sm btn-outline product-detail-btn" title="View Specifications">Details</a>
          </div>
        </div>
      </article>
    `).join('');

    // Update bottom "View All in this category" button link
    if (viewAllBtn) {
      if (categoryId === 'all') {
        viewAllBtn.href = 'products.html';
        viewAllBtn.innerHTML = `Explore All Seafood Products <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;
      } else {
        const catObj = CatalogService.getCategoryById(categoryId);
        const catName = catObj ? catObj.name : categoryId;
        viewAllBtn.href = `products.html?category=${encodeURIComponent(categoryId)}`;
        viewAllBtn.innerHTML = `View All ${escapeHtml(catName)} Products <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;
      }
    }

    // Attach image fallbacks to dynamically inserted product images
    initImageFallbackHandler();
  };

  catButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Allow navigation if user wants to open link in new tab or if it's a direct click to products page
      // But for smooth on-page filtering, prevent default and render
      e.preventDefault();
      const targetCategory = btn.getAttribute('data-category');
      
      catButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      renderProducts(targetCategory);
    });
  });

  // Initial render: default to 'fishes' or 'all'
  renderProducts('fishes');
}

/**
 * Utility: HTML Escaping
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
