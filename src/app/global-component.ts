export const GlobalComponent = {
  // Api Calling
  API_URL: "https://api.kindmedia.vn/",
  // API_URL : 'https://localhost:44347/',
  headerToken: { Authorization: `Bearer ${localStorage.getItem("token")}` },

  // Auth Api
  AUTH_API: "https://api.kindmedia.vn/",
  // AUTH_API:"https://localhost:44347/",
};
