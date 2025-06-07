import { useDispatch } from "react-redux";
import type { AppDispatch } from "./store"; // adjust path

export const useAppDispatch = () => useDispatch<AppDispatch>();
