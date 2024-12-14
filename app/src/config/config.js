export const config = {
    API_BASE_URL: "http://localhost:3030/api",
    API_AUTH_URL: "http://localhost:3030/auth",
    CLIENT_URL: "http://localhost:5173",
}

export const buildApiUrl = (path) => `${config.API_BASE_URL}${path}`;

export const buildAuthUrl = (path) => `${config.API_AUTH_URL}${path}`;