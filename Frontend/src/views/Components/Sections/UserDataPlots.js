import React, {Component} from "react";

// @material-ui/core components
import { makeStyles , withStyles} from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Iframe from 'react-iframe';
import styles from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.js";
import getUsersDataService from "./UserDataService.js";
// import TheImage from {`dshdjhsjd/useData/"${xbo7p41gkftguuvmyhi5rd1bx/likes_dislikes.png}`};

import Image from "assets/img/userData/123/likes_dislikes.png"
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
            usertoken:'',
            baseImageAddess:'assets/img/userData',
            image1Address:'',
           // image1Address:"https://spotify-visuals-bucket.s3.us-east-2.amazonaws.com/x6bxi7g0fhn7np1sidlw8n572-top_artists.html",
            image2Address:'', 
          // image2Address:"https://spotify-visuals-bucket.s3.us-east-2.amazonaws.com/123-acoustics.png" ,
          image3Address:'',  
          image4Address:'',
          image5Address:''
          //image3Address:"https://spotify-visuals-bucket.s3.us-east-2.amazonaws.com/123-likes_dislikes.png"
        }

        getUsersDataService.getUserLikes()
        .then( (response) => {
              this.setState({
                image1Address: response.data.image
              })
              console.log("response1----", response.data.image)})
        .catch((error) => {
              console.log("ALLAL", error);})

        getUsersDataService.getUserDataAcoustics()
        .then( (response) => {
              this.setState({
                image2Address: response.data.image
              })
              console.log("response2----", response.data.image)})
        .catch((error) => {
              console.log("ALLAL", error);})

        getUsersDataService.getUserDataArtists()
        .then( (response) => {
              this.setState({
                image3Address: response.data.image
              })
              console.log("response3----", response.data.image)})
        .catch((error) => {
              console.log("ALLAL", error);})
              
        getUsersDataService.getUserDataPopularity()
        .then( (response) => {
              this.setState({
                image4Address: response.data.image
              })
              console.log("response4----", response.data.image)})
        .catch((error) => {
              console.log("ALLAL", error);})


        getUsersDataService.getUserDataRelease()
        .then( (response) => {
              this.setState({
                image5Address: response.data.image
              })
              console.log("response5----", response.data.image)})
        .catch((error) => {
              console.log("ALLAL", error);})

    }


    // gettImage(){
    //    return this.state.image1Addres;
    //  }
    render(){

        const { classes } = this.props;
        return (

            <div className={classes.section}
            className={classes.pageHeader}
                style={{
                backgroundColor:"#5CDB95",
                backgroundSize: "cover",
                backgroundPosition: "top center",
                'z-index':'-1'
                }}>
            <div className={classes.container}>

                <div className={classes.space50} />
                <div id="images" >
                <div className={classes.title}>
                    <h2>User Data Trends</h2>
                </div>
                <GridContainer>
                    <GridContainer>
                    <h2>Comparison of liked/disliked songs by user based on song features</h2>
                    <h4>These are 8 graphs where Y axis is the density while X-axis is danceability, energy, loudness, speechiness, acousticness, valence, instrumentalness and tempo respectively. The Green color bars indicates the data related to liked songs while blue colored bars indicate data related to disliked songs. These graphs indicate user preference towards certain features.</h4>
                    <GridItem xs={12} sm={12}>
                            <img src={this.state.image1Address} 
                                  alt="Likes-Dislikes" 
                                  className="img-responsive"
                                  width= "100%"
                                  height="500px"/>
                    </GridItem>
                    </GridContainer>
                    <hr/>
                  <hr/>
                     <GridContainer>
                    <GridItem xs={12} sm={8}>
                      <img src={this.state.image2Address} 
                                    alt="Acoustic" 
                                    className="img-responsive"
                                    width= "100%"
                                    height="700px"/>
                                  
                        
                    </GridItem>
                    <GridItem xs={12} sm={4}>
                      <h2>Acoustic Trend </h2>
                      <h4>We compare all the liked and disliked songs by the user on the basis of song energy, loudness, speechiness, acousticness, valence, instrumentalness, tempo, danceability. This graph shows overall preference of the user and what he/she likes and dislikes in the songs. This can be further used to recommend similar songs to the user.</h4>
                    </GridItem>
                    </GridContainer> 
                  <hr/>
                  <hr/>
                    <GridContainer>
                    <h2>Artists</h2>
                    <h4>This bar graph shows the most liked artists by the user. This graph also compares whether the user only likes the song from this artist or he/she also adds these songs in the user made playlist.</h4>
                    <GridItem xs={12} sm={12}>
                            <Iframe url={this.state.image3Address}
                            width= "900px"
                            height="500px"
                            id="myId"
                            allowtransparency = 'false'
                            className="myClassname"
                            display="initial"
                            position="relative"
                            backgroundColor="#FFFFFF"
                            ba/> 
                    </GridItem>
                    </GridContainer>

                    <GridContainer>
                    <h2>Track Popularity</h2>
                    <h4>This graph does the analysis of user made playlists. It takes all the songs from a playlist and checks their overall popularity to create a box and whisker plot. This graphs helps in understading if the user only likes popular songs or some unpopular songs as well. Also, if the playlist are made based on the popularity of the songs or not.</h4>
                    <GridItem xs={12} sm={12}>
                            <Iframe url={this.state.image4Address}
                            width= "900px"
                            height="500px"
                            id="myId"
                            allowtransparency = 'false'
                            className="myClassname"
                            display="initial"
                            position="relative"
                            backgroundColor="#FFFFFF"
                            ba/> 
                    </GridItem>
                    </GridContainer>

                    <GridContainer>
                    <h2>Song release date graph </h2>
                    <h4>This bar graph takes into account all the songs in user library. This graph shows the count og songs based on the relese year of that track. This helps in analysing the user preference based on the era of songs. For example - if most of the songs have release dates in near past say last 5 years then it can be concluded that user likes newly released tracks more and then more such songs can be suggested in future.</h4>
                    <GridItem xs={12} sm={12}>
                            <Iframe url={this.state.image5Address}
                            width= "900px"
                            height="500px"
                            id="myId"
                            allowtransparency = 'false'
                            className="myClassname"
                            display="initial"
                            position="relative"
                            backgroundColor="#FFFFFF"
                            ba/> 
                    </GridItem>
                    </GridContainer>

                    <GridContainer>
                    <h2>Song feature description </h2>
                  <h4><b>acousticness -</b> A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.</h4>
                  <h4><b>danceability -</b> Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.</h4>
                  <h4><b>energy - </b>Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy.</h4>
                  <h4><b>instrumentalness - </b>Predicts whether a track contains no vocals. “Ooh” and “aah” sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly “vocal”. The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.</h4>
                  <h4><b>liveness - </b>Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.</h4>
                  <h4><b>loudness - </b>The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typical range between -60 and 0 db.</h4>
                  <h4><b>speechiness - </b>Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.</h4>
                  <h4><b>valence - </b>A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).</h4>
                  <h4><b>tempo - </b>The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.</h4>
                    </GridContainer>
                 
                </GridContainer>
                <GridContainer />
                
                
                </div>
                <div className={classes.space50} />
            </div>
            </div>
        );
    }
}
export default withStyles(styles, { withTheme: true })(UserDataPlots);