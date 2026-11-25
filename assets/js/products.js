/**
 * Mahesh Sea Foods - B2B Wholesale Product & Category Catalog
 * Focused strictly on Wholesale Fishes and Bulk Prawns for Local Businesses,
 * Retail Fish Stalls, Supermarkets, Restaurants, and Caterers.
 */

const SEAFOOD_CATEGORIES = [
  {
    id: "fishes",
    name: "Fishes (Wholesale Crates)",
    shortDescription: "Fresh coastal marine and sweetwater fish in 20kg - 50kg bulk crates on crushed ice, directly dispatched to local fish retailers.",
    itemCount: "Rohu, Indian Mackerel, White Pomfret, Seer Fish (Vanjaram)",
    image: "assets/images/categories/marine-fish.jpg",
    icon: "fish"
  },
  {
    id: "prawns",
    name: "Prawns (Bulk Commercial Lots)",
    shortDescription: "Strictly count-graded Black Tiger and White Prawns packed in insulated crates.",
    itemCount: "Black Tiger Prawn, Indian White Prawns",
    image: "assets/images/categories/prawns.jpg",
    icon: "shrimp"
  }
];

const SEAFOOD_PRODUCTS = [
  /* -------------------------------------------------------------
     CATEGORY 1: FISHES (Wholesale Supply for Local Retailers)
     Order: Freshwater Rohu, Indian Mackerel, Indian White Pomfret, Seer Fish
     ------------------------------------------------------------- */
  {
    id: "rohu",
    name: "Freshwater Rohu",
    category: "fishes",
    categoryName: "Fishes",
    shortDescription: "Clean sweet-water Rohu supplied in wholesale bulk tanks or chilled crates for daily wet market vendors.",
    fullDescription: "Harvested from clean inland reservoir sources with pristine water quality. Clear eyes, bright red gills, and firm scale retention guaranteed. An essential staple inventory item for local fish stalls and commercial kitchen caterers.",
    unit: "Wholesale Crate (30kg - 50kg) or Bulk",
    priceEstimate: "Daily Wholesale Market Rate",
    image: "assets/images/products/rohu.jpg",
    featured: true,
    commercialSizes: "1.5kg - 2.5kg | 2.5kg - 4.5kg Each",
    cutOptions: "Whole Round on Ice, Live Supply on Booking",
    freshnessGrade: "Fresh Harvest / Same-Day Distribution",
    packaging: "Heavy-Duty Aerated Transport Crate"
  },
  {
    id: "indian-mackerel",
    name: "Indian Mackerel (Kanagarthalu / Bangda) - Daily Auction Crates",
    category: "fishes",
    categoryName: "Fishes",
    shortDescription: "High-volume fast-moving coastal fish, count-graded for daily retail stall sales across Hyderabad.",
    fullDescription: "Direct harbor auction landings of Indian Mackerel packed with natural Omega-3 oils. Arrives at our Uppal depot by 4:30 AM daily for instant distribution to retail shops. Known for consistent count grades and high daily consumer turnover.",
    unit: "Standard Wholesale Crate (35kg - 40kg)",
    priceEstimate: "Daily Wholesale Market Rate",
    image: "assets/images/products/indian-mackerel.jpg",
    featured: true,
    commercialSizes: "6-8 pcs/kg | 8-10 pcs/kg | 10-12 pcs/kg",
    cutOptions: "Whole Round on Ice (Ready for Stall Retail)",
    freshnessGrade: "4:00 AM Dock Dispatch Freshness",
    packaging: "Standard Marine Stackable Plastic Crates"
  },
  {
    id: "indian-pomfret",
    name: "Indian White Pomfret",
    category: "fishes",
    categoryName: "Fishes",
    shortDescription: "Export-grade silver-white pomfret in wholesale crates, high retail turnover table fish for local fish stalls.",
    fullDescription: "Premium White Pomfret sourced directly from Visakhapatnam and Chennai harbor boat landings. Graded into 300g-500g and 500g-800g weight bands. Chilled immediately in food-grade insulated boxes to ensure firm meat and maximum shelf life in local retail counters.",
    unit: "Wholesale Crate (20kg / 30kg) or Per Kg Bulk",
    priceEstimate: "Daily Wholesale Market Rate",
    image: "assets/images/products/indian-pomfret.jpg",
    featured: true,
    commercialSizes: "300g - 500g | 500g - 800g | 1kg+ Jumbo",
    cutOptions: "Whole Iced Crates, Whole Cleaned, Sliced Steaks",
    freshnessGrade: "Jetty Fresh / Deep Cold Chain Ice Pack",
    packaging: "Heavy Duty Insulated Thermocol Box with Shaved Ice"
  },
  {
    id: "seer-fish",
    name: "Seer Fish / Kingfish (Vanjaram)",
    category: "fishes",
    categoryName: "Fishes",
    shortDescription: "High-margin marine kingfish in bulk wholesale lots for seafood retailers, restaurants, and caterers.",
    fullDescription: "Deep-sea Vanjaram (Seer Fish) with tight muscular flesh and superior fat retention. Supplied as whole 3kg-6kg ocean fish or pre-cut uniform retail steaks. Unrivaled customer demand makes this the number one profitability driver for retail seafood stalls.",
    unit: "Per Crate (30kg - 50kg) or Per Kg Bulk",
    priceEstimate: "Daily Wholesale Market Rate",
    image: "assets/images/products/seer-fish.jpg",
    featured: true,
    commercialSizes: "2kg - 4kg | 4kg - 6kg | 6kg+ Whole Fish",
    cutOptions: "Whole Fish on Ice, Commercial Sliced Steaks",
    freshnessGrade: "Dockside Graded / Zero Chemical Preservation",
    packaging: "Moisture-Locked Insulated Transport Crate"
  },

  /* -------------------------------------------------------------
     CATEGORY 2: PRAWNS (Commercial Bulk Lots for B2B Supply)
     Order: Black Tiger Prawn, Indian White Prawns
     ------------------------------------------------------------- */
  {
    id: "tiger-prawn",
    name: "Black Tiger Prawn",
    category: "prawns",
    categoryName: "Prawns",
    shortDescription: "Giant banded tiger prawns with crisp firm crunch, premium inventory for hotel restaurants and high-end fish shops.",
    fullDescription: "Strictly graded Black Tiger Prawns from coastal brackish waters. Hand-sorted for uniform count integrity so your retail or restaurant kitchen gets exact piece yields. No water glazing weight inflation — 100% genuine net seafood weight.",
    unit: "Bulk Crates (10kg / 20kg Boxes)",
    priceEstimate: "Daily Wholesale Market Rate",
    image: "assets/images/products/tiger-prawn.jpg",
    featured: true,
    commercialSizes: "U-10 (Jumbo) | 15/20 Count | 20/25 Count",
    cutOptions: "Head-On Shell-On (HOSO), Headless (HLSO)",
    freshnessGrade: "Harbor Landing / Immediate Slush-Ice Pack",
    packaging: "Sealed Poly-Lined Thermocol Box with Ice"
  },
  {
    id: "indian-white-prawn",
    name: "Indian White Prawns",
    category: "prawns",
    categoryName: "Prawns",
    shortDescription: "High-demand sweet white prawns, consistent count-graded lots for local seafood shops and caterers.",
    fullDescription: "Fast-selling commercial Vannamei prawns in reliable daily volumes. Ideal for local seafood stall display and banquet caterers needing high volumes with consistent size distribution and sweet, juicy taste.",
    unit: "Bulk Crates (15kg / 25kg Boxes)",
    priceEstimate: "Daily Wholesale Market Rate",
    image: "assets/images/products/indian-white-prawn.jpg",
    featured: true,
    commercialSizes: "30/40 Count | 40/50 Count | 50/60 Count",
    cutOptions: "Head-On Shell-On (Whole), Headless Shell-On",
    freshnessGrade: "Fresh Harvest Graded Catch",
    packaging: "Food-Grade Heavy Marine Cold Crate"
  }
];

// Helper functions for easy querying
const CatalogService = {
  getAllCategories: () => SEAFOOD_CATEGORIES,
  getCategoryById: (id) => {
    const cleanId = (id || '').toLowerCase();
    if (cleanId === 'fish' || cleanId === 'fishes' || cleanId === 'marine-fish' || cleanId === 'freshwater-fish') {
      return SEAFOOD_CATEGORIES.find(c => c.id === 'fishes');
    }
    if (cleanId === 'prawn' || cleanId === 'prawns' || cleanId === 'prawns-shrimps' || cleanId === 'shrimp') {
      return SEAFOOD_CATEGORIES.find(c => c.id === 'prawns');
    }
    return SEAFOOD_CATEGORIES.find(c => c.id === id);
  },
  getAllProducts: () => SEAFOOD_PRODUCTS,
  getFeaturedProducts: () => SEAFOOD_PRODUCTS.filter(p => p.featured),
  getProductById: (id) => {
    if (!id) return undefined;
    return SEAFOOD_PRODUCTS.find(p => p.id === id);
  },
  getProductsByCategory: (categoryId) => {
    if (!categoryId || categoryId === 'all') return SEAFOOD_PRODUCTS;
    const cat = categoryId.toLowerCase();
    if (cat === 'fish' || cat === 'fishes' || cat === 'marine-fish' || cat === 'freshwater-fish') {
      return SEAFOOD_PRODUCTS.filter(p => p.category === 'fishes');
    }
    if (cat === 'prawn' || cat === 'prawns' || cat === 'prawns-shrimps' || cat === 'shrimp') {
      return SEAFOOD_PRODUCTS.filter(p => p.category === 'prawns');
    }
    return SEAFOOD_PRODUCTS.filter(p => p.category === categoryId);
  },
  getRelatedProducts: (currentProductId, limit = 4) => {
    const current = SEAFOOD_PRODUCTS.find(p => p.id === currentProductId);
    if (!current) return SEAFOOD_PRODUCTS.slice(0, limit);
    return SEAFOOD_PRODUCTS
      .filter(p => p.id !== currentProductId && p.category === current.category)
      .concat(SEAFOOD_PRODUCTS.filter(p => p.id !== currentProductId && p.category !== current.category))
      .slice(0, limit);
  }
};
