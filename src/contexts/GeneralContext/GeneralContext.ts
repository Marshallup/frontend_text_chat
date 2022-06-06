import { createContext } from "react";
import { GeneralContextInterface } from "./interfaces";

const GeneralContext = createContext<GeneralContextInterface>({
    notifications: [],
    showNotification: () => {},
});

export default GeneralContext;