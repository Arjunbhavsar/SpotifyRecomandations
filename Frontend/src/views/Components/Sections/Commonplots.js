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

import styles from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.js";
import zIndex from "@material-ui/core/styles/zIndex";

const useStyles = makeStyles(styles);

export default function Commonplots() {

  const classes = useStyles();
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
              <GridItem xs={12} sm={8} >
                <div style={{backgroundColor: '#fff'}}>
                  <Iframe url="https://charts.mongodb.com/charts-music-analysis-nutif/embed/charts?id=4d98e1f1-f10f-4158-87d8-66fcfdab56cb&theme=light"
                      width= "100%"
                      height="650px"
                      id="myId"
                      allowtransparency = 'false'
                      className="myClassname"
                      display="initial"
                      position="relative"
                      ba/>
                </div>
              </GridItem>
              <GridItem xs={12} sm={3}>
                <h2>Top song genre 2010-2019 - total 603 songs</h2>
                <h4> A pie chart is a circular graph that is broken down into segments (i.e slices of pie). This Pie chart shows the top song genre between years 2010-2019. Out of total 603 songs, the most popular genre dance pop has 327 songs followed by pop genre which has count 60. This chart shows the dominance of pop music in popular tracks.</h4>
              </GridItem>
            </GridContainer>
            <hr/>
            <GridContainer>
            <GridItem xs={12} sm={3}>
              <h2>Top Artists from 2010-2019</h2>
              <h4> This bar chart shows the top artists in years 2010 to 2019. Most popular artists are Katy Perry, Justin Bieber and Maroon 5 with 17, 16 and 15 top songs withing the time period. The artists who were consistent throughout the decade have higher number of popular tracks as compared to artists such as Ed Sheeran and Ariana Grande who were popular for only within the later part of the decade.</h4>
              </GridItem>
              <GridItem xs={12} sm={8}>
                <div style={{backgroundColor: '#fff'}}>
                  <Iframe url="https://charts.mongodb.com/charts-music-analysis-nutif/embed/charts?id=649ec359-7918-455a-9c56-91969a85825b&theme=light"
                      width= "100%"
                      height="500px"
                      id="myId"
                      allowtransparency = 'false'
                      className="myClassname"
                      display="initial"
                      position="relative"
                      backgroundColor="#FFFFFF"
                      ba/>
                          </div>
              </GridItem>
            </GridContainer>
            <hr/>
            {/* 3 */}
            <GridContainer>
              <GridItem xs={12} sm={8}>
                <div style={{backgroundColor: '#fff'}}>
                  <Iframe url="https://charts.mongodb.com/charts-music-analysis-nutif/embed/charts?id=905254b8-7325-494e-811c-038467b3b353&theme=light"
                      width= "90%"
                      height="650px"
                      id="myId"
                      allowtransparency = 'false'
                      className="myClassname"
                      display="initial"
                      position="relative"
                      backgroundColor="#FFFFFF"
                      ba/>
                          </div>
              </GridItem>
              <GridItem xs={12} sm={4}>
                <h2>BPM Distribution in Top Songs in 2010-2019</h2>
                <h4>The Tempo of a piece of music determines the speed at which it is played, and is measured in beats per minute (BPM). Generally most of the songs are within the range 100-150 BPM, especially the pop music tracks. The average pop song has a tempo of 116 beats per minute.</h4>
              </GridItem>
            </GridContainer>
            {/* 4 */}
            <hr/>
            <hr/>
            <GridContainer>
            <GridItem xs={12} sm={3}>
              <h2>Relationship between Danceability and Energy of Top songs</h2>
              <h4>Danceability is measured using a mixture of song features such as beat strength, tempo stability, and overall tempo. The value returned determines the ease with which a person could dance to a song over the course of the whole song. Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy.</h4>
              </GridItem>
              <GridItem xs={12} sm={8}>
                <div style={{backgroundColor: '#fff'}}>
                  <Iframe url="https://charts.mongodb.com/charts-music-analysis-nutif/embed/charts?id=f60a7090-c44c-4a53-92ab-55546069eef8&theme=light"
                      width= "100%"
                      height="650px"
                      id="myId"
                      allowtransparency = 'false'
                      className="myClassname"
                      display="initial"
                      position="relative"
                      backgroundColor="#FFFFFF"
                      ba/>
                          </div>
              </GridItem>
            </GridContainer>
            <hr/>
            {/* 5 */}
            <GridContainer>
              <GridItem xs={12} sm={8}>
        <div style={{backgroundColor: '#fff'}}>
                  <Iframe url="https://charts.mongodb.com/charts-music-analysis-nutif/embed/charts?id=e09e3edc-63cf-46df-a899-340159a819a6&theme=light"
                      width= "90%"
                      height="400px"
                      id="myId"
                      allowtransparency = 'false'
                      className="myClassname"
                      display="initial"
                      position="relative"
                      backgroundColor="#FFFFFF"
                      ba/>
                          </div>
              </GridItem>
              <GridItem xs={12} sm={4}>
                <h2>Relation between Song popularity and Song duration</h2>
                <h4>This graph plots the relation between Song popularity and Song duration. It can be clearly seen that most of the popular songs have duration between 3 to 4 minutes.</h4>
              </GridItem>
            </GridContainer>
            
            <hr/>
            <hr/>
            {/* 6*/}
            <GridContainer>
            <GridItem xs={12} sm={4}>
              <h2>Artist Popularity in 2010-2019</h2>
              <h4>This graph shows the artist popularity based on their songs in the years 2010 to 2019. Even though Katy Perry had more number of popular songs than any other artists, the artists Justin Bieber and Maroon 5 were more popular as some of their tracks were too popular.</h4>
              </GridItem>
              <GridItem xs={12} sm={8}>
        <div style={{backgroundColor: '#fff'}}>
                  <Iframe url="https://charts.mongodb.com/charts-music-analysis-nutif/embed/charts?id=6fcdeed2-3fb1-4430-9766-66916075baa8&theme=light"
                      width= "100%"
                      height="550px"
                      id="myId"
                      allowtransparency = 'false'
                      className="myClassname"
                      display="initial"
                      position="relative"
                      backgroundColor="#FFFFFF"
                      ba/>
                          </div>
              </GridItem>
            </GridContainer>
            <hr/>
            <hr/>
            {/* 7 */}
            <GridContainer>
              <GridItem xs={12} sm={8}>
                <div style={{backgroundColor: '#fff'}}>
                  <Iframe url="https://charts.mongodb.com/charts-music-analysis-nutif/embed/charts?id=1580902f-4d28-4dd9-9b96-412cbc7160ac&theme=light"
                      width= "90%"
                      height="350px"
                      id="myId"
                      allowtransparency = 'false'
                      className="myClassname"
                      display="initial"
                      position="relative"
                      backgroundColor="#FFFFFF"
                      ba/>
                          </div>
              </GridItem>
              <GridItem xs={12} sm={4}>
                <h2>2019 Top songs Genre comparison</h2>
                <h4>This graph shows the most popular genre for the popular songs in 2019. Showing the same trend as previous years, 2019 also has top songs with genre as dance pop and pop respectively.</h4>
              </GridItem>
            </GridContainer>
            <hr/>
            <hr/>

            {/* 8*/}
            <GridContainer>
            <GridItem xs={12} sm={4}>
              <h2>Song attribute Comparison for different Genre-2019</h2>
              <h4>This graph compares different attributes of top songs in 2019. The attributes compared are Beats per Minute, Loveliness, speechiness and length of the song. Some of the key observations are that the length of edm, latin, reggaeton flow is quite large as compared to other genres. Beats per minutes are higher in rap and trap music.</h4>
              </GridItem>
              <GridItem xs={12} sm={8}>
                <div style={{backgroundColor: '#fff'}}>
                  <Iframe url="https://charts.mongodb.com/charts-music-analysis-nutif/embed/charts?id=899072cf-2e0d-46d1-9199-d2b9bd49176b&theme=light"
                      width= "100%"
                      height="550px"
                      id="myId"
                      allowtransparency = 'false'
                      className="myClassname"
                      display="initial"
                      position="relative"
                      backgroundColor="#FFFFFF"
                      ba/>
                          </div>
              </GridItem>
            </GridContainer>
            <hr/>
            <hr/>

            {/* 9 */}
            <GridContainer>
              <GridItem xs={12} sm={8}>
        <div style={{backgroundColor: '#fff'}}>
                  <Iframe url="https://charts.mongodb.com/charts-music-analysis-nutif/embed/charts?id=9196f084-1ddc-4103-b07d-f9f65393fd79&theme=light"
                      width= "100%"
                      height="450px"
                      id="myId"
                      allowtransparency = 'false'
                      className="myClassname"
                      display="initial"
                      position="relative"
                      backgroundColor="#FFFFFF"
                      ba/>
                          </div>
              </GridItem>
              <GridItem xs={12} sm={4}>
                <h2>Word Cloud- Popular Genre</h2>
                <h4>Word clouds are graphical representations of word frequency that give greater prominence to words that appear more frequently in a source text. The larger the word in the visual the more common the word was in the document. It can be seen that Dance pop, pop are the large sized words indicating higher frequecy of those genres..</h4>
              </GridItem>
            </GridContainer>
            <hr/>
            <hr/>

            {/* 10*/}
            <GridContainer>
            <GridItem xs={12} sm={4}>
              <h2>Popular artist from 2019</h2>
              <h4>This word cloud shows the popular artists in year 2019. Ed Sheeran, Post Malone, the chainsmokers were some of the most popular artists in year 2019 shown with larger size of their respective names.</h4>
              </GridItem>
              <GridItem xs={12} sm={8}>
                <div style={{backgroundColor: '#fff'}}>
                  <Iframe url="https://charts.mongodb.com/charts-music-analysis-nutif/embed/charts?id=5d8980d7-b7dc-4b6d-88a5-7b71af935b86&theme=light"
                      width= "100%"
                      height="450px"
                      id="myId"
                      allowtransparency = 'false'
                      className="myClassname"
                      display="initial"
                      position="relative"
                      backgroundColor="#FFFFFF"
                      ba/>
                          </div>
              </GridItem>
            </GridContainer>
            <hr/>
            <hr/>


            {/* 11*/}
            <GridContainer>
              <GridItem xs={12} sm={8}>
                <div style={{backgroundColor: '#fff'}}>
                  <Iframe url="https://charts.mongodb.com/charts-music-analysis-nutif/embed/charts?id=5b2adc47-c0ef-432c-9954-11f6665091d1&theme=light"
                      width= "100%"
                      height="450px"
                      id="myId"
                      allowtransparency = 'false'
                      className="myClassname"
                      display="initial"
                      position="relative"
                      backgroundColor="#FFFFFF"
                      ba/>
                          </div>
              </GridItem>
              <GridItem xs={12} sm={4}>
                <h2>Popular artists from 2010-1019</h2>
                <h4>This word cloud shows the popular artists in years 2010-2019. Katy Perry, Justin Bieber, Lady Gaga were some of the most popular artists in these years. As seen from this cloud it is not always easy to compare the frequecies based on the size of the words.</h4>
              </GridItem>
            </GridContainer>
            <hr/>
            <hr/>

            
            {/* 12*/}
            <GridContainer>
            <GridItem xs={12} sm={4}>
              <h2>Artist Popularity over Christmas</h2>
              <h4>This bar chart shows the artist popularity over Christmas. It can be seen that artists who have songs related to Christmas have higher number of popularity count in that part of the year. One good example can be a song names All I want for Christmas is you by Mariah Carey.</h4>
              </GridItem>
              <GridItem xs={12} sm={8}>
                <div style={{backgroundColor: '#fff'}}>
                  <Iframe url="https://charts.mongodb.com/charts-music-analysis-nutif/embed/charts?id=14eeb154-1580-4be6-9315-9c22e8282aaa&theme=light"
                      width= "100%"
                      height="400px"
                      id="myId"
                      allowtransparency = 'false'
                      className="myClassname"
                      display="initial"
                      position="relative"
                      backgroundColor="#FFFFFF"
                      ba/>
                          </div>
              </GridItem>
            </GridContainer>
            <hr/>
            <hr/>

            {/* 13*/}
            <GridContainer>
            <GridItem xs={12} sm={8}>
                <div style={{backgroundColor: '#fff'}}>
                <Iframe url="https://charts.mongodb.com/charts-music-analysis-nutif/embed/charts?id=6f0b9fd8-2a7b-4cdd-8ea9-f8b7a65f46c9&theme=light"
                    width= "100%"
                    height="450px"
                    id="myId"
                    allowtransparency = 'false'
                    className="myClassname"
                    display="initial"
                    position="relative"
                    backgroundColor="#FFFFFF"
                    ba/>
                        </div>
            </GridItem>
            <GridItem xs={12} sm={4}>
              <h2>Danceability Vs Liveliness Vs Energy in Popular songs for countries</h2>
              <h4>Different countries have different music preferences. This graph compares the popular songs in countries based on Danceability, liveliness and Energy. It can be seen that south american countries like Brazil and Argentina as well as Chile prefers high energy songs with high danceability.</h4>
            </GridItem>
          </GridContainer>
          <hr/>
          <hr/>
            
            {/* 14*/}
            <GridContainer>
            <GridItem xs={12} sm={4}>
              <h2>Artist Popularity over Christmas</h2>
              <h4>This word cloud shows the popular songs during Christmas time. Here most of the songs with larger font are related to Christmas such as Last Christmas, All I want for Christmas is you etc. But there are some other songs as well such as Dance Monkey, Roxanne etc.</h4>
              </GridItem>
              <GridItem xs={12} sm={8}>
                <div style={{backgroundColor: '#fff'}}>
                  <Iframe url="https://charts.mongodb.com/charts-music-analysis-nutif/embed/charts?id=82313ac5-905f-4fed-9f50-84872179b74e&theme=light"
                      width= "100%"
                      height="400px"
                      id="myId"
                      allowtransparency = 'false'
                      className="myClassname"
                      display="initial"
                      position="relative"
                      backgroundColor="#FFFFFF"
                      ba/>
                          </div>
              </GridItem>
            </GridContainer>
            <hr/>
            <hr/>


            {/* 15*/}
            <GridContainer>
            <GridItem xs={12} sm={8}>
                <div style={{backgroundColor: '#fff'}}>
                <Iframe url="https://charts.mongodb.com/charts-music-analysis-nutif/embed/charts?id=112bafb7-0a06-494d-81bb-50f2d52c2ee3&theme=light"
                    width= "100%"
                    height="450px"
                    id="myId"
                    allowtransparency = 'false'
                    className="myClassname"
                    display="initial"
                    position="relative"
                    backgroundColor="#FFFFFF"
                    ba/>
                        </div>
            </GridItem>
            <GridItem xs={12} sm={4}>
              <h2>Popular Artist performance in last 10 years</h2>
              <h4>This graph compares the performances of popular artists over the years 2010-2019. The artists chosen were most of the top artists over last decade. It can be seen that top artists like Katy Perry, Justin Bieber performed well through the decade while some artists like Ed Sheeran and the Chainsmokers started performing well in later of the decade.</h4>
            </GridItem>
          </GridContainer>
          <hr/>
          <hr/>
            {/* <GridItem xs={12} sm={8} className={classes.marginLeft}>
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
            </GridItem> */}
          </GridContainer>
          <GridContainer />
        </div>
        <div className={classes.space50} />
      </div>
    </div>
  );
}
