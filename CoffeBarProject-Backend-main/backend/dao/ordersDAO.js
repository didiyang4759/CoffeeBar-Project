import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let orders;

export default class OrdersDAO {
    static async injectDB(conn) {
        if (orders) {
            return;
        }
        try {
            orders = await conn.db(process.env.COFFEEREVIEWS_NS)
                .collection('orders');
        }
        catch (e) {
            console.error(`Unable to connect in OrdersDB: ${e}`);
        }
    }

    static async addOrders(coffeeName, user, quant, date) {
        try {
            const orderDoc = {
                name: user.name,
                user_id: user._id,
                date: date,
                quantity: quant,
                coffee_name: coffeeName
            };
            
            return await orders.insertOne(orderDoc);
        } catch (e) {
            console.error(`Unable to post order: ${e}`);
            return { error: e };
        }
    }

    static async updateOrder(orderId, userId, coffeeName, quant, date) {
        try {
            // set new review text and new date
            const orderResponse = await orders.updateOne(
                { user_id: userId, _id: ObjectId(orderId) },
                { $set: { quantity: quant, 
                          coffee_name: coffeeName, 
                          date: date} }
            );
            // check modified count
            if (orderResponse.modifiedCount === 0) {
                throw 'Change has not been made';
            }
            return orderResponse;
        } catch (e) {
            console.error(`Unable to update order: ${e}`);
            return { error: e };
        }
    }

    static async deleteOrder(orderId, userId) {
        try {
            return await orders.deleteOne({
                _id: ObjectId(orderId),
                user_id: userId});
        } catch (e) {
            console.error(`Unable to delete order: ${e}`);
            return { error: e };
        }
    }

    static async getOrder(userId) {
        let cursors;
        try {
            cursors = await orders.find(userId).toArray();
            return cursors[cursors.length - 1];
        } catch(e) {
            console.error(`Something went wrong in getOrder: ${e}`);
            throw e;
        }
    }
}