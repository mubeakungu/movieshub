import type { Metadata } from "next";
import FreeCard from "@/components/FreeCard";
import { FREE_MOVIES } from "@/lib/free";

export const metadata: Metadata = { title: "Watch Free · Reel" };

export default function Free() {
  return (
    <div className="page">
      <h1 className="page-title">Watch Free</h1>
      <p className="muted" style={{ marginTop: -8, marginBottom: 24 }}>
        Full-length classics and open movies you can watch right here, free and legal. Public domain and Creative
        Commons films, streamed from the Internet Archive.
      </p>
      <div className="grid">
        {FREE_MOVIES.map((m) => (
          <FreeCard key={m.id} movie={m} />
        ))}
      </div>
    </div>
  );
}
