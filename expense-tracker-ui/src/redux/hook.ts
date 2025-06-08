import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

// Typed version of useDispatch for better IntelliSense
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Typed version of useSelector for better IntelliSense
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
