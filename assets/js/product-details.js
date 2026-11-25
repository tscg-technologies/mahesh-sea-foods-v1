/**
 * Mahesh Sea Foods - Product Details Controller (product-details.js)
 * Dynamically renders product specifications, related products, or 404 state.
 */

document.addEventListener('DOMContentLoaded', () => {
  initProductDetailsPage();
});

function initProductDetailsPage() {
  const container = document.getElementById('productDetailsContainer');
  const notFoundContainer = document.getElementById('productNotFoundContainer');
  const relatedGrid = document.getElementById('relatedProductsGrid');

  if (!container || typeof SEAFOOD_PRODUCTS === 'undefined') return;

  // Extract ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  const product = productId ? SEAFOOD_PRODUCTS.find(p => p.id === productId) : null;

  if (!product) {
    // Show 404 Not Found block
    container.style.display = 'none';
    if (notFoundContainer) {
      notFoundContainer.style.display = 'block';
      const idSpan = document.getElementById('missingProductId');
      if (idSpan) idSpan.textContent = productId ? `"${productId}"` : '(None specified)';
    }
    return;
  }

  // Update page title
  document.title = `${product.name} | Mahesh Sea Foods`;

  // Update Breadcrumb
  const breadcrumbProduct = document.getElementById('breadcrumbProduct');
  const breadcrumbCategory = document.getElementById('breadcrumbCategory');
  if (breadcrumbProduct) breadcrumbProduct.textContent = product.name;
  if (breadcrumbCategory) {
    breadcrumbCategory.textContent = product.categoryName;
    breadcrumbCategory.href = `products.html?category=${encodeURIComponent(product.category)}`;
  }

  // Populate Product Information
  const imgEl = document.getElementById('detailImage');
  const categoryTag = document.getElementById('detailCategoryTag');
  const titleEl = document.getElementById('detailTitle');
  const shortDescEl = document.getElementById('detailShortDesc');
  const fullDescEl = document.getElementById('detailFullDesc');
  const unitEl = document.getElementById('detailUnit');
  const sizesEl = document.getElementById('detailSizes');
  const cutsEl = document.getElementById('detailCuts');
  const gradeEl = document.getElementById('detailGrade');
  const packagingEl = document.getElementById('detailPackaging');
  const waBtn = document.getElementById('detailWaBtn');
  const contactBtn = document.getElementById('detailContactBtn');

  if (imgEl) {
    imgEl.src = product.image;
    imgEl.alt = product.name;
  }
  if (categoryTag) {
    categoryTag.textContent = product.categoryName;
    categoryTag.href = `products.html?category=${encodeURIComponent(product.category)}`;
  }
  if (titleEl) titleEl.textContent = product.name;
  if (shortDescEl) shortDescEl.textContent = product.shortDescription;
  if (fullDescEl) fullDescEl.textContent = product.fullDescription;
  if (unitEl) unitEl.textContent = product.unit;
  if (sizesEl) sizesEl.textContent = product.commercialSizes || 'Standard daily sizes';
  if (cutsEl) cutsEl.textContent = product.cutOptions || 'Whole Round, Steaks, Cleaned';
  if (gradeEl) gradeEl.textContent = product.freshnessGrade || 'Daily Landing / Chilled Catch';
  if (packagingEl) packagingEl.textContent = product.packaging || 'Insulated Crushed Ice Boxes';

  // Configure WhatsApp CTA
  if (waBtn) {
    const waMsg = `Hello Mahesh Sea Foods, I would like to enquire about ${product.name} (${product.unit}). Please confirm availability, fresh batch timing, and rates.`;
    waBtn.href = getWhatsAppUrl(waMsg);
    waBtn.target = '_blank';
    waBtn.rel = 'noopener noreferrer';
  }

  // Configure Contact form CTA
  if (contactBtn) {
    contactBtn.href = `contact.html?product=${encodeURIComponent(product.id)}`;
  }

  // Render Related Products (same category or nearby items)
  if (relatedGrid) {
    const related = CatalogService.getRelatedProducts(product.id, 3);
    relatedGrid.innerHTML = related.map(p => {
      const waMsg = `Hello Mahesh Sea Foods, I would like to enquire about ${p.name}.`;
      const waUrl = getWhatsAppUrl(waMsg);
      return `
        <article class="product-card">
          <div class="product-img-wrap">
            <img src="${p.image}" alt="${escapeHtml(p.name)}" loading="lazy">
            <span class="product-category-tag">${escapeHtml(p.categoryName || 'Fresh')}</span>
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
              <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp product-buy-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                </svg>
                <span>Order / Enquire</span>
              </a>
              <a href="product-details.html?id=${encodeURIComponent(p.id)}" class="btn btn-sm btn-outline product-detail-btn">Details</a>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }
}
