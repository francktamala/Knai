import * as React from "react";
import { styled, alpha, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import { COLORS, NAVIGATION } from "../Constants";
import { useNavigate } from "react-router";
import { add, StateUtility } from "../Redux";
import Btn from "./Btn";

const drawerWidth = 240;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function QuizContainer({ children, Header, Sidebar }) {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  const theme = useTheme();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "transparent",
          color: "black",
          boxShadow: "none",
          boxShadow: "0 0px 8px rgba(205, 237, 246, 0.9)",
          backgroundColor: "white",
        }}
      >
        <Header />
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          "& .MuiDrawer-paper": {
            borderWidth: 0,
            boxShadow: "0 0px 8px rgba(205, 237, 246, 1)",
            zIndex: 1201,
          },
        }}
      >
        <div
          style={{
            height: "100%",
            backgroundColor: "#fff",
            backgroundImage:
              "linear-gradient(to bottom,rgba(205, 237, 246, 0.5) 0%, #fff 20%, rgba(205, 237, 246, 0.5) 45%, #fff 65%, rgba(205, 237, 246, 0.5) 100%)",
          }}
        >
          <DrawerHeader>
            {open && (
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <br />
                <br />
                <img
                  src={
                    "https://pics.craiyon.com/2023-11-26/oMNPpACzTtO5OVERUZwh3Q.webp"
                  }
                  style={{
                    width: "40%",
                    borderRadius: "50%",
                  }}
                />
                <h2
                  style={{ marginTop: 5, letterSpacing: 1 }}
                  className="title-sm"
                >
                  John Doe
                </h2>
                <h2 style={{ marginBottom: 15 }} className="txt-desc">
                  Student
                </h2>
              </div>
            )}
          </DrawerHeader>

          {/* {open && (
            <>
              <br />
            </>
          )} */}

          <Sidebar />
        </div>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, padding: 0 }}>
        <DrawerHeader />
        <div className="Main-Container" style={{minHeight: "85vh"}}>
          <br />
          {children}
        </div>
      </Box>
    </Box>
  );
}
