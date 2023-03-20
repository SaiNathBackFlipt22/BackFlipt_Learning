import { configureStore } from "@reduxjs/toolkit";
import globalSetter from "./components/reducers/globalStates";

export default configureStore({
    reducer: { globalStates: globalSetter },
});