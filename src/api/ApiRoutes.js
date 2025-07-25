import { poster, requester } from "./Requester";

export const get = {

  };
  
  export const post = {
    requester: (data) => poster("auth/register/", data),
    login: (data) => poster("auth/login/", data),
  };
  