import axios from 'axios';

class ApiService {

    static async get(url,config){
        return axios.get(url,config);
    }

    static async post(url,params,data){
        return axios.post(url,{params,data});
    }

    static async put(url,params,data){
        return axios.put(url,{params,data});
    }

    static async delete(url,params){
        return axios.delete(url,{params});
    }
}

export default ApiService;
