import api from "./api";

const userService = {
  getUserById(userId) {
    return api.get("/member/member.php", {
      params: {
        userid: userId,
      },
    });
  },
  login({ email, password } = {}) {
    return api.post("/member/login.php", {
      email: email,
      password: password,
    });
  },
  register({ email, fullname, password, repassword } = {}) {
    return api.post("/member/register.php", {
      email: email,
      fullname: fullname,
      password: password,
      repassword: repassword,
    });
  },
  updateInfo(formData) {
    return api.post("/member/update.php", formData);
  },
  getMemberList({ pagesize = 4, currpage = 1 } = {}) {
    return api.get("/member/getListPaging.php", {
      params: {
        pagesize: pagesize,
        currpage: currpage,
      },
    });
  },
  changePassword({oldPassword, newPassword,reNewPassword}={}) {
    return api.post("/member/password.php", {
      oldPassword: oldPassword,
      newPassword: newPassword,
      reNewPassword: reNewPassword,
    })
  }
};

export default userService;
