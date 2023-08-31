import { Button } from "@mui/material";
import logo from "../images/logo.png";
import { useContext } from "react";
import AuthContext from "../auth";

let handleCreateAccount = () => {
  window.location.href += "register";
};

let handleLogin = () => {
  window.location.href += "login";
};

let handleContinueAsGuest = (auth) => {
  auth.continueAsGuest();
};
export default function SplashScreen() {
  const { auth } = useContext(AuthContext);

  return (
    <div id="splash-screen">
      <div>
        <h5 id="splash-header">Welcome, it's All about Music</h5>
      </div>
      <div class="splash-grid">
        <div id="splash-logo">
          <img src={logo} width={200} alt="Logo" />
          <div style={{ fontSize: 20 }}>Developed by Sean Weng</div>
        </div>

        <div class="button-col">
          <div style={{ fontSize: 30, textAlign: "center" }}>
            Ready to play the moment?
          </div>
          <div style={{ fontSize: 30, textAlign: "center" }}>
            Explore popular playlists or create your own
          </div>
          <div id="splash-buttons-div">
            <Button
              style={{
                maxWidth: "400px",
                height: "50px",
                left: "20%",
                borderRadius: "20px",
                backgroundColor: "#253461",
              }}
              variant="contained"
              onClick={handleCreateAccount}
            >
              Create Account
            </Button>
            <Button
              style={{
                maxWidth: "400px",
                height: "50px",
                left: "20%",
                borderRadius: "20px",
                backgroundColor: "#253461",
              }}
              variant="contained"
              onClick={handleLogin}
            >
              Login
            </Button>
            <Button
              style={{
                maxWidth: "400px",
                height: "50px",
                left: "20%",
                borderRadius: "20px",
                backgroundColor: "#253461",
              }}
              variant="contained"
              onClick={() => handleContinueAsGuest(auth)}
            >
              Continue as Guest
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
