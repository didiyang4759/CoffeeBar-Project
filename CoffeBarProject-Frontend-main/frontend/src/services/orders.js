import axios from 'axios';

class OrderDataService {
    getNewOrder(userId) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/coffees/orders?user_id=${userId}`,
        );
      }
}



export default new OrderDataService();
