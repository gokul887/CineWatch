import React, { useEffect, useState } from "react";
import { CohereClient } from "cohere-ai";
import { cohereApiConfig, omdbApiConfig } from "../api/apiConfig";
import { omdbApi } from "../api/omdb/omdbApi";
const MediaSummary = ({ imdb }) => {
  const [mediaSummary, setMediaSummary] = useState(null);
  const cohere = new CohereClient({
    token: cohereApiConfig.key,
  });
  useEffect(() => {
    const getMediaSummary = async () => {
      const omdbData = await omdbApi
        .getOmdbData(imdb)
        .then((res2) => JSON.stringify({ Poster: undefined, ...res2.data }));
      (async () => {
        const summarize = await cohere.summarize({
          text: omdbData,
          length: "short",
          format: "bullets",
          additionalCommand:
            "of unique insights in a maximum of three sentences",
        });

        setMediaSummary(summarize?.summary);
      })();
    };
    getMediaSummary();
  }, [imdb]);
  return (
    <div className="cohere-summary">
      {mediaSummary ?? "Fetching summary ..."}
    </div>
  );
};

export default MediaSummary;
