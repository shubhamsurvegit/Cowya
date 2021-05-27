import React,{useState} from 'react'
import {Select,Container,Paper,Grid,Button,TextField} from '@material-ui/core';
import axios from 'axios';
import Centers from './Centers';
const Form = () => {
    const [search_by_value,setSearch_by_value]=useState('PIN')
    const [search_value,setSearch_value]=useState('');
    const [date,setDate]=useState('');
    const [centers,setCenters]=useState('');
    
    const handleChange=(e)=>{
        setSearch_value(e.target.value)
    }

    const handleSubmit=(e)=>{
        const formatdate=new Date(date).getDate()+"-"+(new Date(date).getMonth()+1)+"-"+new Date(date).getFullYear()
        const url='https://cdn-api.co-vin.in/api/v2/appointment/sessions/public';
        if(search_by_value==='PIN'){
            axios.get(`${url}/findByPin?pincode=${search_value}&date=${formatdate}`)
            .then(({data})=>{
                console.log(data.sessions)
                setCenters(data.sessions)
            })
            .catch((err)=>console.log(err))
        }
        else{
            axios.get(`${url}/findByDistrict?district_id=${search_value}&date=${formatdate}`)
            .then(({data})=>{
                console.log(data)
            })
            .catch((err)=>console.log(err))
        }
    }
    return (
        <Container maxWidth="sm">
            <Paper>
                <p>Want Vaccine?</p> 
                <Grid container direction='column' spacing={1}>
                    <Grid item >
                        <Select
                            native
                            onChange={(e)=>setSearch_by_value(e.target.value)}
                            value={search_by_value}>
                            <option>PIN</option>
                            <option>DISTRICT</option>
                        </Select>
                    </Grid>
                    <Grid item>
                    {search_by_value==='PIN'?
                        <TextField onChange={handleChange} placeholder="Enter PIN" type="number" name="pin"></TextField>
                        :
                        <TextField onChange={handleChange} placeholder="Enter District" type="text" name="district"></TextField>
                    }
                    </Grid>
                    <Grid item>
                        <TextField onChange={(e)=>setDate(e.target.value)} type="date" name="date"></TextField>
                    </Grid>
                    <Grid item>
                        <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
                    </Grid>
                </Grid>
            </Paper>
            <div>
                {centers &&
                <div>
                    <Centers centers={centers}/>
                </div>
                }
            </div>
        </Container>
    )
}

export default Form
