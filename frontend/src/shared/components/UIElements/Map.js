import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import "./Map.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZ2F1cmF2MzEyIiwiYSI6ImNsMDZkMXdtYTBjYjUza3IyOThuNjloMTkifQ.Ffw3bv9p56F4zWfw50tp1Q";

export default function Map(props) {
  const mapRef = useRef(null);
  const { center, zoom } = props;

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [center.lng, center.lat],
      zoom: zoom,
      pitch: 10,
    });
    new mapboxgl.Marker().setLngLat([center.lng, center.lat]).addTo(map);
    map.addControl(new mapboxgl.NavigationControl());
    // Clean up on unmount
    return () => map.remove();
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
}
