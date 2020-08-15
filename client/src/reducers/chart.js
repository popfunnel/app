import * as actions from '../actions/queryTool';

// TODO: y axis and series might be better stored as objects
const initialState = {
    seriesType: 'Table',
    columnNames: [],
    columnSelections: {
        byColumnName: {},
        columnNames: []
    }
}

function setSeriesType(state, seriesType) {
    return {
        ...state,
        seriesType
    };
};

function createColumnSelections(state, columnNames) {
    let columnSelections = {...state.columnSelections};
    if (columnNames.length) {
        columnSelections.columnNames = columnNames;
        columnNames.forEach(name => {
            columnSelections.byColumnName[name] = {
                xAxis: false,
                yAxis: false,
                series: false,
            }
            console.log('columnselections is now', columnSelections)
        });

        if (columnNames.length === 3) {
            columnSelections.byColumnName[columnNames[0]].xAxis = true;
            columnSelections.byColumnName[columnNames[1]].yAxis = true;
            columnSelections.byColumnName[columnNames[2]].series = true;
        }
    }

    return {
        ...state,
        columnSelections
    };
};

function updateXSelection(state, column, selection) {
    
    let selections = {...state.columnSelections};

    selections.columnNames.forEach(name => {
        if (name === column) {
            selections.byColumnName[name] = {
                ...selections.byColumnName[name],
                [selection]: true
            }
        } else {
            selections.byColumnName[name] = {
                ...selections.byColumnName[name],
                [selection]: false
            }
        }
    });

    return {
        ...state,
        columnSelections: selections
    };
};

export default function chart(state = initialState, action) {
    switch (action.type) {
        case actions.SET_SERIES_TYPE:
            return setSeriesType(state, action.seriesType);
        case actions.CREATE_COLUMN_SELECTIONS:
            return createColumnSelections(state, action.columnNames);
        case actions.UPDATE_X_SELECTION:
            return updateXSelection(state, action.column, action.selection, action.value);
        default:
            return state
    }
}