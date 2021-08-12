import React from 'react';
import { Line } from 'react-chartjs-2';

const state = {
    labels: [],
    datasets: [
        {
            label: 'Temperature',
            fill: false,
            lineTension: 0.5,
            backgroundColor: '#f4eea9',
            borderColor: '#c1bd87',
            borderWidth: 2,
            data: []
        },
        {
            label: 'Humidity',
            fill: false,
            lineTension: 0.5,
            backgroundColor: '#a9d3ff',
            borderColor: '#80a1c3',
            borderWidth: 2,
            data: []
        }
    ] 
}

const ChartWeather = (props) => {
    const { data } = props;

    data.forEach(e => {
        state.labels.push(e.day);
        state.datasets[0].data.push(e.temp);
        state.datasets[1].data.push(e.humidity);
    });

    return ( 
        <div style={{ width: '800px', marginTop: '80px' }}>
            <Line
                data={state}
                options={{
                    title:{
                        display:true,
                        text:'Behavior of the weather',
                        fontSize:20
                    },
                    legend:{
                        display:true,
                        position:'left'
                    }
                }}
            />
        </div>
     );
}
 
export default ChartWeather;