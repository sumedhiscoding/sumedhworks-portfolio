const raw =
  import.meta.env.VITE_STRAPI_BASE_URL ?? "http://localhost:1337";
const base = String(raw).replace(/\/$/, "");

export const config = {
  STRAPI_BACKEND_BASEURL: base,
};

export const endpoints = {
  /** Newest first; populate=* includes dynamic zone blocks for excerpts */
  GET_ALL_BLOGS: "/api/articles?populate=*&sort=publishedAt:desc",
  GET_ALL_PROJECTS: "/api/projects?populate=*",
};

export const apiendpoints = {
  GET_ALL_BLOGS_API: config.STRAPI_BACKEND_BASEURL + endpoints.GET_ALL_BLOGS,
  GET_ALL_PROJECTS_API:
    config.STRAPI_BACKEND_BASEURL + endpoints.GET_ALL_PROJECTS,
};
