import ApiService from "./Api.service";
const BASE_API_URL = "http://localhost:3000";

class UserService {
  static authenticateUser = async (username, password) =>
    ApiService.post(`${BASE_API_URL}/sessions`, { username, password });
  static verifyToken = async token =>
    ApiService.post(`${BASE_API_URL}/sessions/verify`, { token });
}

export default UserService;
