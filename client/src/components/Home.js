import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    table: {
        minWidth: 650,
    },
  },
}));

export default function Home() {
  const classes = useStyles();
  const [sno, setsno] = useState(0)
  const [uname, setUname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [path, setPath] = useState("")
  const [rows, setrows] = useState([])
  const port = 4000

  const changeHandler = (e) => {
    console.log(e.target.files[0])

    let formData = new FormData();
    const config = {
        header: { 'content-type': 'multipart/form-data' }
    }
    formData.append("file", e.target.files[0])

    axios.post(`http://127.0.0.1:${port}/uploadfiles`, formData, config)
        .then(response => {
            if (response.data.success) {

                let variable = {
                    filePath: response.data.filePath,
                    fileName: response.data.fileName
                }
                setPath(response.data.filePath)
            } else {
              alert('failed to save the video in server')
          }
        })
      }

  const handleChange = (e) => {
    if(e.target.name === "setEmail"){
        setEmail(e.target.value)
    } else if (e.target.name === "setName") {
        setUname(e.target.value)
    } else if (e.target.name === "setPhone") {
        setPhone(e.target.value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
        sno: sno+1,
        name: uname,
        email: email,
        phone: phone,
        image: path
    }
    setsno(sno+1)
    setrows(rows.concat(data))
    console.log(rows)
    setEmail("")
    setUname("")
    setPhone("")
    setPath("")
  }

  return (
    <div>
    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField id="outlined-basic" value={uname} name="setName" label="Name" variant="outlined" onChange={handleChange} />
      <TextField id="outlined-basic" value={email} name="setEmail" label="Email" variant="outlined" onChange={handleChange} />
      <TextField id="outlined-basic" value={phone} name="setPhone" label="Phone No." variant="outlined" onChange={handleChange} />

      <input type="file" name="file" onChange={changeHandler} />
      
      <Button
        type="submit" 
        color="secondary" 
        variant="contained"
        fullWidth
        size="large">
        Submit
    </Button>
    </form>

    <TableContainer component={Paper}>
    <Table className={classes.table} aria-label="simple table">
    <TableHead>
        <TableRow>
        <TableCell>S.No</TableCell>
        <TableCell align="right">Name</TableCell>
        <TableCell align="right">Email</TableCell>
        <TableCell align="right">Phone</TableCell>
        <TableCell align="right">Image</TableCell>
        </TableRow>
    </TableHead>
    <TableBody>
        {rows.map((row) => (
        <TableRow key={row.sno}>
            <TableCell component="th" scope="row">
            {row.sno}
            </TableCell>
            <TableCell align="right">{row.name}</TableCell>
            <TableCell align="right">{row.email}</TableCell>
            <TableCell align="right">{row.phone}</TableCell>
            <TableCell align="right"><a href={`http://localhost:${port}/${row.image}`} target="_blank">image</a></TableCell>
        </TableRow>
        ))}
    </TableBody>
    </Table>
    </TableContainer>
    </div>
  );
}
