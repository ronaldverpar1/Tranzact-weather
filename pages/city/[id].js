import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ListCities from '../../src/assets/city.list.partial_PE_US.json';
import { Container, Grid, Typography, Button } from '@material-ui/core';
import { getWeatherById } from '../../src/hooks/weather';
import CardWeather from '../../src/components/cardweather';
import NextLink from 'next/link';
import RouterLink from 'next/router';
import moment from 'moment';

import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import ChartWeather from '../../src/components/chartWeather';

const City = (props) => {
    const [city, setCity] = useState({});
    const [listDayWeather, setListDayWeather] = useState([]);
    const [dataGraph, setDataGraph] = useState([]);
    const [error, setError] = useState(false);

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

                    const listWeek = [];
                    const listGraph = [];
                    for (const key in graphicData) {
                        if (Object.hasOwnProperty.call(graphicData, key)) {
                            const element = graphicData[key];
                            // data to show in the views
                            let data = {
                                day: moment(key).format('dddd'),
                                status: element[0].weather[0].main,
                                temp_max: convertKelvinToCelcius(element[0].main.temp_max),
                                temp_min: convertKelvinToCelcius(element[0].main.temp_min),
                            }
                            listWeek.push(data);

                            // data to show in the graph
                            element.forEach(e => {
                                let dataGraph = {
                                    day: moment(e.dt_txt).calendar(),
                                    temp: convertKelvinToCelcius(e.main.temp),
                                    humidity: e.main.humidity
                                };

                                listGraph.push(dataGraph);
                            });

                        }
                    }

                    setListDayWeather(listWeek);
                    // Just show 10 data in the chart
                    setDataGraph(listGraph);
                });
            } else {
                setError(true);
            }
        }

        function convertKelvinToCelcius (temp) {
            return (temp - 273.15).toFixed(1);
        }
    }, [id]);

    // show loading message
    if (Object.keys(city).length === 0  || listDayWeather.length === 0 || dataGraph.length === 0 ) return 'loading...';

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
                    <Typography variant="h3" style={{ color: '#444e65', fontWeight: 600 }}>{city.name}</Typography>
                    <Typography variant="h6" style={{ textAlign: 'center', color: '#8ea8bf', fontWeight: 500 }}>{city.country}</Typography>
                </Grid>
                <Grid item>
                    <Grid 
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={8}
                    style={{ margin: 0, width: '100%' }}
                    >
                        {
                            listDayWeather.map((item, index) => (
                                <CardWeather key={index} item={item} />
                            ))
                        }
                    </Grid>
                </Grid>
                <Grid item style={{ marginTop: 40 }}>
                    <Typography variant="h5" style={{ color: '#444e65', fontWeight: 600 }}>Temperature and Humidity Graph</Typography>
                </Grid>
                <Grid item>
                    <ChartWeather data={dataGraph} />
                </Grid>
            </Grid>
        </Container>
     );
}
 
export default City;