import app from './server.js';
import mongodb from "mongodb";
import dotenv from "dotenv";
import CoffeesDAO from './dao/coffeesDAO.js';
import ReviewsDAO from './dao/reviewsDAO.js';
import OrdersDAO from './dao/ordersDAO.js';

async function main() {
    dotenv.config();

    const client = new mongodb.MongoClient(
        process.env.COFFEEREVIEWS_DB_URI
    )
    const port = process.env.PORT || 8000;

    try {
        // Connect to MongoDB server
        await client.connect();
        // pass the client object to DAO
        await CoffeesDAO.injectDB(client);
        await ReviewsDAO.injectDB(client);
        await OrdersDAO.injectDB(client);

        app.listen(port, () => {
            console.log('Server is running on port: ' + port);
        })
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}

main().catch(console.error);