import React, { Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import CircularProgress from '@material-ui/core/CircularProgress';
import { TextField } from '@material-ui/core';
export default class Timer extends Component{
    constructor (props) {
        super(props)
        const {startCount} = this.props
        this.state={
          count: startCount,
          counterPause:true,
          startCount,showDialog:true
        
        }
      }
      componentDidMount () {
        
        this.doIntervalChange()
      }
      doIntervalChange = () => {
        this.myInterval = setInterval(() => {
          !this.state.counterPause &&
        this.setState(prevState => ({
          count: prevState.count - 1
        }))
      }, 1000)
    }
    handleChange=(event)=> {
      this.setState({input: event.target.value});
    }
    componentWillUnmount () {
      clearInterval(this.myInterval)
    }
    render(){
      if(this.state.count <=0){
        
        return(
        <div>
        
        <Dialog
          open={this.state.showDialog}
          onClose={()=>this.setState({showDialog:false})}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Times up"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Times up!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>this.setState({showDialog:false})} color="primary">
              Close
            </Button>
            
          </DialogActions>
        </Dialog>
        <h1>Good bye</h1>
      </div>)
      }
      else{
      const hours = Math.floor(this.state.count / 3600)
      const minutes = Math.floor((this.state.count % 3600) / 60)
      const seconds = this.state.count - hours * 3600 - minutes * 60
        return(
            <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
               
            <TextField id="outlined-basic" label="Outlined" variant="outlined" value={this.state.input} onChange={this.handleChange} />
            <Button variant="contained" onClick={()=>this.setState({startCount:this.state.input,count:this.state.input,counterPause:false})}>Start timer</Button>

            
                <div>
        {hours}HH {minutes} MM {seconds}SS
                </div >
                <LinearProgress variant="determinate" value={100*this.state.count/this.state.startCount} />
                <Button variant="contained" onClick={()=>this.setState({counterPause:false})}>Start</Button>
                <Button variant="contained" onClick={()=>this.setState({counterPause:true})}>Stop</Button>
                <Button variant="contained" onClick={()=>this.setState({count:this.state.startCount})}>Reset</Button>
            </Container>
            </React.Fragment>
            
            
            )
    }}
}