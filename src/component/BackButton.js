import {Link as ReactLink} from "react-router-dom";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Button from "@material-ui/core/Button";
import React from "react";
import {Link} from "@material-ui/core";

function BackButton({ children, switchTo, color="inherit"}) {
    return (
       <Link component={ReactLink} to={switchTo}>
           <Button color={color}>
               <KeyboardBackspaceIcon/>
               {children}
           </Button>
       </Link>
    )
}
export default BackButton;