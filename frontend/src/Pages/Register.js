import React from 'react';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, FormControl, FormLabel, RadioGroup,Radio, Checkbox, Typography } from '@material-ui/core';
import Logo from "../assets/logo.png";
import { Face, Fingerprint, AccountCircle, Email } from '@material-ui/icons'
import { withRouter } from 'react-router';
import axios from 'axios';


const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 8,
        
    },
    padding: {
        padding: theme.spacing.unit * 4,
    },
    root:{
        height : "auto",
        backgroundColor :"#fcf2f8",
        paddingBottom:"5em"
    }
});

function Register(props) {


    const REGISTER_URI = '/api/register';

    const [state,setState] =  React.useState({
        firstname :{
            value :"",
            error:null
        }, 
        lastname :{
            value :"",
            error:null
        }, 
        email :{
            value :"",
            error:null
        }, 
        password :{
            value :"",
            error:null
        }, 
        username :{
            value :"",
            error:null
        }, 
        gender :{
            value :"MALE",
            error:null
        }        
    })



    const handleChange = (e) => {
        setState({ ...state, [e.target.name] : { value : e.target.value, error : null }})
       
    }


    const handleSubmit = () => {
        const payload = {
            firstName  : state.firstname.value, 
            lastName  :state.lastname.value, 
            userName : state.username.value,
            password : state.password.value, 
            email : state.email.value, 
            gender : state.gender.value             
        }

        axios.post( REGISTER_URI, payload)
            .then( response => {
                console.log(response);
                if ( response.status === 200 ){
                    props.history.push('/login');
                }
            }).catch( err => console.log(err));
    }




        const { classes } = props;

        return (
            <Grid container justify="center" alignItems="center" spacing={4} className={classes.root}>
                <Grid container justify="center">
                    <Grid item>
                        <img src={Logo} height={200} width={200}/>
                    </Grid>
                </Grid>
            <Paper className={classes.padding}>                
                <div className={classes.margin}>
                    <Grid container justify="center" spacing={8} alignItems="center">
                        <Grid item>
                            <Typography variant="h2">Register</Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={4} alignItems="flex-end">
                        <Grid item>
                            <AccountCircle />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="firstname" label="First Name" name="firstname" onChange={handleChange} value={state.firstname.value} fullWidth autoFocus required />
                        </Grid>
                        <Grid item>
                            <AccountCircle />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="lastname" label="Last Name" name="lastname" onChange={handleChange} value={state.lastname.value} fullWidth autoFocus required />
                        </Grid>
                        
                    </Grid>
                    <Grid container spacing={4} alignItems="flex-end">                       
                        <Grid item>
                            <Fingerprint />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="password" label="Password" type="password" onChange={handleChange} name="password" value={state.password.value} fullWidth required />
                        </Grid>
                        <Grid item>
                            <Email />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="email" label="Email" type="email" name="email" onChange={handleChange} value={state.email.value} fullWidth autoFocus required />
                        </Grid>
                        
                    </Grid>
                    <Grid container spacing={4} alignItems="flex-end">
                         <Grid item>
                            <Face />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="username" label="username" name="username" onChange={handleChange} value={state.username.value} fullWidth autoFocus required />
                        </Grid>                        
                    </Grid>
                    <Grid container justify="flex-start" style={{marginTop:"1.3em"}}>
                         <FormControl component="fieldset">
                            <FormLabel component="legend">Gender</FormLabel>
                            {/* value={value} onChange={handleChange} */}
                            <RadioGroup aria-label="gender" name="gender" value={state.gender.value} onChange={handleChange} >
                                <FormControlLabel value="FEMALE" control={<Radio />} label="Female" />
                                <FormControlLabel value="MALE" control={<Radio />} label="Male" />                                                                
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                   
                    <Grid container justify="center" style={{ marginTop: '40px' }}>
                        <Button variant="outlined" color="primary" onClick={handleSubmit}
                        style={{ textTransform: "none" }}>Sign Up</Button>
                    </Grid>
                </div>
            </Paper>
            </Grid>
        );
}


export default withRouter(withStyles(styles)(Register));