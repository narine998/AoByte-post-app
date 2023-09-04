import Cookies from "js-cookie";

import { MONTH_NAMES } from "../constants";

export const createFormattedDate = (dateString, onlyDate = false) => {
  const dateObject = new Date(dateString);
  const year = dateObject.getFullYear();
  const monthName = MONTH_NAMES[dateObject.getMonth()];
  const day = dateObject.getDate();

  if (onlyDate) {
    return `${day}-${monthName}-${year}`;
  }

  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();

  return `${day} ${monthName} ${hours}:${minutes}`;
};

export function stringAvatar(name) {
  return {
    sx: {
      bgcolor: "#334063",
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export const handleRefreshToken = () => {
  const refreshToken = Cookies.get("refreshToken");
  localStorage.setItem("refreshToken", refreshToken);
  Cookies.remove("refreshToken");
};

export const sendRefresh = (err, func) => {
  if (err.response.data.error === "refresh") {
    const refreshToken = localStorage.getItem("refreshToken");
    Cookies.set("refreshToken", refreshToken, { expires: 40 / (60 * 60 * 24) });

    return func();
  }
};
