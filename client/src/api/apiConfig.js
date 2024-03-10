const tmdbApiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "a519c50b9a0eae18c82d68b4e8c6297e",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

const serverApiConfig = {
  baseUrl: "http://localhost:5050/",
};
const cohereApiConfig = {
  key: "LdeT9mh4F5ittdNe0NxPbglTvU8LAQvDrnZyYYW7",
};

const omdbApiConfig = {
  key: "a50c5dee",
};
export { tmdbApiConfig, serverApiConfig, cohereApiConfig, omdbApiConfig };
