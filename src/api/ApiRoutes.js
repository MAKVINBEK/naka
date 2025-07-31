import { poster, requester } from "./Requester";

export const get = {
  personalInfo: () => requester("auth/personal-info/"),
};

export const post = {
  requester: (data) => poster("auth/register/", data),
  confirm_phone_code: (data) => poster("auth/profile/confirm-phone-code/", data),
  login: (data) => poster("auth/login/", data),
  confirmCode: (data) => poster("auth/confirm-code/", data),
  verify: (data) => poster("auth/2fa/verify/", data),

};
