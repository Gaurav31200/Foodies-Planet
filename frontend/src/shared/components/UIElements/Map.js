import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import "./Map.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZ2F1cmF2MzEyIiwiYSI6ImNsMDZkMXdtYTBjYjUza3IyOThuNjloMTkifQ.Ffw3bv9p56F4zWfw50tp1Q";

export default function Map(props) {
  const mapRef = useRef(null);
  const { coords, zoom, markPlace, updateCoordinates } = props;

  useEffect(() => {
    let coordinates = {
      lng: coords ? coords.lng : "79.434988",
      lat: coords ? coords.lat : "22.9216711",
    };
    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [coordinates.lng, coordinates.lat],
      zoom: zoom ? zoom : 5,
    });
    if (markPlace) {
      map.on("dblclick", (event) => {
        event.preventDefault();
        const { lng, lat } = event.lngLat;
        coordinates = {
          lng: lng,
          lat: lat,
        };
        updateCoordinates(coordinates);
      });
    }
    if ((markPlace && coords) || !markPlace) {
      new mapboxgl.Marker()
        .setLngLat([coordinates.lng, coordinates.lat])
        .addTo(map);
    }
    // current location
    const currentLocation = new mapboxgl.GeolocateControl({
      positionOption: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });
    map.addControl(currentLocation);

    // to navigate
    map.addControl(new mapboxgl.NavigationControl());

    //to fullcontrol
    map.addControl(new mapboxgl.FullscreenControl());

    // Clean up on unmount
    return () => map.remove();
  }, [coords, zoom, updateCoordinates, markPlace]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
}
