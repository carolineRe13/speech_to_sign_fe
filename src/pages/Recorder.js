import '../App.css';

import React from 'react'
 
import AudioReactRecorder, { RecordState } from 'audio-react-recorder'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Alert = React.forwardRef(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function Recorder() {
  const [open, setOpen] = React.useState(false);
  const [recordState, setRecordState] = React.useState(RecordState.STOP);
  const [loading, setLoading] = React.useState(false);
 
  const start = () => {
    setRecordState(RecordState.START)
  }
  
  const stop = () => {
    setRecordState(RecordState.STOP)
    setLoading(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
 
  //audioData contains blob and blobUrl
  const onStop = (audioData) => {
    var data = new FormData()
    data.append("audio_data", audioData.blob, "audio.wav");

    // TODO call api
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json'
        },
      body: data
    };
    fetch('http://127.0.0.1:5000/speech_to_ASL ', requestOptions)
    .then(response => response.json())
    .then(data => {
      if (data?.video_id) {
        window.location.href = '/video?id=' + data.video_id;
      } else {
        setOpen(true);
        setLoading(false)
      }
    });

  }


    // TODO make responsive https://www.codegrepper.com/code-examples/javascript/how+to+get+screen+width+in+react+js
    let hasWindow = typeof window !== 'undefined';
    const width = hasWindow ? window.innerWidth : null;
 
    return (
      <div className="App">
      <header className="App-header">
        <AudioReactRecorder state={recordState} onStop={onStop} 
        backgroundColor={"rgb(40, 44, 52)"} foregroundColor={"rgb(97, 218, 251)"}
        canvasWidth={width}/>
 
        <div>
          <button onClick={start}>Start</button>
          <button onClick={stop}>Stop</button>
        </div>

        {loading && (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
        )}

        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Could not identify speech.
          </Alert>
        </Snackbar>
      </header>
    </div>
    )
  
}
