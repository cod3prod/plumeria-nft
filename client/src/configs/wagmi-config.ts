import {
    http,
    createConfig,
    injected,
    cookieStorage,
    createStorage,
  } from "wagmi";
  import { mainnet, sepolia } from "wagmi/chains";
  import { metaMask, safe, walletConnect } from "wagmi/connectors";
  
  // declare module 'wagmi' {
  //   interface Register {
  //     config: typeof getConfig
  //   }
  // }
  
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
  
  
  export function getConfig() {
    if (!projectId) throw new Error("NEXT_PUBLIC_PROJECT_ID is not defined");
  
    return createConfig({
      chains: [mainnet, sepolia],
      ssr: true,
      storage: createStorage({
        storage: cookieStorage,
      }),
      connectors: [injected(), walletConnect({ projectId }), metaMask(), safe()],
      transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
      },
    });
  }
  