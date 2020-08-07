import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import {Controlled as CodeMirror} from 'react-codemirror2'
import './codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/sql/sql';
// import { makeStyles } from '@material-ui/core/styles'

// import { QueryInputStyles } from './QueryInputStyles'
// const useStyles = makeStyles(QueryStyles)

export const QueryInput = ({queryInput, setQueryInput, queryUserDB}) => {
    return (
        <Paper style={{marginTop:'30px', maginLeft: '10px', width:'100%'}}>
            <CodeMirror
                value={queryInput}
                options={{
                    mode: 'sql',
                    theme: 'monokai',
                    tabSize: 4,
                    lineNumbers: true
                }}
                onBeforeChange={(editor, data, value) => {
                    setQueryInput(value)
                }}
                onChange={(editor, data, value) => {
                }}
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
        </Paper>
    );
};
