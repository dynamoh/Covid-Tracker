import React, { useState, useEffect } from 'react'
import './LineChart.css'
import axios from 'axios'
import Grid from '@material-ui/core/Grid';
import { Line } from 'react-chartjs-2';
import TextField from '@material-ui/core/TextField';
import {
    MenuItem,
    FormControl,
    Select, Button
} from "@material-ui/core";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Tooltip from '@material-ui/core/Tooltip';

function LineChart(props) {

    const [states, setStates] = useState([]);
    const [deceased, setDeceased] = useState([]);
    const [original, setOriginal] = useState([]);
    const [sstate, setSstate] = useState("INDIA");
    const [sgender, setSgender] = useState("All");
    const [sage, setSAge] = useState("All");
    const [sdate, setSdate] = useState("");
    const [edate, setEdate] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState(["All","female", "male", "other"]);
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

            axios.post('https://covid-tracker-server.herokuapp.com/api/patients/get-info/', {'status':'Deceased'})
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

                const final_data = [];
                if(patients.length > 0) {

                    final_data.push({
                        'date': patients[0].date,
                        'value': patients[0].value,
                    })
                    
                    for(let i=0; i<patients.length-1;i++) {
                        var dt = new Date(patients[i].date);
                        var ed = new Date(patients[i+1].date);
                        dt.setDate( dt.getDate() + 1 );

                        var diff = (ed.getTime() - dt.getTime())/(1000 * 3600 * 24);
                        
                        while (diff > 0) {
                            final_data.push({
                                'date':dt.toISOString().split('T')[0],
                                'value':0
                            })
                            dt.setDate( dt.getDate() + 1 );
                            diff -= 1;
                        }

                        final_data.push({
                            'date':ed.toISOString().split('T')[0],
                            'value': patients[i+1].value,
                        })

                    }
                    setSdate(final_data[0].date);
                    setEdate(final_data[final_data.length-1].date);
                }

                setDeceased(final_data);
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
        filterData(sdate, edate, sage, sgender, e.target.value);
    }

    const genderFilter = (e) => {
        setSgender(e.target.value);
        filterData(sdate, edate, sage, e.target.value, sstate);
    }

    const ageFilter = (e) => {
        setSAge(e.target.value);
        filterData(sdate, edate, e.target.value, sgender, sstate);
    }

    const startDateFilter = (e) => {
        setSdate(e.target.value);
        filterData(e.target.value, edate, sage, sgender, sstate);
    }

    const endDateFilter = (e) => {
        setEdate(e.target.value);
        filterData(sdate, e.target.value, sage, sgender, sstate);
    }

    const resetData = (e) => {
        setEdate(original[original.length-1].date);
        setSdate(original[0].date);
        setSgender("All");
        setSAge("All");
        setSstate("INDIA");
        
        filterData(original[0].reported_on, original[original.length-1].reported_on, "All", "All", "INDIA");
    }

    const sendEmail = (e) => {
        e.preventDefault();
        var email = window.document.getElementById('email-value').value;

        let formData = new FormData();
        formData.append('email', email);
                
        let input = document.getElementsByClassName("chartjs-render-monitor")[0];

        const pdf = new jsPDF({ orientation: "l" });
        pdf.addImage(input.toDataURL(), "JPEG", 15, 40, 250, 100);

        formData.append("file", pdf);

        for (var key of formData.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }
        
        axios.post('http://127.0.0.1:8000/api/patients/send-stats-mail/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            alert("error");
            console.log(error);
        })
    }

    const filterData = (start_date, end_date, age, gender, state) => {
        var stdate = start_date;
        var eddate = end_date;

        const sa = age;
        let sg = gender;
        let ss = state;

        let sta = sa.split("-")[0];
        let eda = sa.split("-")[1];

        let filteredData = [];

        if(sa === 'All') {
            filteredData = original;
        }
        else if(sa === '70+') {
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

        filteredData = filteredData.filter(data => {
            if(data.reported_on >= stdate && data.reported_on<= eddate) {
                return true
            }
            return false
        })

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

        const final_data = [];
        if(patients.length > 0) {

            final_data.push({
                'date': patients[0].date,
                'value': patients[0].value,
            })
            
            for(let i=0; i<patients.length-1;i++) {
                var dt = new Date(patients[i].date);
                var ed = new Date(patients[i+1].date);
                dt.setDate( dt.getDate() + 1 );

                var diff = (ed.getTime() - dt.getTime())/(1000 * 3600 * 24);
                
                while (diff > 0) {
                    final_data.push({
                        'date':dt.toISOString().split('T')[0],
                        'value':0
                    })
                    dt.setDate( dt.getDate() + 1 );
                    diff -= 1;
                }

                final_data.push({
                    'date':ed.toISOString().split('T')[0],
                    'value': patients[i+1].value,
                })

            }

            if(final_data.length > 1) {
                setSdate(final_data[0].date);
                setEdate(final_data[final_data.length-1].date);
            }
        }

        setDeceased(final_data);
    }

    const div2PDF = (e) => {
        let input = document.getElementsByClassName("chartjs-render-monitor")[0];

        const pdf = new jsPDF({ orientation: "l" });
        pdf.addImage(input.toDataURL(), "JPEG", 15, 40, 250, 100);
        pdf.save("deceased_stats.pdf");
    };


    return (
        <div className="comparison-container" >

            <Grid container spacing={2}>
                <Grid id="deceased-stats-graph" className="left-graph-container" item container xs={10} spacing={2} >
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

                <Grid className="right-graph-filters" style={{ position:'relative' }} item container xs={2}>

                    <Tooltip title="download graph" placement="right">
                        <span style={{ position: 'absolute', right:'16px', top: '8px', cursor:'pointer' }} >
                            <i onClick={div2PDF} class="fas fa-download"></i>
                        </span>
                    </Tooltip>

                    <Tooltip title="reset" placement="right">
                        <span style={{ position: 'absolute', right:'50px', top: '8px', cursor:'pointer' }} >
                            <i onClick={resetData} class="fas fa-undo"></i>
                        </span>
                    </Tooltip>

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
                        <TextField
                            id="start_date"
                            variant="outlined"
                            type="date"
                            value={sdate}
                            maxValue={edate}
                            onChange={startDateFilter}
                            InputLabelProps={{
                                shrink: false,
                            }}
                        />

                        {/* <Select
                            
                            value={sstate}
                            onChange={stateFilter}
                        >
                            {states.map((state) => (
                                <MenuItem value={state}>{state}</MenuItem>
                            ))}
                        </Select> */}

                        <TextField
                            id="end_date"
                            variant="outlined"
                            type="date"
                            minValue = {sdate}
                            value={edate}
                            onChange={endDateFilter}
                            InputLabelProps={{
                                shrink: false,
                            }}
                        />

                        <br />
                        <form  onSubmit={sendEmail} >
                            <label>Send graph on email</label>
                            <input type="email" required class="email-box" onChange={e => setEmail(e.target.value)} value={email} placeholder="Enter your email" id="email-value" />
                            <br />
                            <Button type="submit" variant="contained" color="primary" >Submit</Button>
                        </form>
                        
                    </FormControl>
                </Grid>
            </Grid>
            
        </div>
    )
}

export default LineChart
