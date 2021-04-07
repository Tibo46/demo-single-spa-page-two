import axios from 'axios';

let loadedAuth = null;
const load = async () => {
  if (!loadedAuth) {
    loadedAuth = await System.import('@insurwave/auth').then((value) =>
      value.security()
    );
  }
};

const getAccessToken = async () => {
  await load();

  return await loadedAuth.getAccessToken()({
    audience: 'https://api.iwnonprod.com',
    scope: 'read:current_user update:current_user_metadata',
  });
};

export interface ErrorResponse extends Error {
  info?: string;
  status?: number;
}

// SWR
export const makeFetchRequest = async (url: string) =>
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      const e: ErrorResponse = new Error(
        'An error occurred while fetching the data.'
      );
      e.info = error.response.data;
      e.status = error.response.status;
      throw e;
    });
