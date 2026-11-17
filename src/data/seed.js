export const additionalSeedItems = [
  { id: 'negroni-rosso', name: 'Negroni Rosso', description: 'Gin, vermouth rosso and bitters, finished with orange.', categoryId: 'cocktails', imageUrl: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1000&q=80', price: 16, originalPrice: '', available: true, featured: true, tags: ['Gin', 'Bitter'], order: 8, updatedAt: new Date().toISOString() },
  { id: 'bitter-orange-martini', name: 'Bitter Orange Martini', description: 'A crisp martini with orange oils and a dry finish.', categoryId: 'cocktails', imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=80', price: 17, originalPrice: '', available: true, featured: false, tags: ['Martini', 'Citrus'], order: 9, updatedAt: new Date().toISOString() },
  { id: 'elderflower-spritz', name: 'Elderflower Spritz', description: 'Elderflower cordial, sparkling wine and fresh mint.', categoryId: 'cocktails', imageUrl: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=1000&q=80', price: 15, originalPrice: '', available: true, featured: false, tags: ['Sparkling', 'Floral'], order: 10, updatedAt: new Date().toISOString() },
  { id: 'islay-cask', name: 'Islay Cask 12', description: 'Peat smoke, sea air and a long, warming oak finish.', categoryId: 'whisky', imageUrl: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=1000&q=80', price: 22, originalPrice: '', available: true, featured: true, tags: ['Scotch', 'Peated'], order: 11, updatedAt: new Date().toISOString() },
  { id: 'mizunara-reserve', name: 'Mizunara Reserve', description: 'Japanese whisky with sandalwood, spice and orchard fruit.', categoryId: 'whisky', imageUrl: '', price: 28, originalPrice: '', available: true, featured: false, tags: ['Japanese', 'Oak'], order: 12, updatedAt: new Date().toISOString() },
  { id: 'estate-rose', name: 'Estate Rosé', description: 'Dry Provence rosé with wild strawberry and herbs.', categoryId: 'wine', imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1000&q=80', price: 15, originalPrice: '', available: true, featured: false, tags: ['Rosé', 'France'], order: 13, updatedAt: new Date().toISOString() },
  { id: 'blanc-de-blanc', name: 'Blanc de Blancs', description: 'Fine bubbles, green apple and a fresh mineral finish.', categoryId: 'wine', imageUrl: '', price: 21, originalPrice: '', available: true, featured: true, tags: ['Sparkling', 'Chardonnay'], order: 14, updatedAt: new Date().toISOString() },
  { id: 'truffle-fries', name: 'Truffle Parmesan Fries', description: 'Crisp fries with aged parmesan and black truffle.', categoryId: 'small-plates', imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1000&q=80', price: 11, originalPrice: '', available: true, featured: false, tags: ['Vegetarian', 'Truffle'], order: 15, updatedAt: new Date().toISOString() },
  { id: 'whipped-feta', name: 'Whipped Feta & Honey', description: 'Warm flatbread, whipped feta, honey and toasted seeds.', categoryId: 'small-plates', imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=80', price: 13, originalPrice: '', available: true, featured: true, tags: ['Vegetarian', 'Sharing'], order: 16, updatedAt: new Date().toISOString() },
  { id: 'citrus-garden', name: 'Citrus Garden', description: 'Yuzu, mandarin, rosemary and sparkling water.', categoryId: 'zero-proof', imageUrl: '', price: 9, originalPrice: '', available: true, featured: true, tags: ['Alcohol-free', 'Citrus'], order: 17, updatedAt: new Date().toISOString() },
  { id: 'pear-spice-tonic', name: 'Pear & Spice Tonic', description: 'Ripe pear, ginger, juniper and a dry tonic finish.', categoryId: 'zero-proof', imageUrl: '', price: 9, originalPrice: '', available: true, featured: false, tags: ['Alcohol-free', 'Ginger'], order: 18, updatedAt: new Date().toISOString() },
]

export const seedData = {
  profile: {
    name: 'Blue Lounge', slug: 'blue-lounge',
    description: 'A quietly captivating corner of the city. Thoughtfully poured, warmly hosted, and made for lingering.',
    logo: '',
    coverImage: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1800&q=85',
    address: '18 Mercer Street, London W1D 3JD', phone: '+44 20 7946 0820', email: 'hello@bluelounge.example',
    currency: 'GBP',
    openingHours: { Monday: '16:00 – 23:00', Tuesday: '16:00 – 23:00', Wednesday: '16:00 – 23:00', Thursday: '16:00 – 00:00', Friday: '16:00 – 01:00', Saturday: '14:00 – 01:00', Sunday: '14:00 – 22:00' },
    socials: { instagram: '', facebook: '', website: '' },
  },
  qr: { baseUrl: 'https://yourdomain.com' },
  categories: [
    { id: 'cocktails', name: 'Cocktails', description: 'House signatures and timeless classics.', imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80', active: true, order: 0 },
    { id: 'whisky', name: 'Whisky', description: 'A considered collection, neat or on the rocks.', imageUrl: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=900&q=80', active: true, order: 1 },
    { id: 'wine', name: 'Wine', description: 'Small producers and enduring favourites.', imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=900&q=80', active: true, order: 2 },
    { id: 'small-plates', name: 'Small plates', description: 'A little something for the table.', imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80', active: true, order: 3 },
    { id: 'zero-proof', name: 'Zero proof', description: 'Bright, balanced and alcohol-free.', imageUrl: '', active: true, order: 4 },
  ],
  items: [
    { id: 'velvet-hour', name: 'Velvet Hour', description: 'A softly smoky evening pour with a bright citrus finish.', categoryId: 'cocktails', imageUrl: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=1000&q=80', price: 16, originalPrice: '', available: true, featured: true, tags: ['House signature', 'Smoky'], order: 0, updatedAt: new Date().toISOString() },
    { id: 'golden-hour', name: 'Golden Hour', description: 'Gin, apricot, lemon and a delicate touch of honey.', categoryId: 'cocktails', imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=80', price: 15, originalPrice: '', available: true, featured: true, tags: ['Citrus', 'Bright'], order: 1, updatedAt: new Date().toISOString() },
    { id: 'old-fashioned', name: 'House Old Fashioned', description: 'Barrel-aged bourbon, bitters and a whisper of orange.', categoryId: 'cocktails', imageUrl: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1000&q=80', price: 17, originalPrice: '', available: true, featured: false, tags: ['Bourbon', 'Classic'], order: 2, updatedAt: new Date().toISOString() },
    { id: 'highland-18', name: 'Highland Reserve 18', description: 'Aged eighteen years in oak; honeyed fruit, warm spice and a long finish.', categoryId: 'whisky', imageUrl: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=1000&q=80', price: 24, originalPrice: '', available: true, featured: true, tags: ['Scotch', '18 year'], order: 3, updatedAt: new Date().toISOString() },
    { id: 'single-barrel', name: 'Single Barrel Rye', description: 'Peppery rye with dried cherry and toasted oak.', categoryId: 'whisky', imageUrl: '', price: 19, originalPrice: '', available: false, featured: false, tags: ['Rye'], order: 4, updatedAt: new Date().toISOString() },
    { id: 'pinot-noir', name: 'Willamette Pinot Noir', description: 'Silky red fruit, forest floor and a graceful finish.', categoryId: 'wine', imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1000&q=80', price: 18, originalPrice: '', available: true, featured: false, tags: ['Red', 'Oregon'], order: 5, updatedAt: new Date().toISOString() },
    { id: 'burrata', name: 'Burrata & Stone Fruit', description: 'Creamy burrata, ripe stone fruit, basil and grilled sourdough.', categoryId: 'small-plates', imageUrl: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=1000&q=80', price: 18, originalPrice: '', available: true, featured: true, tags: ['Vegetarian'], order: 6, updatedAt: new Date().toISOString() },
    { id: 'garden-fizz', name: 'Garden Fizz', description: 'Cucumber, elderflower, lime and sparkling water.', categoryId: 'zero-proof', imageUrl: '', price: 12, originalPrice: '', available: true, featured: false, tags: ['Alcohol-free'], order: 7, updatedAt: new Date().toISOString() },
    ...additionalSeedItems,
  ],
  activity: [
    { id: 'seed-1', label: 'Menu curated for the new season', at: new Date().toISOString(), type: 'menu' },
    { id: 'seed-2', label: 'Blue Lounge profile created', at: new Date(Date.now() - 86400000).toISOString(), type: 'profile' },
  ],
}
