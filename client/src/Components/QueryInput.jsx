import React from 'react';
import TextField from '@material-ui/core/TextField';

const QueryField = () => {
    return (
        <div style={{marginTop:'30px', width:'auto'}}>
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

export default QueryField;