import '../App.css';

import React, { Component } from 'react'

class Video extends Component {
    

    constructor(props) {
        super(props);

        this.state = {
            videoId: props.location.search.replaceAll('?id=', ''),
            videoData: {}
        };
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <video controls muted autoPlay>
                        <source src={`http://localhost:5000/video/${this.state.videoId}`} type="video/mp4"></source>
                    </video>
                </header>
            </div>
        )
    }
}

export default Video

