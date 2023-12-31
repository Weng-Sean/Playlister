import { useContext } from "react";
import AuthContext from "../auth";

import Copyright from "./Copyright";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MUIErrorModal from "./MUIErrorModal";

import GlobalStoreContext from "../store";

export default function LoginScreen() {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    let res = await auth.loginUser(
      formData.get("email"),
      formData.get("password")
    );

    if (res !== "success") {
      store.setErrorMessage(res);
    }
  };

  return (
    <div>
      <Grid
        container
        component="main"
        sx={{ height: "100vh", paddingLeft: "120px" }}
      >
        <CssBaseline />
        {/* <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            /> */}
        {/* <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square> */}
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ paddingRight: 100 }}>
            <Avatar sx={{ m: 0, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
          </div>
          <Typography
            component="h1"
            variant="h5"
            sx={{ paddingRight: "100px" }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1, paddingLeft: "150px", paddingRight: "250px" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
      {/* </Grid> */}
      <MUIErrorModal />
    </div>
  );
}
