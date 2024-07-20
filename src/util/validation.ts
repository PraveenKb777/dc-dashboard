import { NavigateFunction, NavigateOptions } from "react-router-dom";
import auth from "./auth";

export const validate = async (
  navigation: NavigateFunction,
  path = "",
  options: NavigateOptions | undefined = undefined
) => {
  try {
    const res = await auth.get("/admin/validate");
    const data = await res.data;
    console.log(data);
    path && navigation(path, options);
  } catch (error) {
    navigation("/login", { replace: true });
    console.log(error);
  }
};
