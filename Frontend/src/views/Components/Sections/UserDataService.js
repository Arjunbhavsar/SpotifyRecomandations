import axios from 'axios'

class getUsersDataService{
    state = {  
		userTag : 'http://localhost:8000/user/'
    }
    
    getUserLikes(){
        let user_id = sessionStorage.getItem('authenticatedUserId');
        let user_token = sessionStorage.getItem('authenticatedUsertoken');

        return axios.get('http://localhost:8000/user/' + user_id + '/likes' ,
            {
                headers: {
                    Authorization: user_token
                }
            }  
        )
    }

    getUserDataAcoustics(){
        let user_id = sessionStorage.getItem('authenticatedUserId');
        let user_token = sessionStorage.getItem('authenticatedUsertoken');

        return axios.get('http://localhost:8000/user/' + user_id + '/acoustics' ,
            {
                headers: {
                    Authorization: user_token
                }
            }  
        )
    }

    getUserDataArtists(){
        let user_id = sessionStorage.getItem('authenticatedUserId');
        let user_token = sessionStorage.getItem('authenticatedUsertoken');

        return axios.get('http://localhost:8000/user/' + user_id + '/artists' ,
            {
                headers: {
                    Authorization: user_token
                }
            }  
        )
    }

    getUserDataPopularity(){
        let user_id = sessionStorage.getItem('authenticatedUserId');
        let user_token = sessionStorage.getItem('authenticatedUsertoken');

        return axios.get('http://localhost:8000/user/' + user_id + '/popularity' ,
            {
                headers: {
                    Authorization: user_token
                }
            }  
        )
    }

    getUserDataRelease(){
        let user_id = sessionStorage.getItem('authenticatedUserId');
        let user_token = sessionStorage.getItem('authenticatedUsertoken');

        return axios.get('http://localhost:8000/user/' + user_id + '/release' ,
            {
                headers: {
                    Authorization: user_token
                }
            }  
        )
    }


}    
export default new getUsersDataService();
