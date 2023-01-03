export const APICall = async ({
  url,
  fetchObjProps,
}: {
  url: URL;
  fetchObjProps: RequestInit;
}): Promise<Response> => {
  const response = await fetch(url, fetchObjProps);
  if (!response.ok) {
    throw new Error(`Error fetching data to the endpoint ${url}`);
  }
  return response;
};
