export const USE_MOCK = import.meta.env.VITE_USE_MOCK_API !== 'false'; // mock is ON until you switch it off
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:53172';
export const CURRENCY = import.meta.env.VITE_CURRENCY || 'EUR';
export const USE_STEAM_LOGIN = import.meta.env.VITE_STEAM_LOGIN === 'true'; // off until backend has /api/auth/
export const MANUAL_LOGIN = USE_MOCK || !USE_STEAM_LOGIN;