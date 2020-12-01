import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  useScrollTrigger,
  Slide,
  CssBaseline,
  IconButton,
  makeStyles,
  Badge,
  Menu,
  MenuItem,
  Button,
} from "@material-ui/core/";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MenuIcon from "@material-ui/icons/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import routes from "../routes/";

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

function Notification() {
  return (
    <IconButton aria-label="show 0 new notifications" color="inherit">
      <Badge badgeContent={5} color="secondary">
        <NotificationsIcon />
      </Badge>
    </IconButton>
  );
}

export default function NavBar(props) {
  const classes = useStyles();
  let history = useHistory();

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

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

  const profileMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleProfileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuClose}>My account</MenuItem>
      <MenuItem onClick={singout}>Sing Out</MenuItem>
    </Menu>
  );
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Notification />
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
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
              {props.login ? (
                <>
                  <Notification />
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                </>
              ) : (
                <>
                  {routes.map((r) => {
                    if (!r.hidden) {
                      return (
                        <Link to={r.path} key={r.name}>
                          <Button color="secondary">{r.name}</Button>
                        </Link>
                      );
                    }
                    return "";
                  })}
                </>
              )}
            </div>
            {props.login ? (
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
      {renderMobileMenu}
      {profileMenu}
    </div>
  );
}
