import React, { useState } from 'react';
import CoffeeDataService from '../services/coffees';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const AddReview = ({ user }) => {
    const navigate = useNavigate();
    let params = useParams();
    let location = useLocation();

    let editing = false;
    let initialReviewState = '';

    if (location.state !== null) {
        editing = true;
        initialReviewState = location.state.currentReview;
    }

    const [review, setReview] = useState(initialReviewState);

    const onChangeReview = e => {
        const review = e.target.value;
        setReview(review);
    }

    const saveReview = () => {
        var data = {
            review: review,
            name: user.name,
            user_id: user.googleId,
            coffee_id: params.id
        }

        if (editing) {
            data.review_id = initialReviewState._id;
            CoffeeDataService.updateReview(data)
                .then(response => {
                    navigate('/coffee/' + params.id)
                })
                .catch(e => {
                    console.log(e);
                });
        } else {
            CoffeeDataService.createReview(data)
                .then(response => {
                    navigate('/coffees/' + params.id)
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    return (
        <Container className='main-container'>
            <Form>
                <Form.Group className='mb-3'>
                    <Form.Label>
                        {editing ? 'Edit' : 'Create'} Review
                    </Form.Label>
                    <Form.Control
                        as='textarea'
                        type='text'
                        required
                        review={review}
                        onChange={onChangeReview}
                        defaultValue={editing ? initialReviewState.review : ''}
                    />
                </Form.Group>
                <Button variant='primary' onClick={saveReview}>
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default AddReview;