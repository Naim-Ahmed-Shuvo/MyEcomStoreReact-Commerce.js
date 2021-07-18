import { Grid } from '@material-ui/core'
import React from 'react'
import Product from './Product'
import { useProductStyle } from './styles'

// const products = [
//     {
//         id: 1,
//         name: "Shoes",
//         description: "Runnig shoes",
//         price: "$5",
//         image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
//     },
//     {
//         id: 2,
//         name: "MacBook",
//         description: "Apple Macbook Air",
//         price: "$5",
//         image: "https://images.unsplash.com/photo-1606229365485-93a3b8ee0385?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWFjYm9vayUyMGFpcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
//     },
// ]
function Products({products,onAddToCart}) {
    const classes = useProductStyle()

    //
    return (
        <main className={classes.content}>
            <div className={classes.toolbar}/>
            <Grid container justify="center" spacing={4}>
               {products.map(product=>(
                   <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                       <Product product={product} onAddToCart={onAddToCart}/>
                   </Grid>
               ))}
            </Grid>
        </main>
    )
}

export default Products
