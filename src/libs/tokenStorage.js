import { APP_SLUG } from "@/constants/app";

const TOKEN_KEY = `${APP_SLUG}.access_token`;
const USER_KEY = `${APP_SLUG}.user`;

function read(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage unavailable */
  }
}

function remove(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    /* storage unavailable */
  }
}

export const tokenStorage = {
  get: () => read(TOKEN_KEY),
  set: (token) => write(TOKEN_KEY, token),
  getUser() {
    try {
      return JSON.parse(read(USER_KEY));
    } catch {
      return null;
    }
  },
  setUser: (user) => write(USER_KEY, JSON.stringify(user)),
  clear() {
    remove(TOKEN_KEY);
    remove(USER_KEY);
  },
};
