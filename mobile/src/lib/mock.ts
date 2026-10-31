import type { Movie, MovieDetails, Paged } from "./tmdb";

// Sample data so the UI works before a TMDB key is configured. Titles are fictional.
const titles = [
  ["Neon Harbor", "A dockworker uncovers a smuggling ring hidden in the city's automated port."],
  ["The Last Orchard", "Three siblings return home to save the family farm through one brutal winter."],
  ["Signal Lost", "A deep-space crew receives a message from a ship that vanished 40 years ago."],
  ["Paper Kingdoms", "A forger is hired to fake the one document that could end a war."],
  ["Midnight Relay", "Four strangers race across the country to deliver a package before dawn."],
  ["Glass Mountain", "A climber attempts the summit that took her father, in the middle of a storm."],
  ["Echo Park Nights", "A struggling jazz pianist gets one shot at the gig of a lifetime."],
  ["Under Copper Skies", "A frontier town fights back against the railroad barons."],
  ["Static", "A late-night radio host starts receiving calls from the future."],
  ["Wildflower Season", "A botanist and a beekeeper clash over the meadow they both love."],
  ["Iron Tide", "An aging submarine captain takes one final, impossible mission."],
  ["Small Hours", "A night-shift nurse pieces together a mystery one patient at a time."],
];

export const mockMovies: Movie[] = titles.map(([title, overview], i) => ({
  id: i + 1,
  title,
  overview,
  poster_path: null,
  backdrop_path: null,
  release_date: `2026-${String(10 - (i % 6)).padStart(2, "0")}-${String(10 + i).padStart(2, "0")}`,
  vote_average: 6 + ((i * 7) % 30) / 10,
}));

export function mockList(page: number): Paged<Movie> {
  return { page, total_pages: 1, total_results: mockMovies.length, results: mockMovies };
}

export function mockDetails(id: number): MovieDetails | null {
  const m = mockMovies.find((x) => x.id === id);
  if (!m) return null;
  return {
    ...m,
    runtime: 95 + id * 3,
    tagline: "Sample data. Add a TMDB key to see real movies.",
    genres: [{ id: 18, name: "Drama" }, { id: 53, name: "Thriller" }],
    videos: { results: [] },
    credits: { cast: [] },
    similar: mockList(1),
    "watch/providers": { results: {} },
  };
}
