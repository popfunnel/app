import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import {Controlled as CodeMirror} from 'react-codemirror2'
import sqlFormatter from "sql-formatter";
import './codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/yonce.css';
import 'codemirror/mode/sql/sql';
import { connect } from 'react-redux'
import { setUserQuery, queryDatabase } from '../../../actions/queryTool';

const QueryInput = ({queryDatabase}) => {
    let exampleQuery = `SELECT name, count(1)
    FROM film_category join category on category.category_id = film_category.category_id 
    GROUP BY name 
    ORDER BY count DESC 
    LIMIT 10`

    let [queryInput, setQueryInput] = React.useState(exampleQuery);

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
                            let queryText = cm.getSelection() || queryInput;
                            queryDatabase(queryText);
                        },
                        "Ctrl-Enter": function(cm) {
                            let queryText = cm.getSelection() || queryInput;
                            queryDatabase(queryText);
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
            />
            <div style={{display:'flex', justifyContent:'flex-end', width:'100%'}}>
                <div>
                    <Button
                        color='secondary'
                        onClick={() => queryDatabase(queryInput)}
                        disableRipple
                    >
                        Run Sql
                    </Button>
                </div>
            </div>
        </Paper>
    );
};

const mapStateToProps = (state) => {
    return {
        userInput: state.query.userInput
    }
}

const mapDispatchToProps = {
    queryDatabase
};

export const ConnectedQueryInput = connect(mapStateToProps, mapDispatchToProps)(QueryInput);
