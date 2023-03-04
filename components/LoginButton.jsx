import React from "react";
import { useWalletConnect } from "react-native-walletconnect";
import * as Linking from "expo-linking";
import AnimatedButton from "./AnimatedButton";

export default function LoginButton() {
  const { createSession, killSession, session, setSession } =
    useWalletConnect();

  const handleLogin = async () => {
    if (!session.length) {
      await createSession();
    }
  };

  const handleLogout = async () => {
    if (session.length) {
      await killSession();
    }
  };

  const handleDeepLink = async (event) => {
    if (event.url && event.url.startsWith(Linking.makeUrl("/"))) {
      const auth = await Linking.parse(event.url).getQueryParameterAsync(
        "wc-authentication"
      );
      setSession(auth);
    }
  };

  React.useEffect(() => {
    Linking.addEventListener("url", handleDeepLink);

    // return () => {
    //   Linking.removeEventListener("url", handleDeepLink);
    // };
  }, []);

  return (
    <>
      {session.length ? (
        <AnimatedButton title="Logout" onPress={handleLogout} />
      ) : (
        <AnimatedButton title="Login" onPress={handleLogin} />
      )}
    </>
  );
}
