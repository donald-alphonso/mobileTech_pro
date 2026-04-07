/*
  # Insertion de produits d'exemple

  1. Données d'exemple
    - Produits variés avec toutes les informations nécessaires
    - Images depuis Pexels
    - Différentes catégories et marques
    - Produits en vedette et en promotion
*/

INSERT INTO products (
  name, brand, price, original_price, description, features, specifications, 
  images, category, in_stock, rating, reviews_count, slug, is_featured, is_promotion
) VALUES
(
  'iPhone 15 Pro Max 256GB',
  'Apple',
  1299.00,
  1399.00,
  'Le nouveau iPhone 15 Pro Max offre des performances exceptionnelles avec la puce A17 Pro, un appareil photo révolutionnaire et un design en titane premium.',
  '["Écran Super Retina XDR 6,7\"", "Puce A17 Pro ultra-rapide", "Système photo Pro 48 Mpx", "Autonomie toute la journée", "Résistant à l''eau IP68", "USB-C avec Thunderbolt 3"]'::jsonb,
  '{"Écran": "6,7\" Super Retina XDR OLED", "Processeur": "Puce A17 Pro", "Stockage": "256 Go", "Appareil photo": "48 Mpx + 12 Mpx + 12 Mpx", "Batterie": "Jusqu''à 29h de lecture vidéo", "Couleurs": "Titane naturel, Bleu, Blanc, Noir"}'::jsonb,
  '["https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg", "https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg"]'::jsonb,
  'smartphones',
  true,
  4.8,
  156,
  'iphone-15-pro-max',
  true,
  true
),
(
  'Samsung Galaxy S24 Ultra',
  'Samsung',
  1179.00,
  NULL,
  'Le Galaxy S24 Ultra redéfinit l''excellence mobile avec son écran Dynamic AMOLED 2X, son S Pen intégré et ses capacités IA avancées.',
  '["Écran Dynamic AMOLED 2X 6,8\"", "Processeur Snapdragon 8 Gen 3", "S Pen intégré", "Appareil photo 200 Mpx", "Batterie 5000 mAh", "Résistant IP68"]'::jsonb,
  '{"Écran": "6,8\" Dynamic AMOLED 2X", "Processeur": "Snapdragon 8 Gen 3", "Stockage": "256 Go", "Appareil photo": "200 Mpx + 50 Mpx + 12 Mpx + 10 Mpx", "Batterie": "5000 mAh", "S Pen": "Intégré"}'::jsonb,
  '["https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg"]'::jsonb,
  'smartphones',
  true,
  4.7,
  89,
  'galaxy-s24-ultra',
  true,
  false
),
(
  'AirPods Pro (3ème génération)',
  'Apple',
  279.00,
  329.00,
  'Les AirPods Pro de 3ème génération offrent une qualité audio exceptionnelle avec réduction de bruit active et audio spatial personnalisé.',
  '["Réduction de bruit active", "Audio spatial personnalisé", "Autonomie 30h avec boîtier", "Résistant à l''eau IPX4", "Puce H2", "Contrôles tactiles"]'::jsonb,
  '{"Autonomie": "6h + 24h avec boîtier", "Connectivité": "Bluetooth 5.3", "Résistance": "IPX4", "Puce": "Apple H2", "Réduction de bruit": "Active", "Compatibilité": "iPhone, iPad, Mac"}'::jsonb,
  '["https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg"]'::jsonb,
  'ecouteurs',
  true,
  4.9,
  234,
  'airpods-pro-3',
  true,
  true
),
(
  'Huawei P60 Pro',
  'Huawei',
  899.00,
  NULL,
  'Le Huawei P60 Pro excelle en photographie avec son système Leica et offre des performances premium pour tous vos besoins.',
  '["Appareil photo Leica", "Écran OLED 6,67\"", "Charge rapide 88W", "Batterie 4815 mAh", "Processeur Snapdragon 8+ Gen 1", "HarmonyOS 3.1"]'::jsonb,
  '{"Écran": "6,67\" OLED 120Hz", "Processeur": "Snapdragon 8+ Gen 1", "Stockage": "256 Go", "Appareil photo": "48 Mpx + 13 Mpx + 48 Mpx", "Batterie": "4815 mAh", "OS": "HarmonyOS 3.1"}'::jsonb,
  '["https://images.pexels.com/photos/163117/phone-cell-phone-mobile-phone-163117.jpeg"]'::jsonb,
  'smartphones',
  false,
  4.6,
  67,
  'huawei-p60-pro',
  false,
  false
),
(
  'Coque iPhone 15 Pro MagSafe',
  'Apple',
  59.00,
  NULL,
  'Coque officielle Apple avec technologie MagSafe pour une protection optimale et une compatibilité parfaite.',
  '["Compatible MagSafe", "Protection renforcée", "Matériaux premium", "Accès facile aux ports", "Design élégant", "Garantie Apple"]'::jsonb,
  '{"Compatibilité": "iPhone 15 Pro", "Matériau": "Silicone premium", "MagSafe": "Compatible", "Couleurs": "Noir, Blanc, Bleu, Rose", "Protection": "Chocs et rayures", "Marque": "Apple officiel"}'::jsonb,
  '["https://images.pexels.com/photos/1440722/pexels-photo-1440722.jpeg"]'::jsonb,
  'coques',
  true,
  4.5,
  43,
  'coque-iphone-15-pro',
  false,
  false
),
(
  'Chargeur Rapide USB-C 30W',
  'Anker',
  29.00,
  39.00,
  'Chargeur rapide Anker 30W avec technologie PowerIQ 3.0 pour une charge optimisée de tous vos appareils.',
  '["Charge rapide 30W", "Technologie PowerIQ 3.0", "Compatible USB-C", "Compact et portable", "Protection multi-niveaux", "Garantie 18 mois"]'::jsonb,
  '{"Puissance": "30W", "Connecteur": "USB-C", "Technologie": "PowerIQ 3.0", "Compatibilité": "iPhone, iPad, Android", "Dimensions": "4.1 × 2.8 × 1.1 cm", "Poids": "34g"}'::jsonb,
  '["https://images.pexels.com/photos/4526414/pexels-photo-4526414.jpeg"]'::jsonb,
  'chargeurs',
  true,
  4.4,
  78,
  'chargeur-usb-c-30w',
  false,
  true
)
ON CONFLICT (slug) DO NOTHING;