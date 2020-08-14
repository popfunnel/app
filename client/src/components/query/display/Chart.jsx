import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Plot from 'react-plotly.js';

// const useStyles = makeStyles((theme) => ({

// }));

export const Chart = ({queryResults, seriesType}) => {

    let attributes = queryResults.length ? Object.keys(queryResults[0]) : [];
    let xValue = queryResults.map(item => item[attributes[0]]);
    let yValue = queryResults.map(item => item[attributes[1]]);

    let lowerCaseSeriesType = seriesType.toLowerCase();

    return (
        <div style={{display:'flex', justifyContent:'center'}}>
            <Plot
                data={[
                    {
                        x: xValue,
                        y: yValue,
                        type: lowerCaseSeriesType,
                        marker: {
                            color: 'rgb(158,202,225)',
                            opacity: 0.6,
                            line: {
                                color: 'rgb(8,48,107)',
                                width: 1.5
                            }
                        }
                    }
                ]}
                layout={{width: "100%", height: '100%'}}
            />
        </div>
    );
};


// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Plot from 'react-plotly.js';

// // const useStyles = makeStyles((theme) => ({

// // }));

// export const PieChart = ({queryResults}) => {

//     let attributes = queryResults.length ? Object.keys(queryResults[0]) : [];
//     let xValue = queryResults.map(item => item[attributes[0]]);
//     let yValue = queryResults.map(item => item[attributes[1]]);

//     return (
//         <div style={{display:'flex', justifyContent:'center'}}>
//             <Plot
//                 data={[{
//                         labels: xValue,
//                         values: yValue,
//                         type: 'pie',
//                     }]}
//                 layout={{width: "100%", height: '100%'}}
//             />
//         </div>
//     );
// };