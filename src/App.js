import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'
 
import AudioReactRecorder, { RecordState } from 'audio-react-recorder'

class App extends Component {
  constructor(props) {
    super(props)
 
    this.state = {
      recordState: null
    }
  }
 
  start = () => {
    this.setState({
      recordState: RecordState.START
    })
  }
 
  stop = () => {
    this.setState({
      recordState: RecordState.STOP
    })
  }
 
  //audioData contains blob and blobUrl
  onStop = (audioData) => {
    console.log('audioData', audioData)

    // TODO call api
  }
 
  render() {
    const { recordState } = this.state

    // TODO make responsive https://www.codegrepper.com/code-examples/javascript/how+to+get+screen+width+in+react+js
    let hasWindow = typeof window !== 'undefined';
    const width = hasWindow ? window.innerWidth : null;
 
    return (
      <div className="App">
      <header className="App-header">
        <AudioReactRecorder state={recordState} onStop={this.onStop} 
        backgroundColor={"rgb(40, 44, 52)"} foregroundColor={"rgb(97, 218, 251)"}
        canvasWidth={width}/>
 
        <div>
          <button onClick={this.start}>Start</button>
          <button onClick={this.stop}>Stop</button>
        </div>
      </header>
    </div>
    )
  }
}

export default App

