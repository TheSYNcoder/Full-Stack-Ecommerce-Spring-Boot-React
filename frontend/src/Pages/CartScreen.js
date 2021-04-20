import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Appbar from "../Components/AppBar";
import Grid from "@material-ui/core/Grid";

import axios from 'axios';
import { Button, ButtonGroup, Container, TableFooter, Typography, IconButton } from "@material-ui/core";
import { Delete, RateReview } from '@material-ui/icons';
import { withRouter } from "react-router";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
        marginTop :"3em"
    },
});



function BasicTable() {
    const classes = useStyles();

    const ORDER_URL ='/api/v1/orders'
    const PUT_URL = '/api/v1/order/'
    const [ total , setTotal] = React.useState(0);
    const [products, setProducts ]= React.useState([]);

    React.useEffect(() => {
        axios.get(ORDER_URL)
            .then(response => {
                if ( response.status === 200){
                    setTotal(response.data.total);
                    setProducts(response.data.products);
                }
            })
    }, []);


    React.useEffect(() => {
        axios.get(ORDER_URL)
            .then(response => {
                if (response.status === 200) {
                    setTotal(response.data.total);
                    setProducts(response.data.products);
                }
            })
    }, [products]);


    const putRequest =(id, quantity) => {
        const payload ={
            id: id,
            quantity : quantity
        }
        axios.put(PUT_URL, payload)
            .then( response => console.log(response))
            .catch(err => console.log(err));
    }

    const handleInc = (i , id ) => {
       var pro = products;
       var quantity = pro[i].quantity;
        pro[i].quantity = pro[i].quantity +1;
       setProducts(pro);
       putRequest( id, quantity +1);

    }
    const handleDec = (i , id ) => {
       var pro = products;
        var quantity = pro[i].quantity;
        pro[i].quantity = pro[i].quantity - 1;
       setProducts(pro);
       putRequest( id, quantity -1);

    }

    const handleDelete = ( i ,id ) => {
        var pro = products;        
        pro = [...products.slice(0, i) , ...products.splice(i+1 )];
        setProducts( pro );
        axios.delete( PUT_URL + id)
            .then( response => console.log(response));
    }





    return (
        <div>
            <Appbar shop={products.length}/>
            <Container>
            <Grid container justify="center" alignItems="center">
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Product name</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">.</TableCell>
                        <TableCell align="right">.</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products && products.map((row,i) => {
                        const display = row.quantity <= 0;
                        return (
                        <TableRow key={row.b_dresstype} >
                            <TableCell component="th" scope="row">
                                {row.product.b_dresstype}
                            </TableCell>
                            <TableCell align="right">{row.quantity}</TableCell>
                            <TableCell align="right">{row.product.e_arrival.toLowerCase() === 'old' ?
                            'Rs.' + row.product.f_discount : row.product.d_price }</TableCell>
                            <TableCell align="right">
                                <ButtonGroup>
                                    <Button onClick={() => handleInc(i, row.id)}>+</Button>
                                    <Button disabled> {row.quantity}</Button>
                                        <Button disabled={display} onClick={() => handleDec(i, row.id)}>-</Button>
                                </ButtonGroup>
                            </TableCell>
                            <TableCell>
                                <IconButton onClick={() => handleDelete(i , row.id) }>
                                    <Delete color="secondary"/>
                                </IconButton>
                            </TableCell>
                            
                        </TableRow>
                        )
                    }
                    )
                    }
                </TableBody>
                <TableFooter >
                    <Typography variant="h4">Total Price : Rs.{total}</Typography>
                </TableFooter>
            </Table>
        </TableContainer>
                    
            </Grid>
            </Container>
        </div>
    );
}

export default withRouter(BasicTable);