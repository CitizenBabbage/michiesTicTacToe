// this is designed to return the initial conditions of the net together with 
// the training set that caused the error. This is to make rare errors reproducible on demand.  

import React from 'react';
import fs from 'fs'; 


export class NetCatcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    // Here you can send the error, errorInfo, and the variable's snapshot to an error reporting service.
    console.log("Captured Error: ", error);
    const networkString = JSON.stringify(this.props.net);
    const trainingSetString = JSON.stringify(this.props.trainingSet); 
    const filePath1 = './problemNet.js'
    const filePath2 = './problemTrainingSet.js'
    fs.writeFile(filePath1, JSON.stringify(this.props.net), (err) => {
    if (err) {
      console.error('An error occurred:', err);
    } else {
      console.log('Net has been written to the file successfully!');
    }
    
    
    fs.writeFile(filePath2, JSON.stringify(this.props.trainingSet), (err) => {
      if (err) {
        console.error('An error occurred:', err);
      } else {
        console.log('trainingSet has been written to the file successfully!');
      }
    })
    }
    )
  }



  render() {
    if (this.state.hasError) {
      return <div>Something went wrong!</div>;
    }

    return this.props.children;
  }
}

