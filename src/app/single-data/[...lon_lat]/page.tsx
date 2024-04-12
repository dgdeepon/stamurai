'use client'
import React, { useEffect, useState } from 'react';
import cloudImg from '../../../../images/cloud.jpg';
import rainImg from '../../../../images/rain.png';
import snowImg from '../../../../images/snow.jpg';
import clearImg from '../../../../images/clear.jpg';
import Image, { StaticImageData } from 'next/image'
import axios from 'axios';
import Loader from '@/components/Loader';
import { weatherApiId, weatherUrl } from '../../../../utils/urls';


interface weatherInterface{
  wind:{
    speed: number, 
    gust:number,
    deg:number
  },
  weather:[{
    main:string,
    description: string
  }],
  coord:{
    lon:string,
    lat: string
  },
  name:string,
  sys:{
    country:string,
    sunrise:number,
    sunset: number
  },
  timezone: number,
  main:{
    temp:string,
    pressure:number,
    humidity: number,
    sea_level: number
  }
};


const page = ({params}:{params:{lon_lat:string[]}}): React.JSX.Element => {
  const imageUrls:{[key:string]: StaticImageData}={
    clouds : cloudImg,
    rain: rainImg,
    snow: snowImg,
    clear: clearImg
  };

  const {lon_lat} = params;


  const [weatherData, setWeatherData] = useState<weatherInterface>();
  async function getWeatherData (): Promise <void>{
    const response = await axios.get(weatherUrl+`?lat=${lon_lat[1]}&lon=${lon_lat[0]}&appid=${weatherApiId}`);
    response.status == 200 && setWeatherData(response.data);
  } 

  useEffect(()=>{
    getWeatherData();
  },[]);

  return ( weatherData ?
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='font-bold mb-4'>
        {weatherData?.name} | {weatherData?.sys?.country}
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl'>
        <div className='p-4 bg-gray-100 rounded-lg'>
          <h5 className='bg-slate-400 text-white p-2 rounded-md'>Today's Weather</h5>
          <div className='mt-2 flex items-center'>
            <div>
              {weatherData && (
                <Image
                  src={imageUrls[weatherData.weather[0].main.toLowerCase()]?.src}
                  alt={weatherData.weather[0].main}
                  width={100}
                  height={100}
                />
              )}
            </div>
            <div className='ml-4'>
              <h6>Report: {weatherData?.weather[0]?.main}</h6>
              <h6 className='mt-1'>Description: {weatherData?.weather[0]?.description}</h6>
            </div>
          </div>
        </div>
        <div className='p-4 bg-gray-100 rounded-lg'>
          <h5 className='bg-slate-400 text-white p-2 rounded-md'>Wind</h5>
          <div className='mt-2'>
            <h6>Speed: {weatherData?.wind?.speed}</h6>
            <h6>Gust: {weatherData?.wind?.gust}</h6>
            <h6>Degrees: {weatherData?.wind?.deg}</h6>
          </div>
        </div>
        <div className='p-4 bg-gray-100 rounded-lg'>
          <h5 className='bg-slate-400 text-white p-2 rounded-md'>Coordinates</h5>
          <div className='mt-2'>
            <h6>Longitude: ({weatherData?.coord?.lon})</h6>
            <h6>Latitude: ({weatherData?.coord?.lat})</h6>
          </div>
        </div>
        <div className='p-4 bg-gray-100 rounded-lg'>
          <h5 className='bg-slate-400 text-white p-2 rounded-md'>Other Details</h5>
          <div className='mt-2'>
            <h6>Timezone: ({weatherData?.timezone})</h6>
            <h6>Humidity: {weatherData?.main?.humidity}</h6>
            <h6>Sea Level: {weatherData?.main?.sea_level}</h6>
            <h6>Atmospheric Pressure: {weatherData?.main?.pressure}</h6>
          </div>
        </div>
      </div>
    </div> : <Loader/>
  );
}

export default page