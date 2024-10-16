export const baseApiUrl = `${import.meta.env.VITE_API_URL}`;
export const apiUrl = {
  login: `${baseApiUrl}/auth/login`,
  logout: `${baseApiUrl}/auth/logout`,
  token: `${baseApiUrl}/auth/token`,
  users: `${baseApiUrl}/users`,
};
