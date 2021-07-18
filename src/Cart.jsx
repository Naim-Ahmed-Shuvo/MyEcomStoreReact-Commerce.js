import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import { useCartStyles } from "./styles";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

//
const Cart = ({
  cart,
  handleUpdateCartQty,
  handleRemoveFromCart,
  handleEmptyCart,
}) => {
  const classes = useCartStyles();
  const isEmpty = !cart?.line_items?.length;

  const FilledCart = () => {
    return (
      <>
        <Grid container spacing={3}>
          {cart.line_items?.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <CartItem
                item={item}
                handleUpdateCartQty={handleUpdateCartQty}
                handleRemoveFromCart={handleRemoveFromCart}
              />
            </Grid>
          ))}
        </Grid>

        <div className={classes.cardDetails}>
          <Typography>
            Sub Total: {cart.subtotal.formatted_with_symbol}
          </Typography>
          <Button
            variant="contained"
            size="large"
            type="button"
            className={classes.emptyButton}
            color="secondary"
            onClick={()=>handleEmptyCart()}
          >
            Empty Cart
          </Button>
          <Button
            className={classes.checkout}
            variant="contained"
            size="large"
            type="button"
            color="primary"
            component={Link}
            to="/checkout"
          >
            Checkout
          </Button>
        </div>
      </>
    );
  };

  const EmptyCart = () => {
    return (
      <Typography>
        You have no items in cart
        <Link to="/" className={classes.link}>
          Start Adding Something !
        </Link>
      </Typography>
    );
  };

  if (!cart.line_items) return <p>Loading....</p>;
  return (
    <Container>
      <div className={classes.toolBar} />
      <Typography className={classes.title} variant="h3" gutterBottom>
        Your Shopping Cart
      </Typography>
      {isEmpty ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
