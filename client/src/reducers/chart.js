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

function updateXSelection(state, column) {
    let selections = {...state.columnSelections};
    selections.columnNames.forEach(name => {
        if (name === column) {
            selections.byColumnName[name] = {
                ...selections.byColumnName[name],
                xAxis: true
            }
        } else {
            selections.byColumnName[name] = {
                ...selections.byColumnName[name],
                xAxis: false
            }
        }
    });

    return {
        ...state,
        columnSelections: selections
    };
};

function updateYSelection(state, column, selection) {
    let selections = {...state.columnSelections};
    selections.byColumnName = {
        ...selections.byColumnName,
        [column]: {
            ...selections.byColumnName[column],
            yAxis: selection
        }
    }

    return {
        ...state,
        columnSelections: selections
    };
};

export function compileSettings(state) {
    let selections = state.columnSelections;
    let compiledSettings = {
        xAxis: '',
        yAxis: [],
        series: []
    };

    selections.columnNames.forEach(name => {
        let {
            xAxis,
            yAxis,
            series
        } = selections.byColumnName[name];
        if (xAxis) compiledSettings.xAxis = name; 
        if (yAxis) compiledSettings.yAxis.push(name);
        if (series) compiledSettings.series.push(name);
    });

    return compiledSettings;
};

function updateSeriesSelection(state, column, selection) {
    let selections = {...state.columnSelections};
    selections.byColumnName = {
        ...selections.byColumnName,
        [column]: {
            ...selections.byColumnName[column],
            series: selection
        }
    }

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
            return updateXSelection(state, action.column);
        case actions.UPDATE_Y_SELECTION:
            return updateYSelection(state, action.column, action.selection);
        case actions.UPDATE_SERIES_SELECTION:
            return updateSeriesSelection(state, action.column, action.selection);
        default:
            return state
    }
}