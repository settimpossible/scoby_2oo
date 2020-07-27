import React from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

// ES5
//var ReactMapboxGl = require("react-mapbox-gl");
// var Layer = ReactMapboxGl.Layer;
// var Feature = ReactMapboxGl.Feature;

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1Ijoic2V0dGltcG9zc2libGUiLCJhIjoiY2tkNGh6dXB4MTZibDJ6bndhNDlpOGJuciJ9.qUxKoK8dql0Q9JZ_w2Kmhw",
});

// in render()

const Home = (props) => {
  // Implement react map box here.
  return (
    <div>
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "100vh",
          width: "100vw",
        }}
      >
        <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
          <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
        </Layer>
      </Map>
      <p>On home /</p>
    </div>
  );
};

export default Home;
