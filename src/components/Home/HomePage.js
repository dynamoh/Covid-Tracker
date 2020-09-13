import React, { Component } from 'react'
import InfoCard from '../Card/InfoCard'
import LineChart from '../LineChart/LineChart'
import Grid from '@material-ui/core/Grid';
import './HomePage.css'
import axios from 'axios'
import Notifications from '../NotificationsBox/Notifications';
import Map from '../Map/Map';
import Helpline from '../Helpline/Helpline';
import MedicalCollege from '../MedicalCollege/MedicalCollege';
import Hospitals from '../Hospitals/Hospitals';


class HomePage extends Component {

    state = {
        labels: [],
        sampleTested: [],
        confirmedCases: [],
        mapCountries:[],
        countries:[],
        total:0,
        recovered:0,
        deaths:0,
        itotal: 0,
        irecovered: 0,
        ideaths: 0,
    }

    componentDidMount() {
        axios.get('https://api.rootnet.in/covid19-in/stats/history')
        .then(response => {
            const data = response.data.data;
            this.setState({
                labels: data.map((info) => info.day),
                confirmedCases: data.map((info) => info.summary.total)
            })
        })
        .catch(error => {
            console.log(error);
        })

        axios.get('https://api.rootnet.in/covid19-in/stats/testing/history')
        .then(response => {
            const data = response.data.data;

            this.setState({
                sampleTested: data.map((info) => info.totalSamplesTested)
            })
        })
        .catch(error => {
            console.log(error);
        })

        const getCountriesData = async () => {
            fetch("https://disease.sh/v3/covid-19/countries")
              .then((response) => response.json())
              .then((data) => {
                const countries = data.map((country) => ({
                  name: country.country,
                  value: country.countryInfo.iso2,
                }));

                this.setState({
                    countries:countries,
                    mapCountries:data,
                });
              });
        };
        getCountriesData();

        axios.get('https://disease.sh/v3/covid-19/countries/india')
        .then(response => {
            const cases = response.data.cases;
            const todayCases = response.data.todayCases;

            const recovered = response.data.recovered;
            const todayRecovered = response.data.todayRecovered;

            const deaths = response.data.deaths;
            const todayDeaths = response.data.todayDeaths;

            this.setState({
                total:cases,
                recovered:recovered,
                deaths:deaths,
                itotal: todayCases,
                irecovered: todayRecovered,
                ideaths: todayDeaths,
            })
            
        })
        .catch(error => {
            console.log(error);
        })

    }

    render() {
        const { labels, sampleTested, confirmedCases, total, recovered, deaths, itotal, irecovered, ideaths } = this.state;

        return (
            <div>
                <div className="section-head1">

                    <Grid container spacing={2}>

                        <Grid container item sm={5} xs={12} >
                            <div className="guidelines-container" >
                                <Notifications />
                            </div>
                        </Grid>

                        <Grid container item sm={7} xs={12} >
                            <Grid style={{ marginBottom: '18px' }} container item xs={12} spacing={2} >
                                <Grid item xs={4}>
                                    <InfoCard title="Total Cases" type="infected" icount={itotal} count={total} color="primary"  />
                                </Grid>
                                <Grid item xs={4}>
                                    <InfoCard title="Recoveries" type="recovered" icount={irecovered} count={recovered} color="secondary"  />
                                </Grid>
                                <Grid item xs={4}>
                                    <InfoCard title="Deaths" type="deaths" icount={ideaths} count={deaths} color="error" />
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <div className="map-container" >
                                    <Map
                                        countries={this.state.mapCountries}
                                        casesType={"cases"}
                                        center={{ lat: 20, lng: 77 }}
                                        zoom={3.6}
                                    />
                                </div>
                            </Grid>
                            
                        </Grid>
                        
                    </Grid>

                </div>

                <div className="section-head2">

                    <Grid container spacing={2}>

                        <Grid container item xs={12}>
                            <LineChart labels={labels} confirmedCases={confirmedCases} sampleTested={sampleTested} className="comparison-container" />
                        </Grid>
                        
                    </Grid>

                </div>

                <div className="section-head3">

                    <Grid container spacing={2}>                        

                        <Grid container item xs={5}>
                            <Helpline />
                        </Grid>

                        <Grid container item xs={7}>
                            <Helpline />
                        </Grid>
                        
                    </Grid>

                </div>

                <div className="section-head3">
                    <Grid container spacing={2} >
                        <Grid container item xs={6} >
                            <Hospitals />
                        </Grid>
                        
                        <Grid container item xs={6}>
                            <MedicalCollege />
                        </Grid>
                    </Grid>
                </div>

            </div>
        )
    }
}

export default HomePage
