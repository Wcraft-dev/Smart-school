import React, { useState, useContext } from "react";
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
  Link,
  Avatar,
  Divider,
  SwipeableDrawer,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
} from "@material-ui/core/";
import Notification from "./Notifications";
import MenuIcon from "@material-ui/icons/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
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
  MainMenu: {
    width: 250,
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  toolbarFake: {
    background: theme.palette.primary.main,
  },
  rootLink: {
    fontSize: "1rem",
    padding: "10px 10px",
    marginLeft: "20px",
    textAlign: "center",
    display: "inline-block",
    textDecoration: "none",
    borderBottom: `0px solid ${theme.palette.primary.light}`,
    transition: "0.5s cubic-bezier(.68,-0.55,.27,1.55) 0.2s",
    "&$underlineHover:hover": {
      fontWeight: "bold",
      textDecoration: "none",
      padding: "10px 20px",
      borderBottom: `2px solid ${theme.palette.primary.light}`,
      color: theme.palette.primary.light,
    },
  },
  underlineHover: {},
  selected: {
    textDecoration: "none",
    padding: "10px 20px",
    borderBottom: `2px solid ${theme.palette.primary.light}`,
    color: theme.palette.primary.light,
    fontWeight: "bold",
  },
  drawer: {
    top: "64px !important",
  },
}));

export default function NavBar(props) {
  const login = useContext(LoginContext);

  const classes = useStyles();
  let history = useHistory();

  const getDataUser = () => {
    if (getLocalStorage("user") !== null) {
      return JSON.parse(getLocalStorage("user"));
    } else {
      return { name: "", picture: "" };
    }
  };
  const DataUser = [getDataUser().name, getDataUser().picture];

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const [mobileProfileAnchorEl, setMobileProfileAnchorEl] = useState(null);
  const isMobileProfileOpen = Boolean(mobileProfileAnchorEl);

  const [MainMenu, setMainMenu] = useState(false);

  const toggleDrawer = () => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setMainMenu(!MainMenu);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
    handleMobileProfileClose();
  };

  const handleMobileProfileClose = () => {
    setMobileProfileAnchorEl(null);
  };
  const handleMobileProfileOpen = (event) => {
    setMobileProfileAnchorEl(event.currentTarget);
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

  const MainMenuF = (
    <div>
      <SwipeableDrawer
        anchor="left"
        open={MainMenu}
        onOpen={toggleDrawer}
        onClose={toggleDrawer()}
        className={classes.drawer}
        ModalProps={{
          BackdropProps: {
            classes: {
              root: classes.drawer,
            },
          },
        }}
        PaperProps={{
          classes: {
            root: classes.drawer,
          },
        }}
      >
        <div className={classes.MainMenu} role="presentation">
          <List>
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"qu tal"} />
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"hola"} />
            </ListItem>
          </List>
        </div>
      </SwipeableDrawer>
    </div>
  );
  return (
    <div className={classes.grow}>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            {login[0] ? (
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                onClick={toggleDrawer(true)}
                aria-label="open drawer"
              >
                <MenuIcon />
              </IconButton>
            ) : (
              ""
            )}
            <Typography className={classes.title} variant="h6" noWrap>
              Smart School
            </Typography>

            <div className={classes.grow} />

            <div className={classes.sectionDesktopLogin}>
              {login[0] ? (
                <>
                  <Notification />
                  {profileButton}
                </>
              ) : (
                <>
                  {routes.map((r) => {
                    if (!r.hidden) {
                      return (
                        <Link
                          component={NavLink}
                          to={r.path}
                          color="secondary"
                          classes={{
                            root: classes.rootLink,
                            underlineHover: classes.underlineHover,
                          }}
                          activeClassName={classes.selected}
                          exact
                          key={r.name}
                        >
                          {r.name}
                        </Link>
                      );
                    }
                    return "";
                  })}
                </>
              )}
            </div>
            {login[0] ? (
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileProfileOpen}
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
      <Toolbar className={classes.toolbarFake} />
      <Menu
        anchorEl={mobileProfileAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileProfileOpen}
        onClose={handleMobileProfileClose}
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
      {login[0] ? <>{MainMenuF}</> : ""}
    </div>
  );
}
