import React from 'react';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';

export default function Tooltips({tips,contents }) {
    return (
        <div>
            <Grid container justifyContent="center">
                <Grid item>
                    <Tooltip disableFocusListener title={tips}>
                        {contents}
                    </Tooltip>
                </Grid>
            </Grid>
        </div>
    );
}
