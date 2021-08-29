import {Slider, Tooltip, Typography, withStyles} from "@material-ui/core";

const PrettoSlider = withStyles({
    root: {
        color: 'primary',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);

function ValueLabelComponent(props) {
    const {children, open, value} = props;

    return (
        <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
            {children}
        </Tooltip>
    );
}

const SliderCustom = ({
                          title = "pretto.fr",
                          ariaLabel = "pretto slider",
                          defaultValue = 0,
                          value,
                          valueLabelDisplay = "auto",
                          onChange,
                          width,
                      }) => {
    return (
        <>
            <Typography gutterBottom align={"center"}>{title}</Typography>
            <PrettoSlider
                valueLabelDisplay={valueLabelDisplay}
                aria-label={ariaLabel}
                defaultValue={defaultValue}
                value={typeof value === 'number' ? value : 0}
                onChange={onChange}
                style={{width: width}}
            />
        </>
    )
}

export default SliderCustom;