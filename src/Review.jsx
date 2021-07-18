import React from 'react';
import {Typography,ListItem,ListItemText,List} from "@material-ui/core";

const Review = ({checkoutToken}) => {
    return (
        <>
          <Typography variant={"h6"} gutterBottom>Order Summary</Typography>
          <List>
            {checkoutToken.live.line_items.map(product=>(
                <ListItem style={{padding: "10p 0px"}} key={product.name}>
                    <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`}/>
                    <Typography>{product.line_total.formatted_with_symbol}</Typography>
                </ListItem>
            ))}
              <ListItem style={{padding: "10p 0px"}}>
                  <ListItemText primary={"Total"}/>
                  <Typography variant={"subtitle1"} style={{fontWeight: 700}}>
                      {checkoutToken.live.subtotal.formatted_with_symbol}
                  </Typography>
              </ListItem>
          </List>
        </>
    );
};

export default Review;
