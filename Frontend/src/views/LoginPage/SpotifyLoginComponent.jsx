import React, { Component } from 'react'
import SpotifyLogin from 'react-spotify-login';
import LandingPage from "../LandingPage/LandingPage";

import axios from 'axios'

export default class SpotifyLoginComponent extends Component {
    constructor(props){
		super(props)
        this.state = {
            isLoggedIn :false,
            userId:'',
            name:'',
            email:'',
            picture:''
            
        }
        this.responseSpotify= this.responseSpotify.bind(this);
        this.registerSession= this.registerSession.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onFailure = this.onFailure.bind(this);
        this.fetchUserDetails = this.fetchUserDetails.bind(this);
    }

    registerSession = () =>{
        sessionStorage.setItem('authenticatedUser',this.state.email)
    };


    fetchUserDetails = access_token => {

        let authHeader = "Bearer "+ access_token
		return axios.get("https://api.spotify.com/v1/me" ,
		{
			headers:{
				authorization: authHeader
			}
		})
    }

    responseSpotify = response=>{
        
        this.setState({
            isLoggedIn:true,
            userId:response.userId,
            name: response.name,
            email:response.email,
            picture:response.picture.data.url

        })
        console.log('inside Login')
        console.log(this.state)
        
    };

    onSuccess = response => {
        console.log("Success");
        console.log(response.access_token);

        if(response.access_token !== null || response.access_token !== ''){
            sessionStorage.setItem('authenticatedUsertoken',response.access_token)
            this.fetchUserDetails(response.access_token)
            .then(res => {
                if(res.status === 200) {
                    console.log('Register Successful')
                    console.log(res)
                    sessionStorage.setItem('authenticatedUserId',res.data.id)
                    sessionStorage.setItem('authenticatedUserEmail',res.data.email)
                    //this.props.history.push("/")
                }
            })
            .catch(console.log("Error fetching user details"))
        }
    }
    onFailure = () => console.log("Failure");

    render() {
        let spotifyContent;

        if(this.state.isLoggedIn){
            spotifyContent=<LandingPage/>
            
        }else{
            spotifyContent=( 
                <SpotifyLogin clientId="eb8167b38eeb48d398db297977f51938"
                    redirectUri="http://localhost:3000/"
                    fields= "name,email,picture"
                    onSuccess={this.onSuccess}
                    onFailure={this.onFailure}
                    callback={this.responseSpotify}
                    onclick = {this.registerSession}/>
              );
        }

        return (
            <div>
                {spotifyContent}
            </div>
        )
    }
}
