import React, { Component } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import { withAlert } from "react-alert";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { createUser } from "../../../redux/actions/user";

class UserForm extends Component {
    static propTypes = {
        registerUser: PropTypes.func.isRequired,
        user: PropTypes.object
    };

    handleFormSubmit = event => {
        event.preventDefault();

        // Get form fields object
        const formData = {};
        for (const field in this.refs) {
            formData[field] = this.refs[field].value;
        }

        const {
            password,
            confirm_password,
            first_name,
            last_name,
            email
        } = formData;

        if (password !== confirm_password) {
            this.props.alert.show("Password is not same.!!");
        } else {
            // Perform API Call and if successfull switch form
            const userRequestData = {
                first_name: first_name,
                last_name: last_name,
                username: email,
                password: password,
                email: email
            };
            this.props.registerUser(userRequestData);
            // this.props.switchForm();
        }
    };
    render() {
        return (
            <Form onSubmit={this.handleFormSubmit}>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group controlId="FirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="First Name"
                                required
                                ref="first_name"
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Group controlId="LastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Last Name"
                                required
                                ref="last_name"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group controlId="Email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                required
                                ref="email"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group controlId="Password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                required
                                ref="password"
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Group controlId="ConfirmPassword">
                            <Form.Label>Confirm Passwords</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                required
                                ref="confirm_password"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <br />

                <Row>
                    <Col>
                        <Button variant="warning" type="submit">
                            Next
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}

// This is how we should map the action creator having Parameter on it. Otherwise the data will be null on action creator
const mapDispatchToProps = () => {
    return {
        registerUser: createUser
    };
};

const mapStateToProps = storeState => ({
    user: storeState.userReducer.user
});

export default connect(
    mapStateToProps,
    // Caution: Here we have an action creator to create a user with the userData
    mapDispatchToProps()
)(withAlert()(UserForm));
