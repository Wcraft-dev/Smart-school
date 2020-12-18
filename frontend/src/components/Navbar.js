import React, { useState,useContext } from "react";
import { useHistory, NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  useScrollTrigger,
  Slide,
  CssBaseline,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Button,
  Avatar,
  Divider,
} from "@material-ui/core/";
import Notification from "./Notifications";
import MenuIcon from "@material-ui/icons/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import routes from "../routes/";
import { getLocalStorage } from "../helpers/clientSave";
import { LoginContext } from "../App";

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}
const useStyles = makeStyles((theme) => ({
  normal: {
    opacity: "0.9 !important",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  sectionDesktopLogin: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function NavBar(props) {
  const [login, setLogin] = useContext(LoginContext);

  const classes = useStyles();
  let history = useHistory();
  const getDataUser = () => {
    const Get = getLocalStorage("user");
    if (Get !== null) {
      const r = JSON.parse(Get);
      return r;
    } else {
      return { name: "", picture: "" };
    }
  };
  const DataUser = [getDataUser().name, getDataUser().picture];
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const singout = () => {
    handleProfileMenuClose();
    history.push("/user/singout");
  };

  const menuId = "account-menu";
  const mobileMenuId = "account-menu-mobile";

  const profileButton = (
    <IconButton onClick={handleProfileMenuOpen}>
      <Avatar
        className={classes.small}
        alt={DataUser[0]}
        src={DataUser[1]}
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
      />
    </IconButton>
  );
  const profileMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleProfileMenuClose}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <MenuItem disabled className={classes.normal}>
        <Typography component="p" variant="body1">
          Hello, {DataUser[0]}
        </Typography>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleProfileMenuClose}>My account</MenuItem>
      <MenuItem onClick={singout}>Sing Out</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            <div className={classes.sectionMobile}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
              >
                <MenuIcon />
              </IconButton>
            </div>

            <Typography className={classes.title} variant="h6" noWrap>
              Smart School
            </Typography>

            <div className={classes.grow} />
            <div className={classes.sectionDesktopLogin}>
              {login ? (
                <>
                  <Notification />
                  {profileButton}
                </>
              ) : (
                <>
                  {routes.map((r) => {
                    if (!r.hidden) {
                      return (
                        <NavLink
                          exact
                          activeClassName="active"
                          to={r.path}
                          key={r.name}
                        >
                          <Button color="secondary">{r.name}</Button>
                        </NavLink>
                      );
                    }
                    return "";
                  })}
                </>
              )}
            </div>
            {login ? (
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </div>
            ) : (
              ""
            )}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar></Toolbar>
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem onClick={handleProfileMenuOpen}>
          {profileButton}
          <Typography component="p">{DataUser[0]}</Typography>
        </MenuItem>
        <MenuItem>
          <Notification />
          <Typography component="p">Notifications</Typography>
        </MenuItem>
      </Menu>
      {profileMenu}
    </div>
  );
}
