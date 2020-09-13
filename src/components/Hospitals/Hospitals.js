import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Hospitals.css'
import {
    MenuItem,
    FormControl,
    Select,
    Card,
    CardContent,
} from "@material-ui/core";

function Hospitals() {

    const [hospitals, setHospitals] = useState([]);
    const [states, setStates] = useState([]);
    const [sstate, setSstate] = useState("INDIA");
    const [stype, setStype] = useState("All");
    const [types, setTypes] = useState(["All", "Govt.", "Trust", "Society", "University", "Govt-Society", "Private"]);

    useEffect(() => {

        const fetchData = async () => {
            axios.get('https://api.rootnet.in/covid19-in/hospitals/beds')
            .then(response => {
                const data = response.data.data.regional;
                const states = data.map(data => data.state);
                
                setStates(states);
                setHospitals(data);
            })
            .catch(error => {
                console.log(error);
            })
        };
      
        fetchData();

    }, [])

    const stateFilter = (e) => {
        setSstate(e.target.value);
        const search = e.target.value;
        const stateFiltered = hospitals.filter(hospital => {
            if(hospital.state.includes(search)){
                return true
            }
            return false
        })
        setHospitals(stateFiltered);
    }

    const typeFilter = (e) => {
        setStype(e.target.value);
    }

    return (
        <div className="colleges-container">

            <div clasName="hospitals-head">
                <h3 className="notif-head" > Hospitals & Beds </h3>
            </div>

            <div className="hospitals-filter">
                <FormControl className="app__dropdown">
                    <Select
                        variant="outlined"
                        value={sstate}
                        onChange={stateFilter}
                    >
                        {states.map((state) => (
                            <MenuItem value={state}>{state}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            <div className="table" style={{ paddingTop:'0px', marginTop:'0px', width:'100%', height:'500px', paddingBottom:'10px' }} >
                <tr className="table-head" >
                    <th>
                        State
                    </th>
                    <th>
                        Rural Hospitals
                    </th>
                    <th>
                        Rural Beds
                    </th>
                    <th>
                        Urban Hospitals
                    </th>
                    <th>
                        Urban Beds
                    </th>
                    <th>
                        Total Hospitals
                    </th>
                    <th>
                        Total Beds
                    </th>

                </tr>

                <tbody style={{  padding:'20px'  }} >
                    {hospitals.map((hospital) => {
                        
                        return (
                            <tr>
                                <td> 
                                    {hospital.state}
                                </td>
                                <td>
                                    {hospital.ruralHospitals}
                                </td>

                                <td> 
                                    {hospital.ruralBeds}
                                </td>
                                <td>
                                    {hospital.urbanHospitals}
                                </td>

                                <td> 
                                    {hospital.urbanBeds}
                                </td>
                                <td> 
                                    {hospital.totalHospitals}
                                </td>

                                <td>
                                    {hospital.totalBeds}
                                </td>
                                
                            </tr> 
                        )

                    })}
                </tbody>
            </div>
            
        </div>
    )
}

export default Hospitals