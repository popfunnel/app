import * as actions from '../actions/queryTool';

const initialState = {
    seriesType: 'Table',
    columnSelections: {
        byColumnName: {},
        columnNames: []
    },
    settings: {},
    config: {
        dataKey: '',
        keys: [],
        data: []
    }
};

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

        if (columnNames.length >= 3) {
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

// TODO: move to logic folder
export function setChartConfig(state, rawResults) {
    let settings = compileSettings(state);
    let{
        xAxis,
        yAxis,
        series
    } = settings;

    let keys = new Set();
    let indices = new Set();

    /* 
    Object with indices as key i.e. 
    {
        2005-07-11: { 
            rental_date: '2005-07-11'
        } 
    }
    */

    function sanitizeData(rawData) {
        if (isNaN(rawData)) {
            return rawData;
        } else {
            return parseFloat(rawData)
        }
    };

    let dataByIndex = {};
    rawResults.forEach(row => {
        dataByIndex[row[xAxis]] = {
            [xAxis]: sanitizeData(row[xAxis])
        }
        indices.add(row[xAxis]);
    });

    /*
        TODO: This is O(series*rows). Not sure if there's
        a great way around this yet.
    */    
    if (!series.length) {
        rawResults.forEach(row => {
            yAxis.forEach(chosen_y => {
                let yValue = sanitizeData(row[chosen_y]);
                console.log('here is the yvalue', yValue)
                // TODO: if no series chosen and x axis is same as y axis, convert to num before add
                if (dataByIndex[row[xAxis]][chosen_y] && !isNaN(yValue)) {
                    dataByIndex[row[xAxis]] = {
                        ...dataByIndex[row[xAxis]],
                        [chosen_y]: dataByIndex[row[xAxis]][chosen_y] + yValue
                    };
                } else {
                    dataByIndex[row[xAxis]] = {
                        ...dataByIndex[row[xAxis]],
                        [chosen_y]: yValue
                    };
                }
                keys.add(chosen_y);
            })
        })
    } else if (yAxis.length === 1) {
        rawResults.forEach(row => {
            series.forEach(chosen_series => {    
                let yValue = sanitizeData(row[yAxis[0]])
                if (dataByIndex[row[xAxis]][row[chosen_series]] && !isNaN(yValue)) {
                    dataByIndex[row[xAxis]] = {
                        ...dataByIndex[row[xAxis]],
                        [row[chosen_series]]: dataByIndex[row[xAxis]][row[chosen_series]] + yValue
                    }; 
                } else {
                    dataByIndex[row[xAxis]] = {
                        ...dataByIndex[row[xAxis]],
                        [row[chosen_series]]: yValue
                    };
                }
                keys.add(row[chosen_series]);
            });
        });
    } else if (yAxis.length > 1) {
        rawResults.forEach(row => {
            series.forEach(chosen_series => {    
                yAxis.forEach(chosen_y => {
                    let yValue = sanitizeData(row[chosen_y])
                    let seriesName = `${row[chosen_series]}-${chosen_y}`;
                    if (dataByIndex[row[xAxis]][row[chosen_series]] && !isNaN(yValue)) {
                        dataByIndex[row[xAxis]] = {
                            ...dataByIndex[row[xAxis]],
                            [seriesName]: dataByIndex[row[xAxis]][row[chosen_series]] + yValue
                        }; 
                    } else {
                        dataByIndex[row[xAxis]] = {
                            ...dataByIndex[row[xAxis]],
                            [seriesName]: yValue
                        };
                    }
                    keys.add(seriesName);
                })
                
            });
        });
    }
    // TODO: add final else case

    let formattedData = [...indices].map(index => dataByIndex[index]);

    let config = {
        dataKey: xAxis,
        keys: [...keys],
        data: formattedData
    }

    return {
        ...state,
        settings,
        config
    }
};


function resetChart() {
    return {
        seriesType: 'Table',
        columnSelections: {
            byColumnName: {},
            columnNames: []
        },
        settings: {},
        config: {
            dataKey: '',
            keys: [],
            data: []
        }
    }
}

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
        case actions.SET_CHART_CONFIG:
            return setChartConfig(state, action.rawResults);
        case actions.RESET_CHART:
            return resetChart();
        default:
            return state
    }
}