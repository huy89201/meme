import userService from "../service/userService";

export const ACT_GET_USER_BY_ID = "GET_USER_BY_ID";
export const ACT_GET_CURRENT_USER = "ACT_GET_CURRENT_USER";
export const ACT_LOG_OUT = "ACT_LOG_OUT";
export const ACT_SET_TOKEN = "ACT_SET_TOKEN";
export const ACT_SET_ID = "ACT_SET_ID";

export function getUserById(user) {
  return {
    type: ACT_GET_USER_BY_ID,
    payload: { user: user },
  };
}

export function getUserByIdAsync(userId) {
  return async (dispatch) => {
    try {
      const res = await userService.getUserById(userId);
      const user = res.data.user;

      dispatch(getUserById(user));
      return { ok: true };
    } catch (error) {
      console.log(error);
    }
  };
}

export function registerAsync({ email, fullname, password, repassword }) {
  return async () => {
    try {
      await userService.register({
        email,
        fullname,
        password,
        repassword,
      });

      return { ok: true };
    } catch (error) {
      return {
        ok: false,
        error: error,
      };
    }
  };
}

export function getCurrentUser(user) {
  return {
    type: ACT_GET_CURRENT_USER,
    payload: {
      user: user,
    },
  };
}

export function getCurrentUserAsync(id) {
  return async (dispatch) => {
    try {
      const res = await userService.getUserById(id);
      const user = res.data.user;

      dispatch(getCurrentUser(user));
      return { ok: true}
    } catch (error) {}
  };
}

export function setToken(token) {
  return {
    type: ACT_SET_TOKEN,
    payload: {
      token: token,
    },
  };
}

export function setId(id) {
  return {
    type: ACT_SET_ID,
    payload: {
      id: id,
    },
  };
}

export function loginAsync({ email, password }) {
  return async (dispatch) => {
    try {
      const res = await userService.login({ email, password });
      const token = res.data.token;
      const userId = res.data.user.USERID;

      localStorage.setItem("token", token);
      localStorage.setItem("id", userId);

      dispatch(getCurrentUserAsync(userId));
      dispatch(setId(userId));
      dispatch(setToken(token));
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: error,
      };
    }
  };
}

export function updateInfo(formData) {
  return async () => {
    try {
      await userService.updateInfo(formData);

      return { ok: true };
    } catch (error) {
      return error;
    }
  };
}

export function logOut() {
  localStorage.removeItem("token");
  localStorage.removeItem("id");
  return {
    type: ACT_LOG_OUT,
    payload: {},
  };
}

export function changePassword({oldPassword, newPassword,reNewPassword}){
  return async () => {
    try {
      const res = await userService.changePassword({oldPassword, newPassword,reNewPassword});
      return { 
        ok : true,
        message : res.data.message
       }
    } catch (error) {
      return{ error: "Mật khẩu cũ không đúng"}
    }
  }
}