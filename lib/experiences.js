// Platoon Tours "Experiences" — day trips and cultural / nature outings that
// sit beside the safari packages. Add a new experience by appending an object
// to this array and dropping its photos in /public/images/experiences/
// as <slug>-1.jpg, <slug>-2.jpg … (list them in `images`).

const experiences = [
  {
    slug: 'lake-eyasi',
    name: 'Lake Eyasi',
    title: 'Hadzabe Hunters & Datoga Blacksmiths',
    tag: 'Culture',
    tagline: 'Spend a morning with people who still live the way humanity once did.',
    blurb:
      'Below the Rift Valley escarpment, join the Hadzabe — one of the world’s last hunter-gatherer communities — on a real bush walk at dawn, then watch Datoga blacksmiths forge arrowheads by hand. Unscripted, respectful, unforgettable.',
    facts: [
      { k: 'Duration', v: 'Full day · 8–10 hrs' },
      { k: 'From Arusha', v: '3–4 hrs drive' },
      { k: 'Best for', v: 'Culture & photography' },
    ],
    highlights: [
      'Track small game with Hadzabe hunters',
      'Fire-making and bow crafting, the old way',
      'Datoga blacksmiths at the forge',
      'Lunch in the shade of acacia trees',
    ],
    plan: [
      { t: '05:00', d: 'Early departure' },
      { t: '07:00', d: 'Morning with the Hadzabe' },
      { t: '10:30', d: 'Datoga settlement' },
      { t: '12:30', d: 'Lunch by the lake' },
      { t: '14:00', d: 'Drive back' },
    ],
    includes: 'Transport, English-speaking guide, Hadzabe interpreter, community fees, packed lunch & water.',
    note: 'Real life, not a show — hunts and sightings can’t be guaranteed. Always ask before photographing people.',
    images: [
      { src: '/images/experiences/lake-eyasi-1.jpg', alt: 'Two Hadzabe women foraging across the dry bush near Lake Eyasi' },
      { src: '/images/experiences/lake-eyasi-2.jpg', alt: 'Hadzabe hunters resting among the rocks at Lake Eyasi' },
    ],
  },
  {
    slug: 'arusha-town-tour',
    name: 'Arusha Town',
    title: 'One Day, the Real Arusha',
    tag: 'City',
    tagline: 'From the Clock Tower to the Maasai Market — on foot, by car, or both.',
    blurb:
      'Skip the hotel restaurant and meet the town the way locals live it: coffee at a corner counter, the old colonial boma, buzzing markets, and a sunset viewpoint to finish. Easy on the budget, rich in character.',
    facts: [
      { k: 'Duration', v: 'Full day' },
      { k: 'Getting around', v: 'Walk, drive or both' },
      { k: 'Best for', v: 'First-timers & budget travellers' },
    ],
    highlights: [
      'The Old Town loop and the famous Clock Tower',
      'Natural History Museum inside the German boma',
      'Maasai Market and the Central Market (Soko Kuu)',
      'Cultural Heritage Centre and a sunset viewpoint',
    ],
    plan: [
      { t: '08:30', d: 'Local breakfast' },
      { t: '09:15', d: 'Old Town loop' },
      { t: '11:00', d: 'Museum at the Old Boma' },
      { t: '14:00', d: 'Markets' },
      { t: '18:30', d: 'Sunset viewpoint' },
    ],
    includes: 'Flexible — we shape it around your pace, your budget and how much you want to walk.',
    note: 'Bring small bills for the markets, and a few words of Swahili — asante goes a long way.',
    images: [
      { src: '/images/experiences/arusha-town-1.jpg', alt: 'A fruit seller slicing watermelon at a banana stall in Arusha' },
      { src: '/images/experiences/arusha-town-2.jpg', alt: 'Aerial view of a colourful Arusha market' },
      { src: '/images/experiences/arusha-town-3.jpg', alt: 'A woman roasting maize on a street corner in Arusha' },
    ],
  },
  {
    slug: 'lake-duluti',
    name: 'Lake Duluti',
    title: 'Crater Lake Canoe & Forest Walk',
    tag: 'Nature',
    tagline: 'Twenty minutes from Arusha, a world without engines.',
    blurb:
      'Walk the forested rim of a volcanic crater lake, spotting kingfishers and colobus monkeys, then glide across still water in a canoe. A gentle half-day that leaves your afternoon free.',
    facts: [
      { k: 'Duration', v: 'Half day · 4–5 hrs' },
      { k: 'From Arusha', v: '14 km · 20 min' },
      { k: 'Wildlife', v: '140+ bird species' },
    ],
    highlights: [
      'Guided walk beneath the forest canopy',
      'Motor-free canoeing on the crater lake',
      'Giant kingfishers, fish eagles, monkeys',
      'Optional coffee tour or pottery add-on',
    ],
    plan: [
      { t: '08:00', d: 'Hotel pickup' },
      { t: '09:00', d: 'Forest rim walk' },
      { t: '10:30', d: 'Canoeing' },
      { t: '11:30', d: 'Lakeside break' },
      { t: '12:30', d: 'Back in Arusha' },
    ],
    includes: 'Hotel pickup and drop-off, reserve fees, guide, canoe, paddles, life jackets and water.',
    note: 'Bring binoculars if you have them — the birdlife is the star.',
    images: [
      { src: '/images/experiences/lake-duluti-1.jpg', alt: 'A long canoe full of paddlers on a calm lake under dark tree branches' },
      { src: '/images/experiences/lake-duluti-2.jpg', alt: 'A small boat gliding past green forest on a still lake' },
      { src: '/images/experiences/lake-duluti-3.jpg', alt: 'Two rowers silhouetted on a calm lake at sunset' },
    ],
  },
  {
    slug: 'kikuletwa-hot-springs',
    name: 'Kikuletwa',
    title: 'Hot Springs, a Turquoise Oasis',
    tag: 'Adventure',
    tagline: 'A turquoise pool hidden in the dry savanna — float, swing, do nothing.',
    blurb:
      'Between Arusha and Moshi, spring-fed water the colour of a gemstone sits under fig and palm trees. Warm, clear and blissfully unhurried — the perfect reset before or after a safari or a Kilimanjaro trek.',
    facts: [
      { k: 'Duration', v: 'Half to full day' },
      { k: 'From Arusha', v: '1.5–2 hrs drive' },
      { k: 'Best for', v: 'Swimmers, couples & families' },
    ],
    highlights: [
      'Swim in crystal-clear, naturally warm water',
      'Rope swing into the deep spring',
      'Float on an inner tube under the palms',
      'Picnic lunch in the shade',
    ],
    plan: [
      { t: '08:00', d: 'Hotel pickup' },
      { t: '10:00', d: 'Swim & float' },
      { t: '12:30', d: 'Lunch break' },
      { t: '13:30', d: 'Relax under the trees' },
      { t: '15:00', d: 'Return' },
    ],
    includes: 'Pickup and drop-off, transport, entrance fees, guide and water. Lunch varies — ask when booking.',
    note: 'Bring swimwear, a towel and water shoes. Tubes are available to rent on site.',
    images: [
      { src: '/images/experiences/kikuletwa-hot-springs-1.jpg', alt: 'Two travellers floating on inner tubes in the turquoise Kikuletwa spring' },
      { src: '/images/experiences/kikuletwa-hot-springs-2.jpg', alt: 'Clear turquoise water under palms at Kikuletwa Hot Springs' },
    ],
  },
  {
    slug: 'materuni-waterfall-coffee',
    name: 'Materuni',
    title: 'Waterfall Hike & Coffee Tour',
    tag: 'Culture & Nature',
    tagline: 'An 80-metre waterfall, then bean-to-cup coffee with a Chagga family.',
    blurb:
      'Hike through rainforest and banana farms on Kilimanjaro’s foothills to a thundering waterfall, then roast and pound your own coffee over an open fire with a local family — and sit down to a traditional Chagga lunch.',
    facts: [
      { k: 'Duration', v: 'Half day' },
      { k: 'From Arusha', v: '2–2.5 hrs drive' },
      { k: 'Hike', v: '45–60 min each way' },
    ],
    highlights: [
      'Trek through rainforest and coffee plantations',
      'Swim in the plunge pool below the falls',
      'Roast and hand-pound coffee, then taste it',
      'Traditional Chagga lunch in the village',
    ],
    plan: [
      { t: '08:00', d: 'Depart Arusha or Moshi' },
      { t: '09:15', d: 'Hike to the waterfall' },
      { t: '10:15', d: 'At the falls' },
      { t: '11:30', d: 'Coffee tour' },
      { t: '12:30', d: 'Chagga lunch' },
    ],
    includes: 'Hotel pickup and drop-off, guides, waterfall entry, coffee tour and tasting, lunch and water.',
    note: 'Wear sturdy shoes — the trail can be muddy. June to October gives the firmest paths.',
    images: [
      { src: '/images/experiences/materuni-1.jpg', alt: 'A coffee farmer among ripe red coffee cherries' },
      { src: '/images/experiences/materuni-2.jpg', alt: 'A hiker looking up at Materuni Waterfall' },
      { src: '/images/experiences/materuni-3.jpg', alt: 'A woman carrying bananas on her head along a path through the farms' },
    ],
  },
  {
    slug: 'lake-natron',
    name: 'Lake Natron',
    title: 'Flamingos & the Mountain of God',
    tag: 'Adventure',
    tagline: 'A blood-red soda lake beneath a sacred volcano — raw, remote, unforgettable.',
    blurb:
      'In the far northern Rift Valley, millions of lesser flamingos breed on a caustic, otherworldly lake beneath Ol Doinyo Lengai, the Maasai’s “Mountain of God”. Walk the shore with a Maasai guide, cool off at a hidden waterfall and stand where humans walked 120,000 years ago.',
    facts: [
      { k: 'Duration', v: '2 days recommended' },
      { k: 'From Arusha', v: '4–5 hrs, rough road' },
      { k: 'Best for', v: 'Adventurers & photographers' },
    ],
    highlights: [
      'Flamingos along the shoreline with a Maasai guide',
      'Hike to the cool Ngare Sero waterfall',
      '120,000-year-old human footprints in volcanic ash',
      'Optional night climb of Ol Doinyo Lengai (2,962 m)',
    ],
    plan: [
      { t: 'Day 1', d: 'Drive from Arusha' },
      { t: 'Day 1', d: 'Flamingos & shore walk' },
      { t: 'Day 2', d: 'Ngare Sero waterfall' },
      { t: 'Day 2', d: 'Footprints & Maasai visit' },
      { t: 'Optional', d: 'Midnight Lengai climb' },
    ],
    includes: 'A local Maasai guide (required for lakeshore walks). We arrange the logistics around your route.',
    note: 'Never swim or wade in the lake — it is caustic and very hot. Swim only at the waterfall. Best June–October.',
    images: [
      { src: '/images/experiences/lake-natron-1.jpg', alt: 'A traveller soaking in a warm stream beside Lake Natron with Ol Doinyo Lengai rising behind' },
      { src: '/images/experiences/lake-natron-3.jpg', alt: 'Inside the grey crater of Ol Doinyo Lengai, the Mountain of God' },
      { src: '/images/experiences/lake-natron-4.jpg', alt: 'Aerial view of the Ol Doinyo Lengai crater with its cones of white and brown ash' },
      { src: '/images/experiences/lake-natron-2.jpg', alt: 'Flamingos feeding in the shallows of Lake Natron' },
    ],
  },
  {
    slug: 'bush-dinners',
    name: 'Bush Dinners',
    title: 'Dinner in the Open Wild',
    tag: 'Safari add-on',
    tagline: 'Sundowners, a campfire and a table set in the wild — far from the main camp.',
    blurb:
      'A bush dinner is a meal served in the open wild, away from the lodge. Tables, chairs, lanterns and a full kitchen are carried to a scenic clearing, riverbank or rocky outcrop, where sundowners round a campfire lead into a multi-course meal prepared over charcoal or served from a bush kitchen.',
    facts: [
      { k: 'Where', v: 'Serengeti, Tarangire, Manyara, Ngorongoro' },
      { k: 'When', v: 'From sunset into the evening' },
      { k: 'Setting', v: 'Clearing, riverbank or rocky outcrop' },
    ],
    highlights: [
      'Tables, lanterns and a full bush kitchen set up for you',
      'Sundowners around a campfire as the sun sets',
      'Multi-course meal or generous buffet, with vegetarian options',
      'Maasai song, dance or theatre at some properties',
    ],
    plan: [
      { t: 'Sunset', d: 'Arrive at the site' },
      { t: 'Dusk', d: 'Sundowners by the fire' },
      { t: 'Dinner', d: 'Multi-course or buffet' },
      { t: 'Where offered', d: 'Song & dance' },
      { t: 'All evening', d: 'Staff service' },
    ],
    includes: 'Full dinner setup at a scenic bush location, sundowners and campfire, a multi-course meal or buffet with vegetarian options, staff service and entertainment where offered.',
    note: 'Availability depends on the camp or lodge you book — we work only with properties that can arrange it properly. Not included: bush dinner fees (where charged separately), premium wines and champagne, private vehicle transfers if required, gratuities.',
    images: [
      { src: '/images/experiences/bush-dinner-1.jpg', alt: 'Guests and a guide sharing a bush meal at a blue-clothed table beside a safari vehicle' },
      { src: '/images/experiences/bush-dinner-2.jpg', alt: 'Guests in folding chairs watching the sun set over the savannah with a bush breakfast laid out' },
    ],
  },
  {
    slug: 'night-game-drives',
    name: 'Night Game Drives',
    title: 'After Dark in Tarangire & Lake Manyara',
    tag: 'Safari add-on',
    tagline: 'An open vehicle, a spotlight and the animals you never see by day.',
    blurb:
      'Night game drives on the Northern Circuit are available only in Tarangire and Lake Manyara. Open-sided vehicles with a spotlight move slowly through the dark, guided by tracks, alarm calls and movement rather than a fixed route.',
    facts: [
      { k: 'Where', v: 'Tarangire & Lake Manyara only' },
      { k: 'Departs', v: 'Around 18:00' },
      { k: 'Length', v: '2–3 hours' },
    ],
    highlights: [
      'Lion, leopard and hyena on the move in Tarangire',
      'Genet, bush baby and porcupine after dark',
      'Civet and hippos grazing at Lake Manyara',
      'Open vehicle, spotlight, and a trained guide and spotter',
    ],
    plan: [
      { t: 'Evening', d: 'Depart around 18:00' },
      { t: '2–3 hrs', d: 'Slow spotlight drive' },
      { t: 'Armed ranger', d: 'Where required' },
      { t: 'No flash', d: 'Photography rule' },
      { t: 'Bring', d: 'Warm clothing' },
    ],
    includes: 'Night drive with a trained guide and spotter, open vehicle with spotlight, and an armed ranger where required.',
    note: 'Night driving is not permitted in Serengeti National Park or the Ngorongoro Conservation Area. Not included: night drive permit fees (where applicable), camp-specific activity charges, warm clothing and personal items, gratuities.',
    images: [
      { src: '/images/experiences/night-drives-1.jpg', alt: 'A male lion lit by a spotlight at night, looking into the camera' },
      { src: '/images/experiences/night-drives-2.jpg', alt: 'A leopard walking through tall grass in the beam of a spotlight' },
    ],
  },
  {
    slug: 'photography-safari',
    name: 'Photography Safari',
    title: 'Capture the Wild: Tarangire, Serengeti & Ngorongoro',
    tag: 'Photography',
    tagline: 'A 7-day safari built around patience, positioning and the right light.',
    blurb:
      'This is not a standard game drive. Our guides are trained to anticipate animal behaviour and position the vehicle for the best angle, away from the crowds, with early-morning and late-afternoon drives planned for soft light and active wildlife. A private 4×4 Land Cruiser with a pop-up roof gives you the stability and elevation every frame needs.',
    facts: [
      { k: 'Duration', v: '7 days' },
      { k: 'Parks', v: 'Tarangire, Serengeti, Ngorongoro' },
      { k: 'From', v: '$2,490 per person' },
    ],
    highlights: [
      'Ancient baobabs and elephant portraits at Tarangire',
      'Golden-hour drives in the Seronera Valley, home to resident leopards and lions',
      'A full Serengeti day for predators, vast herds and dramatic skies',
      'The Ngorongoro Crater floor — dense wildlife and the best place to spot the endangered Black Rhino',
    ],
    plan: [
      { t: 'Day 1', d: 'Arrive & brief in Arusha' },
      { t: 'Day 2', d: 'Tarangire elephants & baobabs' },
      { t: 'Days 3–4', d: 'Serengeti plains & predators' },
      { t: 'Day 5', d: 'Ngorongoro Crater' },
      { t: 'Days 6–7', d: 'Highland drive & departure' },
    ],
    includes: 'Private 4×4 Land Cruiser with pop-up roof, professional English-speaking driver-guide experienced in photographic positioning, all national park and conservation fees, accommodation per the itinerary (camping or lodges), meals as indicated, bottled drinking water in the vehicle, government taxes and levies.',
    note: 'From $2,490 per person, based on 2 sharing in low season (April–May) with camping or standard lodges. Shoulder season (Nov–March) is excellent for dramatic skies, with calving in Jan–Feb, at moderate prices; peak season (June–Oct) suits the Great Migration river crossings, with mid-range lodges from $4,000+ per person. Not included: international flights and Tanzania visa, travel and medical insurance (mandatory), guide tips (recommended $15–$25 per person per day), alcoholic and premium drinks, the optional hot air balloon safari, personal photography equipment. Contact us for a precise quote for your dates.',
    images: [
      { src: '/images/experiences/photography-safari-1.jpg', alt: 'Two photographers with long lenses shooting from the roof-open seats of a safari vehicle' },
      { src: '/images/experiences/photography-safari-2.jpg', alt: 'An African fish eagle lifting off from a dead branch against a soft grey sky' },
      { src: '/images/experiences/photography-safari-3.jpg', alt: 'A photographer in a safari hat aiming a long lens from a muddy Land Cruiser' },
    ],
  },
];

export default experiences;
