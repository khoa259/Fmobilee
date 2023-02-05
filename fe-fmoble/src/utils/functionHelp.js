import { KEY_ADDRESS } from "./contants";

export const getAddressSesstionStorage = sessionStorage.getItem(KEY_ADDRESS);
export const setAddressSesstionStorage = (values) => {
  sessionStorage.setItem(KEY_ADDRESS, JSON.stringify(values));
};
export const removeAddressLocalStorage = localStorage.removeItem(KEY_ADDRESS);
