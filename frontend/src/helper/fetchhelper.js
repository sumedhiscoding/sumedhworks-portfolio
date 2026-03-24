export async function fetchBlogs(ENDPOINT) {
  try {
    const request = await fetch(ENDPOINT);
    if (!request.ok) {
      return null;
    }
    return await request.json();
  } catch (error) {
    console.error("fetchBlogs failed:", error);
    return null;
  }
}

export async function fetchProjects(ENDPOINT) {
  try {
    const request = await fetch(ENDPOINT);
    if (!request.ok) {
      return null;
    }
    return await request.json();
  } catch (error) {
    console.error("fetchProjects failed:", error);
    return null;
  }
}
