'use client'
import TableBody from '@/components/TableBody';
import TableHead from '@/components/TableHead';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { mainDataUrl } from '../utils/urls';
import Link from 'next/link';
import Loader from '@/components/Loader';

const MainDashboard = (): React.JSX.Element => {
  const [orderBy, setOrderBy] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');
  const [filterData, setFilteredData] = useState<any[]>([]);
  
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
  }
  const [tableData, setTableData] = useState<dataType[]>([]);

  async function getData(value: string): Promise <void>{

    const response = await axios.get(mainDataUrl+`order_by=${value.toLowerCase()}&limit=100`);
    response.status == 200 && setTableData(response.data.results);
  }

  useEffect(()=>{
    getData(orderBy);
  },[orderBy]);


  return (
    <div className='p-2'>
      <div className='relative'>
    <input
      placeholder="Search cities..."
      value={searchInput}
      onChange={(e):void=>{
        setFilteredData(tableData.filter((el)=>e?.target?.value  ? el?.name?.toLowerCase()?.includes(e?.target?.value?.toLowerCase()): e.target.value))
        setSearchInput(e.target.value)
      }
    }
    autoFocus
    className="w-full p-2 rounded-md focus:outline-none focus:border-blue-500 mt-2"
    style={{
      border:'1px solid grey'
    }}
    />
    {searchInput && (
      <div className="fixed top-full left-0 w-full border border-gray-300 rounded-md shadow-md h-" style={{backgroundColor:'white', height:'500px', overflow:'auto'}}>
        {filterData?.length ? filterData.map((suggestion, index) => (
          <Link href={`/single-data/${suggestion.coordinates.lon}/${suggestion.coordinates.lat}`} >
          <div key={index} className='p-3 pl-0 hover:bg-slate-500 hover:text-white'>
          {suggestion.name}
          </div>
          </Link>
        )): <div className='text-center'>No Data Found.</div>}
      </div>
    )}
    </div>

    {tableData?.length ? <div className='p-3 overflow-x-auto h-screen hover:bg-inherit'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <TableHead handleFunction={(value)=>setOrderBy(value)}/>
        <TableBody tableData={tableData} />
        </table>
    </div> : <Loader/>}
  </div>
  )
}

export default MainDashboard;