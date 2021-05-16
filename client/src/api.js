import axios from "axios";

const api = "http://localhost:8000/auth/";


class Auth {

    register(name,email,password){
        return axios.post(api + "register" , {
            name,
            email,
            password
        })
    }


    login(email,password){

        return axios.post(api + "login" , {

            email,
            password
        })

        .then(res => {

            if(res.data.accesstoken) {

                localStorage.setItem("user" , res.data);
            }
        })
        .catch(err =>{
            
            return err;

        })

        

    }
}

export default new Auth();

