export const API_URL =
  !process.env.NODE_ENV || process.env.NODE_ENV
    ? "http://localhost:1337"
    : "https://teklinco-project-manager.herokuapp.com";
