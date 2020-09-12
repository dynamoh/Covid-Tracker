import React, { Component } from 'react'
import InfoCard from '../Card/InfoCard'
import LineChart from '../LineChart/LineChart'
import Grid from '@material-ui/core/Grid';
import './HomePage.css'
import axios from 'axios'
import Notifications from '../NotificationsBox/Notifications';
import Map from '../Map/Map';


class HomePage extends Component {

    state = {
        labels: [],
        sampleTested: [],
        confirmedCases: [],
        mapCountries:[],
        countries:[],
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
            console.log(data)
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
    }

    render() {
        const { labels, sampleTested, confirmedCases } = this.state;

        return (
            <div>
                <div className="section-head1">

                    <Grid container spacing={2}>

                        <Grid container item xs={5} spacing={2}>
                            <Grid item xs={6}>
                                <InfoCard />
                            </Grid>
                            <Grid item xs={6}>
                                <InfoCard />
                            </Grid>
                            <Grid item xs={6}>
                                <InfoCard />
                            </Grid>
                            <Grid item xs={6}>
                                <InfoCard />
                            </Grid>
                        </Grid>

                        <Grid item xs={7}>
                            <LineChart labels={labels} confirmedCases={confirmedCases} sampleTested={sampleTested} className="comparison-container" />
                        </Grid>
                        
                    </Grid>

                </div>

                <div className="section-head2">

                    <Grid container spacing={2}>

                        <Grid item xs={7}>
                            <div className="map-container" >
                                {/* <Map
                                    countries={this.state.mapCountries}
                                    casesType={"cases"}
                                    center={{ lat: 34.80746, lng: -40.4796 }}
                                    zoom={3}
                                /> */}
                            </div>
                        </Grid>

                        <Grid item xs={5}>
                            <div className="guidelines-container" >
                                <Notifications />
                            </div>
                        </Grid>
                        
                    </Grid>

                </div>

                <div className="section-head3">

                    <Grid container spacing={2}>

                        <Grid item xs={7}>
                            <div className="hospitals-container" >
                                
                            </div>
                        </Grid>

                        <Grid item xs={5}>
                            <div className="colleges-container" >

                            </div>
                        </Grid>
                        
                    </Grid>

                </div>
            </div>
        )
    }
}

export default HomePage
