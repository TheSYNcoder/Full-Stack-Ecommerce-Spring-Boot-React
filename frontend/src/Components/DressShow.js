import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Grid, Typography,Paper, Button, IconButton } from "@material-ui/core";




const useStyles = makeStyles((theme) => ({
    image: {
        borderRadius: "20px",
        maxHeight : "400px",
        maxWidth :"500px",
    },
    paper :{
        margin :"1em",
        width :"auto",
        borderRadius: "20px",
    },
    
}))

const DressCard = ({dress}) => {

   

    const classes = useStyles();

    return (
        <div>
        <Paper outlined elevation={10} className={classes.paper} >
            <Grid container alignItems="center" direction="column">
                <Grid item container justify="center">
                    <img src={`https://${dress.image}`} className={classes.image} />
                </Grid>
                <Grid item >
                    <Typography variant="subtitle1" color="textSecondary">{dress.dresstype}</Typography>
                </Grid>
                {dress.arrival.toLowerCase() === "new" ?
                    <Grid item>
                        <Typography variant="h5" color="primary">New Arrival</Typography>
                    </Grid>
                    : <Grid></Grid>
                }
                {
                    dress.arrival.toLowerCase() === "old" ?
                        <Grid item>
                            <Typography variant="h5">Price : 
                            <span style={{textDecoration:"line-through"}}>
                                    ₹ {dress.price}</span>
                                {' '} <span style={{ color: "red" }}>{dress.discount}</span></Typography>
                        </Grid>
                        : <Grid>₹ {dress.price}</Grid>
                }
            </Grid>
        </Paper>            
        </div>
    )
}

export default DressCard;