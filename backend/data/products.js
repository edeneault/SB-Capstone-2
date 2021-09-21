const products = [
  {
    rating: 5,
    numReviews: 1,
    price: 39.99,
    countInStock: 0,
    name: "Lavazza - Super Crema Espresso",
    image:
      "https://res.cloudinary.com/edeneault-cloudinary/image/upload/v1630783859/eShop/jqfbb27ruehuw9cpvwsp.jpg",
    description: "2kG Bag - Coffee Beans - Delicious Crema ",
    brand: "Lavazza",
    category: "espresso",
  },
  {
    rating: 5,
    numReviews: 1,
    price: 9.99,
    countInStock: 100,
    name: "Lavazza - Espresso - Medium Roast",
    image:
      "https://res.cloudinary.com/edeneault-cloudinary/image/upload/v1630783263/eShop/sqiwu5ummm4y1to3cp5o.jpg",
    description: "Lavazza - 2.2 lbs (1kg) Whole Bean - Medium Roast",
    brand: "Lavazza",
    category: "espresso",
  },
  {
    rating: 5,
    numReviews: 1,
    price: 14.99,
    countInStock: 0,
    name: "Illy - Espresso 100% Arabica",
    image:
      "https://res.cloudinary.com/edeneault-cloudinary/image/upload/v1630782951/eShop/whsbs3qytgxaw2sk8alm.jpg",
    description: "ESPRESSO - Roasted Coffee Beans",
    brand: "illy",
    category: "espresso",
  },
  {
    rating: 4,
    numReviews: 2,
    price: 11.99,
    countInStock: 10,
    name: "Damesi - Organic Espresso Italiano",
    image:
      "https://res.cloudinary.com/edeneault-cloudinary/image/upload/v1630784005/eShop/n7vc4qbhavt7gsjadkm7.jpg",
    description: "Medium Roast Espresso - 1 Bag",
    brand: "Damesi",
    category: "espresso",
  },
  {
    rating: 4.5,
    numReviews: 2,
    price: 799.99,
    countInStock: 9,
    name: "Bremille - Barista Express - Red",
    image:
      "https://res.cloudinary.com/edeneault-cloudinary/image/upload/v1630782239/eShop/tz9ndkjukkrwdneon2fi.jpg",
    description:
      " Barista quality performance with a new intuitive interface that provides all the information you need to create cafe quality coffee at home. The built in grinder delivers the right amount of ground coffee. With a 3 second heat up time and precise espresso extraction.",
    brand: "Bremille",
    category: "barista",
  },
  {
    rating: 4,
    numReviews: 12,
    price: 1499.99,
    countInStock: 6,
    name: "Bremille - Barista Pro",
    image:
      "https://res.cloudinary.com/edeneault-cloudinary/image/upload/v1630782152/eShop/sfpm0zpmddeuarcaofxj.jpg",
    description:
      "Barista-quality performance with a new intuitive interface that provides all the information you need to create third wave specialty coffee at home. The built-in grinder delivers the right amount of ground coffee on demand, for full flavour. With a 3 second heat up time and precise espresso extraction, you go from bean to cup, faster than ever before.",
    brand: "Bremille",
    category: "barista",
  },
  {
    rating: 4,
    numReviews: 1,
    price: 19.99,
    countInStock: 3,
    name: "Hario Pour Over Coffee Driper",
    image:
      "https://res.cloudinary.com/edeneault-cloudinary/image/upload/v1630811854/eShop/yoenhal08bjjfqzif2a1.jpg",
    category: "accessories",
    brand: "Hario",
    description:
      "The V60 is designed for manual, pour-over style coffee brewing. This coffee dripper brews one to three cups at a time and works well with V60 size 02 paper or cloth filters. Making pour-over coffee is a very hands-on job, allowing you, the user, to control brewing time and temperature. The ceramic body is durable and helps prevent heat loss during the brewing cycle.  Durable, ceramic body retains heat to help ensure a constant temperature throughout the brewing cycle. Cone shape helps to better accentuate coffees with floral or fruit flavor notes. Spiral ribs allows for maximum coffee expansion. Large single hole can change coffee taste according to the speed of water flow. Designed and manufactured in Japan",
  },
  {
    rating: 0,
    numReviews: 0,
    price: 85.99,
    countInStock: 3,
    name: "Slow Brew Iced Coffee Maker Glass ",
    image:
      "https://res.cloudinary.com/edeneault-cloudinary/image/upload/v1630811795/eShop/sfysbymq1thvfthikdlc.jpg",
    category: "accessories",
    brand: "LuvMuggs",
    description:
      "12oz. Good iced coffee isn't made by brewing hot coffee and adding ice, really good iced coffee is slow brewed allowing the coffee flavor to gradually steep into water. This cold brew machine uses melting ice to slow brew but your patience will be rewarded with the great tasting coffee. 100 filters are included to get you started.  Capacity: 12oz Material: Glass Includes: 100 56MM Coffee Filter Papers Estimated Delivery: Allow 3 to 5 weeks for delivery. Ice Drip",
  },
  {
    rating: 4.5,
    numReviews: 2,
    price: 8.99,
    countInStock: 15,
    name: "Blue Moon - Espresso Beans",
    image:
      "https://res.cloudinary.com/edeneault-cloudinary/image/upload/v1630923314/eShop/kjgv9cx9obl6gbvddohz.jpg",
    category: "espresso",
    brand: "BlueMoon",
    description:
      "Dark Roast Whole Bean Coffee 12 oz -Blue Moon Espresso Dark Roast Coffee is medium‑bodied and offers slightly smoky and rich chocolate flavors with a satisfying finish.",
  },
  {
    rating: 5,
    numReviews: 1,
    price: 35.99,
    countInStock: 9,
    name: "Espresso Capsules Sampler Bundle",
    image:
      "https://res.cloudinary.com/edeneault-cloudinary/image/upload/v1630786349/eShop/yt55uakwnkvkfrxck7oj.jpg",
    category: "espresso",
    brand: "Nesgresso",
    description:
      "4 Boxes of Espresso Compatible* Capsules (40 Aluminium Capsules Total)",
  },
  {
    rating: 0,
    numReviews: 0,
    price: 25,
    countInStock: 9,
    name: "Italian Coffee - Compatible pods",
    image:
      "https://res.cloudinary.com/edeneault-cloudinary/image/upload/v1630785512/eShop/gvqcgmyd7wqdxexqte1t.jpg",
    category: "espresso",
    brand: "ItalianCoffee",
    description: "Your authentic Italian Espresso, 100% made in Italy! ",
  },
  {
    rating: 0,
    numReviews: 0,
    price: 180.99,
    countInStock: 4,
    name: "DeFonghi Bar Espresso and Cappuccino Machine",
    image:
      "https://res.cloudinary.com/edeneault-cloudinary/image/upload/v1630922718/eShop/crj3g54ndo1yvtv6ipj1.jpg",
    category: "barista",
    brand: "DeFonghi",
    description: "Model:  EF155 Pre  ",
  },
];

export default products;
