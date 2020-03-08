import React from "react";

import classes from "./ScheduledGameItem.module.css";
import { getLocalTime } from "../../../resources/utils";

const scheduledGameItem = (props) => {

  const game = props.game;
  const startDateTime = new Date(game.unixUtc);
  const setting = (game.setting === "online") ? "Online" : "In-Person";
  let address = "";

  if (game.setting === "in-person") {

    address = game.address + ", " + game.city + ", " + game.state.toUpperCase();

    if (game.neighborhood)
      address += " (" + game.neighborhood + ")";
  }

  const location = (game.setting === "online") ? game.platform : address;

  return (

    <li className={classes.ScheduledGameItem}>
      <div>
        <strong>Game:</strong>&nbsp;{game.game}<br />
        <strong>Date:</strong>&nbsp;{startDateTime.toDateString()}<br />
        <strong>Time:</strong>&nbsp;{getLocalTime(startDateTime)}<br />
        <strong>Location:</strong>&nbsp;{location}
      </div>
      <div>
        <strong>Setting:</strong>&nbsp;{setting}<br />
        <strong>Total Players:</strong>&nbsp;{game.totalNumberOfPlayers}<br />
        <strong>Open Spots:</strong>&nbsp;{game.openSpots}
      </div>
    </li>
  );
};

export default scheduledGameItem;
