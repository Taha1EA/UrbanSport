import React, { useState, useEffect } from 'react';
import Notification from '../Composent/ClientsCom/Notification';
import axios from "axios";


function ClassTab() {
    const [currentDay, setCurrentDay] = useState(0);
    const [classDetail, setClassDetail] = useState([]);
    const [sports, setSports] = useState();
    const [offresT, setOffresT] = useState();
    const [notification, setNotification] = useState('');
    const cases=["payed","overdue"];
    const prices={"7":"60","30":"200","180":"1100","360":"2000"}
    const addDays = (date, days) => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    };
    useEffect(() => {
      const url = "http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/admin/selectAdminPs";
      const fetchData = async () => {
          try {
            const response = await axios.get(url);
            if (Array.isArray(response.data)) {
               
                let g1=new Date();
                response.data.forEach((Class) => { 
                    let d1=new Date();
                    let d2 = addDays(new Date(Class[7]), parseInt(Class[8]));
                    console.log(d2.toISOString().split("T")[0]);
                    let c="";
                    if(d1.getTime()<d2.getTime()){
                        c=cases[0];
                    }
                    else{
                        c=cases[1];
                    }
                    setClassDetail(prevState => [...prevState,[Class[0],
                      Class[1],Class[2],
                        `${Class[3]} - ${Class[4]}`,
                        Class[5],Class[6],
                        Class[7],Class[8],c
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
    //delete class
    const deleteClass=(client , sport)=>{
      const url = "http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/admin/deletePs";
      const fetchData = async () => {
        if (client) {
          let classes = new FormData();
          classes.append("idClient", parseInt(client));
          classes.append("idPro", parseInt(sport));
          try {
            const response = await axios.post(url, classes);
            if (response.data) {
              setNotification('The programme has been deleted');
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            } else {
              console.error("Expected an array but got:", response.data);
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      };
      fetchData();
    }
    const [Search, setSearch] = useState();
    const RenewClient = (client, sport ) =>{
    

        const url = "http://localhost/UrbanSport/UrbanSport-Backend-/UrbanSport/admin/renewPs";
                const fetchData = async () => {
                    let classes = new FormData();
                    classes.append("idClient", parseInt(client));
                    classes.append("idPro", parseInt(sport));
                    try {
                        const response = await axios.post(url, classes);
                        if (response.data) {
                          setNotification('The class Has been renew');
                          setTimeout(() => {
                            window.location.reload();
                          }, 2000);
                        } else {
                            console.error("Expected an array but got:", response.data);
                        }
                    } catch (error) {
                        console.error("Error fetching data:", error);
                    }
                };
                fetchData();
      }
  
  
  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">Your Classes</h1>
      <div className='px-8 py-3 text-left text-[12px] font-medium flex text-gray-700 uppercase tracking-wider'>
      <input type="text" name="text" value={Search}  onInput={(e)=>setSearch(e.target.value)} className='border-2 border-blue-500 py-2 px-8 rounded-lg' placeholder='SEARCH by CNIE of client' />
      </div>
      <div className='px-8 py-3 text-center text-[14px] font-medium flex text-gray-800 uppercase tracking-wider dark:text-white'>
      Days content meaning :<br/>1: Monday-Wednesday-Friday<br/>2:Tuesday-Thursday-Saturday
      </div>
      <div className="flex flex-col items-center">
      <div className="overflow-x-auto w-full">
        <div className="inline-block min-w-full py-2 align-middle">
          <div className="overflow-hidden shadow-md sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 text-center">
              <thead className="bg-gray-50 text-center dark:bg-blue-gray-400">
                <tr>
                  <th scope="col" className="px-8 py-3 text-left text-[12px] font-medium text-gray-700 dark:text-white uppercase tracking-wider">
                    Client
                  </th>
                  <th scope="col" className="px-8 py-3 text-left text-[12px] font-medium text-gray-700 dark:text-white dark:text-whiteuppercase tracking-wider">
                    Class
                  </th>
                  <th scope="col" className="px-8 py-3 text-left text-[12px] font-medium text-gray-700 dark:text-white uppercase tracking-wider">
                    Time
                  </th>
                  <th scope="col" className="px-8 py-3 text-left text-[12px] font-medium text-gray-700 dark:text-white uppercase tracking-wider">
                    Days
                  </th>
                  <th scope="col" className="px-8 py-3 text-left text-[12px] font-medium text-gray-700 dark:text-white uppercase tracking-wider">
                    first Regestiration
                  </th>
                  <th scope="col" className="px-8 py-3 text-left text-[12px] font-medium text-gray-700 dark:text-white uppercase tracking-wider">
                    last Renew
                  </th>
                  <th scope="col" className="px-8 py-3 text-left text-[12px] font-medium text-gray-700 dark:text-white uppercase tracking-wider">
                    offre Type
                  </th>
                  <th scope="col" className="px-8 py-3 text-left text-[12px] font-medium text-gray-700 dark:text-white uppercase tracking-wider">
                    case
                  </th>
                  <th scope="col" className="px-8 py-3 text-left text-[12px] font-medium text-gray-700 dark:text-white uppercase tracking-wider">
                    Renew
                  </th>
                  <th scope="col" className="px-8 py-3 text-left text-[12px] font-medium text-gray-700 dark:text-white uppercase tracking-wider">
                    Delete Class
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-center">
                {classDetail.map((c) => {
                    if(c[8]=="payed"){
                        return (
                            <tr className={Search?Search==c[1]?"" : "hidden":""} key={c[0]}>
                                <td className="px-8 py-4 whitespace-nowrap text-[12px] font-medium text-gray-900 dark:text-white dark:bg-gray-900 ">{c[1]}</td>
                                <td className="px-8 py-4 whitespace-nowrap text-[12px] font-medium text-gray-900 dark:text-white dark:bg-gray-900">{c[2]}</td>
                                <td className="px-8 py-4 whitespace-nowrap text-[12px] text-gray-700 dark:text-white dark:bg-gray-900">{c[3]}</td>
                                <td className="px-8 py-4 whitespace-nowrap text-[12px] text-gray-700 dark:text-white dark:bg-gray-900">{c[4]}</td>
                                <td className="px-8 py-4 whitespace-nowrap text-[12px] text-gray-700 dark:text-white dark:bg-gray-900">{c[5]}</td>
                                <td className="px-8 py-4 whitespace-nowrap text-[12px] text-gray-700 dark:text-white dark:bg-gray-900">{c[6]}</td>
                                <td className="px-8 py-4 whitespace-nowrap text-[12px] text-gray-700 dark:text-white dark:bg-gray-900">{c[7]}</td>
                                <td className="px-8 py-4 whitespace-nowrap text-[12px] text-gray-700 dark:text-white dark:bg-gray-900">{c[8]}</td>
                                <td className="px-8 py-4 whitespace-nowrap text-[12px] text-gray-700 dark:text-white dark:bg-gray-900"></td>
                                <td onClick={()=>deleteClass(c[0],c[1])} className="px-8 py-4 whitespace-nowrap text-[12px] text-white bg-orange-500 cursor-pointer hover:bg-white hover:text-orange-500  transition-colors duration-300 border-2 border-white">Delete</td>
                            </tr>
                        )
                    }
                    else{
                        return (
                            <tr className={Search?Search==c[1]?"" : "hidden":""} key={c[0]}>
                                <td className="px-8 py-4 whitespace-nowrap text-[12px] font-medium text-gray-900 dark:bg-gray-900 dark:text-white">{c[1]}</td>
                                <td className="px-8 py-4 whitespace-nowrap text-[12px] font-medium text-gray-900 dark:bg-gray-900 dark:text-white">{c[2]}</td>
                                <td className="px-8 py-4 whitespace-nowrap text-[12px] text-gray-700  dark:bg-gray-900 dark:text-white">{c[3]}</td>
                                <td className="px-8 py-4 whitespace-nowrap text-[12px] text-gray-700 dark:bg-gray-900 dark:text-white">{c[4]}</td>
                                <td className="px-8 py-4 whitespace-nowrap text-[12px] text-gray-700 dark:bg-gray-900 dark:text-white">{c[5]}</td>
                                <td className="px-8 py-4 whitespace-nowrap text-[12px] text-gray-700 dark:bg-gray-900 dark:text-white">{c[6]}</td>
                                <td className="px-8 py-4 whitespace-nowrap text-[12px] text-gray-700 dark:bg-gray-900 dark:text-white">{c[7]}</td>
                                <td className="px-8 py-4 whitespace-nowrap text-[12px] text-gray-700 dark:bg-gray-900 dark:text-white">{c[8]}</td>
                                <td onClick={()=>RenewClient(c[1],c[0])} className="px-8 py-4 whitespace-nowrap text-[12px] text-white bg-red-500 cursor-pointer hover:bg-white hover:text-red-500  transition-colors duration-300  border-white">Renew</td>
                                <td className="bg-white dark:bg-gray-900"></td>
                            </tr>
                        )
                    }
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <Notification message={notification} />
    </div>
  );
}

export default ClassTab;