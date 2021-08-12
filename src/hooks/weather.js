import React from 'react';
import staticResponse from '../../src/assets/forecast_response_ZorritosPE_28May2021.json';

export const getWeatherById = async (id) => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=cf53893d93414d0e98cabc620021f64f`);
    const data = await res.json();

    if (data.cod === '200') {
        return data;
    } else {
        return null;
    }
    // return staticResponse;
}