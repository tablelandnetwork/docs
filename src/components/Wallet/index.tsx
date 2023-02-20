import React from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import clsx from "clsx";
import styles from "./styles.module.css";

export function getWalletAddress(): string | undefined {
  const { address, isConnected } = useAccount();
  // Get the user's connected wallet address.
  if (isConnected) {
    return address;
  }
}

export const Address = (): JSX.Element => {
  const address = getWalletAddress();
  // Return the user's connected wallet, or some default value (e.g., this is
  // the second Hardhat wallet address).
  return address ? (
    <>{address}</>
  ) : (
    <>0x70997970C51812dc3A010C7d01b50e0d17dc79C8</>
  );
};

export default function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  if (isConnected)
    return (
      <button
        className={clsx(
          "button button--primary padding-left--none padding-right--none margin-left--md",
          styles.profileBtn
        )}
        onClick={() => disconnect()}
      >
        {address?.slice(0, 4) +
          "..." +
          address?.slice(address.length - 2, address.length)}
      </button>
    );
  return (
    <button
      className={clsx(
        "button button--primary padding-left--none padding-right--none margin-left--md",
        styles.profileBtn
      )}
      onClick={() => connect()}
    >
      Connect
    </button>
  );
}
