import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


// import { QueryInputStyles } from './QueryInputStyles'
// const useStyles = makeStyles(QueryStyles)

export const QueryInput = ({queryInput, setQueryInput, queryUserDB}) => {
    return (
        <div style={{marginTop:'30px', maginLeft: '10px', width:'100%'}}>
            <TextField
                label="Query"
                multiline
                rows={10}
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                variant="outlined"
                fullWidth
            />
            <div style={{display:'flex', justifyContent:'flex-end', width:'100%'}}>
                <div>
                    <Button
                        color='secondary'
                        onClick={queryUserDB}
                    >
                        Run Sql
                    </Button>
                </div>
            </div>
            
        </div>
    );
};