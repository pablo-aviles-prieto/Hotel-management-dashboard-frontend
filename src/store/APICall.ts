import { IResponseError } from '../interfaces/error';

interface IErrorObj {
  error: IResponseError;
}

export const APICall = async ({
  url,
  fetchObjProps,
}: {
  url: URL;
  fetchObjProps: RequestInit;
}): Promise<Response> => {
  const response = await fetch(url, fetchObjProps);
  if (!response.ok) {
    const { error }: IErrorObj = await response.json();
    throw new Error(error.message);
  }
  return response;
};
