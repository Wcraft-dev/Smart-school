import React from "react";
import { Typography, Link } from "@material-ui/core";
import { Copyright } from "@material-ui/icons";
export default function CopyrightPage() {
  return (
    <>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright  "}
        <Copyright fontSize="small" />
        <Link color="inherit" href="https://localhost:3000/">
          {"  Smart School "}
        </Link>
        {` ${new Date().getFullYear()}`}
      </Typography>
    </>
  );
}
