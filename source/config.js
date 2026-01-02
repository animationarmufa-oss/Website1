// Web Yopandelreyz — Client Config (AMAN untuk browser)
// ⚠️ Jangan taruh API KEY di sini. Secrets harus di Vercel Environment Variables.

export const BRAND = {
  name: "Web Yopandelreyz",
  tagline: "Powerful hosting • Panel Pterodactyl • VPS Singapore",
};

// Mata uang (display only)
export const CURRENCY = "IDR";

// Link (opsional)
export const LINKS = {
  // Jika mau aman, kosongkan dan kembalikan link via endpoint server setelah pembayaran.
  resellerGroupFallback: "", // contoh: "https://chat.whatsapp.com/XXXXX"
};

// Produk & harga (edit bebas)
export const PRODUCTS = [
{
    key: "panel",
    title: "Panel Pterodactyl",
    subtitle: "Pilih RAM sesuai kebutuhan. Unlimited = request-based.",
    icon: "panel",
    requires: { name: true, hostname: false },
    plans: [
      { key: "panel-1gb", label: "1GB", ramGb: 1, cores: null, price: 1000, badge: "Starter" },
      { key: "panel-2gb", label: "2GB", ramGb: 2, cores: null, price: 2000, badge: "Basic" },
      { key: "panel-3gb", label: "3GB", ramGb: 3, cores: null, price: 3000, badge: "Plus" },
      { key: "panel-4gb", label: "4GB", ramGb: 4, cores: null, price: 4000, badge: "Popular" },
      { key: "panel-5gb", label: "5GB", ramGb: 5, cores: null, price: 5000, badge: "Popular" },
      { key: "panel-6gb", label: "6GB", ramGb: 6, cores: null, price: 6000, badge: "Popular" },
      { key: "panel-7gb", label: "7GB", ramGb: 7, cores: null, price: 6500, badge: "Popular" },
      { key: "panel-8gb", label: "8GB", ramGb: 8, cores: null, price: 7000, badge: "Popular" },
      { key: "panel-9gb", label: "9GB", ramGb: 9, cores: null, price: 8000, badge: "Popular" },
      { key: "panel-10gb", label: "10GB", ramGb: 10, cores: null, price: 10000, badge: "Popular" },
      { key: "panel-11gb", label: "11GB", ramGb: 11, cores: null, price: 11000, badge: "Popular" },
      { key: "panel-12gb", label: "12GB", ramGb: 12, cores: null, price: 12000, badge: "Popular" },
      { key: "panel-13gb", label: "13GB", ramGb: 13, cores: null, price: 13000, badge: "Terlangka" },
      { key: "panel-14gb", label: "14GB", ramGb: 14, cores: null, price: 14000, badge: "Terlaris" },
      { key: "panel-unlimited", label: "UNLIMITED", ramGb: 0, cores: null, price: 15000, badge: "Request" },
    ],
    notes: [
      "Unlimited (ram=0) = request-based (bukan RAM tak terbatas secara fisik).",
      "Resource menyesuaikan kapasitas server & kebijakan fair use.",
    ],
  },
];

// UX defaults
export const UX = {
  autoPollMs: 8000,
};
