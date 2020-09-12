import React from 'react'
import './Card.css'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

function InfoCard() {

    const bull = <span>•</span>;

    return (
        <div className="info-card-box" >
            <Card className="info-card" >
                <CardContent>
                    <Typography variant="h5" component="h2">
                      be{bull}nev{bull}o{bull}lent
                    </Typography>
                    <Typography color="textSecondary">
                      adjective
                    </Typography>
                    <Typography variant="body2" component="p">
                      well meaning and kindly.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Typography variant="h6" color="green" component="h6">
                      + 14%
                    </Typography>
                </CardActions>
            </Card>
        </div>
    )
}

export default InfoCard
