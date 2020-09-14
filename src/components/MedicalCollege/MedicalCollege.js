import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './MedicalCollege.css'
import {
    MenuItem,
    FormControl,
    Select,
    Card,
    CardContent,
} from "@material-ui/core";

function MedicalCollege() {
    const [medicals, setMedicals] = useState([]);
    const [orginalMedicals, setOrginalMedicals] = useState([]);
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
            })
            .catch(error => {
                console.log(error);
            })

            axios.get('https://api.rootnet.in/covid19-in/hospitals/medical-colleges')
            .then(response => {
                const data = response.data.data.medicalColleges;
                
                setMedicals(data);
                setOrginalMedicals(data);
            })
            .catch(error => {
                console.log(error);
            })
        };
      
        fetchData();

    }, [])

    const stateFilter = (e) => {
        setSstate(e.target.value);
        let search = e.target.value;
        const stSearch = stype;

        if(search === 'INDIA') {
            search = ''
        }

        if(stSearch === "All") {
            const stateFiltered = orginalMedicals.filter(medical => {
                if(medical.state.includes(search)){
                    return true
                }
                return false
            })
            setMedicals(stateFiltered);
            return;
        }

        const stateFiltered = orginalMedicals.filter(medical => {
            if(medical.state.includes(search) && medical.ownership === stSearch ){
                return true
            }
            return false
        })
        setMedicals(stateFiltered);
    }

    const typeFilter = (e) => {
        setStype(e.target.value);
        const search = e.target.value;
        let stSearch = sstate;

        if(stSearch === 'INDIA') {
            stSearch = ''
        }

        if(search === "All") {
            const stateFiltered = orginalMedicals.filter(medical => {
                if(medical.state.includes(stSearch)){
                    return true
                }
                return false
            })
            setMedicals(stateFiltered);
            return;
        }

        const stateFiltered = orginalMedicals.filter(medical => {
            if(medical.ownership === search && medical.state.includes(stSearch)){
                return true
            }
            return false
        })
        setMedicals(stateFiltered);
    }

    return (
        <div className="colleges-container">

            <div clasName="hospitals-head">
                <h3 className="notif-head" > <i class="fas fa-hospital-alt" style={{ marginRight: '15px' }} ></i> Medical Colleges & Beds </h3>
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

                <FormControl className="app__dropdown">
                    <Select
                        variant="outlined"
                        value={stype}
                        onChange={typeFilter}
                    >
                        {types.map((type) => (
                            <MenuItem value={type}>{type}</MenuItem>
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
                        City
                    </th>
                    <th>
                        College
                    </th>
                    <th>
                        Ownership
                    </th>
                    <th>
                        Hospital Beds
                    </th>
                    <th>
                        Admission Capacity
                    </th>
                </tr>

                <tbody style={{  padding:'20px'  }} >
                    {medicals.map((hospital) => {
                        
                        return (
                            <tr>
                                <td> 
                                    {hospital.state}
                                </td>
                                <td>
                                    {hospital.city}
                                </td>

                                <td> 
                                    {hospital.name}
                                </td>
                                <td>
                                    {hospital.ownership}
                                </td>

                                <td> 
                                    {hospital.hospitalBeds}
                                </td>
                                <td> 
                                    {hospital.admissionCapacity}
                                </td>
                                
                            </tr> 
                        )

                    })}
                </tbody>
            </div>
            
        </div>
    )
}

export default MedicalCollege
