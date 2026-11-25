/**
 * Mahesh Sea Foods - Contact Page Controller (contact.js)
 * Form validation, dynamic product selector, and direct WhatsApp enquiry generation.
 */

document.addEventListener('DOMContentLoaded', () => {
  initContactPage();
});

function initContactPage() {
  const form = document.getElementById('enquiryForm');
  const productSelect = document.getElementById('interestedProduct');
  const alertBox = document.getElementById('formAlert');

  if (!form) return;

  // 1. Populate Interested Product dropdown (B2B Wholesale Fishes & Prawns)
  if (productSelect && typeof SEAFOOD_PRODUCTS !== 'undefined') {
    productSelect.innerHTML = '<option value="">Select Wholesale Variety (or General Bulk Rate)</option>';

    // Simple B2B wholesale names mapping
    const friendlyNameMap = {
      'rohu': 'Freshwater Rohu - Wholesale Harvest',
      'indian-mackerel': 'Indian Mackerel (Kanagarthalu / Bangda) - Daily Auction Crates',
      'indian-pomfret': 'Indian White Pomfret - Wholesale Crates',
      'seer-fish': 'Seer Fish / Kingfish (Vanjaram) - Commercial Whole / Steaks',
      'tiger-prawn': 'Black Tiger Prawn - Wholesale Boxes',
      'indian-white-prawn': 'Indian White Prawns - Graded Lots'
    };

    const categoryIcons = {
      'fishes': '🐟 Wholesale Fishes',
      'prawns': '🦐 Bulk Prawns & Shrimps'
    };

    const categories = typeof SEAFOOD_CATEGORIES !== 'undefined' ? SEAFOOD_CATEGORIES : [];
    
    categories.forEach(cat => {
      const catProducts = SEAFOOD_PRODUCTS.filter(p => p.category === cat.id);
      if (catProducts.length > 0) {
        const optgroup = document.createElement('optgroup');
        optgroup.label = categoryIcons[cat.id] || cat.name;
        catProducts.forEach(p => {
          const opt = document.createElement('option');
          const simpleName = friendlyNameMap[p.id] || p.name;
          opt.value = simpleName;
          opt.textContent = simpleName;
          optgroup.appendChild(opt);
        });
        productSelect.appendChild(optgroup);
      }
    });

    // Check URL parameter to preselect
    const urlParams = new URLSearchParams(window.location.search);
    const preselectId = urlParams.get('product');
    if (preselectId) {
      const simpleName = friendlyNameMap[preselectId];
      if (simpleName) {
        productSelect.value = simpleName;
      } else {
        const matched = SEAFOOD_PRODUCTS.find(p => p.id === preselectId);
        if (matched) productSelect.value = matched.name;
      }
    }
  }

  // 2. Form Validation & Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullNameInput = document.getElementById('fullName');
    const phoneInput = document.getElementById('phoneNumber');
    const messageInput = document.getElementById('enquiryMessage');
    const productVal = productSelect ? productSelect.value : '';

    let isValid = true;

    // Validate Full Name
    if (!fullNameInput.value.trim() || fullNameInput.value.trim().length < 2) {
      setFieldInvalid(fullNameInput, 'Please provide your name.');
      isValid = false;
    } else {
      setFieldValid(fullNameInput);
    }

    // Validate Phone Number
    const cleanPhone = phoneInput.value.replace(/[^0-9+]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setFieldInvalid(phoneInput, 'Please enter a valid 10-digit mobile or WhatsApp number.');
      isValid = false;
    } else {
      setFieldValid(phoneInput);
    }

    // Validate Message (optional or short)
    const requirementText = messageInput.value.trim() || 'General enquiry & daily availability';

    if (!isValid) return;

    // Build prefilled WhatsApp Enquiry Message
    const enquiryDetails = `*New B2B Wholesale Enquiry - Mahesh Sea Foods*\n` +
      `*Name:* ${fullNameInput.value.trim()}\n` +
      `*Phone:* ${phoneInput.value.trim()}\n` +
      `*Interested Seafood:* ${productVal || 'General Seafood Selection'}\n` +
      `*Requirement:* ${requirementText}`;

    const waLink = getWhatsAppUrl(enquiryDetails);

    // Show customer-friendly success notice with direct WhatsApp opening
    if (alertBox) {
      alertBox.className = 'form-alert success';
      alertBox.innerHTML = `
        <strong>Thank you, ${escapeHtml(fullNameInput.value.trim())}!</strong>
        <p style="margin: 0.5rem 0 1rem 0; font-size: 0.95rem;">
          Your enquiry is ready. Click the button below to connect with us on WhatsApp for instant confirmation, pricing, and availability:
        </p>
        <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="display: inline-flex; align-items: center; gap: 0.5rem;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
          </svg>
          Send via WhatsApp Now
        </a>
      `;
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Auto-open WhatsApp in new tab for customer convenience
    window.open(waLink, '_blank', 'noopener,noreferrer');

    // Reset fields
    form.reset();
  });

  function setFieldInvalid(el, msg) {
    el.classList.add('is-invalid');
    let feedback = el.nextElementSibling;
    if (!feedback || !feedback.classList.contains('invalid-feedback')) {
      feedback = document.createElement('div');
      feedback.className = 'invalid-feedback';
      el.parentNode.insertBefore(feedback, el.nextSibling);
    }
    feedback.textContent = msg;
  }

  function setFieldValid(el) {
    el.classList.remove('is-invalid');
  }

  // Realtime clear on input
  form.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('is-invalid');
    });
  });
}
