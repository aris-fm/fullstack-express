import { refreshToken } from "@/apis/auth";

export interface RefreshTokenResponse {
  accessToken: string;
  status: boolean;
}

type FetchInterceptorOptions = {
  onRequest?: (url: string, options: RequestInit) => void;
  onResponse?: (response: Response) => void;
  onError?: (error: Error) => void;
  refreshToken?: () => Promise<RefreshTokenResponse>;
};

export const interceptedFetch = async (
  url: RequestInfo | URL,
  init?: RequestInit,
  options: FetchInterceptorOptions = {},
) => {
  // Call the onRequest callback if defined
  const modifiedInit: RequestInit = {
    ...init,
    credentials: "include",
    headers: {
      ...init?.headers,
    },
  };

  const updatedOptions = { ...options, refreshToken };

  try {
    const response = await fetch(url, modifiedInit);

    // If we receive a 401 response, try to refresh the token
    if (response.status === 401 && updatedOptions.refreshToken) {
      // Attempt to refresh the token
      const { accessToken } = await updatedOptions.refreshToken();

      // If the token is refreshed successfully, retry the original request
      if (accessToken) {
        // Update the Authorization header or any required fields
        const updatedInit = {
          ...modifiedInit,
          headers: {
            ...modifiedInit?.headers,
            Authorization: `Bearer ${accessToken}`, // Assuming Bearer token
          },
        };

        // Retry the original fetch request with the new token
        const retryResponse = await fetch(url, updatedInit);
        updatedOptions.onResponse?.(retryResponse); // Call the onResponse callback
        return retryResponse; // Return the retried response
      }
    }

    // Call the onResponse callback if defined
    updatedOptions.onResponse?.(response);

    // Ensure the response is returned
    return response;
  } catch (error) {
    // Call the onError callback if defined
    updatedOptions.onError?.(error as Error);
    throw error; // Rethrow the error for further handling
  }
};
