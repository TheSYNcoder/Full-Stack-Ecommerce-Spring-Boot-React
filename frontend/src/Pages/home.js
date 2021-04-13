import React from 'react';
import {Container, Grid, Typography} from "@material-ui/core";
import { fade, makeStyles } from '@material-ui/core/styles';
import Logo from "../assets/logo.png";
import { Link, withRouter  } from 'react-router-dom';
import data from "../data";
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import AuthContext from "../context";
import {Input } from '@material-ui/icons';
import axios from 'axios';


const useStyles = makeStyles( (theme) => ({
    heading:{
        fontFamily:"Lobster,cursive",
        color:"#fc30d0",

    },
    image :{
        borderRadius:"40px"
    },
    end:{
        display : "flex",
        justifyContent:"flex-end",
    }
}))

const Home = (props) => {

    const { auth , setAuth ,user } = React.useContext(AuthContext);
    const classes = useStyles();
    const lstate = props.history.location.state;
    const cond = props.history.location.state !== undefined && props.history.location.state.message !== undefined
    const [open, setOpen] = React.useState(cond);

    const handleLogout = () => {
        axios.get('/api/logout')
            .then(response => {
                if (response.status === 200) {
                    setAuth(false);
                    props.history.push('/')
                }
            }).catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            <Container>
                <Grid container justify="center">
                    <Collapse in={open}>
                        <Alert
                        style={{marginTop:"3em"}}
                        severity="error"
                        action={
                            <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                            >
                            <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        >
                        {
                            cond && 
                            props.history.location.state.message
                        }
                        </Alert>
                    </Collapse>                    
                </Grid>
                <Grid container justify="space-between" >
                    <Grid justify="flex-start">
                        <Grid item style={{padding:"2em"}}>
                            <Link to="/products">
                                <Typography variant="h5"  color="textSecondary">Products</Typography>
                            </Link>
                        </Grid>
                    </Grid>
                    { auth && user !== null ? 
                     <Grid className={classes.end}>
                        <Grid item style={{padding:"2em"}}>
                            
                            <Typography variant="h5"  color="textSecondary">Welcome {user.email}</Typography>
                            
                        </Grid>
                        <Grid item style={{padding:"2em"}}>
                            
                            <Typography variant="h5"  onClick={handleLogout}
                            color="textSecondary" gutterBottom >Logout</Typography>
                            
                        </Grid>
                    </Grid> :
                    <Grid className={classes.end}>
                        <Grid item style={{padding:"2em"}}>
                            <Link to="/register">
                                <Typography variant="h5"  color="textSecondary">Register</Typography>
                            </Link>
                        </Grid>
                        <Grid item style={{padding:"2em"}}>
                            <Link to="/login">
                                <Typography variant="h5" color="textSecondary" >Login</Typography>
                            </Link>
                        </Grid>
                    </Grid>
                    }
                </Grid>
                <Grid container justify="space-around" alignItems="center" direction="column" >
                    
                        <Grid xs={12} sm={4} item>
                            <img src={Logo} />         
                       </Grid>               
                    
                    
                        <Grid xs={12} sm={6} item>
                            <Typography variant="h3" align="center" className={classes.heading} >Have the flamboyance in you have no bounds</Typography>
                            <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom={true} >Shop for the new trends at never seen prices</Typography>
                        </Grid>
                    
                </Grid>

                <Grid container justify="center" alignItems="center" style={{marginTop:"3em"}} >
                    <Grid xs={12} sm={4} item>
                        <img src={`https://${data.data[3].image}`} className={classes.image} />                    
                    </Grid>
                    <Grid xs={12} sm={2} item>
                        <Typography variant="h4" color="secondary">Grab the latest fashion items</Typography>
                    </Grid>
                    
                    <Grid xs={12} sm={4} item>
                        <img src={`https://${data.data[1].image}`} className={classes.image} />                    
                    </Grid>
                    <Grid xs={12} sm={2} item>
                        <Typography variant="h4" color="secondary">At affordable prices</Typography>
                    </Grid>
                </Grid>
                <Grid container justify="center" alignItems="center" style={{marginTop:"5em"}} direction="column">
                    <Grid item>
                        <Link to="/login">
                            <Typography variant="h2" gutterBottom="true" 
                            color="secondary">Register now</Typography>
                        </Link>
                    </Grid>
                    <Grid item>
                        
                            <Typography variant="h4" gutterBottom="true" 
                            color="textSecondary">Explore more trends</Typography>
                        
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}


export default withRouter(Home);
