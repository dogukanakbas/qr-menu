import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  {
    name: "Ana Yemekler / Et Yemekleri",
    items: [
      { name: "Yörük Sac Kavurma", price: 300 },
      { name: "Sebzeli Sac Kavurma", price: 310 },
      { name: "Adana", price: 310 },
      { name: "Kıyma", price: 310 },
      { name: "Izgara Köfte", price: 310 },
      { name: "Tavuk Kanat", price: 310 },
      { name: "Tavuk Şiş", price: 300 },
      { name: "Tereyağlı Urfa", price: 370 },
      { name: "Çöpşiş", price: 400 },
      { name: "Kuşbaşı", price: 410 },
      { name: "Biftek", price: 400 },
    ],
  },
  {
    name: "Gözleme ve Hamur İşleri",
    items: [
      { name: "Kaşarlı Gözleme", price: 230 },
      { name: "Kıymalı Gözleme", price: 240 },
      { name: "Patatesli Gözleme", price: 190 },
      { name: "Peynirli Gözleme", price: 190 },
      { name: "Antep Katmeri", price: 190 },
    ],
  },
  {
    name: "Başlangıçlar / Aperatifler",
    items: [
      { name: "Soğan Halkası", price: 80 },
      { name: "Nugget", price: 80 },
      { name: "Sıcak Tabağı", price: 230 },
      { name: "Karışık Lüx Çerez (2 Kişilik)", price: 170 },
    ],
  },
  {
    name: "Kahvaltılıklar (Extra Dahil)",
    items: [
      { name: "Serpme Kahvaltı (tek kişilik yok)", price: 350 },
      { name: "Kahvaltı Tabağı", price: 330 },
      { name: "Menemen duble (Extra)", price: 150 },
      { name: "Yumurtasız Menemen duble (Extra)", price: 130 },
      { name: "Kaşarlı Omlet duble (Extra)", price: 140 },
      { name: "Omlet duble (Extra)", price: 60 },
      { name: "Kıymalı Yumurta duble (Extra)", price: 160 },
      { name: "Sucuklu Yumurta duble (Extra)", price: 150 },
      { name: "Kavurmalı Yumurta duble (Extra)", price: 180 },
      { name: "Sade Sucuk duble (Extra)", price: 140 },
      { name: "Yağda Göz Yumurta duble (Extra)", price: 50 },
      { name: "Patates Kızartma duble (Extra)", price: 100 },
      { name: "Sigara Böreği 6 adet (Extra)", price: 60 },
      { name: "Yoğurt (Extra)", price: 35 },
      { name: "Biber Kızartması (Extra)", price: 30 },
      { name: "Peynir, Kaşar Karışık (Gözleme içi olabilir)", price: 210 },
      { name: "Kaşar, Kıyma Karışık (Gözleme içi olabilir)", price: 250 },
      { name: "Kıyma, Patates Karışık (Gözleme içi olabilir)", price: 220 },
      { name: "Kaşar, Patates Karışık (Gözleme içi olabilir)", price: 210 },
    ],
  },
  {
    name: "Pastalar ve Tatlılar",
    items: [
      { name: "Frambuazlı Cheesecake", price: 190 },
      { name: "Nutellalı Pasta", price: 190 },
      { name: "Limonlu Cheesecake", price: 190 },
      { name: "Rella Cocostar", price: 190 },
      { name: "Mozaik Pasta", price: 190 },
      { name: "Kalpli Kırmızı Pasta", price: 210 },
      { name: "Fıstık Rüyası", price: 200 },
      { name: "Tiramisu", price: 190 },
      { name: "Siyah Çikolatalı Profiterol", price: 190 },
      { name: "Devil's Pasta", price: 190 },
    ],
  },
  {
    name: "Sıcak İçecekler (Çay/Bitki Çayı)",
    items: [
      { name: "Demlik Çay (2 kişilik)", price: 150 },
      { name: "Demlik Çay (3 Kişilik)", price: 170 },
      { name: "Demlik Çay (4 Kişilik)", price: 190 },
      { name: "Demlik Çay (5 Kişilik)", price: 210 },
      { name: "Demlik Çay (6 Kişilik)", price: 230 },
      { name: "Demlik Çay (7 Kişilik)", price: 250 },
      { name: "Double Bardak Çay", price: 40 },
      { name: "Böğürtlen Çayı", price: 110 },
      { name: "Nane Limon", price: 110 },
      { name: "Yeşil Çay", price: 110 },
      { name: "Ihlamur Çayı", price: 110 },
      { name: "Kış Çayı", price: 110 },
      { name: "Papatya Çayı", price: 110 },
      { name: "Ada Çayı", price: 110 },
      { name: "Kuşburnu", price: 110 },
      { name: "Oralet", price: 40 },
    ],
  },
  {
    name: "Sıcak İçecekler (Kahve/Diğer)",
    items: [
      { name: "Filtre Kahve", price: 130 },
      { name: "Sıcak Çikolata", price: 110 },
      { name: "Salep", price: 110 },
      { name: "Menengiç Kahvesi", price: 90 },
      { name: "Osmanlı Kahvesi", price: 80 },
      { name: "Damlasakızlı Türk Kahvesi", price: 75 },
      { name: "Sütlü Türk Kahvesi", price: 90 },
      { name: "Türk Kahvesi", price: 70 },
      { name: "Sütlü Nescafe", price: 95 },
      { name: "Sade Nescafe", price: 70 },
      { name: "Üçü Bir Arada", price: 55 },
      { name: "Süt", price: 50 },
    ],
  },
  {
    name: "Soğuk İçecekler (Gazlı İçecekler)",
    items: [
      { name: "Şişe Kola", price: 65 },
      { name: "Kutu Kola", price: 65 },
      { name: "Zero Kola", price: 65 },
      { name: "Light Kola", price: 65 },
      { name: "Sprite", price: 65 },
      { name: "Şişe Fanta", price: 45 },
      { name: "Kutu Fanta", price: 50 },
    ],
  },
  {
    name: "Soğuk İçecekler (Meyve Suyu/Soda/Diğer)",
    items: [
      { name: "Sıkma Portakal Suyu", price: 110 },
      { name: "SIKMA Portakal Suyu", price: 120 },
      { name: "Limonata", price: 110 },
      { name: "Ice Tea", price: 65 },
      { name: "Vişne Meyve Suyu", price: 65 },
      { name: "Şeftali Meyve Suyu", price: 65 },
      { name: "Karışık Meyve Suyu", price: 65 },
      { name: "Mango Ananas Soda", price: 45 },
      { name: "Elmalı Soda", price: 45 },
      { name: "Limonlu Soda", price: 45 },
      { name: "Sade Soda", price: 40 },
      { name: "Churchill", price: 60 },
      { name: "Sodalı Ayran", price: 45 },
      { name: "Sürahi Ayran", price: 150 },
      { name: "Paket Ayran", price: 35 },
      { name: "Yayık Ayran", price: 35 },
      { name: "Şalgam", price: 40 },
      { name: "Su", price: 20 },
    ],
  },
];

async function main() {
  await prisma.menuItem.deleteMany();
  await prisma.category.deleteMany();

  for (const [index, category] of categories.entries()) {
    await prisma.category.create({
      data: {
        name: category.name,
        description: null,
        sortOrder: index * 10,
        isVisible: true,
        items: {
          create: category.items.map((item) => ({
            name: item.name,
            price: item.price,
            description: null,
            isAvailable: true,
            featured: false,
          })),
        },
      },
    });
  }

  console.log("Menü başarıyla yüklendi.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

