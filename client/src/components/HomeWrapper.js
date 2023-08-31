import { useContext } from "react";
import { GlobalStoreContext } from "../store";
import HomeScreen from "./HomeScreen";
import SplashScreen from "./SplashScreen";
import AuthContext from "../auth";

export default function HomeWrapper() {
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);

  if (store.isGuest() && (!store.homeScreenButtonActive || store.homeScreenButtonActive === 1)){
    store.changeHomeScreenButtonActive(2);
  }
  console.log("HomeWrapper auth.loggedIn: " + auth.loggedIn);

  if (auth.loggedIn || auth.guest) return <HomeScreen />;
  else return <SplashScreen />;
}
