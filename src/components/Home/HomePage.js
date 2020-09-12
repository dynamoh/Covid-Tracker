import React, { Component } from 'react'
import InfoCard from '../Card/InfoCard'
import LineChart from '../LineChart/LineChart'
import Grid from '@material-ui/core/Grid';
import './HomePage.css'


export class HomePage extends Component {
    render() {
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
                        <LineChart className="comparison-container" />
                    </Grid>
                    
                </Grid>

                </div>
            </div>
        )
    }
}

export default HomePage
