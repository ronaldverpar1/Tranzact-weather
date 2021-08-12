import { Grid, Typography } from '@material-ui/core';
import React from 'react';
// icons
import Rain from '@material-ui/icons/GrainRounded';
import Sun from '@material-ui/icons/WbSunnyRounded';
import Cloud from '@material-ui/icons/CloudRounded';
import Cloudy from '@material-ui/icons/FilterDramaRounded';
import Snow from '@material-ui/icons/AcUnitRounded';

const CardWeather = (props) => {
    const { item } = props;

    return ( 
        <Grid item style={{ boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px' }}>
            <Grid container direction="column" justifyContent="center" alignItems="center">
                <Typography variant="subtitle1">{item.day}</Typography>
                {
                    item.status == 'Clear' ? <Sun style={{ color: '#ffc600' }} /> 
                    : (item.status == 'Clouds' ? <Cloud style={{ color: '#a2d6f9' }} /> : (
                        item.status === 'Snow' ? <Snow style={{ color: '#072ac8' }} /> : (
                            item.status === 'Rain' ? <Rain style={{ color: '#072ac8' }} /> : <Cloudy style={{ color: '#1e96fc' }} />
                        )
                    ))
                }
                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
                    <Grid item>{item.temp_min}</Grid>
                    <Grid item>{item.temp_max}</Grid>
                </Grid>
            </Grid>
        </Grid>
     );
}
 
export default CardWeather;