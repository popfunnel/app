 /* eslint-disable */ 
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import {schemasColumnInfo} from './schemasColumnInfo'

const schemaNames = getSchemaNames(schemasColumnInfo)
const tableNameBySchemaName = getTableNameBySchemaName(schemasColumnInfo)
const columnNameByTableName = getColumnNamesByTableName(schemasColumnInfo)

const StyledTreeItem = withStyles((theme) => ({
    label: {
        fontSize: 12
    }
}))(TreeItem);

export const SchemaTreeView = () => {
    // React.useEffect(() => {
    //     fetch('/queries/schemas').then(response => {
    //         console.log('fetch successful', response)
    //         return response.json()
    //     }).then(data => {
    //         console.log('here is the data', JSON.stringify(data))
    //     })
    // }, [])

    return (
        <div style={{marginTop: '10px'}}>
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                multiSelect
            >
                {schemaNames.map(schemaName => (
                    <StyledTreeItem key={schemaName} nodeId={schemaName} label={schemaName}>
                        {tableNameBySchemaName[schemaName].map(tableName => (
                            <StyledTreeItem key={tableName} nodeId={`${schemaName}.${tableName}`} label={tableName}>
                                {columnNameByTableName[tableName].map(columnName => (
                                    <StyledTreeItem key={columnName} nodeId={`${schemaName}.${tableName}.${columnName}`} label={columnName}/>
                                ))}
                            </StyledTreeItem>
                        ))}
                    </StyledTreeItem>
                ))}
            </TreeView>
        </div>
    );
};

function getSchemaNames(schemasColumnInfo) {
    return [...new Set(schemasColumnInfo.map(column => column.table_schema))]
}

function getTableNameBySchemaName(schemasColumnInfo) {
    const tableNameBySchemaName = {}
    schemasColumnInfo.forEach(column => {
        if(tableNameBySchemaName[column.table_schema]) {
            if (tableNameBySchemaName[column.table_schema].indexOf(column.table_name) === -1) {
                tableNameBySchemaName[column.table_schema].push(column.table_name)
            }
        } else {
            tableNameBySchemaName[column.table_schema] = [column.table_name]
        }
    })
    return tableNameBySchemaName
}

function getColumnNamesByTableName(schemasColumnInfo) {
    const columnNamesByTable = {}
    schemasColumnInfo.forEach(column => {
        if(columnNamesByTable[column.table_name]) {
            columnNamesByTable[column.table_name].push(column.column_name)
        } else {
            columnNamesByTable[column.table_name] = [column.column_name]
        }
    })
    return columnNamesByTable
}