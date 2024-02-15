import { ToastMessage } from "@/components/Toast";
import { createContext } from "react";

const ToastContext = createContext({
    toast: (params: ToastMessage) => Promise.resolve(),
});

export default ToastContext