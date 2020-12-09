import React, {Component} from "react";

// @material-ui/core components
import { makeStyles , withStyles} from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Iframe from 'react-iframe';
import styles from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.js";
// const useStyles = makeStyles(styles);
import {
    defaultFont,
    primaryColor,
    infoColor,
    successColor,
    warningColor,
    dangerColor
  } from "assets/jss/material-kit-react.js";

import axios from "axios";


const classes = theme => ({

    defaultFontStyle: {
        ...defaultFont,
        fontSize: "14px"
      },
      defaultHeaderMargins: {
        marginTop: "20px",
        marginBottom: "10px"
      },
      quote: {
        padding: "10px 20px",
        margin: "0 0 20px",
        fontSize: "17.5px",
        borderLeft: "5px solid #eee"
      },
      quoteText: {
        margin: "0 0 10px",
        fontStyle: "italic"
      },
      quoteAuthor: {
        display: "block",
        fontSize: "80%",
        lineHeight: "1.42857143",
        color: "#777"
      },
      mutedText: {
        color: "#777"
      },
      primaryText: {
        color: primaryColor
      },
      infoText: {
        color: infoColor
      },
      successText: {
        color: successColor
      },
      warningText: {
        color: warningColor
      },
      dangerText: {
        color: dangerColor
      },
      smallText: {
        fontSize: "65%",
        fontWeight: "400",
        lineHeight: "1",
        color: "#777"
      }
});

class UserDataPlots extends Component{ 
    constructor(props){
        super(props)
        this.state = {
            userId:'',
            usertoken:''
        }
        this.getUserData = this.getUserData.bind(this);
    }

    getUserData(){
        let user_id = sessionStorage.getItem('authenticatedUserId');
        let user_token = sessionStorage.getItem('authenticatedUsertoken');

        axios.get('http://localhost:8000/user/' + user_id + '/likes' ,
        {
          headers: {
            Authorization: user_token
          }
        }).then( response=> console.log(response))
          .catch((error) => {
              console.log("ALLAL", error);})
        }


    render(){

        const { classes } = this.props;
        return (

            <div className={classes.section}
            className={classes.pageHeader}
                style={{
                backgroundColor:"#7395AE",
                backgroundSize: "cover",
                backgroundPosition: "top center",
                'z-index':'-1'
                }}>
            <div className={classes.container}>

                <div className={classes.space50} />
                <div id="images" >
                <div className={classes.title}>
                    <h2>Plots</h2>
                </div>
                <br />
                <GridContainer>
                    <GridContainer>
                    <GridItem xs={12} sm={8}>
                        <Iframe url="https://charts.mongodb.com/charts-music-analysis-nutif/embed/charts?id=4d98e1f1-f10f-4158-87d8-66fcfdab56cb&theme=light"
                            width= "100%"
                            height="650px"
                            id="myId"
                            allowtransparency = 'false'
                            className="myClassname"
                            display="initial"
                            position="relative"
                            backgroundColor="#FFFFFF"
                            ba/>
                    </GridItem>
                    <GridItem xs={12} sm={3}>
                        <h2>Top song genre 2010-2019 - total 603 songs</h2>
                        <h4> A pie chart is a circular graph that is broken down into segments (i.e slices of pie). This Pie chart shows the top song genre between years 2010-2019. Out of total 603 songs, the most popular genre dance pop has 327 songs followed by pop genre which has count 60. This chart shows the dominance of pop music in popular tracks.</h4>
                    </GridItem>
                    </GridContainer>

                </GridContainer>
                <GridContainer />
                <button
                    type="Button" fullWidth
                    variant="contained"
                    color="primary"
                    onClick={this.getUserData()}>
                  Fetch
                </button>
                </div>
                <div className={classes.space50} />
            </div>
            </div>
        );
    }
}
export default withStyles(styles, { withTheme: true })(UserDataPlots);