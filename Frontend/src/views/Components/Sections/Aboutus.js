import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Bobby from "assets/img/faces/Bobby.jpg";
import Arjun from "assets/img/faces/Arjun.jpg";
import Shubham from "assets/img/faces/Shubham.jpg";
import image from "assets/img/bg.jpg";
import styles from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.js";

const useStyles = makeStyles(styles);

export default function AboutUs() {
  const classes = useStyles();
  return (
    <div className={classes.section}
    className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}>
      <div className={classes.container}>
        
        <div className={classes.space50} />
        <div id="images" >  
          <div className={classes.title}>
            <h2>About Us</h2>
          </div>
          <br />
          <GridContainer>
            <GridItem xs={12} sm={4}>
            <a
                href="https://www.linkedin.com/in/arjun-bhavsar-824560ab/"
                className={classes.block}
                target="_blank"
              >
                <h4>Arjun Bhavsar</h4>
                <img
                    src={Arjun}
                    alt="..."
                    className={
                    classes.imgRaised +
                    " " +
                    classes.imgRounded +
                    " " +
                    classes.imgFluid
                    }
                />
              </a>
            </GridItem>
            <GridItem xs={12} sm={4} className={classes.marginLeft}>
            <a
                href="https://www.linkedin.com/in/bobbyrathore/"
                className={classes.block}
                target="_blank"
              >
              <h4>Bobby Rathod</h4>
              <img
                src={Bobby}
                alt="..."
                className={
                  classes.imgRaised +
                  " " +
                  classes.imgRounded +
                  " " +
                  classes.imgFluid
                }
              />
              </a>
            </GridItem>
            <GridItem xs={12} sm={4} className={classes.marginLeft}>
            <a
                href="https://www.linkedin.com/in/gaikwad-shubham/"
                className={classes.block}
                target="_blank"
              >
              <h4>Shubham Gaikwad</h4>
              <img
                src={Shubham}
                alt="..."
                className={
                  classes.imgRaised +
                  " " +
                  classes.imgRounded +
                  " " +
                  classes.imgFluid
                }
              />
              </a>
            </GridItem>
          </GridContainer>
          <GridContainer />
        </div>
        <div className={classes.space50} />
      </div>
    </div>
  );
}
