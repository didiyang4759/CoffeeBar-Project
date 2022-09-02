import ReviewsDAO from '../dao/reviewsDAO.js';

export default class ReviewsController {
    static async apiPostReview(req, res, next) {
        try {
            const coffeeId = req.body.coffee_id;
            const review = req.body.review;
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            };
            const date = new Date();

            const reviewResponse = await ReviewsDAO.addReview(
                coffeeId,
                userInfo,
                review,
                date
            );

            var {error} = reviewResponse;
            console.log(error);
            if (error) {
                res.status(500).json({error: 'Unable to post review'});
            } else {
                res.json({status: 'Success'});
            }
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    static async apiUpdateReview(req, res, next) {
        const reviewId = req.body.review_id;
        const userId = req.body.user_id;
        const review = req.body.review;
        const date = new Date();

        try {
            const reviewResponse = await ReviewsDAO.updateReview(
                reviewId, userId, review, date
            );
            var { error } = reviewResponse;
            console.log(error);
            if (error) {
                res.status(500).json({ error: 'Unable to update review' });
            } else {
                res.json({ status: 'Success' });
            }
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiDeleteReview(req, res, next) {
        const reviewId = req.body.review_id;
        const userId = req.body.user_id;

        try {
            const reviewResponse = await ReviewsDAO.deleteReview(
                reviewId, userId
            );
            var { error } = reviewResponse;
            console.log(error);
            if (error) {
                res.status(500).json({ error: 'Unable to delete review' });
            } else {
                res.json({ status: 'Success' });
            }
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}