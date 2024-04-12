"use client"
import React from 'react'
import Link from 'next/link';

interface coordinate{
  lon: number,
  lat: number
};

interface dataType{
  name:string,
  cou_name_en: string,
  timezone: string,
  population: number,
  coordinates: coordinate,
  country_code: string
};

interface props{
  tableData: dataType[]
};

function TableBody({tableData}:props): React.JSX.Element {

  return (
    <tbody className="text-center">
      {
        tableData?.length ? 
        tableData.map((el, index)=>(
          <tr key={index+1}>
            <td className='p-2'>{index+1}</td>
            <Link href={`/single-data/${el.coordinates.lon}/${el.coordinates.lat}`}>
              <div className='p-2 hover:bg-slate-500 hover:text-white text-center'>
            <td >
            {el.name}
            </td>
              </div>
            </Link>
            <td className='p-2'>{el.cou_name_en}</td>
            <td className='p-2'>{el.country_code}</td>
            <td className='p-2'>{el.population}</td>
            <td className='p-2'>{el.timezone}</td>
            <td className='p-2'>{el.coordinates.lon}</td>
            <td className='p-2'>{el.coordinates.lat}</td>
          </tr>
        )) : ''
      }
    </tbody>
  )
}

export default TableBody;