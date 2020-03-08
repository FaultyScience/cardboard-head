import React from "react";

import classes from "./Banner.module.css";

const banner = () => (

  <div className={classes.Banner}>
    <div className={classes.Logo}>
      <div className={classes.Inner}></div>
      <h2 className={classes.BannerFont}>Cardboard Head</h2>
      <h3 className={classes.Tagline}>Play board games on demand</h3>
    </div>
  </div>
);

export default banner;
