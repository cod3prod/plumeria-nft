import { MetaMaskInpageProvider } from "@metamask/providers";
import { store } from "./store";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }

  // Redux
  type RootState = ReturnType<typeof  store.getState>;
  type AppDispatch = typeof store.dispatch;
}
