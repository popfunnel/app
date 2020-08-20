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
import { queryDatabase } from '../../../actions/queryTool';

const QueryInput = ({queryDatabase}) => {
    let exampleQuery = `SELECT
    date(Date_trunc('day', rental_date)) AS rental_date,
    Count(*) AS total,
    category.NAME AS category
  FROM
    rental
    JOIN inventory ON rental.inventory_id = inventory.inventory_id
    JOIN film ON inventory.inventory_id = film.film_id
    JOIN film_category ON film.film_id = film_category.film_id
    JOIN category ON film_category.category_id = category.category_id
  WHERE
    rental_date BETWEEN '2005-07-08'
    AND '2005-10-31'
    AND (
      category.NAME = 'Action'
      OR category.NAME = 'Foreign'
      OR category.NAME = 'Sports'
    )
  GROUP BY
    Date_trunc('day', rental_date),
    category.NAME
  ORDER BY
    Date_trunc('day', rental_date)
  LIMIT
    25`

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

const mapDispatchToProps = {
    queryDatabase
};

export const ConnectedQueryInput = connect(undefined, mapDispatchToProps)(QueryInput);
