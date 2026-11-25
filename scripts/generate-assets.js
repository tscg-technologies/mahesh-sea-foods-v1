const fs = require('fs');
const path = require('path');

function createSvgTemplate({ width, height, title, category, tag, iconType, isHero = false }) {
  // Color themes
  const bgGradStart = isHero ? "#061A30" : "#0F2B48";
  const bgGradEnd = isHero ? "#0B3C5D" : "#13426B";
  const accentTeal = "#14B8A6";
  const accentCoral = "#F43F5E";
  const waveColor = "rgba(20, 184, 166, 0.08)";
  const gridColor = "rgba(255, 255, 255, 0.04)";

  // Vector icons
  let iconSvg = '';
  if (iconType === 'fish') {
    iconSvg = `
      <!-- Fish Icon -->
      <g transform="translate(${width/2}, ${isHero ? height/2 - 40 : height/2 - 30}) scale(${isHero ? 2.2 : 1.4})" fill="none" stroke="${accentTeal}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M-60,0 C-30,-40 30,-35 60,0 C30,35 -30,40 -60,0 Z" fill="rgba(20, 184, 166, 0.12)" />
        <path d="M60,0 L90,-25 L80,0 L90,25 Z" fill="rgba(20, 184, 166, 0.2)" />
        <path d="M-5,-32 C5,-45 20,-40 25,-25" />
        <path d="M0,32 C10,42 20,38 22,25" />
        <circle cx="-35" cy="-5" r="4" fill="${accentTeal}" />
        <path d="M-15,-15 C-5,0 -5,0 -15,15" stroke-dasharray="2,3" />
        <path d="M5,-18 C15,0 15,0 5,18" stroke-dasharray="2,3" />
      </g>
    `;
  } else if (iconType === 'shrimp') {
    iconSvg = `
      <!-- Prawn Icon -->
      <g transform="translate(${width/2}, ${height/2 - 30}) scale(1.4)" fill="none" stroke="${accentCoral}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M-40,25 C-30,-20 20,-35 50,-10 C60,-2 60,15 45,20 C30,25 20,10 10,12 C-5,15 -20,30 -40,25 Z" fill="rgba(244, 63, 94, 0.12)" />
        <path d="M50,-10 C70,-30 85,-35 100,-40" stroke-width="1.8" />
        <path d="M48,-6 C68,-22 80,-25 95,-28" stroke-width="1.8" />
        <circle cx="42" cy="-4" r="3.5" fill="${accentCoral}" />
        <path d="M-40,25 L-55,35 L-48,22 L-55,15 Z" fill="rgba(244, 63, 94, 0.25)" />
        <path d="M5,15 C5,25 0,28 -3,32" />
        <path d="M-10,18 C-10,27 -15,30 -18,34" />
      </g>
    `;
  } else if (iconType === 'crab') {
    iconSvg = `
      <!-- Crab Icon -->
      <g transform="translate(${width/2}, ${height/2 - 30}) scale(1.4)" fill="none" stroke="${accentCoral}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <ellipse cx="0" cy="5" rx="42" ry="28" fill="rgba(244, 63, 94, 0.12)" />
        <!-- Big Claws -->
        <path d="M-30,-12 C-45,-35 -35,-50 -15,-45 C-18,-35 -20,-20 -25,-10" />
        <path d="M-15,-45 C-5,-42 -10,-28 -20,-22" />
        <path d="M30,-12 C45,-35 35,-50 15,-45 C18,-35 20,-20 25,-10" />
        <path d="M15,-45 C5,-42 10,-28 20,-22" />
        <!-- Eyes -->
        <circle cx="-12" cy="-22" r="3" fill="${accentCoral}" />
        <line x1="-12" y1="-22" x2="-12" y2="-18" />
        <circle cx="12" cy="-22" r="3" fill="${accentCoral}" />
        <line x1="12" y1="-22" x2="12" y2="-18" />
        <!-- Legs -->
        <path d="M-35,10 C-55,15 -65,35 -60,45" />
        <path d="M-30,20 C-48,30 -55,45 -48,55" />
        <path d="M35,10 C55,15 65,35 60,45" />
        <path d="M30,20 C48,30 55,45 48,55" />
      </g>
    `;
  } else if (iconType === 'lobster') {
    iconSvg = `
      <!-- Lobster Icon -->
      <g transform="translate(${width/2}, ${height/2 - 30}) scale(1.3)" fill="none" stroke="${accentCoral}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M0,-35 C15,-35 20,-10 15,10 C12,25 18,40 12,60 C5,70 -5,70 -12,60 C-18,40 -12,25 -15,10 C-20,-10 -15,-35 0,-35 Z" fill="rgba(244, 63, 94, 0.12)" />
        <path d="M-15,-20 C-35,-35 -50,-20 -40,0 C-30,-5 -20,-5 -15,-10" />
        <path d="M15,-20 C35,-35 50,-20 40,0 C30,-5 20,-5 15,-10" />
        <path d="M-8,-35 C-25,-55 -35,-70 -45,-80" stroke-width="1.8" />
        <path d="M8,-35 C25,-55 35,-70 45,-80" stroke-width="1.8" />
        <line x1="-10" y1="20" x2="10" y2="20" />
        <line x1="-10" y1="35" x2="10" y2="35" />
        <line x1="-8" y1="50" x2="8" y2="50" />
        <path d="M-10,60 L-22,75 L0,68 L22,75 L10,60" fill="rgba(244, 63, 94, 0.2)" />
      </g>
    `;
  } else if (iconType === 'squid') {
    iconSvg = `
      <!-- Squid Icon -->
      <g transform="translate(${width/2}, ${height/2 - 30}) scale(1.3)" fill="none" stroke="${accentTeal}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M0,-55 C22,-30 25,10 20,25 L-20,25 C-25,10 -22,-30 0,-55 Z" fill="rgba(20, 184, 166, 0.12)" />
        <circle cx="-10" cy="15" r="3.5" fill="${accentTeal}" />
        <circle cx="10" cy="15" r="3.5" fill="${accentTeal}" />
        <path d="M-15,25 C-20,45 -10,60 -15,75" />
        <path d="M-7,25 C-10,50 -2,65 -5,80" />
        <path d="M7,25 C10,50 2,65 5,80" />
        <path d="M15,25 C20,45 10,60 15,75" />
        <path d="M-3,25 C-5,55 -15,75 -8,95 L-4,90" stroke-width="2" />
        <path d="M3,25 C5,55 15,75 8,95 L4,90" stroke-width="2" />
      </g>
    `;
  } else if (iconType === 'shell') {
    iconSvg = `
      <!-- Shellfish Icon -->
      <g transform="translate(${width/2}, ${height/2 - 25}) scale(1.3)" fill="none" stroke="${accentTeal}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M0,45 C-45,35 -55,-15 -25,-35 C-5,-45 5,-45 25,-35 C55,-15 45,35 0,45 Z" fill="rgba(20, 184, 166, 0.12)" />
        <line x1="0" y1="45" x2="0" y2="-43" />
        <line x1="0" y1="45" x2="-22" y2="-33" />
        <line x1="0" y1="45" x2="22" y2="-33" />
        <line x1="0" y1="45" x2="-40" y2="-15" />
        <line x1="0" y1="45" x2="40" y2="-15" />
      </g>
    `;
  } else if (iconType === 'dried') {
    iconSvg = `
      <!-- Dried Seafood Icon -->
      <g transform="translate(${width/2}, ${height/2 - 25}) scale(1.3)" fill="none" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Sun Rays -->
        <circle cx="0" cy="-35" r="16" fill="rgba(245, 158, 11, 0.18)" />
        <line x1="0" y1="-58" x2="0" y2="-54" />
        <line x1="0" y1="-16" x2="0" y2="-12" />
        <line x1="-23" y1="-35" x2="-19" y2="-35" />
        <line x1="19" y1="-35" x2="23" y2="-35" />
        <line x1="-16" y1="-51" x2="-13" y2="-48" />
        <line x1="13" y1="-22" x2="16" y2="-19" />
        <line x1="16" y1="-51" x2="13" y2="-48" />
        <line x1="-13" y1="-22" x2="-16" y2="-19" />
        <!-- Dried Fish -->
        <path d="M-45,25 C-20,10 20,12 45,25 C20,38 -20,40 -45,25 Z" fill="rgba(245, 158, 11, 0.12)" />
        <path d="M45,25 L65,10 L58,25 L65,40 Z" fill="rgba(245, 158, 11, 0.25)" />
        <circle cx="-30" cy="22" r="2.5" fill="#F59E0B" />
        <line x1="-10" y1="18" x2="-10" y2="32" stroke-dasharray="2,2" />
        <line x1="5" y1="18" x2="5" y2="32" stroke-dasharray="2,2" />
        <line x1="20" y1="18" x2="20" y2="32" stroke-dasharray="2,2" />
      </g>
    `;
  }

  // Hero specific elements
  let heroArt = '';
  if (isHero) {
    heroArt = `
      <!-- Ocean Vessel Silhouette & Depth Waves -->
      <g opacity="0.25">
        <path d="M0,${height - 120} Q${width * 0.25},${height - 180} ${width * 0.5},${height - 120} T${width},${height - 120} L${width},${height} L0,${height} Z" fill="#14B8A6" />
        <path d="M0,${height - 80} Q${width * 0.3},${height - 140} ${width * 0.6},${height - 80} T${width},${height - 80} L${width},${height} L0,${height} Z" fill="#0B3C5D" />
      </g>
      <!-- Commercial Trawler Horizon Silhouette -->
      <g transform="translate(${width * 0.8}, ${height * 0.42}) scale(0.65)" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2">
        <path d="M-80,20 L80,20 L60,40 L-60,40 Z" fill="rgba(20, 184, 166, 0.1)" />
        <rect x="-20" y="-10" width="40" height="30" rx="3" />
        <line x1="0" y1="-10" x2="0" y2="-45" stroke-width="3" />
        <line x1="-25" y1="-25" x2="25" y2="-25" stroke-width="2" />
        <line x1="0" y1="-45" x2="50" y2="20" stroke-dasharray="3,3" />
        <line x1="0" y1="-45" x2="-50" y2="20" stroke-dasharray="3,3" />
      </g>
    `;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bgGradStart}" />
      <stop offset="100%" stop-color="${bgGradEnd}" />
    </linearGradient>
    <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${gridColor}" stroke-width="1" />
    </pattern>
    <radialGradient id="glowGrad" cx="50%" cy="45%" r="45%">
      <stop offset="0%" stop-color="rgba(20, 184, 166, 0.18)" />
      <stop offset="100%" stop-color="transparent" />
    </radialGradient>
  </defs>

  <!-- Background Base -->
  <rect width="${width}" height="${height}" fill="url(#bgGrad)" />
  <rect width="${width}" height="${height}" fill="url(#gridPattern)" />
  <circle cx="${width/2}" cy="${height/2 - 20}" r="${width * 0.35}" fill="url(#glowGrad)" />

  ${heroArt}

  <!-- Abstract Wave Lines -->
  <path d="M0,${height * 0.75} C${width * 0.25},${height * 0.7} ${width * 0.35},${height * 0.85} ${width * 0.65},${height * 0.75} C${width * 0.85},${height * 0.68} ${width},${height * 0.82} ${width},${height * 0.82}" fill="none" stroke="${waveColor}" stroke-width="3" />
  <path d="M0,${height * 0.82} C${width * 0.3},${height * 0.88} ${width * 0.5},${height * 0.72} ${width * 0.75},${height * 0.84} C${width * 0.9},${height * 0.9} ${width},${height * 0.8} ${width},${height * 0.8}" fill="none" stroke="${waveColor}" stroke-width="2" />

  <!-- Central Illustrated Icon -->
  ${iconSvg}

  <!-- Badge & Typography Overlay -->
  <g transform="translate(${width/2}, ${height - (isHero ? 140 : 80)})" text-anchor="middle">
    <!-- Category Pill -->
    <rect x="-100" y="-45" width="200" height="26" rx="13" fill="rgba(255, 255, 255, 0.08)" stroke="rgba(255, 255, 255, 0.18)" stroke-width="1" />
    <text x="0" y="-28" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="11" font-weight="700" letter-spacing="1.5" fill="${accentTeal}">${tag.toUpperCase()}</text>

    <!-- Title -->
    <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="${isHero ? 28 : 20}" font-weight="700" fill="#FFFFFF">${title}</text>

    <!-- Subtitle / Placeholder Info -->
    <text x="0" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="${isHero ? 14 : 12}" fill="rgba(255, 255, 255, 0.65)">
      ${isHero ? 'Quality Seafood Trading • Professional Service' : 'Photo Placeholder • Mahesh Sea Foods'}
    </text>
  </g>
</svg>
`;
}

// Generate brand logo
function createLogoSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 64" width="320" height="64">
  <defs>
    <linearGradient id="logoTeal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#14B8A6" />
      <stop offset="100%" stop-color="#0284C7" />
    </linearGradient>
    <linearGradient id="logoCoral" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F43F5E" />
      <stop offset="100%" stop-color="#FB7185" />
    </linearGradient>
  </defs>

  <!-- Crest Emblem -->
  <g transform="translate(32, 32)">
    <circle cx="0" cy="0" r="26" fill="#0B2545" stroke="#14B8A6" stroke-width="2" />
    <!-- Wave -->
    <path d="M-18,6 C-10,2 -2,12 6,4 C14,-4 18,6 20,4" fill="none" stroke="url(#logoTeal)" stroke-width="2.5" stroke-linecap="round" />
    <!-- Fish Silhouette -->
    <path d="M-14,-4 C-6,-14 6,-12 14,-4 C6,4 -6,6 -14,-4 Z" fill="url(#logoCoral)" />
    <polygon points="14,-4 20,-10 18,-4 20,2" fill="url(#logoCoral)" />
    <circle cx="-6" cy="-5" r="1.5" fill="#FFFFFF" />
  </g>

  <!-- Typography -->
  <text x="70" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Outfit', sans-serif" font-size="20" font-weight="800" letter-spacing="-0.3" fill="#0B2545">
    MAHESH
  </text>
  <text x="160" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Outfit', sans-serif" font-size="20" font-weight="400" letter-spacing="-0.3" fill="#14B8A6">
    SEAFOOD
  </text>
  <text x="71" y="46" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10.5" font-weight="700" letter-spacing="2.8" fill="#64748B">
    TRADERS • QUALITY CATCH
  </text>
</svg>
`;
}

// Generate Favicon
function createFaviconSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="favBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0B2545" />
      <stop offset="100%" stop-color="#0F4C81" />
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="16" fill="url(#favBg)" />
  <circle cx="32" cy="32" r="26" fill="none" stroke="#14B8A6" stroke-width="2.5" stroke-opacity="0.5" />
  <!-- Wave -->
  <path d="M12,38 C20,32 26,44 34,36 C42,28 48,38 52,36" fill="none" stroke="#14B8A6" stroke-width="3" stroke-linecap="round" />
  <!-- Fish -->
  <path d="M18,25 C26,14 38,16 46,25 C38,34 26,36 18,25 Z" fill="#F43F5E" />
  <polygon points="46,25 54,18 51,25 54,32" fill="#F43F5E" />
  <circle cx="26" cy="24" r="2" fill="#FFFFFF" />
</svg>
`;
}

// Items list
const items = [
  // Hero
  {
    path: 'assets/images/hero/hero-seafood.svg',
    width: 1400,
    height: 750,
    title: 'Freshness from the Ocean. Quality You Can Trust.',
    category: 'Hero Showcase',
    tag: 'Premium Sourcing & Supply',
    iconType: 'fish',
    isHero: true
  },
  // Categories
  {
    path: 'assets/images/categories/freshwater-fish.svg',
    width: 800,
    height: 600,
    title: 'Freshwater Fish',
    category: 'Inland Catch',
    tag: 'Fresh Harvest',
    iconType: 'fish'
  },
  {
    path: 'assets/images/categories/marine-fish.svg',
    width: 800,
    height: 600,
    title: 'Marine Fish',
    category: 'Oceanic Landings',
    tag: 'Deep Sea Catch',
    iconType: 'fish'
  },
  {
    path: 'assets/images/categories/prawns.svg',
    width: 800,
    height: 600,
    title: 'Prawns & Shrimps',
    category: 'Graded Counts',
    tag: 'Crustaceans',
    iconType: 'shrimp'
  },
  {
    path: 'assets/images/categories/crabs.svg',
    width: 800,
    height: 600,
    title: 'Crabs',
    category: 'Live & Chilled',
    tag: 'Coastal Crabs',
    iconType: 'crab'
  },
  {
    path: 'assets/images/categories/lobster.svg',
    width: 800,
    height: 600,
    title: 'Lobster',
    category: 'Prime Selection',
    tag: 'Rock Lobsters',
    iconType: 'lobster'
  },
  {
    path: 'assets/images/categories/squid.svg',
    width: 800,
    height: 600,
    title: 'Squid & Cuttlefish',
    category: 'Cephalopods',
    tag: 'Calamari Cleaned',
    iconType: 'squid'
  },
  {
    path: 'assets/images/categories/shellfish.svg',
    width: 800,
    height: 600,
    title: 'Shellfish',
    category: 'Mussels & Clams',
    tag: 'Bivalves',
    iconType: 'shell'
  },
  {
    path: 'assets/images/categories/dried-seafood.svg',
    width: 800,
    height: 600,
    title: 'Dried Seafood',
    category: 'Sun Dried',
    tag: 'Traditional Taste',
    iconType: 'dried'
  },
  // Products
  {
    path: 'assets/images/products/indian-pomfret.svg',
    width: 800,
    height: 600,
    title: 'Indian Pomfret',
    category: 'Marine Fish',
    tag: 'Silver / White',
    iconType: 'fish'
  },
  {
    path: 'assets/images/products/seer-fish.svg',
    width: 800,
    height: 600,
    title: 'Seer Fish (Surmai)',
    category: 'Marine Fish',
    tag: 'Kingfish Steaks',
    iconType: 'fish'
  },
  {
    path: 'assets/images/products/indian-mackerel.svg',
    width: 800,
    height: 600,
    title: 'Indian Mackerel (Bangda)',
    category: 'Marine Fish',
    tag: 'Omega-3 Rich',
    iconType: 'fish'
  },
  {
    path: 'assets/images/products/sardine.svg',
    width: 800,
    height: 600,
    title: 'Oil Sardine (Mathi)',
    category: 'Marine Fish',
    tag: 'Fresh Coastal Catch',
    iconType: 'fish'
  },
  {
    path: 'assets/images/products/rohu.svg',
    width: 800,
    height: 600,
    title: 'Freshwater Rohu',
    category: 'Freshwater Fish',
    tag: 'Major Carp',
    iconType: 'fish'
  },
  {
    path: 'assets/images/products/catla.svg',
    width: 800,
    height: 600,
    title: 'Freshwater Catla',
    category: 'Freshwater Fish',
    tag: 'Sweet Flesh Carp',
    iconType: 'fish'
  },
  {
    path: 'assets/images/products/tilapia.svg',
    width: 800,
    height: 600,
    title: 'Premium Tilapia',
    category: 'Freshwater Fish',
    tag: 'Mild Fillets',
    iconType: 'fish'
  },
  {
    path: 'assets/images/products/tiger-prawn.svg',
    width: 800,
    height: 600,
    title: 'Black Tiger Prawn',
    category: 'Prawns & Shrimps',
    tag: 'Jumbo Graded',
    iconType: 'shrimp'
  },
  {
    path: 'assets/images/products/indian-white-prawn.svg',
    width: 800,
    height: 600,
    title: 'Indian White Prawn',
    category: 'Prawns & Shrimps',
    tag: 'Sweet Translucent',
    iconType: 'shrimp'
  },
  {
    path: 'assets/images/products/crabs.svg',
    width: 800,
    height: 600,
    title: 'Blue Swimming Crab',
    category: 'Crabs',
    tag: 'Coastal Sweet Meat',
    iconType: 'crab'
  },
  {
    path: 'assets/images/products/mud-crab.svg',
    width: 800,
    height: 600,
    title: 'Live Mud Crab',
    category: 'Crabs',
    tag: 'Heavy Claw Meat',
    iconType: 'crab'
  },
  {
    path: 'assets/images/products/lobster.svg',
    width: 800,
    height: 600,
    title: 'Rock / Spiny Lobster',
    category: 'Lobster',
    tag: 'Gourmet Tails',
    iconType: 'lobster'
  },
  {
    path: 'assets/images/products/squid.svg',
    width: 800,
    height: 600,
    title: 'Indian Ocean Squid',
    category: 'Squid & Cuttlefish',
    tag: 'Clean Rings & Tubes',
    iconType: 'squid'
  },
  {
    path: 'assets/images/products/cuttlefish.svg',
    width: 800,
    height: 600,
    title: 'Marine Cuttlefish',
    category: 'Squid & Cuttlefish',
    tag: 'Thick Meaty Cuts',
    iconType: 'squid'
  },
  {
    path: 'assets/images/products/shellfish.svg',
    width: 800,
    height: 600,
    title: 'Green Mussels',
    category: 'Shellfish',
    tag: 'Natural Coastal Bivalves',
    iconType: 'shell'
  },
  {
    path: 'assets/images/products/dried-seafood.svg',
    width: 800,
    height: 600,
    title: 'Sun-Dried Anchovies',
    category: 'Dried Seafood',
    tag: 'Authentic Umami',
    iconType: 'dried'
  }
];

// Write all SVGs
items.forEach(item => {
  const fullPath = path.resolve(__dirname, '..', item.path);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(fullPath, createSvgTemplate(item), 'utf8');
  console.log(`Generated: ${item.path}`);

  // Also create a duplicate copy with .jpg name if someone opens standard paths, or we can configure products.js
  const jpgPath = fullPath.replace(/\.svg$/, '.jpg');
  fs.writeFileSync(jpgPath, createSvgTemplate(item), 'utf8');
});

// Logo and Favicon
fs.writeFileSync(path.resolve(__dirname, '../assets/images/icons/logo.svg'), createLogoSvg(), 'utf8');
fs.writeFileSync(path.resolve(__dirname, '../assets/images/icons/favicon.svg'), createFaviconSvg(), 'utf8');
console.log('Generated Logo & Favicon!');
