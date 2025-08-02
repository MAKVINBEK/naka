import { poster, requester } from "./Requester";
import { Forgot_Password } from '../components/loginpersonalprofile/Forgot_Password';

export const get = {
  personalInfo: () => requester("auth/personal-info/"),
  news: (slug) => {
    if (slug) {
      return requester(`base/news/${slug}/`);
    }
    return requester("base/news/");
  },
  faq: ()=> requester("base/faq/"),
  feedback: ()=> requester("base/feedback/"),

};

export const post = {
  requester: (data) => poster("auth/register/", data),
  confirm_phone_code: (data) => poster("auth/profile/confirm-phone-code/", data),
  request_phone_code: (data) => poster("auth/profile/request-phone-code/", data),
  login: (data) => poster("auth/login/", data),
  confirmCode: (data) => poster("auth/confirm-code/", data),
  verify: (data) => poster("auth/2fa/verify/", data),
  setPassword: (data) => poster("auth/set-password/", data),
  delete_account: (data) => poster("auth/delete-account/", data),
  verification: (data) => poster("auth/kyc-verification/", data),
  personal_info: (data) => poster("auth/personal-info/", data),
  setup: (data) => poster("auth/2fa/setup/", data),
  forgot_password: (data) => poster("auth/forgot-password/", data),
  feedback: (data) => poster("base/feedback/send/", data),
};
