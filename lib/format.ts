const IMG = "https://image.tmdb.org/t/p";
export const img = (path: string | null, size: "w92" | "w185" | "w342" | "w500" | "w780" | "w1280" | "original" = "w342") =>
  path ? `${IMG}/${size}${path}` : null;
export const year = (d?: string) => (d ? d.slice(0, 4) : "TBA");
