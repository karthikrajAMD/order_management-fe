import * as React from "react";
import { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import Login from "../LoginSignup/Login";
import Signup from "../LoginSignup/Signup";
import { Context } from "../Context.js";
import ForgotPassword from "../LoginSignup/ForgotPassword";
import PasswordReset from "../LoginSignup/PasswordReset";
import DemoUser from "../UserPage/DemoUser";
import "../App.css";
const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const images = [
    {
      url: "https://img.freepik.com/premium-photo/smartphone-glows-5g-hologram-mobile-technology-creative-background-5g-network-concept-high-speed-mobile-internet-new-generation-networks-mixed-media-3d-render-3d-illustration_99433-7266.jpg",
    },
    {
      url: "https://img.freepik.com/free-vector/mobile-smartphone-technology-digital-blue-background_1017-23176.jpg",
    },
    {
      url: "https://img.pikbest.com/background/20220119/mobile-phone-light-effect-blue-creative-background_6225898.jpg!bwr800",
    },
    {
      url: "https://media.istockphoto.com/id/1263567195/vector/phone-front-view-no-frame-hanging-over-screen-tablet-and-laptop-mock-up-cellphone-for-ui-ux.jpg?s=612x612&w=0&k=20&c=DJ2klKdQWxMTZbvx63Nn6iGPSs_6GgOUYt_J9gI4Yls=",
    },
  ];
  const { window } = props;
  const [a, setA] = useContext(Context);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const listStyle = {
    // background: "#fafa00",
    // backgroundColor: "red",
    background: "rgb(70, 245, 252) 100%",
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const navigate = useNavigate();
  const drawer = (
    <Typography component="div">
      <Toolbar />
      <Divider />
      <List>
        {["Demo-users", "Login", "Signup"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => {
                setA(text);
                console.log(a);
              }}
            >
              <ListItemIcon>
                {index === 0 ? <HomeIcon /> : ""}
                {index === 1 ? <LoginIcon /> : ""}
                {index === 2 ? <AppRegistrationIcon /> : ""}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Typography>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        style={listStyle}
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar
          style={{
            background: "rgb(12,171,239)",
            background:
              "radial-gradient(circle, rgba(12,171,239,1) 0%, rgba(61,166,220,1) 54%, rgba(70,245,252,1) 100%)",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            style={{ color: "black" }}
            variant="h5"
            className="resp-heading"
            noWrap
            component="div"
          >
            Full Stack Mobile World
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {a ? (
          <Typography component="div">
            {a === "Demo-users" ? <DemoUser /> : ""}
            {a === "Login" ? <Login /> : ""}
            {a === "Signup" ? <Signup /> : ""}
            {a === "Forgot" ? <ForgotPassword /> : ""}
            {a === "Reset" ? <PasswordReset /> : ""}
          </Typography>
        ) : (
          <Login />
        )}
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
