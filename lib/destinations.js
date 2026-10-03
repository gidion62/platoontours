// Destinations content — ported verbatim from platoon-frontend-preview.html.
// Rendered by the Horizontal Track Switch + Image Reveal engine
// (components/destinations/DestinationsPage.jsx) — DO NOT swap this back to
// a static grid/editorial layout; the pinned horizontal-scroll mechanic here
// was an explicit, repeated design requirement.
const destinations = [
  {
    slug: 'serengeti',
    name: 'Serengeti National Park',
    tagline: 'Land of Endless Plains',
    grad: ['#7a6a2f', '#241d0e'],
    intro:
      "Nearly 14,750 km² of savannah stretching to the horizon, the Serengeti is the stage for the largest animal migration on Earth — a UNESCO World Heritage Site and one of Africa's most celebrated safari destinations.",
    subs: [
      { h: 'The Great Migration', p: 'Over 1.5 million wildebeest, alongside hundreds of thousands of zebra and gazelle, move across the park each year — a journey that includes the dramatic Mara River crossings, crocodiles waiting below.' },
      { h: 'Big Cat Country', p: 'Lions, leopards, and cheetahs thrive here alongside large elephant and buffalo herds, and over 500 bird species.' },
      { h: 'Best Time to Visit', p: 'Calving in the south December–March, Grumeti crossings in the west June–July, Mara crossings in the north July–October, strong game viewing centrally year-round.' },
    ],
  },
  {
    slug: 'ngorongoro',
    name: 'Ngorongoro Crater',
    tagline: "Africa's Eden",
    grad: ['#3d5c42', '#12201a'],
    intro:
      'Formed nearly two million years ago by a collapsing volcano, Ngorongoro is the world’s largest intact, unfilled caldera — 260 km² enclosed by walls rising over 600 meters.',
    subs: [
      { h: 'A Wildlife Paradise', p: 'Around 30,000 animals live on the crater floor year-round, including the Big Five and the endangered black rhino.' },
      { h: 'Birdlife & Culture', p: 'Flamingos gather by the thousands on Lake Magadi, while the surrounding conservation area protects the Maasai and borders Olduvai Gorge.' },
      { h: 'Best Time to Visit', p: 'Rewarding year-round, though the dry season (June–October) draws the largest concentrations of animals to its permanent water.' },
    ],
  },
  {
    slug: 'tarangire',
    name: 'Tarangire National Park',
    tagline: 'Land of Giants',
    grad: ['#6e5a35', '#241d0e'],
    intro:
      'Ancient baobabs and the largest elephant herds in northern Tanzania gather along the Tarangire River in the dry season — one of the region’s quieter, most rewarding parks.',
    subs: [
      { h: 'Elephants & Ancient Baobabs', p: 'Herds numbering in the hundreds converge on the river as the dry season tightens its grip, moving between baobabs that have stood for over a thousand years.' },
      { h: 'Beyond the Elephants', p: 'Lions, leopards, and tree-climbing pythons share the park with the fringe-eared oryx and gerenuk — species found in few other Tanzanian parks.' },
      { h: 'Best Time to Visit', p: 'The dry season (June–October) concentrates wildlife tightly along the river for the park’s signature scenes.' },
    ],
  },
  {
    slug: 'lake-manyara',
    name: 'Lake Manyara National Park',
    tagline: 'The Park of Tree-Climbing Lions',
    grad: ['#3a5a6e', '#12242c'],
    intro:
      'Set between the Rift Valley escarpment and the shimmering waters of Lake Manyara, this compact 330 km² park — two-thirds lake — packs remarkable diversity into a small footprint.',
    subs: [
      { h: 'Tree-Climbing Lions', p: 'World-famous for lions that climb into acacia trees to rest, alongside large herds of elephant, buffalo, and giraffe.' },
      { h: "A Birdwatcher's Paradise", p: 'Over 400 bird species gather here, with flamingos, pelicans, and storks turning the shoreline into a moving wall of color.' },
      { h: 'Best Time to Visit', p: 'Dry season (June–October) for game viewing; wet season (November–May) for lush scenery and birdwatching.' },
    ],
  },
  {
    slug: 'lake-natron',
    name: 'Lake Natron',
    tagline: 'The Otherworldly Lake',
    grad: ['#6e3550', '#2a1420'],
    intro:
      'A blood-red soda lake beneath the volcano the Maasai call the Mountain of God — one of the most otherworldly landscapes in East Africa.',
    subs: [
      { h: 'A Lake Like No Other', p: 'Caustic, alkaline waters turn deep red from salt-loving algae, while the shoreline crusts white with soda — a landscape that looks like another planet.' },
      { h: 'The Flamingo Capital', p: 'The single most important breeding site for lesser flamingos in East Africa, protected by the very water chemistry that keeps predators away.' },
      { h: 'Ol Doinyo Lengai', p: 'The active volcano looming over the lake erupts rare, cool black lava, and can be climbed by experienced trekkers overnight.' },
    ],
  },
  {
    slug: 'kilimanjaro',
    name: 'Mount Kilimanjaro',
    tagline: 'Roof of Africa',
    grad: ['#4a4a4a', '#161616'],
    intro:
      "Rising to 5,895 meters, Kilimanjaro is Africa's highest peak and the world's tallest free-standing mountain — climbable without technical experience, just determination.",
    subs: [
      { h: 'Choosing a Route', p: 'Marangu suits first-timers with hut accommodation; Machame has the strongest success rates; Lemosho and Rongai offer quieter alternatives. Every climb crosses five climate zones in 5–9 days.' },
      { h: 'Beyond the Summit', p: 'Elephant, buffalo, and colobus monkey roam the lower forests, while day hikes and Chagga cultural tours give non-climbers a taste of the mountain too.' },
      { h: 'Best Time to Visit', p: 'January–March and June–October bring the clearest skies and most stable climbing conditions.' },
    ],
  },
];

export default destinations;
