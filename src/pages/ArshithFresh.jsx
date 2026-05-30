import React from "react";
import CompanyDetailPage from "../components/CompanyDetailPage";

const categoryImages = [
  ["Oils & Natural Extracts", "https://arshithfresh.com/cdn/shop/collections/oil_n_natural_extract_200x200_crop_center.jpg?v=1746964936"],
  ["Dry Fruits & Nuts", "https://arshithfresh.com/cdn/shop/collections/seeds_dry_fruits_nuts_webp_200x200_crop_center.jpg?v=1746963459"],
  ["Dry Seeds", "https://arshithfresh.com/cdn/shop/collections/dry_seeds_200x200_crop_center.jpg?v=1746963515"],
  ["Ghee and Honey", "https://arshithfresh.com/cdn/shop/collections/ghee_1_200x200_crop_center.jpg?v=1746964905"],
  ["Sweets & Snacks", "https://arshithfresh.com/cdn/shop/collections/sweetsSnacks_200x200_crop_center.jpg?v=1746963904"],
  ["Cooking Essentials", "https://arshithfresh.com/cdn/shop/collections/groceries_200x200_crop_center.jpg?v=1746965740"],
  ["Spices", "https://arshithfresh.com/cdn/shop/collections/spice_200x200_crop_center.png?v=1746963495"],
  ["Spice Powders", "https://arshithfresh.com/cdn/shop/collections/powders_200x200_crop_center.jpg?v=1743477019"],
  ["Dry Fish Specials", "https://arshithfresh.com/cdn/shop/collections/dryfish_200x200_crop_center.jpg?v=1746963861"],
  ["Combos", "https://arshithfresh.com/cdn/shop/collections/WhatsApp_Image_2025-06-29_at_16.31.09_200x200_crop_center.jpg?v=1751436637"],
  ["Monthly Combos", "https://arshithfresh.com/cdn/shop/collections/WhatsAppImage2025-06-06at10.41.08_200x200_crop_center.jpg?v=1749209551"],
  ["Veg Pickles", "https://arshithfresh.com/cdn/shop/collections/Veg11111111111111111111111_200x200_crop_center.png?v=1755705545"],
];

const productSpots = [
  {
    title: "Groundnut Oil (Premium Quality)",
    tag: "4.9 / 5.0 · 60 reviews",
    copy: "Regular price Rs. 471.15, sale price from Rs. 349.00.",
    image: "https://arshithfresh.com/cdn/shop/files/WhatsApp_Image_2025-08-22_at_11.41.18_AM_1.jpg?v=1757334051&width=360",
  },
  {
    title: "Coconut Oil (Premium Quality)",
    tag: "4.83 / 5.0 · 54 reviews",
    copy: "Regular price Rs. 214.50, sale price from Rs. 165.00.",
    image: "https://arshithfresh.com/cdn/shop/files/WhatsApp_Image_2025-08-22_at_11.41.18_AM_2.jpg?v=1757334050&width=360",
  },
  {
    title: "Sunflower Oil (Premium Quality)",
    tag: "4.91 / 5.0 · 53 reviews",
    copy: "Regular price Rs. 608.78, sale price from Rs. 499.00.",
    image: "https://arshithfresh.com/cdn/shop/files/WhatsApp_Image_2025-08-22_at_11.41.18_AM.jpg?v=1757334052&width=360",
  },
  {
    title: "Pure Buffalo Ghee (Premium Quality)",
    tag: "4.91 / 5.0 · 32 reviews",
    copy: "Regular price Rs. 288.60, sale price from Rs. 222.00.",
    image: "https://arshithfresh.com/cdn/shop/files/WhatsApp_Image_2025-09-15_at_4.34.52_PM.jpg?v=1757934372&width=360",
  },
];

const config = {
  eyebrow: "Arshith Fresh",
  title: "Fresh groceries, natural staples, and pantry essentials.",
  summary:
    "Arshith Fresh presents a curated e-commerce experience focused on organic products, cold-pressed oils, pickles, dry fruits, and daily-use essentials with a clean checkout journey.",
  heroImage: "https://cdn.shopify.com/s/files/1/0858/0772/6869/files/seller_DesktopView_Flier.jpg?v=1776192615",
  heroImageAlt: "Arshith Fresh promotional banner",
  heroBadgeLabel: "Free shipping",
  heroBadgeValue: "Above ₹1,000",
  heroNote: "Newly arrived fresh homemade veg pickles and natural ingredients with cold-pressed oils only.",
  introPills: ["Natural ingredients", "Cold-pressed oils", "Festive offers"],
  primaryAction: { label: "Shop Categories", href: "#categories" },
  secondaryAction: { label: "Visit Store", href: "https://arshithfresh.com/" },
  stats: [
    { value: "12", label: "Shop categories" },
    { value: "4.9★", label: "Customer rating" },
    { value: "60+", label: "Reviews on top products" },
    { value: "100%", label: "Natural-first focus" },
  ],
  highlightsTitle: "BEST E-COMMERCE PLATFORM",
  highlightsHeading: "Categories organized for easy browsing.",
  highlightsCopy:
    "The storefront groups the catalog into practical shopping lanes so customers can move quickly from essentials to signature products.",
  highlights: categoryImages.map(([title, image]) => ({
    title,
    copy: "Curated storefront category.",
    kicker: "Shop by category",
    image,
  })),
  sections: [
    {
      id: "categories",
      eyebrow: "YOUR FAVORITES | ALL IN ONE PLACE",
      title: "Featured products from the official storefront.",
      copy: "The brand showcases best-selling staples with clear pricing, review counts, and product photography from the live site.",
      image: "https://cdn.shopify.com/s/files/1/0858/0772/6869/files/WEBSITE_FYERS_2_1_3716758a-7e50-4c66-aa60-a8b6751485e4.png?v=1773121659",
      imageAlt: "Arshith Fresh hero banner",
      items: productSpots,
    },
    {
      eyebrow: "WE BELIEVE IN",
      title: "A cleaner, fresher food experience.",
      copy: "The site emphasizes homemade freshness, natural ingredients, and cold-pressed oils while keeping the shopping experience direct and easy to navigate.",
      image: "https://cdn.shopify.com/s/files/1/0858/0772/6869/files/seller_mobile_flier_1.jpg?v=1776192556",
      imageAlt: "Fresh product promotion",
      reverse: true,
      items: [
        { title: "New arrivals", copy: "Fresh homemade veg pickles highlighted prominently on the storefront." },
        { title: "Healthy staples", copy: "Oils, ghee, dry fruits, spices, and cooking essentials are grouped for daily use." },
        { title: "Festive deals", copy: "The site promotes limited-time offers and free shipping above ₹1,000." },
      ],
    },
  ],
  spotlightsTitle: "SHOPPING EXPERIENCE",
  spotlightsHeading: "The catalog is built around practical household buying.",
  spotlightsCopy:
    "Large category tiles, featured products, and direct pricing make the store feel fast and easy to use on the official site.",
  spotlights: productSpots,
  extraSections: [
    {
      eyebrow: "WHY CUSTOMERS COME BACK",
      title: "Simple shopping, familiar staples, and visible trust signals.",
      copy: "The storefront combines helpful product ratings, category tiles, and pricing clarity to reduce friction for repeat household purchases.",
      items: [
        { kicker: "Trust", title: "Clear ratings and reviews", copy: "Top products show review counts and star ratings right on the storefront." },
        { kicker: "Speed", title: "Category-first browsing", copy: "Customers can jump directly to oils, snacks, spices, and pickles." },
        { kicker: "Value", title: "Free shipping above ₹1,000", copy: "Shipping messaging is surfaced prominently in the user journey." },
      ],
    },
    {
      eyebrow: "MORE TO EXPLORE",
      title: "The catalog leans into family staples and everyday convenience.",
      copy: "A few more collections from the live site reinforce that the brand is broader than a single product line.",
      alt: true,
      items: [
        { kicker: "Collection", title: "Dry Fruits & Nuts", copy: "Snackable, nutrient-rich products for daily use and gifting." },
        { kicker: "Collection", title: "Cooking Essentials", copy: "Practical pantry items that support everyday meals." },
        { kicker: "Collection", title: "Veg Pickles", copy: "Fresh homemade options that emphasize taste and tradition." },
      ],
    },
  ],
  cta: {
    eyebrow: "VISIT THE STORE",
    title: "Explore the full Arshith Fresh catalog online.",
    copy: "Browse the live storefront for the latest offers, bestsellers, and category collections.",
    primary: { label: "Open Store", href: "https://arshithfresh.com/" },
    secondary: { label: "Back to Businesses", href: "/portfolio" },
  },
};

export default function ArshithFresh() {
  return <CompanyDetailPage config={config} />;
}