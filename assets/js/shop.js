/**
 * Mahesh Sea Foods - Shop Catalog Controller (shop.js)
 * Filtering, searching, sorting, and dynamic product rendering.
 */

document.addEventListener('DOMContentLoaded', () => {
  initShopPage();
});

function initShopPage() {
  const productsGrid = document.getElementById('productsGrid');
  const searchInput = document.getElementById('shopSearchInput');
  const sortSelect = document.getElementById('shopSortSelect');
  const filterPills = document.querySelectorAll('.filter-pill');
  const resultsCountEl = document.getElementById('resultsCount');
  const clearFiltersBtn = document.getElementById('clearFiltersBtn');

  if (!productsGrid) return;

  // State
  let currentCategory = 'all';
  let searchQuery = '';
  let currentSort = 'name-asc';

  // Read URL parameters on load
  const urlParams = new URLSearchParams(window.location.search);
  const paramCategory = urlParams.get('category');
  const paramSearch = urlParams.get('search');

  if (paramCategory) {
    currentCategory = paramCategory;
    filterPills.forEach(pill => {
      if (pill.getAttribute('data-category') === currentCategory) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });
  }

  if (paramSearch) {
    searchQuery = paramSearch;
    if (searchInput) searchInput.value = paramSearch;
  }

  // Event Listeners for Filter Pills
  filterPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.getAttribute('data-category');
      updateUrlState();
      renderFilteredProducts();
    });
  });

  // Search input listener
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      updateUrlState();
      renderFilteredProducts();
    });
  }

  // Sort select listener
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderFilteredProducts();
    });
  }

  // Clear filters button
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', (e) => {
      e.preventDefault();
      currentCategory = 'all';
      searchQuery = '';
      currentSort = 'name-asc';

      if (searchInput) searchInput.value = '';
      if (sortSelect) sortSelect.value = 'name-asc';

      filterPills.forEach(pill => {
        if (pill.getAttribute('data-category') === 'all') {
          pill.classList.add('active');
        } else {
          pill.classList.remove('active');
        }
      });

      updateUrlState();
      renderFilteredProducts();
    });
  }

  function updateUrlState() {
    const params = new URLSearchParams();
    if (currentCategory && currentCategory !== 'all') params.set('category', currentCategory);
    if (searchQuery) params.set('search', searchQuery);
    const newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
    window.history.replaceState({}, '', newUrl);
  }

  function renderFilteredProducts() {
    if (typeof SEAFOOD_PRODUCTS === 'undefined') return;

    let filtered = SEAFOOD_PRODUCTS.slice();

    // 1. Filter by category using CatalogService
    if (currentCategory && currentCategory !== 'all') {
      filtered = CatalogService.getProductsByCategory(currentCategory);
    }

    // 2. Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery) ||
        (p.categoryName && p.categoryName.toLowerCase().includes(searchQuery)) ||
        (p.shortDescription && p.shortDescription.toLowerCase().includes(searchQuery)) ||
        (p.cutOptions && p.cutOptions.toLowerCase().includes(searchQuery))
      );
    }

    // 3. Sort
    if (currentSort === 'name-asc') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (currentSort === 'name-desc') {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    } else if (currentSort === 'category') {
      filtered.sort((a, b) => (a.categoryName || '').localeCompare(b.categoryName || '') || a.name.localeCompare(b.name));
    }

    // Update count
    if (resultsCountEl) {
      resultsCountEl.textContent = `Showing ${filtered.length} of ${SEAFOOD_PRODUCTS.length} products`;
    }

    // Render HTML
    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem; background: var(--color-bg-card); border-radius: var(--radius-lg); border: 1px solid var(--color-border);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 1rem; color: var(--color-text-muted);">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            <line x1="8" y1="11" x2="14" y2="11"/>
          </svg>
          <h3 style="font-size: 1.5rem; color: var(--color-primary); margin-bottom: 0.5rem;">No Seafood Products Found</h3>
          <p style="color: var(--color-text-muted); margin-bottom: 1.5rem;">We couldn't find any seafood matching your current filters or search query.</p>
          <button id="emptyResetBtn" class="btn btn-primary">Reset All Filters</button>
        </div>
      `;
      const emptyResetBtn = document.getElementById('emptyResetBtn');
      if (emptyResetBtn) {
        emptyResetBtn.addEventListener('click', () => {
          if (clearFiltersBtn) clearFiltersBtn.click();
        });
      }
      return;
    }

    productsGrid.innerHTML = filtered.map(p => {
      const waMsg = `Hello Mahesh Sea Foods, I would like to enquire about ${p.name} (${p.unit}). Please share availability and current rates.`;
      const waUrl = getWhatsAppUrl(waMsg);

      return `
        <article class="product-card" data-category="${escapeHtml(p.category)}">
          <div class="product-img-wrap">
            <img src="${p.image}" alt="${escapeHtml(p.name)}" loading="lazy">
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
              <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp product-buy-btn" title="Enquire on WhatsApp">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                </svg>
                <span>Order / Enquire</span>
              </a>
              <a href="product-details.html?id=${encodeURIComponent(p.id)}" class="btn btn-sm btn-outline product-detail-btn" title="View Specifications">
                Details
              </a>
            </div>
          </div>
        </article>
      `;
    }).join('');

    initImageFallbackHandler();
  }

  // Initial render
  renderFilteredProducts();
}
