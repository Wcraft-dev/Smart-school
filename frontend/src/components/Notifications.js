import React, { useContext, useEffect, useState } from "react";
import { Badge, IconButton, Menu, MenuItem } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { NotificationsContext, LoginContext } from "../App";
import Lox from "../helpers/auth";

export default function Notifications() {
  let notification = useContext(NotificationsContext);
  const login = useContext(LoginContext);

  const [open, setOpen] = useState(null);
  const [dataNotification, setDataNotification] = useState([]);

  useEffect(() => {
    if (!login[0]) notification[1](null);
  }, [login, notification]);

  const handleDataNotification = (res) => {
    setDataNotification([
      ...dataNotification,
      { id: res, sender: res, message: res, arrivalTime: "00:00" },
    ]);
  };
  const handleClick = (event) => {
    setOpen(event.currentTarget);
  };
  const handleClose = () => {
    setOpen(null);
  };
  return (
    <>
      <Lox handle={handleDataNotification} />
      <IconButton
        aria-label="show new notifications"
        color="inherit"
        onClick={handleClick}
      >
        <Badge badgeContent={notification[0]} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu anchorEl={open} open={Boolean(open)} onClose={handleClose}>
        {dataNotification.map((data) => {
          return <MenuItem key={data.id}>{data.message}</MenuItem>;
        })}
      </Menu>
    </>
  );
}
