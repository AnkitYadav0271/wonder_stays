const sampleListings = [
  {
    title: "Cozy Cottage with Mountain Views in Shimla",
    description: "A peaceful retreat nestled in the hills of Shimla, perfect for couples and solo travelers.",
    image: "",
    price: 2200,
    location: "Shimla, Himachal Pradesh",
    country: "India"
  },
  {
    title: "Luxury Beachfront Villa in Goa",
    description: "Wake up to the sound of waves in this stunning villa with private beach access.",
    image: "https://unsplash.com/photos/beach-villa",
    price: 5400,
    location: "Goa",
    country: "India"
  },
  {
    title: "Urban Studio Apartment in Bangalore",
    description: "Modern studio with high-speed WiFi, ideal for business travelers.",
    image: "",
    price: 1800,
    location: "Bangalore, Karnataka",
    country: "India"
  },
  {
    title: "Treehouse Stay in Wayanad",
    description: "Live among the trees in this eco-friendly treehouse with nature trails.",
    image: "",
    price: 3500,
    location: "Wayanad, Kerala",
    country: "India"
  },
  {
    title: "Heritage Haveli in Jaipur",
    description: "Experience royal living in this restored haveli with cultural tours.",
    image: "",
    price: 4000,
    location: "Jaipur, Rajasthan",
    country: "India"
  },
  {
    title: "Lakeview Retreat in Nainital",
    description: "Enjoy serene lake views and cozy interiors in this hillside retreat.",
    image: "",
    price: 2700,
    location: "Nainital, Uttarakhand",
    country: "India"
  },
  {
    title: "Minimalist Studio in Mumbai",
    description: "Compact and stylish studio near city center, perfect for solo stays.",
    image: "",
    price: 2100,
    location: "Mumbai, Maharashtra",
    country: "India"
  },
  {
    title: "Desert Camp in Jaisalmer",
    description: "Stay under the stars in this desert camp with camel safaris and bonfires.",
    image: "",
    price: 3200,
    location: "Jaisalmer, Rajasthan",
    country: "India"
  },
  {
    title: "Hilltop Bungalow in Ooty",
    description: "Charming bungalow with garden and fireplace, overlooking the Nilgiris.",
    image: "",
    price: 3000,
    location: "Ooty, Tamil Nadu",
    country: "India"
  },
  {
    title: "Riverside Cabin in Rishikesh",
    description: "Peaceful cabin by the river with yoga deck and meditation space.",
    image: "",
    price: 2500,
    location: "Rishikesh, Uttarakhand",
    country: "India"
  },
  {
    title: "Penthouse Suite in Delhi",
    description: "Luxury penthouse with panoramic city views and private terrace.",
    image: "",
    price: 6000,
    location: "Delhi",
    country: "India"
  },
  {
    title: "Farmstay Escape in Punjab",
    description: "Experience rural life with organic meals and tractor rides.",
    image: "",
    price: 1800,
    location: "Ludhiana, Punjab",
    country: "India"
  },
  {
    title: "Snow Cabin in Manali",
    description: "Warm cabin with snow views and heated interiors, ideal for winter getaways.",
    image: "",
    price: 3300,
    location: "Manali, Himachal Pradesh",
    country: "India"
  },
  {
    title: "Boho Apartment in Pune",
    description: "Artistic apartment with cozy vibes and modern amenities.",
    image: "",
    price: 1900,
    location: "Pune, Maharashtra",
    country: "India"
  },
  {
    title: "Jungle Lodge in Jim Corbett",
    description: "Wildlife lodge with safari access and bonfire nights.",
    image: "",
    price: 2800,
    location: "Jim Corbett, Uttarakhand",
    country: "India"
  },
  {
    title: "Art Deco Flat in Kolkata",
    description: "Vintage-style flat with modern comforts near cultural hotspots.",
    image: "",
    price: 2000,
    location: "Kolkata, West Bengal",
    country: "India"
  },
  {
    title: "Mountain Hut in Leh",
    description: "Remote hut with breathtaking views of the Himalayas.",
    image: "",
    price: 3500,
    location: "Leh, Ladakh",
    country: "India"
  },
  {
    title: "Palace Stay in Udaipur",
    description: "Live like royalty in this lakeside palace with spa and cultural events.",
    image: "",
    price: 7500,
    location: "Udaipur, Rajasthan",
    country: "India"
  },
  {
    title: "Budget Hostel in Chennai",
    description: "Affordable hostel with shared kitchen and lockers for backpackers.",
    image: "",
    price: 800,
    location: "Chennai, Tamil Nadu",
    country: "India"
  },
  {
    title: "Eco Bamboo Home in Meghalaya",
    description: "Sustainable bamboo home with rainforest views and fresh air.",
    image: "",
    price: 2600,
    location: "Shillong, Meghalaya",
    country: "India"
  },
  {
    title: "Studio Loft in Hyderabad",
    description: "Compact loft with kitchenette and smart workspace.",
    image: "",
    price: 1700,
    location: "Hyderabad, Telangana",
    country: "India"
  },
  {
    title: "Floating Houseboat in Alleppey",
    description: "Traditional houseboat with meals and backwater cruise.",
    image: "",
    price: 4200,
    location: "Alleppey, Kerala",
    country: "India"
  },
  {
    title: "Countryside Villa in MP",
    description: "Spacious villa with garden and pet-friendly amenities.",
    image: "",
    price: 2400,
    location: "Indore, Madhya Pradesh",
    country: "India"
  },
  {
    title: "Modern Flat in Noida",
    description: "Clean and modern flat with elevator and high-speed WiFi.",
    image: "",
    price: 2000,
    location: "Noida, Uttar Pradesh",
    country: "India"
  },
  {
    title: "Rustic Homestay in Darjeeling",
    description: "Homely stay with tea garden views and warm hospitality.",
    image: "",
    price: 2300,
    location: "Darjeeling, West Bengal",
    country: "India"
  },
  {
    title: "Luxury Tent in Pushkar",
    description: "Glamorous tent stay with cultural shows and local cuisine.",
    image: "",
    price: 3100,
    location: "Pushkar, Rajasthan",
    country: "India"
  },
  {
    title: "City Center Studio in Ahmedabad",
    description: "Convenient studio near markets and transport hubs.",
    image: "",
    price: 1900,
    location: "Ahmedabad, Gujarat",
    country: "India"
  },
  {
    title: "Hill Retreat in Mussoorie",
    description: "Elegant retreat with valley views and peaceful ambiance.",
    image: "",
    price: 2800,
    location: "Mussoorie, Uttarakhand",
    country: "India"
  },
  {
    title: "Backwater Villa in Kochi",
    description: "Villa with private dock and sunset views over the backwaters.",
    image: "",
    price: 3600,
    location: "Kochi, Kerala",
    country: "India"
  },
  {
    title: "Forest Cabin in Chikmagalur",
    description: "Cabin surrounded by coffee plantations and forest trails.",
    image: "",
    price: 2900,
    location: "Chikmagalur, Karnataka",
    country: "India"
  }
];

module.exports = {data:sampleListings};