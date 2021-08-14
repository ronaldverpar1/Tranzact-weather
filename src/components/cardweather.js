import { Box, Grid, Typography } from '@material-ui/core';
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
        <Grid item xs={2} style={{ padding: 0 }}>
            <Box 
                component="div"
                display="flex" 
                flexDirection="column" 
                justifyContent="center" 
                alignItems="center"
                style={{ width: 150, height: 150, margin: 8, borderRadius: 10, boxShadow: 'rgba(17, 17, 26, 0.1) 0px 0px 16px' }}
            >
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
                    <Grid item>
                        <Typography variant="subtitle2" style={{ color: '#4f5356' }}>{item.temp_min}°</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle2" style={{ color: '#bababa' }}>{item.temp_max}°</Typography>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
     );
}
 
export default CardWeather;