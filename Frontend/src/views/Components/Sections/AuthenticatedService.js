import axios from 'axios'

class AutheticationService{
    registerSuccessfulLogin(user){
        // sessionStorage.setItem('authenticatedUserId',user.username);
        sessionStorage.setItem('authenticatedUserId',user.id);
        this.setupAxiosInterceptors()
    }

    updateUsername(username){
        // sessionStorage.setItem('authenticatedUser',username);
    }

    logout(){
        // sessionStorage.removeItem('authenticatedUser');
        sessionStorage.removeItem('authenticatedUserId');
        sessionStorage.removeItem('authenticatedUsertoken');
    }

    isUserLoggedIn(){
        let user = sessionStorage.getItem('authenticatedUserId');
        if(user===null) return false
        return true
	}

   
}
export default new AutheticationService()