import React, { useState } from "react";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button/Button";

import "./PlaceItem.css";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import { useSelector } from "react-redux";

export default function PlaceItem(props) {
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);
  const openConfirmModal = () => {
    setShowConfirmModal(true);
  };
  const closeConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const confirmDeletingHandler = () => {
    console.log("Deleting...");
    setShowConfirmModal(false);
  };
  return (
    <>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={
          <Button onClick={closeMapHandler} danger>
            CLOSE
          </Button>
        }
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={closeConfirmModal}
        header="Are You Sure?"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={closeConfirmModal}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeletingHandler}>
              DELETE
            </Button>
          </>
        }
      >
        <div>
          <p>Do you really want to delete this place?</p>
        </div>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {isLoggedIn && <Button to={`/foodplaces/${props.id}`}>EDIT</Button>}
            {isLoggedIn && (
              <Button danger onClick={openConfirmModal}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
}
