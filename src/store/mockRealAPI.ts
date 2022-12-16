export const mockRealAPI = async ({
  url,
  fetchObjProps,
}: {
  url: string;
  fetchObjProps: any;
}): Promise<any> => {
  const response = await fetch(url, fetchObjProps);
  if (!response.ok) {
    throw new Error(`Error fetching data to the endpoint ${url}`);
  }
  return response.json();
};
