import axios from 'axios';

class ApiService {
    
    static getConfig(){
        return {
            headers: {'Authorization': "Bearer " + localStorage.getItem('token')}
        };
    }

    static async get(url,params){
        return axios.get(url,{params,...(this.getConfig())});
    }

    static async post(url,data,params){
        return axios.post(url,data,{params,...(this.getConfig())});
    }

    static async put(url,data,params){
        return axios.put(url,data,{params,...(this.getConfig())});
    }

    static async delete(url,params){
        return axios.delete(url,{params,...(this.getConfig())});
    }
}

export default ApiService;
