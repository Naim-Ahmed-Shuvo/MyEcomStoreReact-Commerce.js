import { Grid, TextField } from '@material-ui/core'
import React from 'react'
import { useFormContext, Controller } from 'react-hook-form';


//
const FormInput = ({ name, label }) => {
    const { control } = useFormContext();
    const isError = false;

    //
    return (
        <Grid item xs={12} sm={6}>
      <Controller
         render = {({ field})=> (
            <TextField
            {...field}
                fullWidth
                label={label}
                required
                name={name}
                control={control}
               
            />
        )}
        name={name}
        control={control}
        label={label}
        fullWidth
        required
        error={isError}
      />
       {/* <Controller
        as={<TextField/>}
        name={name}
        control={control}
        label={label}
        fullWidth
        required
        error={isError}
      /> */}
    </Grid>
    )
}

export default FormInput
