import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHttp } from "../../shared/hooks/http-hook";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

import "./PlaceItem.css";

export default function PlaceItem(props) {
  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttp();

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);
  const openConfirmModal = () => {
    setShowConfirmModal(true);
  };
  const closeConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const confirmDeletingHandler = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/foodPlaces/${props.id}`,
        "DELETE",
        null,
        { Authorization: "Bearer " + token }
      );
      props.onDelete(props.id);
    } catch (err) {}
    setShowConfirmModal(false);
  };
  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal error={error} onClear={clearError} />
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
          <Map coords={props.coordinates} zoom={16} />
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
            <img
              src={props.image}
              // src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
              alt={props.title}
            />
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

            {userId === props.creatorId && (
              <Button to={`/foodplaces/${props.id}`}>EDIT</Button>
            )}
            {userId === props.creatorId && (
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
