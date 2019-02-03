import ApiService from "./Api.service";
const BASE_API_URL = "http://localhost:3000";

class OrderService {
  static getAllOrders = async () => ApiService.get(`${BASE_API_URL}/orders`);
  static getItemsPerOrder = async orderId =>
    ApiService.get(`${BASE_API_URL}/orders/${orderId}/items`);
  static addNewOrder = async () => ApiService.post(`${BASE_API_URL}/orders`);
  static updateOrder = async (orderId, orderItems) =>
    ApiService.put(`${BASE_API_URL}/orders/${orderId}/items`, orderItems);
  static deleteOrder = async orderId =>
    ApiService.delete(`${BASE_API_URL}/orders/${orderId}`);
}

export default OrderService;
