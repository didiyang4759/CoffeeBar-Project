import React, { useState, useEffect, useCallback } from 'react';
import CoffeeDataService from '../services/coffees';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

import './CoffeesList.css';


const CoffeesList = props => {
    /*
     useState hook: set state values
     syntax:
     const [<state_name>, <setter_name>] = useState(<initial state_value>)
     */
    const [coffees, setCoffees] = useState([]);
    const [searchItemName, setSearchItemName] = useState("");
    const [searchRating, setSearchRating] = useState("");
    const [ratings, setRatings] = useState(["All Ratings"]);
    const [currentPage, setCurrentPage] = useState(0);
    const [entriesPerPage, setEntriesPerPage] = useState(0);
    const [currentSearchMode, setCurrentSearchMode] = useState("");

    /*
    useCallback: define functions which should only be created once
    and will be dependencies for useEffect
    why useCallback?
    1) when useEffect depends on the function we define, but function defined within
    a component are re-created every time the component is called, which cause a constant
    cycle of re-renders
    2) Ways to avoid this:
        a. define the function outside of the React component
            (cons: the function cannot access useState values)
        b. define the function within the useEffect itself
            (cons: the function cannot be shared)
        c. define the function using useCallback hook, which ensures the function will be
            re-created only when its dependencies change
    */
    const retrieveRatings = useCallback(() => {
        CoffeeDataService.getRatings()
            .then(response => {
                setRatings(["All Ratings"].concat(response.data));
            })
            .catch(e => {
                console.log(e);
            });
    }, []);

    const retrieveCoffees = useCallback(() => {
        setCurrentSearchMode("");
        CoffeeDataService.getAll(currentPage)
            .then(response => {
                console.log('=======');
                console.log(response);
                console.log('=======');
                setCoffees(response.data.coffee);
                setCurrentPage(response.data.page);
                setEntriesPerPage(response.data.entries_per_page);
            })
            .catch(e => {
                console.log(e);
            });
    }, [currentPage]);

    const find = useCallback((query, by) => {
        CoffeeDataService.find(query, by, currentPage)
            .then(response => {
                setCoffees(response.data.coffees);
            })
            .catch(e => {
                console.log(e);
            })
    }, [currentPage]);

    const findByItemName = useCallback(() => {
        setCurrentSearchMode("findByItemName");
        find(searchItemName, 'ItemName');
    }, [find, searchItemName]);

    const findByRating = useCallback(() => {
        setCurrentSearchMode("findByRating");
        if (searchRating === "All Ratings") {
            retrieveCoffees();
        } else {
            find(searchRating, "rated");
        }
    }, [find, searchRating, retrieveCoffees]);

    const retrieveNextPage = useCallback(() => {
        if (currentSearchMode === 'findByItemName') {
            findByItemName();
        } else if (currentSearchMode === 'findByRating') {
            findByRating();
        } else {
            retrieveCoffees();
        }
    }, [currentSearchMode, findByItemName, findByRating, retrieveCoffees]);

    /*
    useEffect hook: update if any of the dependencies change
    */
    useEffect(() => {
        retrieveRatings();
    }, [retrieveRatings]);

    useEffect(() => {
        setCurrentPage(0);
    }, [currentSearchMode]);

    useEffect(() => {
        retrieveNextPage();
    }, [currentPage, retrieveNextPage]);

    // /*
    // functions that are not depended on by any useEffect,
    // they will be called directly by events in the UI
    // */
    const onChangesearchItemName = e => {
        const searchItemName = e.target.value;
        setSearchItemName(searchItemName);
    }

    const onChangeSearchRating = e => {
        const searchRating = e.target.value;
        setSearchRating(searchRating);
    }

    /*
    the rendered component: a single element represened in JSX
    */
    return (
        <div className='App'>
            <Container className='main-container'>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group className='mb-3'>
                                <Form.Control
                                    type='text'
                                    placeholder='Search by ItemName'
                                    value={searchItemName}
                                    onChange={onChangesearchItemName}
                                />
                            </Form.Group>
                            <Button
                                variant='primary'
                                type='button'
                                onClick={findByItemName}
                            >
                                Search
                            </Button>
                        </Col>

                        <Col>
                            <Form.Group className='mb-3'>
                                <Form.Control
                                    as='select'
                                    onChange={onChangeSearchRating}
                                >
                                    {
                                        ratings.map((rating, i) => {
                                            return (
                                                <option value={rating} key={i}>
                                                    {rating}
                                                </option>
                                            );
                                        })
                                    }
                                </Form.Control>
                            </Form.Group>
                            <Button
                                variant='primary'
                                type='button'
                                onClick={findByRating}
                            >
                                Search
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <Row className='coffeeRow'>
                    {
                        coffees.map((coffee) => {
                            return (
                                <Col key={coffee._id}>
                                    <Card className='moviesListCard'>
                                        <Card.Img
                                            className='smallPoster'
                                            src={coffee.Poster}
                                        />
                                        <Card.Body>
                                            <Card.Title> {coffee.ItemName} </Card.Title>
                                            <Card.Text>
                                                Rating: {coffee.Rated}
                                            </Card.Text>
                                            <Card.Text>
                                                Desciption: {coffee.Description}
                                            </Card.Text>
                                            <Link to={'/coffees/' + coffee._id}>
                                                View Reviews
                                            </Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            );
                        })
                    }
                </Row>
                <br />
                Showing page: {currentPage + 1}.
                <Button
                    variant='link'
                    onClick={() => { setCurrentPage(currentPage + 1) }}
                >
                    Get next {entriesPerPage} results
                </Button>
            </Container>
        </div>

    );
}


export default CoffeesList;

