import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import {Controlled as CodeMirror} from 'react-codemirror2'
import sqlFormatter from "sql-formatter";
import './codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/yonce.css';
import 'codemirror/mode/sql/sql';
// import { makeStyles } from '@material-ui/core/styles'

// import { QueryInputStyles } from './QueryInputStyles'
// const useStyles = makeStyles(QueryStyles)

export const QueryInput = ({queryInput, setQueryInput, queryUserDB}) => {
    let formatHelper = (cm) => {
        let selection = cm.getSelection()
        if (selection) {
            cm.replaceSelection(sqlFormatter.format(selection))
        } else {
            cm.setValue(sqlFormatter.format(cm.getValue()))
        }
    }

    return (
        <Paper style={{marginTop:'5px', maginLeft: '10px', width:'100%'}}>
            <CodeMirror
                value={queryInput}
                options={{
                    mode: 'sql',
                    theme: 'yonce',
                    tabSize: 4,
                    autofocus: true,
                    lineWrapping: true,
                    lineNumbers: true,
                    extraKeys: {
                        "Cmd-Enter": function(cm) {
                            queryUserDB(cm.getSelection())
                        },
                        "Ctrl-Enter": function(cm) {
                            queryUserDB(cm.getSelection())
                        },
                        "Shift-Cmd-L": formatHelper,
                        "Shift-Ctrl-L": formatHelper,
                    },
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
                            onClick={() => queryUserDB()}
                        >
                            Run Sql
                        </Button>
                    </div>
            </div>
        </Paper>
    );
};
