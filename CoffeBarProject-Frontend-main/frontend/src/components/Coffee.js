import React, { useState, useEffect } from 'react';
import CoffeeDataService from '../services/coffees';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import moment from 'moment';

import './Coffee.css';

const Coffee = ({ user }) => {

    let params = useParams();
    const navigate = useNavigate();

    const [coffee, setCoffee] = useState({
        id: null,
        ItemName: "",
        Description: "",
        Poster: "",
        Rated: "",
        reviews: []
    });

    useEffect(() => {
        const getCoffee = id => {
            CoffeeDataService.getCoffee(id)
                .then(response => {
                    let data = response.data;
                    setCoffee({
                        id: data._id,
                        ItemName: data.ItemName,
                        Description: data.Description,
                        Poster: data.Poster,
                        Rated: data.Rated,
                        reviews: data.reviews
                    });
                })
                .catch((e) => {
                    console.log(e)
                })
        }
        getCoffee(params.id);
    }, [params.id]);

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <div className='poster'>
                            <Image
                                className='bigPicture'
                                src={coffee.Poster}
                                fluid
                                onError={(e) => {
                                    e.target.onerror = null;
                                    //e.target.src = '../images/NoPosterAvailable-crop.jpg';
                                }}
                            />
                        </div>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header as='h5'>
                                {coffee.ItemName}
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>{coffee.Description}</Card.Text>
                                {
                                    user &&
                                    <Link to={'/coffees/' + params.id + '/review'}>
                                        Add Review
                                    </Link>
                                }
                            </Card.Body>
                        </Card>
                        <h2>Reviews</h2>
                        <br></br>
                        {coffee.reviews.map((review, index) => {
                            return (
                                <div className='d-flex' key={review._id}>
                                    <div className='flex-shrink-0 reviewsText'>
                                        <h5>{review.name + ' reviewed on '} {moment(review.date).format('Do MMMM YYYY')} </h5>
                                        <p className='review'>{review.review}</p>
                                        {user && user.googleId === review.user_id &&
                                            <Row>
                                                <Col>
                                                    <Link
                                                        to={{
                                                            pathname: "/coffees/" + params.id+"/review"
                                                            // pathname: 'review'
                                                        }}
                                                        state={{
                                                            currentReview: review
                                                        }}>
                                                          Edit
                                                    </Link>
                                                </Col>
                                                <Col>
                                                    <Button
                                                        vairnat='link'
                                                        onClick={() => {
                                                            CoffeeDataService.deleteReview(review)
                                                                .then(response => {
                                   
                                                                    setCoffee((prevState) => {
                                                                        prevState.reviews.splice(index, 1);
                                                                        return ({
                                                                            ...prevState
                                                                        })
                                                                    })
                                                                })
                                                                .catch(e => {
                                                                    console.log(e);
                                                                });
                                                        }}>
                                                        Delete
                                                    </Button>
                                                </Col>
                                            </Row>
                                        }
                                    </div>
                                </div>
                            )
                        })}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}


export default Coffee;