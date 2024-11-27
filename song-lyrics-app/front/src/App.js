import React, { Component } from "react";
import ChartAlbums from "./components/ChartAlbums"; // Albums uniquement
import ChartArtists from "./components/ChartArtists"; // Artistes uniquement

class HomePage extends Component {
    render() {
        return (
            <div className="container-right">
                <ChartAlbums />
                <ChartArtists />
            </div>
        );
    }
}

export default HomePage;
