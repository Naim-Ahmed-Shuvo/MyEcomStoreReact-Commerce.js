import React from 'react'
import {Typography,Card,CardContent,CardMedia,CardActions,Button} from "@material-ui/core"
import { useCartItemStyles } from './styles'

//
const CartItem = ({item,handleUpdateCartQty, handleRemoveFromCart, }) => {
    const classes = useCartItemStyles();
    console.log(item);

    //
    return (
        <Card>
            <CardMedia image={item.media.source} className={classes.media} alt={item.name}/>
             <CardContent classame={classes.cardContent}>
                <Typography variant="h4">{item.name}</Typography>
                <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
             </CardContent>

             <CardActions className={classes.cardActions}>
                 <div className={classes.buttons}>
                     <Button type="button" size="small" onClick={()=>handleUpdateCartQty(item.id,item.quantity - 1)}> - </Button>
                     <Typography>{item.quantity}</Typography>
                     <Button type="button" size="small" onClick={()=>handleUpdateCartQty(item.id,item.quantity + 1)}> + </Button>
                 </div>
                 <Button variant="contained" type="button" color="secondary" onClick={()=>handleRemoveFromCart(item.id)}>Remove</Button> 
             </CardActions>
        </Card>
    )
}

export default CartItem
