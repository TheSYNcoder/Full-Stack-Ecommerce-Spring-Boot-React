import React from 'react';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox, Typography } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import { withRouter } from 'react-router';
import AuthContext from "../context";
const axios = require('axios');



const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 8,
        
    },
    padding: {
        padding: theme.spacing.unit * 8,
    },
    root:{
        height : "100vh",
        backgroundColor :"#fcf2f8"
    }
});






function LoginTab(props) {


        const LOGIN_URI  = '/api/login';

        const  { auth , setAuth } = React.useContext(AuthContext);
    
        const [state,setState] = 
         React.useState({            
            email :{
                value :"",
                error:null
            }, 
            password :{
                value :"",
                error:null
            }                
        })

        const handleSubmit = () => {
            const params = new URLSearchParams();
            params.append('username', state.email.value);
            params.append('password' , state.password.value);
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }            

            axios.post( LOGIN_URI , params , config)
                .then( (response) => {
                    
                    if ( response.status === 200 ){
                        setAuth(true);
                        props.history.push('/');
                    }
                })
                .catch( (err) => {
                    console.log(err);
                });
        }

        const handleChange = (e) => {
            setState({...state, [e.target.name] : { value : e.target.value, error :null}})
        }


        const { classes } = props;

        return (
            <Grid container justify="center" alignItems="center" spacing={4} className={classes.root}>
                <Grid container justify="center">
                    <Typography variant="h1" style={{fontFamily:"Lobster,cursive", color:"#f224a0"}}>Flam Up</Typography>
                </Grid>
            <Paper className={classes.padding}>                
                <div className={classes.margin}>
                    <Grid container justify="center" spacing={8} alignItems="center">
                        <Grid item>
                            <Typography variant="h2">Login</Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Face />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="username" label="Email" type="email" name="email" value={state.email.value} onChange={handleChange} fullWidth autoFocus required />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Fingerprint />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="password" label="Password" type="password" name="password" state={state.password.value} onChange={handleChange} fullWidth required />
                        </Grid>
                    </Grid>
                    {/* <Grid container alignItems="center" justify="space-between">
                        <Grid item>
                            <FormControlLabel control={
                                <Checkbox
                                    color="primary"
                                />
                            } label="Remember me" />
                        </Grid>
                        <Grid item>
                            <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password ?</Button>
                        </Grid>
                    </Grid> */}
                    <Grid container justify="center" style={{ marginTop: '40px' }}>
                        <Button variant="outlined" color="primary" onClick={handleSubmit}
                        style={{ textTransform: "none" }}>Login</Button>
                    </Grid>
                </div>
            </Paper>
            </Grid>
        );
    }


export default withRouter(withStyles(styles)(LoginTab));