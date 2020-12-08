import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
//import InfoArea from "components/InfoArea/InfoArea.js";

import Iframe from 'react-iframe';

import Bobby from "assets/img/faces/Bobby.jpg";
import Arjun from "assets/img/faces/Arjun.jpg";
import Shubham from "assets/img/faces/Shubham.jpg";
import image from "assets/img/bg.jpg";
import styles from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.js";

const useStyles = makeStyles(styles);

export default function Commonplots() {

  const classes = useStyles();
  return (

    <div className={classes.section}
    className={classes.pageHeader}
        style={{
          backgroundColor:"#1F2833",
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
            <GridItem xs={12} sm={8}>
           
                
                {/* <img
                    src="https://charts.mongodb.com/charts-music-analysis-nutif/embed/charts?id=4d98e1f1-f10f-4158-87d8-66fcfdab56cb&theme=light"
                    alt="..."
                    
                /> */}
                <Iframe url="https://charts.mongodb.com/charts-music-analysis-nutif/embed/charts?id=4d98e1f1-f10f-4158-87d8-66fcfdab56cb&theme=light"
                    width="700px"
                    height="650px"
                    id="myId"
                    allowtransparency = 'false'
                    className="myClassname"
                    display="initial"
                    position="relative"/>

                <Iframe 
                  style="background: #FFFFFF;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);" 
                  width="640" 
                  height="480" 
                  src="https://charts.mongodb.com/charts-music-analysis-nutif/embed/charts?id=4d98e1f1-f10f-4158-87d8-66fcfdab56cb&theme=light"/>
        
            </GridItem>
            <GridItem xs={12} sm={3}>
              <h4> Top song Genre 2010-2019</h4>
            </GridItem> 
            <GridItem xs={12} sm={8} className={classes.marginLeft}>
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
            <GridItem xs={12} sm={8} className={classes.marginLeft}>
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
