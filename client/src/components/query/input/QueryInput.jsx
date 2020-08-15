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
    const commentToken = '--' // for non-postgres this might be something else
    let formatHelper = (cm) => {
        let selection = cm.getSelection()
        if (selection) {
            cm.replaceSelection(sqlFormatter.format(selection))
        } else {
            cm.setValue(sqlFormatter.format(cm.getValue()))
        }
    }
    let commentHelper = function(cm) {
        let selection = cm.getSelection()
        if (selection) {
            // Change the selected lines, but not the ensuing line.
            let commentedText = commentToken + " " + selection.trim().replace(/\n/g, '\n' + commentToken + ' ')
            cm.replaceSelection(commentedText)
        } else {
            // Change only the line the cursor is on.
            let currentLine = cm.getCursor().line  
            let lineText = cm.getLine(currentLine)               
            if (lineText.startsWith(commentToken)) {
                lineText = '\n' + lineText.substr(commentToken.length).trim()
            } else {
                lineText = '\n' + commentToken + ' ' + lineText
            }
            cm.replaceRange(lineText, {line: currentLine-1, anchor: 0}, {line: currentLine, anchor: 0})
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
                        "Cmd-/": commentHelper,
                        "Ctrl-/": commentHelper,
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
                            disableRipple
                        >
                            Run Sql
                        </Button>
                    </div>
            </div>
        </Paper>
    );
};
