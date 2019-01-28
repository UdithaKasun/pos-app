import ApiService from './Api.service'
const BASE_API_URL ='http://localhost:3000'


class OrderService {
    static getAllOrders = async() => ApiService.get(`${BASE_API_URL}/orders`);
}

export default OrderService;