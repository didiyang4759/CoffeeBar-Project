import CoffeesDAO from '../dao/coffeesDAO.js';

/*
get all movies
*/
export default class CoffeesController {
    static async apigetCoffees(req, res, next) {
        const coffeePerPage = req.query.coffeePerPage ?
            parseInt(req.query.coffeePerPage) : 20;
        const page = req.query.page ? parseInt(req.query.page) : 0;

        let filters = {};
        if (req.query.rated) {
            filters.Type = req.query.rated;
        } else if (req.query.ItemName) {
            filters.ItemName = req.query.ItemName;
        }

        const { coffeeList, totalNumCoffees } = await
            CoffeesDAO.getCoffees({ filters, page, coffeePerPage });
        
        let response = {
            coffee: coffeeList,
            page: page,
            filters: filters,
            entries_per_page: coffeePerPage,
            total_results: totalNumCoffees,
        };
        res.json(response);
    }

    /*
    get a single movie given its specific ID value
    */
    static async apigetCoffeeById(req, res, next) {
        try {
            let id = req.params.id || {};
            console.log(id)
            let coffee = await CoffeesDAO.getCoffeeById(id);
            if (!coffee) {
                res.status(404).json({ error: "not found" });
                return;
            }
            res.json(coffee);
        } catch (e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error: e });
        }
    }
    /*
    query the database for all distinct "rating" values in the movies database,
    yielding a list of ratings to populate our ratings filter drop-down
    */
    static async apiGetRatings(req, res, next) {
        try {
            let propertyTypes = await CoffeesDAO.getRatings();
            res.json(propertyTypes);
        } catch (e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error: e });
        }
    }
}