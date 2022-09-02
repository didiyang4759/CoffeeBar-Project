import axios from 'axios';

class CoffeeDataService {

    getAll(page=0) {
        return axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/coffees?page=${page}`
        );
    }

    find(query, by='ItemName', page=0) {
        return axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/coffees?${by}=${query}?page=${page}`
        );
    }

    getRatings() {
        return axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/coffees/ratings`
        );
    }

    getCoffee(id) {
        return axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/coffees/id/${id}`
        );
    }

    createReview(data) {
        return axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/coffees/review`, data
        );
    }

    updateReview(data) {
        return axios.put(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/coffees/review`, data
        );
    }

    deleteReview(data) {
        return axios.delete(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/coffees/review`,
            {
                data: {
                    review_id: data._id,
                    user_id: data.user_id
                }
            }
        );
    }

    createOrder(data) {
        return axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/coffees/orders`, data
        );
    }

    updateOrder(data) {
        return axios.put(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/coffees/orders`, data
        );
    }
}

export default new CoffeeDataService();