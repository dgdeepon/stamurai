import React from 'react'

interface props{
  handleFunction: (args1: string)=> void
}

const TableHead = ({handleFunction}: props): React.JSX.Element => {
    const headings: {label:string, name?: string}[] = [{label: 'SL.'},{label:'City', name: 'name'},{label:'Country', name:'cou_name_en'},{label:'Country Code', name:'country_code'},{label:'Population', name:'population'},{label:'Timezone', name:'timezone'},{label:'Longitude'},{label:'Latitude'}];
  return (
    <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 p-8 text-center'>
        <tr>
        {
            headings?.map((el,i)=>(
                <th key={el.label+i} className={`p-3 ${el.name && 'cursor-pointer hover:bg-white'}`} onClick={()=>{
                  if(el.name){
                    handleFunction(el.name);
                  }
                }}>
                        {el.label}
                    </th>
            ))
        }
        </tr>
    </thead>
  )
}

export default TableHead