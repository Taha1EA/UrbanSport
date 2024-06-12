import React, { useEffect,useState } from 'react'
import axios from "axios"
const ShowRes = () => {
    const [classDetail, setClassDetail] = useState([]);
    let tabF = ["5vs5 inside", "5vs5 inside", "5vs5 inside", "5vs5 outside", "6vs6 outside"];
    useEffect(() => {
        const url = "http://localhost/UrbanSportW/UrbanSport/UrbanSport-Backend-/UrbanSport/admin/selectPsAdmin";
        const fetchData = async () => {
            try {
              const response = await axios.get(url);
              if (Array.isArray(response.data)) {
                  response.data.forEach((Class) => { 
                      setClassDetail(prevState => [...prevState,[Class[0],
                        Class[1],
                        Class[2] ,Class[3],
                          tabF[Class[4]-1],
                          ]]);    
                  })
              } else {
                console.error("Expected an array but got:", response.data);
              }
            } catch (error) {
              console.error("Error fetching data:", error);
            }
        };
        fetchData();
      }, []);
      const [Search, setSearch] = useState();
  return (
    <div className="p-4 flex flex-col items-center">
    <h1 className="text-2xl font-bold mb-4 dark:text-white">active reservation </h1>
    <div className='px-8 py-3 text-left text-xs font-medium flex text-gray-500 uppercase tracking-wider'>
      <input type="text" name="text" value={Search}  onInput={(e)=>setSearch(e.target.value)} className='border-2 border-blue-500 py-2 px-8 rounded-lg' placeholder='SEARCH by CNIE of client' />
    </div>
    <div className="flex flex-col items-center">
    <div className="overflow-x-auto w-full">
      <div className="inline-block min-w-full py-2 align-middle">
        <div className="overflow-hidden shadow-md sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-600  text-center">
            <thead className="bg-red-500 text-center dark:text-white dark:bg-gray-500">
              <tr>
                <th scope="col" className="px-8 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  CNIE
                </th>
                <th scope="col" className="px-8 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  DATE
                </th>
                <th scope="col" className="px-8 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  START HOUR
                </th>
                <th scope="col" className="px-8 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  END HOUR
                </th>
                <th scope="col" className="px-8 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Terrain
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-center">
            {classDetail.map((c) => {
                        return(
                          <tr key={c[0]} className={Search?Search==c[0]?"" : "hidden":""}>
                              <td className="px-8 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white dark:bg-gray-900">{c[0]}</td>
                              <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-white dark:bg-gray-900">{c[1]}</td>
                              <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-white dark:bg-gray-900 ">{c[2]}</td>
                              <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-white dark:bg-gray-900">{c[3]}</td>
                              <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-white dark:bg-gray-900">{c[4]}</td>
                              </tr>
                        )
            })}
              </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  </div>
  )
}

export default ShowRes