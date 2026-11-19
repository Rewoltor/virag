// Manhattan neighborhood delivery pages. Facts kept to what's stable: ZIPs, building types, typical recipients.

export interface Neighborhood {
  slug: string;
  name: string;
  zips: string[];
  intro: string; // answer-first, 1–2 sentences
  buildings: string; // what delivery is like there
  places: string[]; // well-known landmarks / institutions to help orient
  tips: string[];
}

export const NEIGHBORHOODS: Neighborhood[] = [
  {
    slug: "upper-east-side",
    name: "Upper East Side",
    zips: ["10021", "10028", "10065", "10075", "10128"],
    intro: "Same-day and next-day flower delivery anywhere on the Upper East Side, from 59th to 96th Street between Fifth Avenue and the East River.",
    buildings: "Mostly doorman buildings and prewar co-ops, plus brownstones on the side streets. Doormen accept and hold flowers, so delivery is reliable.",
    places: ["The Met and Museum Mile", "Lenox Hill Hospital", "NewYork-Presbyterian/Weill Cornell", "Carl Schurz Park"],
    tips: ["Give the apartment number even in doorman buildings — large co-ops have several entrances.", "For hospital deliveries, include patient name and room number."],
  },
  {
    slug: "upper-west-side",
    name: "Upper West Side",
    zips: ["10023", "10024", "10025", "10069"],
    intro: "Flower delivery across the Upper West Side, from Lincoln Center up to Morningside Heights, between Central Park West and Riverside Drive.",
    buildings: "A mix of large doorman buildings on the avenues and walk-up brownstones on the side streets.",
    places: ["Lincoln Center", "American Museum of Natural History", "Riverside Park", "Columbia University (to the north)"],
    tips: ["Walk-ups: include the buzzer name; the courier will call the recipient's phone.", "Lincoln Center performers: deliver to home or the stage door only if they've confirmed it accepts flowers."],
  },
  {
    slug: "midtown",
    name: "Midtown",
    zips: ["10017", "10018", "10019", "10020", "10022", "10036"],
    intro: "Office and apartment flower delivery in Midtown Manhattan — Times Square, Rockefeller Center, Grand Central and the Theater District.",
    buildings: "Office towers with central reception or mailrooms, hotels, and high-rise apartments. Office deliveries go through the lobby desk.",
    places: ["Rockefeller Center", "Grand Central Terminal", "Times Square and the Theater District", "Bryant Park"],
    tips: ["Office delivery: company name, floor and reception hours are essential; many towers stop accepting after 17:00.", "Hotels: guest name exactly as on the reservation and the check-in date."],
  },
  {
    slug: "chelsea",
    name: "Chelsea",
    zips: ["10001", "10011"],
    intro: "Flower delivery in Chelsea, from the High Line and Hudson Yards to Sixth Avenue, 14th to 34th Street.",
    buildings: "New doorman towers near the High Line and Hudson Yards, older walk-ups and lofts elsewhere, plus many offices and galleries.",
    places: ["The High Line", "Chelsea Market", "Hudson Yards", "Chelsea gallery district"],
    tips: ["Galleries and studios: confirm someone is there during delivery hours.", "Hudson Yards towers: use the residential lobby, not the retail entrance."],
  },
  {
    slug: "west-village-greenwich-village",
    name: "West Village & Greenwich Village",
    zips: ["10014", "10012", "10011"],
    intro: "Flower delivery in the West Village and Greenwich Village — winding streets, townhouses and some of Manhattan's most romantic addresses.",
    buildings: "Mostly walk-ups and townhouses without doormen. A phone number is essential so the courier can reach the recipient.",
    places: ["Washington Square Park", "NYU", "Bleecker Street", "Hudson River Park"],
    tips: ["No doorman? Choose a time when she's likely home, or deliver to her office.", "Street numbering here is irregular — double-check the address and cross street."],
  },
  {
    slug: "east-village-lower-east-side",
    name: "East Village & Lower East Side",
    zips: ["10003", "10009", "10002"],
    intro: "Flower delivery in the East Village and Lower East Side, from Union Square down to Delancey Street.",
    buildings: "Mostly walk-up tenements with buzzers, and newer doorman buildings near Houston and Delancey.",
    places: ["Tompkins Square Park", "St. Marks Place", "Union Square", "Essex Market"],
    tips: ["Walk-ups: buzzer name + phone number prevent failed deliveries.", "If she works from a café or studio, deliver to her home instead."],
  },
  {
    slug: "soho-tribeca",
    name: "SoHo & Tribeca",
    zips: ["10012", "10013", "10007"],
    intro: "Flower delivery in SoHo and Tribeca — lofts, boutiques and quiet cobblestone streets below Houston.",
    buildings: "Converted lofts (some with keyed elevators and no doorman), luxury doorman buildings in Tribeca, and many studios and showrooms.",
    places: ["Hudson Square", "Tribeca Park", "SoHo cast-iron district", "City Hall Park (nearby)"],
    tips: ["Lofts with keyed elevators: the recipient must come down — add her phone.", "Showrooms and studios: give company name and opening hours."],
  },
  {
    slug: "financial-district-battery-park-city",
    name: "Financial District & Battery Park City",
    zips: ["10004", "10005", "10006", "10038", "10280", "10282"],
    intro: "Office and home flower delivery in the Financial District and Battery Park City, at the southern tip of Manhattan.",
    buildings: "Office towers with strict lobby security, and large residential doorman buildings in Battery Park City and converted FiDi towers.",
    places: ["Wall Street", "World Trade Center / Brookfield Place", "Battery Park", "South Street Seaport"],
    tips: ["Office towers: security may require the recipient to come down to the lobby — include her mobile.", "Battery Park City: residential doormen accept deliveries."],
  },
  {
    slug: "murray-hill-kips-bay-gramercy",
    name: "Murray Hill, Kips Bay & Gramercy",
    zips: ["10016", "10010", "10003"],
    intro: "Flower delivery in Murray Hill, Kips Bay, Gramercy and the Flatiron area, from 14th to 40th Street on the East Side.",
    buildings: "Many doorman rentals popular with young professionals, prewar walk-ups, and hospitals along First Avenue.",
    places: ["Gramercy Park", "Flatiron Building and Madison Square Park", "NYU Langone Health", "Bellevue Hospital"],
    tips: ["Hospital deliveries: call the unit first — ICUs and some floors don't accept fresh flowers.", "Doorman rentals: the front desk holds flowers; tell her to ask."],
  },
  {
    slug: "harlem",
    name: "Harlem",
    zips: ["10026", "10027", "10030", "10037", "10039", "10029", "10035"],
    intro: "Flower delivery in Harlem and East Harlem, from 96th to 155th Street.",
    buildings: "Brownstones, walk-ups and newer doorman buildings, plus large hospitals in East Harlem.",
    places: ["Apollo Theater", "Marcus Garvey Park", "Mount Sinai Hospital", "City College"],
    tips: ["Brownstones: include which floor or unit and a phone number.", "Mount Sinai: patient name, room and unit; call ahead for ICU or oncology."],
  },
  {
    slug: "washington-heights-inwood",
    name: "Washington Heights & Inwood",
    zips: ["10032", "10033", "10040", "10034"],
    intro: "Flower delivery to Washington Heights and Inwood in northern Manhattan.",
    buildings: "Large prewar apartment buildings, many without doormen, and the Columbia medical campus.",
    places: ["NewYork-Presbyterian/Columbia University Irving Medical Center", "Fort Tryon Park and The Cloisters", "Inwood Hill Park"],
    tips: ["Large buildings without doormen: apartment number and phone are essential.", "Hospital deliveries: include unit and room number."],
  },
  {
    slug: "roosevelt-island",
    name: "Roosevelt Island",
    zips: ["10044"],
    intro: "Flower delivery to Roosevelt Island — part of Manhattan, and inside our delivery area.",
    buildings: "Mostly large residential buildings with front desks, plus the Cornell Tech campus.",
    places: ["Cornell Tech", "Four Freedoms Park", "Roosevelt Island Tramway"],
    tips: ["Give the building name and apartment number.", "Next-day delivery is the safest choice for the island."],
  },
];

export const neighborhoodBySlug = (slug: string) => NEIGHBORHOODS.find((n) => n.slug === slug);
