import OrdersDAO from '../dao/ordersDAO.js';

export default class OrdersController {
    static async apiPostOrder(req, res, next) {
        try {
            const coffeeName = req.body.coffee_name;
            const quantity = req.body.quantity;
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            };
            const date = new Date();
            
            const orderResponse = await OrdersDAO.addOrders(
                coffeeName,
                userInfo,
                quantity,
                date
            );

            var {error} = orderResponse;
            console.log(error);
            if (error) {
                res.status(500).json({error: 'Unable to post order'});
            } else {
                res.json({status: 'Success'});
            }
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async apiUpdateOrder(req, res, next) {
        const orderId = req.body.order_id;
        const userId = req.body.user_id;
        const quantity = req.body.quantity;
        const coffeeName = req.body.coffee_name;
        const date = new Date();

        try {
            const orderResponse = await OrdersDAO.updateOrder(
                orderId, userId, coffeeName, quantity, date
            );
            var { error } = orderResponse;
            console.log(error);
            if (error) {
                res.status(500).json({ error: 'Unable to update order' });
            } else {
                res.json({ status: 'Success' });
            }
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiDeleteOrder(req, res, next) {
        const orderId = req.body.order_id;
        const userId = req.body.user_id;

        try {
            const orderResponse = await OrdersDAO.deleteOrder(
                orderId, userId
            );
            var { error } = orderResponse;
            console.log(error);
            if (error) {
                res.status(500).json({ error: 'Unable to delete order' });
            } else {
                res.json({ status: 'Success' });
            }
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiGetOrders(req, res, next) {
        try {
            let userIdQuery = req.query;
            let order = await OrdersDAO.getOrder(userIdQuery);
            if (!order) {
                res.status(404).json({ error: "not found" });
                return;
            }
            res.json(order);
        } catch(e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error: e });
        }
    }
}