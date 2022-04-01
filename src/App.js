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
 
    return (
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <AudioReactRecorder state={recordState} onStop={this.onStop} />
 
        <button onClick={this.start}>Start</button>
        <button onClick={this.stop}>Stop</button>
      </header>
    </div>
    )
  }
}

export default App

