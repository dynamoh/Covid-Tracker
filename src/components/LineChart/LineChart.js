import React, { useState, useEffect } from 'react'
import './LineChart.css'
import axios from 'axios'
import Grid from '@material-ui/core/Grid';
import { Line, Bar } from 'react-chartjs-2';
import {
    MenuItem,
    FormControl,
    Select,
    Card,
    CardContent,
} from "@material-ui/core";

function LineChart(props) {

    const [states, setStates] = useState([]);
    const [deceased, setDeceased] = useState([]);
    const [original, setOriginal] = useState([]);
    const [sstate, setSstate] = useState("INDIA");
    const [sgender, setSgender] = useState("All");
    const [sage, setSAge] = useState("All");
    const [gender, setGender] = useState(["All","Female", "Male", "Other"]);
    const [age, setAge] = useState(["All", "0-9", "10-19", "20-29", "30-39", "40-49", "50-59", "60-69", "70+"]);

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

            axios.post('http://127.0.0.1:8000/api/patients/get-info/', {'status':'Deceased'})
            .then(response => {
                const data = response.data.body;
                console.log(data);
                const patientData = data.reduce((deceased, { reported_on }) => {
                    if (!deceased[reported_on]) deceased[reported_on] = 0;
                    deceased[reported_on] += 1;
                    return deceased;
                }, {});
                
                const patients = [];
                for( var key in patientData ) {
                    patients.push({
                        'date': key,
                        'value': patientData[key]
                    })
                }

                if(patients.length > 0) {
                    var dt = new Date(patients[0].date);
                    dt.setDate( dt.getDate() - 1 );
                    patients.unshift({
                        'date':dt.toISOString().split('T')[0],
                        'value':0,
                    })
                }

                setDeceased(patients);
                setOriginal(data);
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
    }

    const genderFilter = (e) => {
        setSgender(e.target.value);
        const search = e.target.value;
    }

    const ageFilter = (e) => {
        setSAge(e.target.value);
        const search = e.target.value;
        let sg = sgender;
        let ss = sstate;

        let sta = search.split("-")[0];
        let eda = search.split("-")[1];

        let filteredData = [];

        if(search === '70+') {
            filteredData = original.filter(data => {
                if(data.age >= 70 ) {
                    return true
                }
                return false
            })            
        }
        else {
            sta = parseInt(sta);
            eda = parseInt(eda);
            filteredData = original.filter(data => {
                if(data.age>=sta && data.age<=eda) {
                    return true
                }
                return false
            })
        }  

        if(sg !== 'All') {
            filteredData = filteredData.filter(data => {
                if(data.gender === sg) {
                    return true
                }
                return false
            })
        }

        if(ss !== 'INDIA') {
            filteredData = filteredData.filter(data => {
                if(data.state === ss) {
                    return true
                }
                return false
            })
        }

        const patientData = filteredData.reduce((deceased, { reported_on }) => {
            if (!deceased[reported_on]) deceased[reported_on] = 0;
            deceased[reported_on] += 1;
            return deceased;
        }, {});
        
        const patients = [];
        for( var key in patientData ) {
            patients.push({
                'date': key,
                'value': patientData[key]
            })
        }

        if(patients.length > 0) {
            var dt = new Date(patients[0].date);
            dt.setDate( dt.getDate() - 1 );
            patients.unshift({
                'date':dt.toISOString().split('T')[0],
                'value':0,
            })
        }

        setDeceased(patients);
    }

    const dateFilter = (e) => {
        // setSstate(e.target.value);
        // const search = e.target.value;
    }

    console.log(deceased);

    return (
        <div className="comparison-container" >

            <Grid container spacing={2}>
                <Grid className="left-graph-container" item container xs={10} spacing={2} >
                    <Line 
                        data = {{
                            labels: deceased.map(data => data.date),
                            datasets:[{
                                data: deceased.map(data => data.value),
                                label:'Deceased',
                                borderColor:'red',
                                pointRadius: 0,
                                fill:true,
                            }],
                        }}
                    />
                </Grid>

                <Grid className="right-graph-filters" item container xs={2}>
                    <FormControl style={{ marginTop: '25px', marginLeft: '5px' }} className="app__dropdown">
                        <label>Select State</label>
                        <Select
                            variant="outlined"
                            value={sstate}
                            onChange={stateFilter}
                        >
                            {states.map((state) => (
                                <MenuItem value={state}>{state}</MenuItem>
                            ))}
                        </Select>
                        <br />

                        <label>Select Gender</label>
                        <Select
                            variant="outlined"
                            value={sgender}
                            onChange={genderFilter}
                        >
                            {gender.map((state) => (
                                <MenuItem value={state}>{state}</MenuItem>
                            ))}
                        </Select>
                        <br />

                        <label>Select Age group</label>
                        <Select
                            variant="outlined"
                            value={sage}
                            onChange={ageFilter}
                        >
                            {age.map((state) => (
                                <MenuItem value={state}>{state}</MenuItem>
                            ))}
                        </Select>
                        <br />

                        <label>Select date range</label>
                        <Select
                            variant="outlined"
                            value={sstate}
                            onChange={stateFilter}
                        >
                            {states.map((state) => (
                                <MenuItem value={state}>{state}</MenuItem>
                            ))}
                        </Select>

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
                </Grid>
            </Grid>

            
        </div>
    )
}

export default LineChart
