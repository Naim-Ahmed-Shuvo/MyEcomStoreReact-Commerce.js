import React from 'react'
import {AppBar,Toolbar ,Typography,Menu,MenuItem,IconButton,Badge} from "@material-ui/core"
import {ShoppingCart} from "@material-ui/icons"
import { useNavStyles } from './styles';
import { Link, useHistory,useLocation } from 'react-router-dom';


//
function Nav({totalItems}) {
    const classes = useNavStyles();
    const history = useHistory();
    const location = useLocation();

    //
    return (
        <>
           <AppBar position="fixed" className={classes.appBar} color="inherit">
               <Toolbar>
                   <Typography variant="h6" className={classes.title} color="inherit" component={Link} to="/">
                       <img src="https://static.vecteezy.com/system/resources/thumbnails/000/357/423/small/Business__28170_29.jpg" alt="img" height="25px" className={classes.image}/>
                       MyEcom
                   </Typography>

                   <div className={classes.grow}>

                   </div>
                   {location.pathname === '/' && <div className={classes.button}>
                       <IconButton area-label="Show Carts Item" color="inherit" onClick={()=> history.push('/cart')}>
                           <Badge badgeContent={totalItems} color="secondary">
                               <ShoppingCart/>
                           </Badge>
                       </IconButton>
                   </div>}
                   
               </Toolbar>
            </AppBar> 
        </>
    )
}

export default Nav
