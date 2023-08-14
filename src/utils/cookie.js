import Cookies from 'js-cookie';

export function setCookie (key, value) {
    Cookies.set(key, value, { secure: true, sameSite: 'strict' });
};

export function getCookie (key) {
    return Cookies.get(key);
};

export function removeCookie (key){
    Cookies.remove(key);
};