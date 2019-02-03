import ApiService from './Api.service'
const BASE_API_URL ='http://localhost:3000'


class ItemService {
    static getAllItems = async() => ApiService.get(`${BASE_API_URL}/items`);
}

export default ItemService;