// ─── ALL SITE DATA ────────────────────────────────────────────────────────────

export const PRODUCTS = [
  {
    id: 1, slug: "pure-tile-p10", name: "PURE TILE P10",
    cat: "tile-adhesive", catLabel: "Tile Adhesive", en: "C1 T",
    cutout: "/products/pure-tile-p10.png",
    image: "/products/pure-tile-p10.png",
    desc: "Ready-mixed polymer-modified cement-based adhesive for ceramic tiles, terracotta and small natural stones.",
    fullDesc: "PURE TILE P10 is a ready-mixed, polymer-modified, cement-based tile adhesive. Ideal for standard ceramic and vitrified tiles on horizontal and vertical surfaces in indoor areas. Contains cement, fine selected sand and special performance additives.",
    features: ["High bond strength with no shrinking cracks","Non-slip — excellent initial adherence","Self-curing properties with very low VOC","Easy to use — just add water","Bonds ceramic, terracotta, brick, vitrified tiles","Compatible with natural stone and large format tiles"],
    chips: ["High Bond", "Non-Slip", "Low VOC"],
    specs: { category: "Tile Adhesive", standard: "EN 12004 — C1 T", settingTime: "20 min open time", coverage: "4–5 kg/m²", mixRatio: "Powder + water only" },
    zones: ["floors","walls","indoor"]
  },
  {
    id: 2, slug: "pure-set-p40", name: "PURE SET P40",
    cat: "tile-adhesive", catLabel: "Tile Adhesive", en: "C2 T E",
    cutout: "/products/pure-set-p40.png",
    image: "/products/pure-set-p40.png",
    desc: "Polymer-modified, cement-based multi-purpose adhesive with outstanding bonding and extended open time.",
    fullDesc: "PURE SET P40 is a ready-mixed, polymer-modified, cement-based powder adhesive. Multi-purpose formulation with outstanding bonding performance, no vertical slip and long open time. Suitable for porcelain, ceramic and vitrified tiles in interior and exterior applications.",
    features: ["Outstanding bond on difficult substrates","No vertical slip on walls","Extended open time for large format work","Interior and exterior use","Porcelain and large format tile compatible","EN class C2 T E — Improved adhesive"],
    chips: ["C2 Standard", "Extended Open", "Ext/Int Use"],
    specs: { category: "Tile Adhesive", standard: "EN 12004 — C2 T E", settingTime: "30 min extended open", coverage: "3–4 kg/m²", mixRatio: "Powder + water" },
    zones: ["floors","walls","indoor","outdoor"]
  },
  {
    id: 9, slug: "pure-set-is100", name: "PURE SET IS 100",
    cat: "tile-adhesive", catLabel: "Tile Adhesive", en: "C2 T",
    cutout: "/products/pure-set-p40.png",
    image: "/products/pure-set-p40.png",
    desc: "IS 15477-classified polymer-modified adhesive engineered for Indian climate conditions and diverse substrates.",
    fullDesc: "PURE SET IS 100 is a polymer-modified, cement-based tile adhesive classified to IS 15477 — the Indian Standard for tile adhesives. Formulated specifically for Indian climate conditions, it delivers reliable bond strength on a wide range of substrates including concrete, brick, plaster and existing tiles across residential and commercial projects.",
    features: ["IS 15477 classified — meets Indian Standard","Polymer-modified for enhanced bond strength","Suitable for Indian climate — humidity and heat resistant","Works on concrete, brick, plaster and existing tiles","Non-slip on vertical surfaces","Extended working time for large area installations"],
    chips: ["IS 15477", "All Substrates", "Climate Ready"],
    specs: { category: "Tile Adhesive", standard: "IS 15477 — C2 T", settingTime: "25 min open time", coverage: "3.5–4.5 kg/m²", mixRatio: "Powder + water only" },
    zones: ["floors","walls","indoor","outdoor"]
  },
  {
    id: 3, slug: "pure-flex-ultra", name: "PURE FLEX ULTRA",
    cat: "tile-adhesive", catLabel: "Tile Adhesive", en: "C2 S1 T",
    cutout: "/products/pure-flex-ultra.png",
    image: "/products/pure-flex-ultra.png",
    desc: "Highly flexible S1 class polymer-modified adhesive for large format tiles and movement-prone areas.",
    fullDesc: "PURE FLEX ULTRA is a highly flexible, polymer-modified, cement-based adhesive achieving S1 deformability class. Ideal for large format tiles and areas subject to structural or thermal movement — terraces, balconies, facades and exterior cladding.",
    features: ["S1 deformability class — highly flexible","Large format tile compatible","Accommodates structural movement","Interior and exterior","Walls and floors","Freeze-thaw resistant"],
    chips: ["S1 Flex", "Large Format", "Exterior"],
    specs: { category: "Tile Adhesive", standard: "EN 12004 — C2 S1 T", settingTime: "25 min open", coverage: "3.5 kg/m²", mixRatio: "Powder + water" },
    zones: ["floors","walls","indoor","outdoor"]
  },
  {
    id: 4, slug: "pure-flex-p100", name: "PURE FLEX P100",
    cat: "tile-adhesive", catLabel: "Tile Adhesive", en: "C2 S2 T",
    cutout: "/products/pure-flex-p100.png",
    image: "/products/pure-flex-p100.png",
    desc: "Premium maximum flexibility S2 class adhesive. Anti-slip. For swimming pools and tiles up to 900×900mm.",
    fullDesc: "PURE FLEX P100 is a premium, highly flexible, polymer-modified, cement-based adhesive achieving the highest S2 deformability class. Anti-slip on vertical surfaces. Engineered for swimming pools, wet areas and the most demanding large format tile installations up to 900×900mm.",
    features: ["S2 deformability — maximum flexibility","Anti-slip on vertical surfaces","Swimming pools and wet areas","Large format tiles up to 900×900mm","Frost-resistant","Premium performance benchmark"],
    chips: ["S2 Max Flex", "Pools/Wet", "900mm Tiles"],
    specs: { category: "Tile Adhesive", standard: "EN 12004 — C2 S2 T", settingTime: "3 hr pot life", coverage: "3 kg/m²", mixRatio: "Powder + water" },
    zones: ["floors","walls","indoor","outdoor","pools"]
  },
  {
    id: 5, slug: "purepoxy-hg-1200", name: "PUREPOXY HG 1200",
    cat: "epoxy", catLabel: "Epoxy Grout", en: "RG",
    cutout: "/products/purepoxy-hg-1200.png",
    image: "/products/purepoxy-hg-1200.png",
    desc: "Two-component epoxy resin grout. Chemical-resistant, hard-wearing, impervious tile joint for floors and walls.",
    fullDesc: "PUREPOXY HG 1200 is a two-component epoxy resin-based grout for floors and walls in interior use. Delivers high chemical resistance, exceptional durability, colour fastness and a completely impervious tile joint. Ideal for residential and commercial environments requiring chemical attack resistance.",
    features: ["Smooth, even, waterproof finish","Exceptional chemical and mechanical resistance","Antifungal and antibacterial properties","No cracking — zero shrinkage","Easy to mix, apply and clean","Available in range of colours"],
    chips: ["RG Epoxy", "Anti-bacterial", "Chemical Resist"],
    specs: { category: "Epoxy Grout", standard: "EN 12004 — RG", settingTime: "45 min pot life", coverage: "Joint width 1–10 mm", mixRatio: "2-component, pre-measured" },
    zones: ["floors","walls","indoor","pools","kitchens"]
  },
  {
    id: 6, slug: "purelastic-pu", name: "PURELASTIC PU",
    cat: "sealant", catLabel: "PU Sealant", en: "—",
    cutout: "/products/purelastic-pu.png",
    image: "/products/purelastic-pu.png",
    desc: "Single-component polyurethane sealant for expansion joints and perimeter sealing. Elastic and weatherproof.",
    fullDesc: "PURELASTIC PU is a single-component polyurethane sealant for expansion joints and perimeter sealing around sanitary fittings and building facades. Delivers high elastic recovery, UV stability and excellent weather resistance across a broad temperature range.",
    features: ["High elastic recovery","UV stable — paintable after curing","For expansion and perimeter joints","Resistant to water, dilute acids and alkalis","Temperature range −40°C to +90°C","Single-component — ready to use"],
    chips: ["Elastic", "UV Stable", "Paintable"],
    specs: { category: "PU Sealant", standard: "ISO 11600", settingTime: "Skin-over 60 min", coverage: "Bead-applied", mixRatio: "Single component" },
    zones: ["floors","walls","indoor","outdoor"]
  },
  {
    id: 7, slug: "gomax-grout-admix", name: "GOMAX GROUT ADMIX",
    cat: "additive", catLabel: "Grout Additive", en: "—",
    cutout: "/products/pure-tile-p10.png",
    image: "/products/pure-tile-p10.png",
    desc: "Polymer additive for cement-based grouts. Replaces mixing water entirely. Improves bond, flexibility and water resistance.",
    fullDesc: "GOMAX GROUT ADMIX is a polymer-based liquid additive that entirely replaces the mixing water in cement-based grouts. Significantly improves cohesion, workability, water resistance and colour uniformity whilst reducing efflorescence — the common white staining that appears on grout joints.",
    features: ["Replaces mixing water entirely","Improves cohesion and workability","Reduces water absorption","Enhances colour uniformity","Anti-efflorescence","For all cement-based grouts"],
    chips: ["Anti-Efflorescence", "Polymer Boost", "Easy Mix"],
    specs: { category: "Grout Additive", standard: "Internal Standard", settingTime: "As per grout", coverage: "1L or 5L packs", mixRatio: "Replaces water 1:1" },
    zones: ["floors","walls","indoor","outdoor"]
  },
  {
    id: 8, slug: "gomax-pure-clean", name: "GOMAX PURE CLEAN",
    cat: "cleaner", catLabel: "Tile Cleaner", en: "—",
    cutout: "/products/gomax-pure-clean.png",
    image: "/products/gomax-pure-clean.png",
    desc: "Acidic water-based cleaner for cement haze, grout residue, lime deposits and rust stains on tiles.",
    fullDesc: "GOMAX PURE CLEAN is an acidic, water-based deep cleaner formulated to remove organic and inorganic residues from ceramic and porcelain tile surfaces. Efficiently dissolves cement haze, grout residue, lime deposits and rust stains left after tiling work.",
    features: ["Removes cement haze and grout residue","Effective on lime deposits and rust stains","Water-based — low environmental impact","Dilute 1:5 to 1:10 for normal cleaning","Safe on ceramic, porcelain, terracotta","Not for polished marble or acid-sensitive surfaces"],
    chips: ["pH 1.5–2.0", "Dilutable", "Water-Based"],
    specs: { category: "Tile Cleaner", standard: "Internal Standard", settingTime: "5–10 min contact time", coverage: "Dilute 1:5 to 1:10", mixRatio: "Dilute with water" },
    zones: ["floors","walls","indoor","outdoor"]
  }
];

export const REVIEWS = [
  { name: "Md Mukhtar Alam", text: "Bhot acha chemical hai good", stars: 5 },
  { name: "Krishan", text: "बहुत बढ़िया केमिकल है, कवरेज भी ठीक है और लेशपन भी बढ़िया है", stars: 5 },
  { name: "Gaurav Dhiman", text: "Superb quality — highly recommended for professional tile work.", stars: 5 },
  { name: "Bijender Kumar", text: "Best quality product. Results are excellent on every substrate.", stars: 5 },
  { name: "Anil Chauhan", text: "Excellent. Very strong bond, easy to apply, clean finish.", stars: 5 },
  { name: "Akshay Dhiman", text: "Good chemical and good service. Will use again on next project.", stars: 5 },
  { name: "Ajit Singh", text: "Good product. Coverage is consistent and application is smooth.", stars: 5 },
  { name: "Shree Shyam Tiles", text: "Excellent product for our tile showroom. Customers are very happy.", stars: 5 },
  { name: "Rajesh Sharma", text: "Premium quality at a competitive price. Reliable brand.", stars: 5 },
  { name: "Suresh Patel", text: "Used on a large commercial project. Delivered outstanding results.", stars: 5 },
];

export const SOLUTION_CATS = [
  { id: "admixtures", name: "Admixtures", icon: "flask" },
  { id: "adhesive-repairs", name: "Adhesive & Repairs", icon: "tool" },
  { id: "liquid-floor", name: "Liquid Floor", icon: "layers" },
  { id: "waterproofing", name: "Waterproofing", icon: "droplet" },
  { id: "sealants", name: "Sealants", icon: "shield" },
  { id: "highway-repairs", name: "Highway Repairs", icon: "road" },
  { id: "grouting", name: "Grouting", icon: "grid" },
  { id: "surface-treatment", name: "Surface Treatment", icon: "brush" },
  { id: "industrial-floor", name: "Industrial Floor Surfaces", icon: "building" },
  { id: "wall-finishing", name: "Wall Finishing", icon: "square" },
  { id: "protective-coating", name: "Protective Coating", icon: "shield-check" },
  { id: "prepacked-concrete", name: "Prepacked Concrete & Mortar", icon: "box" },
];

export const BLOG_ARTICLES = [
  {
    id: 1, slug: "benefits-quality-tile-adhesive",
    title: "Benefits of Quality Tile Adhesive",
    date: "July 5, 2025", dateShort: "05 JUL 2025",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    excerpt: "Using a quality tile adhesive like GoMax offers several practical and long-term benefits for construction, renovation, and tiling professionals.",
    sections: [
      { title: "Stronger Bonding Strength", body: "GoMax adhesives are engineered for excellent adhesion to a wide range of substrates. High bond strength prevents tiles from popping out or becoming loose over time — a critical factor in high-traffic floors, exterior facades and wet areas where structural integrity is non-negotiable." },
      { title: "Time-Saving Application", body: "Pre-mixed or easy-to-mix formulas save preparation time on the job site. The uniform consistency of GoMax products allows for quick, smooth application across large areas, significantly reducing labour time and enabling faster project completion without compromising quality." },
      { title: "Versatility Across Substrates", body: "GoMax adhesives are suitable for cement, plaster, gypsum boards and even existing tiles. Compatible with ceramic, porcelain, vitrified, mosaic, marble and large format tiles — one product range serves the full spectrum of tiling applications in both residential and commercial construction." },
      { title: "Water and Heat Resistance", body: "The waterproofing properties of GoMax adhesives make them ideal for bathrooms, kitchens, swimming pools and outdoor areas. These products retain full bond strength in high-temperature and highly humid environments, ensuring long-term performance wherever moisture is a concern." },
      { title: "Reduced Shrinkage and Cracking", body: "GoMax formulations prevent tiles from cracking under temperature fluctuations or load pressure. The adhesive maintains structural integrity under stress, movement and thermal cycling — a key advantage over cheaper alternatives that fail prematurely in Indian climate conditions." },
      { title: "Cost-Effective in the Long Run", body: "Low maintenance requirements and exceptional lifespan means less frequent repairs and re-tiling. When lifecycle costs are calculated, GoMax products consistently deliver a superior return on investment compared to inferior adhesives that require replacement within a few years." },
      { title: "Clean and Aesthetic Finish", body: "Uniform tile levelling without sagging, lippage or displacement. GoMax adhesives spread smoothly and maintain a perfectly level, professional finish — critical for architects and designers specifying large format tiles where any variation in level becomes immediately visible." }
    ]
  },
  {
    id: 2, slug: "choosing-right-tile-adhesive",
    title: "How to Choose the Right Tile Adhesive for Your Project",
    date: "August 12, 2025", dateShort: "12 AUG 2025",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80",
    excerpt: "Substrate type, tile size, location and exposure — four factors that determine which adhesive classification your project demands.",
    sections: [
      { title: "Understanding Your Substrate", body: "The substrate — cement screed, plywood, gypsum board, existing tiles — determines the adhesive class required. Porous substrates like cement can use standard C1 adhesives. Non-porous substrates like existing tiles or polished concrete demand C2 improved class adhesives for adequate bond strength." },
      { title: "Tile Size Matters", body: "Large format tiles above 600×600mm require a flexible adhesive to manage the increased dead weight and thermal expansion. Anything above 300×600mm should use at minimum C2 T class. Tiles above 600×900mm demand S1 or S2 flexible adhesives to prevent long-term debonding." }
    ]
  },
  {
    id: 3, slug: "en-12004-explained",
    title: "EN 12004 Explained: What the Classification Codes Mean for Contractors",
    date: "September 3, 2025", dateShort: "03 SEP 2025",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
    excerpt: "C2 S1 T. RG. What do these codes mean? A practical guide to the European Standard that governs every GoMax product.",
    sections: [
      { title: "The EN 12004 Framework", body: "EN 12004 is the European Standard that classifies tile adhesives and grouts. Every letter and number in the product code tells you something precise about performance. C = Cementitious mortar. D = Dispersion adhesive. R = Reaction resin (epoxy). The number 1 or 2 indicates normal or improved performance class." }
    ]
  }
];
