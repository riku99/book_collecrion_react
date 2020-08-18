import axios from "axios";

const localhost = "http://localhost:4000";

export const getCurrentUser = async () => {
  const response = await axios(`${localhost}/api/v1/checkLogin`, {
    withCredentials: true,
  });
  return response;
};

export const createLogin = async (params: {
  user: {
    username: string;
    password: string;
    password_confirmation: string;
  };
}) => {
  const response = await axios.post(`${localhost}/api/v1/login`, params, {
    withCredentials: true,
  });

  if (response.status !== 200) {
    throw new Error("エラーが発生しました");
  }

  if (response.data.failer) {
    throw new Error(response.data.failer);
  }

  if (response.data.current_user) {
    return response.data;
  }
};

export const doLogout = async () => {
  await axios.delete(`${localhost}/api/v1/logout`, { withCredentials: true });
};
