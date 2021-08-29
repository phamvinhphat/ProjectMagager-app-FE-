import {Link as RouterLink} from "react-router-dom";
import {Button, Link} from "@material-ui/core";

function Linker({content, to, color = "primary", variant = "body1", isButton = true}) {
    const button = (
        <Button color={color} variant="text">
            {content}
        </Button>
    )
    const noButton = content;

    return (
        <Link
            variant={variant}
            color={color}
            underline="none"
            component={RouterLink} to={to}>
            {isButton ? button : noButton}
        </Link>
    )
}

export default Linker;