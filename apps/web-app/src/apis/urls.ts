export const baseApiUrl = `${import.meta.env.VITE_API_URL}`;
export const apiUrl = {
  login: `${baseApiUrl}/login`,
  logout: `${baseApiUrl}/logout`,
  register: `${baseApiUrl}/register`,
  token: `${baseApiUrl}/token`,
  users: `${baseApiUrl}/users`,
};
