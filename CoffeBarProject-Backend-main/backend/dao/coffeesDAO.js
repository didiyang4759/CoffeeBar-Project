import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let coffees;

export default class CoffeesDAO {
    static async injectDB(conn) {
        if (coffees) {
            return;
        }
        try {
            coffees = await conn.db(process.env.COFFEEREVIEWS_NS)
                            .collection('coffees');
        }
        catch (e) {
            console.log(`Unable to connect in CoffeeDB: ${e}`);
        }
    }

    // pass in default parameters in case an under-specified argument is passed
    // and an empty object in case no argument is passed at all
    static async getCoffees({
        filters = null,
        page = 0,
        coffeePerPage = 20,
    } = {}) { 
        let query;
        if (filters) {
            if ("ItemName" in filters) {
                query = { $text: { $search: filters['ItemName'] } };
            } else if ("rated" in filters) {
                query = { "rated": {$eq: filters['rated']} };
            }
        }

        let cursor;
        try {
            cursor = await coffees.find(query)
                                 .limit(coffeePerPage)
                                 .skip(coffeePerPage * page);
            const coffeeList = await cursor.toArray();
            const totalNumCoffees = await coffees.countDocuments(query);
            return {coffeeList, totalNumCoffees};
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`);
            return { coffeeList: [], totalNumCoffees: 0 };
        }
    }

    static async getRatings() {
        let ratings = [];
        try {
            ratings = await coffees.distinct("rated");
            return ratings;
        } catch (e) {
            console.error(`Unable to get ratings, ${e}`);
            return ratings;
        } 
    }

    static async getCoffeeById(id) {
        try {
            return await coffees.aggregate([
                {
                    $match: {
                        _id: new ObjectId(id),
                    }
                },
                {
                    $lookup: {
                        from: 'reviews',
                        localField: '_id',
                        foreignField: 'coffee_id',
                        as: 'reviews',
                    }
                }
            ]).next();
        } catch (e) {
            console.error(`Something went wrong in getCoffeeById: ${e}`);
            throw e;
        }
    }
}