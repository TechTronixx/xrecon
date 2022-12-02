import { useContext } from "react";
import { Context } from "../Context/Context";

export function useContextData() {
    return useContext(Context);
}