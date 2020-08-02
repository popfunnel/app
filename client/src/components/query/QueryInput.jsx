import React from 'react';
import TextField from '@material-ui/core/TextField';
// import { QueryInputStyles } from './QueryInputStyles'

// const useStyles = makeStyles(QueryStyles)

export const QueryInput = () => {
    return (
        <div style={{marginTop:'30px', maginLeft: '10px', width:'100%'}}>
            <TextField
                label="Query"
                multiline
                rows={10}
                defaultValue="SELECT * FROM data_table"
                variant="outlined"
                fullWidth
            />
        </div>
    );
};