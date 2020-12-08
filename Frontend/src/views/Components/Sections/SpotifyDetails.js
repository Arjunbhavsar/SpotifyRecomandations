import React from "react";

// @material-ui/icons
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
import DescriptionIcon from '@material-ui/icons/Description';

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js"

export default function SpotifyDetails() {
    const title = {
        color: "#3C4858",
        margin: "1.75rem 0 0.875rem",
        textDecoration: "none",
        fontWeight: "700",
        fontFamily: `"Roboto Slab", "Times New Roman", serif`
    };
    const style = {
        section: {
            padding: "70px 0",
            textAlign: "center",
            backgroundColor: 'white'
        },
        feat: {
            marginTop: '-20px'
        },
        name: {
            color: '#37474f',
            fontWeight: 'bold'
        },
        spec: {
            color: '#37474f'
        },
        space: {
            marginTop: '20px'
        },
        body: {
            fontSize: '14px',
            lineHeight: '175%'
        },
        title: {
            ...title,
            marginBottom: "1rem",
            marginTop: "30px",
            minHeight: "32px",
            textDecoration: "none"
        },
        items: {
            display: "flex"
        }
    };

    return (
        <div style={style.section}>
            <div style={style.space}>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={12}>
                        <h2 className={style.title} style={style.feat}>Platform Features</h2>
                        <br />
                        <GridContainer style={style.items}>
                            <GridItem xs={12} sm={12} md={4}>
                                <InfoArea
                                    title="Song Recommendations"
                                    description="With our recomendation system users can find the all relevent Songs that suits their needs.
                                                Application can help provide the most relevent Songs that you would love to listen in diffrent moods."
                                    icon={DescriptionIcon}
                                    iconColor="info"
                                    vertical
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <InfoArea
                                    title="Verified Artists"
                                    description="All of the Singers on our network are verified and trusted. We do the research
                                                  for you. Each Song you see is created by the authenticated Artist who is verified through login process"
                                    icon={VerifiedUser}
                                    iconColor="success"
                                    vertical
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <InfoArea
                                    title="Secure"
                                    description="Your information security is our top priority. Any data regarding our users 
                                                  are strictly kept within the system and affiliated Employers. Third-party authorization
                                                  and sales of personal information is strictly forbidden."
                                    icon={Fingerprint}
                                    iconColor="danger"
                                    vertical
                                />
                            </GridItem>
                        </GridContainer>
                    </GridItem>
                </GridContainer>
            </div>
        </div>
    );
}
