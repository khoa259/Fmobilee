import { KEY_ADDRESS } from "./contants";

export const getAddressLocalStorage = sessionStorage.getItem(KEY_ADDRESS);
export const setAddressLocalStorage = (value) => {
  JSON.stringify(localStorage.setItem(KEY_ADDRESS, value));
};
export const removeAddressLocalStorage = localStorage.removeItem(KEY_ADDRESS);
