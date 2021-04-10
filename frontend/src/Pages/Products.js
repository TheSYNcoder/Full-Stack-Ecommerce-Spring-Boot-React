import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Appbar from "../Components/AppBar";

import { Typography , Grid, Button, TextField } from "@material-ui/core";
import data from "../data";
import DressCard from "../Components/DressShow";
import { Search } from "@material-ui/icons";

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
    },
    searchItem :{
        padding :"1em",
        backgroundColor :"rgb(255,0,0,0.2)",
        borderRadius :"50px",
        margin:"0.5em"
    }
}))


const Products = () => {


    const classes = useStyles();
    
    let posts = data.data;
    const [next, setNext] = React.useState(10);
    const [postsToShow, setPostsToShow] = React.useState([]);


    const [total, setTotal] = React.useState( posts.length);
    const postsPerPage = 10;
    const loopWithSlice = (start, end) => {
        const slicedPosts = posts.slice(start, end);
        let arrayForHoldingPosts = [...postsToShow, ...slicedPosts];
        setPostsToShow(arrayForHoldingPosts);
    };

    React.useEffect(() => {
        if ( postsToShow.length === 0){
            loopWithSlice(0, postsPerPage);
        }
    }, []);

    const handleShowMorePosts = () => {
        loopWithSlice(next, next + postsPerPage);
        setNext(next + postsPerPage);
    };


    const [ search, setSearch ] = React.useState('');
 
    const handleChange= (e) => {
        setSearch(e.target.value);
    }

    const handleKeyDown =(e) => {
        if ( e.keyCode === 13){
            // call the api man
        }
    }


    const getDressesBySex = (sex) => {
        console.log(sex);
    }
    
    


    const renderDresses =( posts )=> {
        let arr =[];
        for ( let i = 0; i < posts.length ; i+=2 ){
            if ( i !== posts.length -1 ){
                arr.push(
                    <Grid container justify="center" spacing={2} key={i}>
                            <Grid xs={12} sm={4} item>
                                {/* <img src={`https://${posts[i].image}`} /> */}
                                <DressCard dress={posts[i]} />
                                
                            </Grid>
                            <Grid xs={12} sm={4} item>
                                {/* <img src={`https://${posts[i+1].image}`} /> */}
                                <DressCard dress={posts[i+1]} />
                            </Grid>                        
                    </Grid>
                )
            }
            else{
                arr.push(
                    <Grid container justify="center" key={i}>
                        <Grid xs={12} sm={4} item>
                            <DressCard dress={posts[i]} />
                        </Grid>
                    </Grid>
                )
            }
        }
        return arr;
    }

    return (
        <div>
            <Appbar/>
            <Grid container justify="center" alignItems="center" style={{marginTop:"1.5em", marginBottom:"1.5em"}}>
                <Grid item>
                    <Search />
                </Grid>
                <Grid item xs={8}>
                    <TextField label="Search for dress types" 
                    value={search} onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter any dress type like denim .."fullWidth autoFocus />
                </Grid>
            </Grid>
            <Grid container >
                <Grid xs={12} sm={3} container item> 
                    <Grid container justify="flex-start" alignItems="center" direction="column" >
                        <Grid item className={classes.searchItem} onClick={() => getDressesBySex('MALE')}  >
                            <Typography >MALE</Typography>
                        </Grid>
                        <Grid item className={classes.searchItem} onClick={() => getDressesBySex('FEMALE')}  >
                            <Typography>FEMALE</Typography>
                        </Grid>
                        <Grid item className={classes.searchItem} onClick={()=>{ setSearch("Denim")}}>
                            <Typography>Denim</Typography>
                        </Grid>
                        <Grid item className={classes.searchItem} onClick={() => { setSearch("T-Shirt") }} >
                            <Typography>T-Shirt</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item xs={12} sm={9} >
                    
                    {renderDresses(postsToShow)}
                    <Grid container item justify="center">
                        {
                            postsToShow.length !== total ? 
                             <Button variant="outlined" color="primary" onClick={handleShowMorePosts}> Load more</Button>
                             : <Typography variant="h4">No more dresses to show .</Typography>
                        }
                    </Grid>
                    
                </Grid>

            </Grid>
        </div>
    )

}


export default Products;

