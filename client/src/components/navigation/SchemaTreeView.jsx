import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

export const SchemaTreeView = () => {
    // TODO: read more about TreeView here: https://material-ui.com/components/tree-view/
    // TODO: create backend route to retrieve data
    const StyledTreeItem = withStyles((theme) => ({
        label: {
            fontSize: 14
        }
      }))(TreeItem);
      
    return (
        <div style={{marginLeft:'15px'}}>
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                multiSelect
            >
                <StyledTreeItem nodeId="1" label="TableName1">
                    <StyledTreeItem nodeId="2" label="Column"/>
                    <StyledTreeItem nodeId="3" label="Column"/>
                    <StyledTreeItem nodeId="4" label="Column"/>
                </StyledTreeItem>
                <StyledTreeItem nodeId="5" label="TableName2">
                    <StyledTreeItem nodeId="6" label="Actor">
                        <StyledTreeItem nodeId="7" label="Columns">
                            <StyledTreeItem nodeId="8" label="Column"/>
                            <StyledTreeItem nodeId="9" label="Column"/>
                        </StyledTreeItem>
                    </StyledTreeItem>
                </StyledTreeItem>
            </TreeView>
        </div>
    );
};

