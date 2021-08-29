import {LinearProgress, makeStyles, withStyles} from "@material-ui/core";

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 10,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#1a90ff',
    },
}))(LinearProgress);

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

export default function BorderProgressBar({value}) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <BorderLinearProgress variant="determinate" value={value} />
        </div>
    );
}