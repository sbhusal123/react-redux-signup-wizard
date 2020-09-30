import React, { Component } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { fetchUniversity } from "../../../redux/actions/university";
import { fetchCountry } from "../../../redux/actions/country";

class ProfileForm extends Component {
    // Props provided by store particulary for this Component
    static propTypes = {
        universities: PropTypes.array.isRequired,
        countries: PropTypes.array.isRequired
    };

    componentDidMount() {
        /* Api calls are not performed automatically by react redux for us. 
            So while mounting we can ask store to provide the state for our component using action creator.
        */
        this.props.fetchUniversity();
        this.props.fetchCountry();
    }

    handleFormSubmit = event => {
        event.preventDefault();

        // Get form fields object
        const formData = {};
        for (const field in this.refs) {
            formData[field] = this.refs[field].value;
        }
    };

    render() {
        const countriesOptionRender = Object.keys(this.props.countries).map(
            (el, idx) => {
                return (
                    <option key={idx} value={el}>
                        {this.props.countries[el]}
                    </option>
                );
            }
        );

        const universitiesOptionRender = this.props.universities.map(
            (el, idx) => {
                return (
                    <option key={idx} value={el.id}>
                        {el.name}
                    </option>
                );
            }
        );

        return (
            <Form onSubmit={this.handleFormSubmit}>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group controlId="Address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Address"
                                required
                                ref="address"
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Group controlId="PhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Phone Number"
                                required
                                ref="phone_number"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group controlId="country">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                as="select"
                                placeholder="University"
                                required
                                ref="university"
                            >
                                {countriesOptionRender}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Group controlId="university">
                            <Form.Label>University</Form.Label>
                            <Form.Control
                                as="select"
                                multiple
                                placeholder="University"
                                required
                                ref="university"
                            >
                                {universitiesOptionRender}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Button variant="success" type="submit">
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}

// Dispatches Request for Api Calls to Action Creators. Note it's uses in Component Life Cycle Hooks
const mapDispatchToProps = dispatch => {
    return {
        // PropsName: actualActionCreatorName
        fetchUniversity: () => dispatch(fetchUniversity()),
        fetchCountry: () => dispatch(fetchCountry())
    };
};

// Map state from store to this component
const mapStateToProps = storeState => ({
    // PropsName: store.reducer.state
    universities: storeState.universityReducer.universities,
    countries: storeState.countryReducer.countries
});

// Subscribe our Component to the redux store
export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
