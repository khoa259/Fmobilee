import { KEY_ADDRESS } from "./contants";

export const getAddressLocalStorage = localStorage.getItem(KEY_ADDRESS);
export const setAddressLocalStorage = (values) => {
  JSON.stringify(localStorage.setItem(KEY_ADDRESS, JSON.stringify(values)));
};
export const removeAddressLocalStorage = localStorage.removeItem(KEY_ADDRESS);
