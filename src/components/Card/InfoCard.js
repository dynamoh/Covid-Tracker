import React from 'react'
import './Card.css'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CountUp from 'react-countup'

function InfoCard(props) {

    return (
        <div className="info-card-box" >
            <Card className={`info-card ${props.type}`} >
                <CardContent>
                    <Typography color="textSecondary" style={{ fontSize: '18px' }} gutterBottom>{props.title}</Typography>
                    <Typography variant ="h5">
                        <CountUp 
                            start={0}
                            end={props.count}
                            duration={6}
                            separator=","
                        />
                    </Typography>
                </CardContent>
                <CardActions>
                    <Typography color={`${props.color}`}> 
                        +
                        <CountUp 
                            start={0}
                            end={props.icount}
                            duration={3}
                            separator=","
                        />
                    </Typography>
                </CardActions>
            </Card>
        </div>
    )
}

export default InfoCard
