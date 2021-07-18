import React, {useEffect, useState} from 'react'
import {Stepper,Step,StepLabel,Paper,Typography,CircularProgress,Button, Divider, CssBaseline} from "@material-ui/core"
import { useCheckoutStyles } from './styles'
import AddressForm from './AddressForm'
import PaymentForm from './PaymentForm'
import {commerce} from "./commerce";
import { Link, useHistory } from 'react-router-dom'


const steps = ['Shipping Address','Payment Details']

//
const Checkout = ({cart,order, onCaptureCheckout, error }) => {
    const classes = useCheckoutStyles()
    const [activeStep,setActiveStep] = useState(0)
    const [checkoutToken, setCheckoutToken] = useState(null)
    const [shippingData, setShippingData] = useState({});
    const [isFinished,setIsFinished] = useState(false)
    const history = useHistory()

    useEffect(()=>{
        const generateToken = async ()=>{
            try{
                const  token = await commerce.checkout.generateToken(cart.id,{type: 'cart'})
                console.log("token: "+token.id);
                setCheckoutToken(token)
            } catch (e) {
                console.log(e)
            }
        }
        generateToken()
    },[cart])

    const nextStep = () => setActiveStep((prevActiveStep)=> prevActiveStep+1)
    const backStep = () => setActiveStep((prevActiveStep)=> prevActiveStep-1)

    //
    const next = (data) => {
        console.log("setShippingData: "+ JSON.stringify(data))
       setShippingData(data)
        nextStep();
    }

    const timeout = () => {
        setTimeout(()=>{
            setIsFinished(true)
        },3000)
    }

    const Form = () => activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} next={next}/>:<PaymentForm shippingData={shippingData} backStep={backStep} onCaptureCheckout={onCaptureCheckout}  checkoutToken={checkoutToken} nextStep={nextStep} timeout={timeout}/>

    const Confirmation = () => order.customer ? (
        <>
          <div>
              <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
              <Divider className={classes.devider}/>
              <Typography variant="subtitle2">Order Ref: {order.customer_reference}</Typography>
          </div>
          <br />
          <Button variant="outlined" type="button" component={Link} to="/">BAck to Store</Button>
        </>
    ): isFinished? (
        <>
          <div>
              <Typography variant="h5">Thank you for your purchase.</Typography>
              <Divider className={classes.devider}/>
           
          </div>
          <br />
          <Button variant="outlined" type="button" component={Link} to="/">BAck to Store</Button>
        </>
    ):(
        <div className={classes.spinner}>
            <CircularProgress/>
        </div>
    )

    if(error){
        return (
            <>
              <Typography variant="h5">Error: {error}</Typography>
              <br />
          <Button variant="outlined" type="button" component={Link} to="/">BAck to Store</Button>
            </>
        )
    }

    //
    return (
        <>
        <CssBaseline/>
           <div className={classes.toolbar}></div>
           <main className={classes.layout}>
               <Paper className={classes.paper}>
                   <Typography variant="h4" align="center">
                       Checkout
                   </Typography>
                   <Stepper className={classes.stepper} activeStep={activeStep} >
                        {steps.map(step=>(
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                   </Stepper>
                   {activeStep === steps.length? <Confirmation/>: checkoutToken && <Form/>}
                </Paper>
           </main>
        </>
    )
}

export default Checkout
