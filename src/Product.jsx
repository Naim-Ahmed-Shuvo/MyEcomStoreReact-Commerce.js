import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import React from "react";
import {useProductStyles} from "./styles";

function Product({ product,onAddToCart }) {
  const classes = useProductStyles();
  
  
  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={product.media.source} title={product.name} />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant="h5" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5">{product.price.formatted_with_symbol}</Typography>
        </div>
        <Typography dangerouslySetInnerHTML={{__html: product.description}} variant="body2" color="textSecondary" component="p"/>
          
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton area-label="Add to cart" onClick={()=>onAddToCart(product.id,1)}>
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default Product;
