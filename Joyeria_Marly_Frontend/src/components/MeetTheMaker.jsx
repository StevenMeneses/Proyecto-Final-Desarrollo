import React from "react";

export default function MeetTheMaker() {
  const videoId = "LEeoLGUXQ8Y";

  return (
    <section className="px-6 py-12 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-center mb-4">Meet the Maker</h2>

      <div
        className="
          w-full
          max-w-4xl
          aspect-video
          rounded-xl
          overflow-hidden
          shadow-lg
        "
      >
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1`}
          title="Meet the Maker"
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  );
}
