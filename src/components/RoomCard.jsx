import React from "react";
import PropTypes from "prop-types";
import { Typography, Card, CardContent } from "@mui/material";
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
      <CardContent className="flex items-center  justify-between">
        <div className="flex-1 flex gap-4  items-center">
          <Typography variant="body2" className="flex-1">
            Room {room.roomNumber}
          </Typography>
          <Typography variant="body2" className="flex-1">
            {room.type}
          </Typography>
          <Typography variant="body2" className="flex-1">
            ${Number(room.price).toFixed(2)}
          </Typography>
          <Typography
            variant="body2" // Using a smaller variant for the tag
            className={`px-2 py-1 rounded-lg ${
              room.availabilityStatus === "AVAILABLE"
                ? "text-green-500"
                : "text-red-500"
            }`}
            style={{
              backgroundColor:
                room.availabilityStatus === "AVAILABLE" ? "#e6ffed" : "#ffe6e6",
              display: "inline-block",
            }} // Adding background color and inline-block display
          >
            {room.availabilityStatus === "AVAILABLE"
              ? "Available"
              : "Not Available"}
          </Typography>
        </div>
        <IconButton
          disabled={room.availabilityStatus === "NOT_AVAILABLE"}
          size="small"
          onClick={() => onAddToCart(room)}
        >
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
