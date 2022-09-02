import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsDAO {
    static async injectDB(conn) {
        if (reviews) {
            return;
        }
        try {
            reviews = await conn.db(process.env.COFFEEREVIEWS_NS)
                .collection('reviews');
        }
        catch (e) {
            console.error(`Unable to connect in ReviewsDB: ${e}`);
        }
    }

    static async addReview(coffeeId, user, review, date) {
        try {
            const reviewDoc = {
                name: user.name,
                user_id: user._id,
                date: date,
                review: review,
                coffee_id: ObjectId(coffeeId)
            };
            return await reviews.insertOne(reviewDoc);
        } catch (e) {
            console.error(`Unable to post review: ${e}`);
            return { error: e };
        }
    }

    static async updateReview(reviewId, userId, review, date) {
        try {
            // set new review text and new date
            const reviewResponse = await reviews.updateOne(
                { user_id: userId, _id: ObjectId(reviewId) },
                { $set: { review: review, date: date} }
            );
            // check modified count
            if (reviewResponse.modifiedCount === 0) {
                throw 'Change has not been made';
            }
            return reviewResponse;
        } catch (e) {
            console.error(`Unable to update review: ${e}`);
            return { error: e };
        }
    }

    static async deleteReview(reviewId, userId) {
        try {
            return await reviews.deleteOne({
                _id: ObjectId(reviewId),
                user_id: userId});
        } catch (e) {
            console.error(`Unable to delete review: ${e}`);
            return { error: e };
        }
    }
}