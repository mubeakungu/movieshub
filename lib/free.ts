/**
 * Full-length films that are legal to stream: US public domain or Creative Commons.
 * Files are served by the Internet Archive (archive.org). Only add titles whose
 * rights status is clear; uploads on archive.org are not automatically public domain.
 */
export type FreeMovie = {
  id: string; // archive.org identifier
  file: string; // MP4 filename inside the item
  title: string;
  year: number;
  runtime: number; // minutes
  overview: string;
  license: string;
};

export const FREE_MOVIES: FreeMovie[] = [
  { id: "sprite-fright-2021", file: "Sprite Fright (2021).mp4", title: "Sprite Fright", year: 2021, runtime: 10, license: "CC BY 4.0 · Blender Studio", overview: "A group of rowdy teenagers on a trip to the forest run into some tiny, very unfriendly woodland creatures. Blender Studio's horror-comedy short." },
  { id: "agent-327-operation-barbershop", file: "Agent 327 Operation Barbershop.ia.mp4", title: "Agent 327: Operation Barbershop", year: 2017, runtime: 4, license: "CC BY-ND 4.0 · Blender Studio", overview: "Secret agent 327 goes undercover at a barbershop that hides a deadly secret. A teaser for the Agent 327 animated feature." },
  { id: "cosmos-laundromat", file: "Cosmos Laundromat.mp4", title: "Cosmos Laundromat", year: 2015, runtime: 12, license: "CC BY 4.0 · Blender Institute", overview: "On a desolate island, a suicidal sheep named Franck meets a mysterious salesman who offers him the gift of a lifetime." },
  { id: "NightOfTheLivingDead1968-Restored", file: "Notld1968Restoration-desktop.mp4", title: "Night of the Living Dead", year: 1968, runtime: 96, license: "Public domain", overview: "Strangers barricade themselves in a farmhouse as the dead rise and close in. George A. Romero's horror landmark." },
  { id: "charade_202604", file: "Charade.ia.mp4", title: "Charade", year: 1963, runtime: 113, license: "Public domain", overview: "Cary Grant and Audrey Hepburn in a romantic thriller about a widow pursued across Paris for a fortune she never knew existed." },
  { id: "his_girl_friday", file: "his_girl_friday.mp4", title: "His Girl Friday", year: 1940, runtime: 92, license: "Public domain", overview: "A fast-talking newspaper editor schemes to stop his star reporter, and ex-wife, from leaving the paper. Cary Grant and Rosalind Russell." },
  { id: "The_General_Buster_Keaton", file: "The_General.mp4", title: "The General", year: 1926, runtime: 78, license: "Public domain", overview: "Buster Keaton's silent comedy classic: a Southern engineer chases the Union spies who stole his beloved locomotive." },
  { id: "the-kid-1921_202609", file: "The Kid 1921.ia.mp4", title: "The Kid", year: 1921, runtime: 68, license: "Public domain", overview: "Charlie Chaplin's Tramp takes in an abandoned baby and raises him on the streets. Chaplin's first feature." },
  { id: "sherlock-jr.-1924", file: "Sherlock Jr.1924.mp4", title: "Sherlock Jr.", year: 1924, runtime: 45, license: "Public domain", overview: "A projectionist who dreams of being a detective walks right into the movie he is showing. Buster Keaton." },
  { id: "Detour", file: "Detour.mp4", title: "Detour", year: 1945, runtime: 68, license: "Public domain", overview: "A hitchhiking pianist's luck turns deadly on the road to Los Angeles. A cult film noir." },
  { id: "CarnivalofSouls", file: "CarnivalOfSouls.mp4", title: "Carnival of Souls", year: 1962, runtime: 78, license: "Public domain", overview: "After surviving a car accident, a church organist is drawn to an abandoned pavilion and haunted by a pale stranger." },
  { id: "The_Little_Shop_of_Horrors_60", file: "The_Little_Shop_of_Horrors_60.mp4", title: "The Little Shop of Horrors", year: 1960, runtime: 72, license: "Public domain", overview: "A clumsy florist's assistant raises a plant with a taste for human blood. Roger Corman's dark comedy, with a young Jack Nicholson." },
  { id: "plan-9-from-outer-space", file: "plan-9-from-outer-space.mp4", title: "Plan 9 from Outer Space", year: 1959, runtime: 79, license: "Public domain", overview: "Aliens raise the dead to stop humanity from building a doomsday weapon. Ed Wood's famously bad cult favorite." },
  { id: "Sintel", file: "sintel-2048-stereo.mp4", title: "Sintel", year: 2010, runtime: 15, license: "CC BY 3.0 · Blender Foundation", overview: "A lone girl searches for the baby dragon she once rescued. An animated short from the Blender open movie project." },
  { id: "Tears-of-Steel", file: "tears_of_steel_1080p.mp4", title: "Tears of Steel", year: 2012, runtime: 12, license: "CC BY 3.0 · Blender Foundation", overview: "Scientists in a ruined Amsterdam try to rewrite a broken past to save the world from robots. A Blender open movie." },
];

export const freeVideoUrl = (m: FreeMovie) => `https://archive.org/download/${m.id}/${encodeURIComponent(m.file)}`;
export const freePosterUrl = (m: FreeMovie) => `https://archive.org/services/img/${m.id}`;
export const freeSourceUrl = (m: FreeMovie) => `https://archive.org/details/${m.id}`;
export const findFreeMovie = (id: string) => FREE_MOVIES.find((m) => m.id === id);
