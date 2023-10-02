import { useDispatch } from "react-redux";
import { setTheme } from "../reducers/appSettings";

export const changeTheme = (theme) => {
    const dispatch = useDispatch();
    dispatch(setTheme(theme));
};
