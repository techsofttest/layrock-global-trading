import { Globe2, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import { slugify } from "@/lib/slugify";

export { slugify };

export interface Category {
  name: string;
  short?: string;
  count: string;
  image: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  number: string;
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => slugify(p.name) === slug);
}

export interface Service {
  number: string;
  icon: typeof Globe2;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface HeroSlide {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  label: string;
}

export const EMAIL_ADDRESS = "divin@layrockglobal.co.uk";
export const PHONE_NUMBER = "+44 0000 000000";

export const CATEGORIES: Category[] = [
  {
    name: "All products",
    count: "Featured selection",
    image: "/categories/All products.png",
  },
  {
    name: "Aluminium Products & Extrusions",
    short: "Aluminium products",
    count: "Extrusions & profiles",
    image: "/categories/Aluminium Products & Extrusions.png",
  },
  {
    name: "Non-ferrous metals",
    short: "Non-ferrous metals",
    count: "Alloys & metals",
    image: "/categories/Metal Products.png",
  },
  {
    name: "Plastics (HDPE & Others)",
    short: "Plastics (HDPE)",
    count: "Industrial polymers",
    image: "/categories/Plastics (HDPE & Others).png",
  },
  {
    name: "AAC Blocks",
    short: "AAC blocks",
    count: "Construction materials",
    image: "/categories/AAC Blocks.png",
  },
  {
    name: "Spices",
    short: "Spices",
    count: "Natural ingredients",
    image: "/categories/Spices.png",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Aluminium Profiles & Extruded Sections",
    category: "Aluminium Products & Extrusions",
    description:
      "High-grade architectural, commercial and industrial aluminium extrusions engineered to precision.",
    image:
      "https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=1000&q=85",
    number: "01",
  },
  {
    id: 2,
    name: "Industrial Metal & Steel Products",
    category: "Non-ferrous metals",
    description:
      "Dependable metal and structural steel sourcing for industrial, fabrication and infrastructure requirements.",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=85",
    number: "02",
  },
  {
    id: 3,
    name: "HDPE & Polymer Raw Materials",
    category: "Plastics (HDPE & Others)",
    description:
      "High-density polyethylene and versatile polymer resins for manufacturing, blow moulding and packaging.",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=85",
    number: "03",
  },
  {
    id: 4,
    name: "Autoclaved Aerated Concrete Blocks",
    category: "AAC Blocks",
    description:
      "Lightweight, thermal-efficient AAC blocks for modern building, residential and commercial projects.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=85",
    number: "04",
  },
  {
    id: 5,
    name: "Premium Export Quality Spices",
    category: "Spices",
    description:
      "Carefully sourced whole and ground aromatic spices for wholesale, food processing and global distribution.",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1000&q=85",
    number: "05",
  },
  {
    id: 6,
    name: "Aluminium Sheets, Plates & Coils",
    category: "Aluminium Products & Extrusions",
    description:
      "Corrosion-resistant aluminium rolled sheet and coil stock suitable for cladding, roofing and manufacturing.",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=85",
    number: "06",
  },
  {
    id: 7,
    name: "Architectural Aluminium Window & Door Systems",
    category: "Aluminium Products & Extrusions",
    description:
      "Thermal-break structural aluminium frame extrusions and hardware systems for commercial façades.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=85",
    number: "07",
  },
  {
    id: 8,
    name: "Structural Carbon Steel Beams & Rebar",
    category: "Non-ferrous metals",
    description:
      "Hot-rolled I-beams, H-channels, angle iron and reinforcement steel bars for heavy construction projects.",
    image:
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=85",
    number: "08",
  },
  {
    id: 9,
    name: "Stainless Steel Pipes & Tube Fittings",
    category: "Non-ferrous metals",
    description:
      "Seamless and welded stainless steel tubing (grades 304/316) for industrial fluid handling and engineering.",
    image:
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1000&q=85",
    number: "09",
  },
  {
    id: 10,
    name: "HDPE Blow Moulding & Film Grade Resins",
    category: "Plastics (HDPE & Others)",
    description:
      "High molecular weight virgin and recycled polymer resin pellets for bottle blowing, containers and films.",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=85",
    number: "10",
  },
  {
    id: 11,
    name: "Polypropylene (PP) & LDPE Polymers",
    category: "Plastics (HDPE & Others)",
    description:
      "Versatile copolymer and homopolymer granules engineered for injection moulding, packaging and woven sacks.",
    image:
      "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1000&q=85",
    number: "11",
  },
  {
    id: 12,
    name: "Reinforced AAC Wall Panels & Lintels",
    category: "AAC Blocks",
    description:
      "Steel-reinforced aerated concrete floor slabs, wall panels and load-bearing lintels for rapid construction.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=85",
    number: "12",
  },
  {
    id: 13,
    name: "Thin-Bed AAC Mortar & Adhesive",
    category: "AAC Blocks",
    description:
      "Specially formulated high-bond polymer jointing mortar providing high compressive strength and zero thermal bridges.",
    image:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1000&q=85",
    number: "13",
  },
  {
    id: 14,
    name: "Malabar Black Pepper & Green Cardamom",
    category: "Spices",
    description:
      "Hand-graded bold Tellicherry black peppercorns and extra bold green cardamom pods with high essential oil content.",
    image:
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=1000&q=85",
    number: "14",
  },
  {
    id: 15,
    name: "Organic Turmeric & Dried Red Chillies",
    category: "Spices",
    description:
      "High-curcumin finger turmeric and stemless vibrant red chillies processed under strict food safety standards.",
    image:
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1000&q=85",
    number: "15",
  },
  // --- Aluminium Products & Extrusions (7 more) ---
  {
    id: 16,
    name: "Anodised Aluminium Architectural Profiles",
    category: "Aluminium Products & Extrusions",
    description:
      "Corrosion-resistant matte silver and bronze anodised aluminium extrusions for modern curtain walling.",
    image:
      "https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=1000&q=85",
    number: "16",
  },
  {
    id: 17,
    name: "Aluminium Checkered Tread Plates",
    category: "Aluminium Products & Extrusions",
    description:
      "Durable 5-bar slip-resistant aluminium tread plates for industrial walkways, vehicle flooring and stairs.",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=85",
    number: "17",
  },
  {
    id: 18,
    name: "Industrial Aluminium Round & Square Bars",
    category: "Aluminium Products & Extrusions",
    description:
      "High-tensile 6061 and 6082 T6 solid aluminium bars engineered for CNC machining and aerospace components.",
    image:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1000&q=85",
    number: "18",
  },
  {
    id: 19,
    name: "Heavy-Duty Aluminium Extruded Tubes",
    category: "Aluminium Products & Extrusions",
    description:
      "Seamless and structural hollow aluminium circular and rectangular tubing for framing and scaffolding.",
    image:
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1000&q=85",
    number: "19",
  },
  {
    id: 20,
    name: "Powder Coated Aluminium Facade Louvers",
    category: "Aluminium Products & Extrusions",
    description:
      "Aerofoil and sun-shading aluminium louver systems finished in weather-resistant architectural powders.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=85",
    number: "20",
  },
  {
    id: 21,
    name: "Precision Aluminium Heat Sink Extrusions",
    category: "Aluminium Products & Extrusions",
    description:
      "High thermal conductivity aluminium finned profiles engineered for power electronics and LED lighting.",
    image:
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1000&q=85",
    number: "21",
  },
  {
    id: 22,
    name: "Commercial Aluminium Partition Profiles",
    category: "Aluminium Products & Extrusions",
    description:
      "Modular slimline aluminium channel and mullion systems for corporate interior office glazing.",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=85",
    number: "22",
  },

  // --- Non-ferrous metals (7 more) ---
  {
    id: 23,
    name: "Cold-Rolled Galvanised Steel Coils (GI)",
    category: "Non-ferrous metals",
    description:
      "Hot-dip zinc coated steel sheets and slit coils offering exceptional rust protection for ducting and roofing.",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=85",
    number: "23",
  },
  {
    id: 24,
    name: "Alloy Steel Round Bars & Forging Stock",
    category: "Non-ferrous metals",
    description:
      "Speciality alloy steel bars for high-stress gears, shafts and industrial automotive manufacturing.",
    image:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1000&q=85",
    number: "24",
  },
  {
    id: 25,
    name: "Heavy Structural Steel Plate & Flanges",
    category: "Non-ferrous metals",
    description:
      "High-yield carbon steel plate cut to size for shipbuilding, pressure vessels and bridge infrastructure.",
    image:
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=85",
    number: "25",
  },
  {
    id: 26,
    name: "Industrial Stainless Steel Wire Mesh",
    category: "Non-ferrous metals",
    description:
      "Woven SS304/SS316 fine and heavy wire mesh for precision filtration, sieving and security fencing.",
    image:
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1000&q=85",
    number: "26",
  },
  {
    id: 27,
    name: "Mild Steel Equal & Unequal Angles",
    category: "Non-ferrous metals",
    description:
      "Standard and structural grade L-profiles for transmission towers, equipment frames and construction trusses.",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=85",
    number: "27",
  },
  {
    id: 28,
    name: "Precision Drawn Seamless Hydraulic Tubes",
    category: "Non-ferrous metals",
    description:
      "Cold-finished precision steel tubes tested for high hydraulic pressure and tight dimensional tolerances.",
    image:
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1000&q=85",
    number: "28",
  },
  {
    id: 29,
    name: "Reinforcing Deformed Steel TMT Bars",
    category: "Non-ferrous metals",
    description:
      "Thermo-Mechanically Treated (TMT) Fe500D rebars with superior bendability and seismic resistance.",
    image:
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=85",
    number: "29",
  },

  // --- Plastics (HDPE & Others) (7 more) ---
  {
    id: 30,
    name: "HDPE Pipe Grade Resins (PE100)",
    category: "Plastics (HDPE & Others)",
    description:
      "Bimodal black PE100 granule compounds engineered for potable water, gas distribution and sewer piping.",
    image:
      "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1000&q=85",
    number: "30",
  },
  {
    id: 31,
    name: "LLDPE Film & Rotomoulding Powders",
    category: "Plastics (HDPE & Others)",
    description:
      "Butene and octene based linear low-density granules providing puncture resistance and stretch clarity.",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=85",
    number: "31",
  },
  {
    id: 32,
    name: "Polyvinyl Chloride (PVC) Suspension Resins",
    category: "Plastics (HDPE & Others)",
    description:
      "K-value 67 suspension grade PVC virgin resin for rigid pipes, fittings, window profiles and conduit.",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=85",
    number: "32",
  },
  {
    id: 33,
    name: "PET Bottle Grade Polymer Granules",
    category: "Plastics (HDPE & Others)",
    description:
      "High IV thermoplastic polyester chips ideal for beverage bottle preforms, cosmetic containers and sheet.",
    image:
      "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1000&q=85",
    number: "33",
  },
  {
    id: 34,
    name: "Recycled Post-Consumer HDPE Pellets",
    category: "Plastics (HDPE & Others)",
    description:
      "Eco-certified washed and pelletised recycled HDPE for sustainable non-food packaging and blow moulding.",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=85",
    number: "34",
  },
  {
    id: 35,
    name: "Polycarbonate & Engineering Resin Compounds",
    category: "Plastics (HDPE & Others)",
    description:
      "Impact-resistant UV-stabilised PC and ABS thermoplastic resins for electrical and automotive components.",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=85",
    number: "35",
  },
  {
    id: 36,
    name: "White & Colour Masterbatches for Plastics",
    category: "Plastics (HDPE & Others)",
    description:
      "High-opacity titanium dioxide white masterbatches and custom additive masterbatches for extrusion.",
    image:
      "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1000&q=85",
    number: "36",
  },

  // --- AAC Blocks (7 more) ---
  {
    id: 37,
    name: "Jumbo Size AAC Foundation & Partition Blocks",
    category: "AAC Blocks",
    description:
      "High load-bearing cellular lightweight blocks delivering fast masonry cycles and enhanced soundproofing.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=85",
    number: "37",
  },
  {
    id: 38,
    name: "AAC Acoustic Partition Blocks",
    category: "AAC Blocks",
    description:
      "Non-combustible aerated concrete blocks engineered for superior decibel reduction between interior rooms.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=85",
    number: "38",
  },
  {
    id: 39,
    name: "AAC Thermal Insulation Slabs",
    category: "AAC Blocks",
    description:
      "Low-density autoclaved aerated insulation slabs offering mineral-based, non-flammable roof thermal insulation.",
    image:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1000&q=85",
    number: "39",
  },
  {
    id: 40,
    name: "Reinforced AAC Cladding Panels",
    category: "AAC Blocks",
    description:
      "Factory-cured steel wire reinforced aerated lightweight concrete panels for modern architectural curtain walls.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=85",
    number: "40",
  },
  {
    id: 41,
    name: "Ready-Mix AAC Jointing Polymer Mortar",
    category: "AAC Blocks",
    description:
      "Pre-blended dry-mix cementitious mortar ensuring 2-3mm joint thicknesses with zero water curing needed.",
    image:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1000&q=85",
    number: "41",
  },
  {
    id: 42,
    name: "Interlocking AAC Corner & Edge Blocks",
    category: "AAC Blocks",
    description:
      "Tongue-and-groove profile AAC blocks eliminating mortar gaps along vertical column joints and corners.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=85",
    number: "42",
  },
  {
    id: 43,
    name: "Fire-Rated AAC Floor & Roof Slabs",
    category: "AAC Blocks",
    description:
      "Tested 4-hour fire resistance certified lightweight aerated roof and mezzanine floor structural slabs.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=85",
    number: "43",
  },

  // --- Spices (7 more) ---
  {
    id: 44,
    name: "Ceylon Cinnamon Quills & Powder",
    category: "Spices",
    description:
      "Ultra-low coumarin genuine Ceylon cinnamon sticks and finely milled sweet culinary cinnamon.",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1000&q=85",
    number: "44",
  },
  {
    id: 45,
    name: "Whole Clove & Clove Bud Essential Oils",
    category: "Spices",
    description:
      "Hand-picked Zanzibar sun-dried whole cloves rich in natural eugenol for flavouring and pharma extraction.",
    image:
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=1000&q=85",
    number: "45",
  },
  {
    id: 46,
    name: "Cumin Seeds (Jeera) Machine Cleaned",
    category: "Spices",
    description:
      "99.5% purity machine-cleaned bold cumin seeds packed with rich aroma for global spice blenders.",
    image:
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1000&q=85",
    number: "46",
  },
  {
    id: 47,
    name: "Kashmiri Chilli Powder (De-seeded)",
    category: "Spices",
    description:
      "Deep natural red colour with gentle heat value (SHU) ideal for high-end food manufacturing and marinades.",
    image:
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1000&q=85",
    number: "47",
  },
  {
    id: 48,
    name: "Whole Nutmeg & Mace Blades",
    category: "Spices",
    description:
      "Sound unwrinkled whole nutmeg nuts and vibrant golden-red mace arils with strong aromatic bouquet.",
    image:
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=1000&q=85",
    number: "48",
  },
  {
    id: 49,
    name: "Split Dry Ginger & Ginger Powder",
    category: "Spices",
    description:
      "Unbleached sun-dried ginger rhizomes offering sharp pungent flavour and medicinal grade purity.",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1000&q=85",
    number: "49",
  },
  {
    id: 50,
    name: "Green Fennel & Coriander Seeds",
    category: "Spices",
    description:
      "Bright green Lucknow fennel and whole coriander seeds sorted for sweetness and baking applications.",
    image:
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=1000&q=85",
    number: "50",
  },
];

export const SERVICES: Service[] = [
  {
    number: "01",
    icon: Globe2,
    title: "Global sourcing",
    description:
      "Connect with suitable product sources and manufacturers for your business requirements.",
  },
  {
    number: "02",
    icon: PackageCheck,
    title: "Export coordination",
    description:
      "Coordinated order handling, documentation support and shipment preparation.",
  },
  {
    number: "03",
    icon: Truck,
    title: "Logistics support",
    description:
      "Practical coordination to help move goods from suppliers to their intended destinations.",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Quality coordination",
    description:
      "Clear product specifications and communication throughout the sourcing process.",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Clear communication and a straightforward sourcing process make a real difference when dealing with international suppliers.",
    name: "International procurement",
    role: "Buyer perspective",
  },
  {
    quote:
      "Having product requirements and order details organised in one place makes supplier coordination much easier.",
    name: "Wholesale distribution",
    role: "Trade partner perspective",
  },
  {
    quote:
      "Reliable follow-up and transparent communication are essential when coordinating orders across markets.",
    name: "Commercial sourcing",
    role: "Business customer perspective",
  },
  {
    quote:
      "Their team managed our aluminium extrusions procurement with utmost precision and timely container shipments.",
    name: "Architectural Systems Director",
    role: "Facade Engineering Group",
  },
  {
    quote:
      "Exceptional consistency on high-density polymer resin shipments. Documentation and compliance were flawlessly handled.",
    name: "Head of Polymer Procurement",
    role: "Industrial Packaging Manufacturer",
  },
  {
    quote:
      "Export spice quality exceeded expectations. The purity, aroma profile and packaging standards met all European import regulations.",
    name: "Global Commodities Trader",
    role: "Food & Beverage Distribution",
  },
  {
    quote:
      "Supplying certified AAC blocks for our commercial development projects on schedule reduced our building timeline significantly.",
    name: "Senior Project Manager",
    role: "Commercial Infrastructure Ltd",
  },
  {
    quote:
      "Responsive communication and seamless freight forwarding coordination from dispatch to port clearance.",
    name: "Supply Chain Operations Lead",
    role: "Middle East Logistics Partner",
  },
  {
    quote:
      "Direct sourcing connections gave us reliable pricing stability across our quarterly steel and alloy requirements.",
    name: "Manufacturing Purchasing Head",
    role: "Precision Heavy Engineering",
  },
  {
    quote:
      "The transparency regarding lead times and incoterms makes Layrock our preferred international procurement partner.",
    name: "Import & Export Director",
    role: "Continental Trade Alliance",
  },
  {
    quote:
      "Fast turnaround on custom quotes and thorough technical specification reviews for our construction materials.",
    name: "Commercial Construction Lead",
    role: "Urban Development Projects",
  },
];

export const HERO_SLIDES: HeroSlide[] = [
  {
    eyebrow: "OUR PRODUCT CATEGORIES",
    title: "Aluminium Products &\nExtrusions",
    description:
      "Explore premium architectural, commercial and industrial aluminium profiles, extrusions, and sheets.",
    image: "/home-hero/Aluminium Products & Extrusions.png",
    label: "Category: Aluminium Products & Extrusions",
  },
  {
    eyebrow: "OUR PRODUCT CATEGORIES",
    title: "Non-ferrous metals &\nStructural Steel",
    description:
      "Dependable metal, structural steel, rebar, beams, and stainless steel pipe sourcing for industrial infrastructure.",
    image: "/home-hero/Metal Products & Structural Steel.png",
    label: "Category: Non-ferrous metals",
  },
  {
    eyebrow: "OUR PRODUCT CATEGORIES",
    title: "Plastics (HDPE &\nOther Polymers)",
    description:
      "High-density polyethylene, blow moulding resins, PP, and versatile polymer materials for packaging and manufacturing.",
    image: "/home-hero/Plastics HDPE & Other Polymers.png",
    label: "Category: Plastics (HDPE & Others)",
  },
  {
    eyebrow: "OUR PRODUCT CATEGORIES",
    title: "Autoclaved Aerated\nConcrete (AAC Blocks)",
    description:
      "Eco-friendly, lightweight, and thermal-efficient AAC blocks, panels, and thin-bed mortar for construction projects.",
    image: "/home-hero/Autoclaved Aerated Concrete AAC Blocks.png",
    label: "Category: AAC Blocks",
  },
  {
    eyebrow: "OUR PRODUCT CATEGORIES",
    title: "Premium Export\nSpices",
    description:
      "Carefully sourced whole and ground aromatic spices including black pepper, cardamom, turmeric, and dried chillies.",
    image: "/home-hero/Premium Export Spices.png",
    label: "Category: Spices",
  },
];
