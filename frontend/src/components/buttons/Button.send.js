import { Button } from "@material-ui/core";
import React from "react";

export default function ButtonSend(props) {
  return (
    <Button
      type="submit"
      disabled={props.inWait ? true : false}
      variant="contained"
      fullWidth
      color={props.inWait ? "primary" : "secondary"}
    >
      {props.inWait ? "Sending..." : props.textDefault}
    </Button>
  );
}
