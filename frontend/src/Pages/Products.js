import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Appbar from "../Components/AppBar";

import { Typography , Grid, Button, TextField , IconButton} from "@material-ui/core";
import data from "../data";
import DressCard from "../Components/DressShow";
import { Search } from "@material-ui/icons";
import axios from 'axios';
import AuthContext from "../context";
import { withRouter } from 'react-router';
import { Favorite, ShoppingCart } from '@material-ui/icons';
import Modal from '@material-ui/core/Modal';


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
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mimage: {
        height: "300px",
        width: "250px",
        borderRadius: "40px",

    }
}))


const Products = () => {


    const classes = useStyles();

    const { user, auth } = React.useContext(AuthContext);

    const [PRODUCTS_BY_SEX_PAGINATION_URL, setURL] = React.useState(`/api/v1/clothes/?sex=${user.gender}&page=`);
    const PRODUCTS_BY_SEARCH_URL = '/api/v1/dresses/?dress=';
    const ORDER_URL = '/api/v1/orders'
    
    const [ posts,  setPosts ] = React.useState([]);
  


    const [total, setTotal] = React.useState( 0);
    const [current, setCurrent ] = React.useState(0);
    const [products, setProducts ] = React.useState([]);
    

    React.useEffect(() => {
        axios.get(PRODUCTS_BY_SEX_PAGINATION_URL+current )
            .then( response => {
                console.log(response);
                setCurrent( current + 1 );
                setTotal( response.data.total);
                setPosts(response.data.products);
            })
            .catch(err => console.log(err));      
            
        axios.get(ORDER_URL)
            .then(response => {
                if (response.status === 200) {                    
                    setProducts(response.data.products);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handleShowMorePosts = () => {
        axios.get(PRODUCTS_BY_SEX_PAGINATION_URL + current)
            .then( response => {
                setCurrent( current + 1 );
                setTotal( response.data.total);                
                setPosts([...posts, ...response.data.products]);
            })
    };


    const [ search, setSearch ] = React.useState('');
 
    const handleChange= (e) => {
        setSearch(e.target.value);
    }

    const handleKeyDown =(e) => {
        if ( e.keyCode === 13){
            
            axios.get(PRODUCTS_BY_SEARCH_URL + search)
                .then( response => {
                    setPosts(response.data.products);
                    setTotal(response.data.length);
                    setCurrent(response.data.length);
                })
                .catch(err => console.log(err));
            
        }
    }


    const getDressesBySex = (sex) => {
        const PRODUCTS_BY_SEX = `/api/v1/clothes/?sex=${sex}&page=`;
        
        axios.get(PRODUCTS_BY_SEX_PAGINATION_URL + 0)
            .then(response => {
                console.log(response);
                setCurrent(1);
                setURL(PRODUCTS_BY_SEX);
                setTotal(response.data.total);
                setPosts(response.data.products);
            })
            .catch(err => console.log(err));

    }




    // Modal things

    const SESSION_PERSIST_URL = 'api/persist/?msg='
    const ADD_TO_CART_URL = 'api/v1/add';


    const [open, setOpen] = React.useState(false);
    const [dress, setDress ] = React.useState(null);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    const AddtoCart = () => {
        var payload = {
            productId: dress.id,
            quantity: 1,
        }

        axios.post(ADD_TO_CART_URL, payload)
            .then(response => {
                if (response.status === 200) {
                    alert('Added to cart!');
                }
            })
            .catch(err => console.log(err));
    }


    const handlePersist = () => {
        var msg = dress.e_arrival.toLowerCase() === 'old' ? "O" : "N";
        axios.get(SESSION_PERSIST_URL + msg)
            .then(response => {
                console.log(response);
            })
            .catch(err => console.log(err));
    }

    const body = () => 
    <Grid container alignItems="center" style={{backgroundColor:"white"}}
    justify="center" 
    direction="column" >
        <Grid item >
            <img src={`https://${dress.c_image}`} className={classes.mimage} />
        </Grid>
        <Grid item>
            <Typography variant="h4">{dress.b_dresstype}</Typography>
        </Grid>

        {
            dress.e_arrival.toLowerCase() === "old" ?
                <Grid item>
                    <Typography variant="h5">Price :
                            <span style={{ textDecoration: "line-through" }}>
                            ₹ {dress.d_price}</span>
                        {' '} <span style={{ color: "red" }}>{dress.f_discount}</span></Typography>
                </Grid>
                : <Grid>₹ {dress.d_price}</Grid>
        }
        <Grid container spacing={2}>
            <Grid item>
                <IconButton onClick={AddtoCart}>
                    <ShoppingCart />
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton onClick={handlePersist}>
                    < Favorite color="secondary" />
                </IconButton>
            </Grid>
        </Grid>
    </Grid>
    

    // Modal things end
    

    const handleClick =(i) => {
        
        setDress(posts[i]);
        
        setOpen(true);
    }
    


    const renderDresses =( posts )=> {
        let arr =[];
        for ( let i = 0; i < posts.length ; i+=2 ){
            if ( i !== posts.length -1 ){
                arr.push(
                    <Grid container justify="center" spacing={2}>
                            <Grid xs={12} sm={4} item onClick={() => handleClick(i)}>
                                {/* <img src={`https://${posts[i].image}`} /> */}
                                <DressCard dress={posts[i]} />
                                
                            </Grid>
                            <Grid xs={12} sm={4} item onClick={() => handleClick(i+1)}>
                                {/* <img src={`https://${posts[i+1].image}`} /> */}
                                <DressCard dress={posts[i+1]} />
                            </Grid>                        
                    </Grid>
                )
            }
            else{
                arr.push(
                    <Grid container justify="center" >
                        <Grid xs={12} sm={4} item onClick={() => handleClick(i)}>
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
            <Appbar shop={products.length}/>            
            <Grid container justify="center" alignItems="center" style={{marginTop:"1.5em", marginBottom:"1.5em"}}>
                <Grid item>
                    <Search />
                </Grid>
                <Grid item xs={8}>
                    <TextField label="Search for dress types" 
                    value={search} onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter any dress type like denim .." fullWidth autoFocus />
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
                    
                    {renderDresses(posts)}                
                        <Grid container item justify="center" onClick={() => handleOpen(true)}>
                            {
                                current !== total ? 
                                <Button variant="outlined" color="primary" onClick={handleShowMorePosts}> Load more</Button>
                                : <Typography variant="h4">No more dresses to show .</Typography>
                            }
                        </Grid>
                                                                                  
                </Grid>

            </Grid>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                className={classes.modal}
            >
                <div>
                     {dress !== null ? body() : <div></div>}                     
                </div>
            </Modal>
        </div>
    )

}


export default withRouter(Products);

