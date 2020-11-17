import React from "react";
import Link from "@material-ui/core/Link";
export default function MyLink(props) {
  return (
    <Link
      href="#"
      variant="body2"
      onClick={(e) => {
        e.preventDefault();
        props.manager.push(props.href);
      }}
    >
      {props.text || "link"}
    </Link>
  );
}
