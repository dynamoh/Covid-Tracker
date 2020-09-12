import React, { useState, useEffect } from 'react'
import './LineChart.css'
import { Line, Bar } from 'react-chartjs-2'

function LineChart(props) {

    return (
        <div className="comparison-container" >
            <Line 
                data = {{
                    labels:props.labels,
                    datasets:[{
                        data: props.confirmedCases,
                        label:'Confirmed Cases',
                        borderColor:'red',
                        pointRadius: 0,
                        fill:true,
                    },{
                        data: props.sampleTested,
                        label:'Sample Tested',
                        borderColor:'green',
                        pointRadius: 0,
                        fill:true,
                    }],
                }}
            />
        </div>
    )
}

export default LineChart
