export const mockRealAPI = async ({ url, fetchObjProps }) => {
  const response = await fetch(url, fetchObjProps);
  if (!response.ok) {
    throw new Error(`Error fetching data to the endpoint ${url}`);
  }
  return response.json();
};
