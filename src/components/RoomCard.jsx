import React from "react";
import PropTypes from "prop-types";
import { Typography, Button, Card, CardContent } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";

const RoomCard = ({ room, onAddToCart }) => {
  const getAvailabilityColor = () => {
    switch (room.availabilityStatus) {
      case "AVAILABLE":
        return "text-green-500";
      case "NOT_AVAILABLE":
        return "text-red-500";
      default:
        return "text-orange-500";
    }
  };

  return (
    <Card className="mb-2 shadow">
      <CardContent className="flex items-center justify-between">
        <div className="flex-1 flex gap-4 items-center">
          <Typography variant="body1" className="flex-1">
            Room {room.roomNumber}
          </Typography>
          <Typography variant="body1" className="flex-1">
            {room.type}
          </Typography>
          <Typography variant="body1" className="flex-1">
            ${room.price} per night
          </Typography>
          <Typography
            variant="body1"
            className={`flex-1 ${getAvailabilityColor()}`}
          >
            {room.availabilityStatus}
          </Typography>
        </div>
        <IconButton size="small" onClick={() => onAddToCart(room)}>
          <AddIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

RoomCard.propTypes = {
  room: PropTypes.shape({
    roomNumber: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    availabilityStatus: PropTypes.string.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default RoomCard;
