import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ListCities from '../../src/assets/city.list.partial_PE_US.json';
import { Container, Grid, Typography, Button } from '@material-ui/core';
import { getWeatherById } from '../../src/hooks/weather';
import CardWeather from '../../src/components/cardweather';
import NextLink from 'next/link';
import RouterLink from 'next/router';
import moment from 'moment';
// icons
import GrainRoundedIcon from '@material-ui/icons/GrainRounded';
import WbSunnyRoundedIcon from '@material-ui/icons/WbSunnyRounded';
import CloudRoundedIcon from '@material-ui/icons/CloudRounded';
import FilterDramaRoundedIcon from '@material-ui/icons/FilterDramaRounded';
import AcUnitRoundedIcon from '@material-ui/icons/AcUnitRounded';

import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import ChartWeather from '../../src/components/chartWeather';

const City = (props) => {
    const [city, setCity] = useState({});
    const [listDayWeather, setListDayWeather] = useState([]);
    const [dataGraph, setDataGraph] = useState([]);
    const [error, setError] = useState(false);

    const weatherStatic = [
        {
            day: 'Wed',
            status: 'cloudy',
            minTemp: '68º',
            maxTemp: '74º',
            icon: <FilterDramaRoundedIcon />
        },
        {
            day: 'Thu',
            status: 'cloud',
            minTemp: '68º',
            maxTemp: '74º',
            icon: <CloudRoundedIcon />
        },
        {
            day: 'Fri',
            status: 'sun',
            minTemp: '68º',
            maxTemp: '74º',
            icon: <WbSunnyRoundedIcon />
        },
        {
            day: 'Sat',
            status: 'rainy',
            minTemp: '68º',
            maxTemp: '74º',
            icon: <GrainRoundedIcon />
        },
        {
            day: 'Sun',
            status: 'snowy',
            minTemp: '68º',
            maxTemp: '74º',
            icon: <AcUnitRoundedIcon />
        }
    ];
    // let weatherData = [];
    // weatherData = weatherStatic.forEach(item => {
    //     switch (item.status) {
    //         case 'cloudy':
    //             item.icon = <Cloudy />;
    //             break;
    //         case 'cloud':
    //             item.icon = <Cloud />;
    //             break;
    //         case 'sun':
    //             item.icon = <Sun />;
    //             break;
    //         case 'rainy':
    //             item.icon = <Rainy />;
    //             break;
    //         default:
    //             item.icon = <Sun />;
    //             break;
    //     }
    // })

    // routing to get the actual ID
    const router = useRouter();
    const { query: { id } } = router;

    useEffect(() => {
        if (id) {
            const dataCity = ListCities.filter((e) => {
                return e.id == id
            });
            if (dataCity) {
                setCity(dataCity[0]);
                const dataWeather = getWeatherById(id).then((e) => {
                    // setWeatherInfo(dataWeather);
                    let graphicData = [...e.list];
                    graphicData.forEach(e => {
                        e.dt_txt_new = e.dt_txt.substring(0,10);
                    });
                    graphicData = graphicData.reduce((result,item) => ({
                        ...result,
                        [item['dt_txt_new']]: [
                        ...(result[item['dt_txt_new']] || []),
                        item,
                        ],
                    }),{});
                    console.log(graphicData);

                    const listWeek = [];
                    const listGraph = [];
                    for (const key in graphicData) {
                        if (Object.hasOwnProperty.call(graphicData, key)) {
                            const element = graphicData[key];
                            // data to show in the views
                            let data = {
                                day: moment(key).format('dddd'),
                                status: element[0].weather[0].main,
                                temp_max: element[0].main.temp_max,
                                temp_min: element[0].main.temp_min,
                            }
                            listWeek.push(data);

                            // data to show in the graph
                            element.forEach(e => {
                                let dataGraph = {
                                    day: moment(e.dt_txt).calendar(),
                                    temp: e.main.temp,
                                    humidity: e.main.humidity
                                };
                                listGraph.push(dataGraph);
                            });
                        }
                    }
                    setListDayWeather(listWeek);
                    setDataGraph(listGraph);
                });
            } else {
                setError(true);
            }
        }
    }, [id]);

    // show loading message
    if (Object.keys(city).length === 0 ) return 'loading...';

    return ( 
        <Container>
            <Button 
                color="secondary" 
                startIcon={<ArrowBackRoundedIcon />} 
                style={{ margin: '20px 0' }}
                onClick={() => RouterLink.push("/")}
            >Return</Button>
            <Grid 
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item style={{ margin: '20px 0' }}>
                    <Typography variant="h3">{city.name}</Typography>
                    <Typography variant="h5" style={{ textAlign: 'center' }}>{city.country}</Typography>
                </Grid>
                <Grid item>
                    <Grid 
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={8}
                    style={{ marginTop: '20px' }}
                    >
                        {
                            listDayWeather.map((item, index) => (
                                <CardWeather key={index} item={item} />
                            ))
                        }
                    </Grid>
                </Grid>
                <Grid item>
                    <ChartWeather data={dataGraph} />
                </Grid>
            </Grid>
        </Container>
     );
}
 
export default City;