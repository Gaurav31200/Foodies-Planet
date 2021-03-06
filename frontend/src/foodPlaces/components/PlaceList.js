import React from "react";
import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";

import "./PlaceList.css";
import Button from "../../shared/components/FormElements/Button/Button";
import { useSelector } from "react-redux";

export default function PlaceList(props) {
  const id = useSelector((state) => state.auth.userId);
  if (!props.items || props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No Places Found.</h2>
          {(props.userId === id || !id) && (
            <Button to="/foodplace/new">Share Place</Button>
          )}
        </Card>
      </div>
    );
  }
  return (
    <ul className="place-list">
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.imageUrl}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
          onDelete={props.onDeleteFoodPlace}
        />
      ))}
    </ul>
  );
}
