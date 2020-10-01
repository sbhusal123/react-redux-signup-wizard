import React, { Component } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { createUser } from "../../../redux/actions/user";
import { createMessage } from "../../../redux/actions/messages";

class UserForm extends Component {
    static propTypes = {
        createUser: PropTypes.func.isRequired,
        createMessage: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired
    };

    // After Dispatching action, our store gets updated. So using this life cycle hook
    // We can perform certain action after updating store state
    componentDidUpdate() {
        // Check if user is created
        if (this.props.user.id) {
            console.log(this.props.user.id);
        }
    }

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
            this.props.createMessage({ error: "Please provide same password" });
        } else {
            // Perform API Call and if successfull switch form
            const userRequestData = {
                first_name: first_name,
                last_name: last_name,
                username: email,
                password: password,
                email: email
            };
            this.props.createUser(userRequestData);

            // if (this.props.user.id) {
            //     alert("User created");
            // }
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
        createUser: createUser,
        createMessage: createMessage
    };
};

const mapStateToProps = storeState => ({
    user: storeState.userReducer.user
});

export default connect(
    mapStateToProps,
    // Caution: Here we have an action creator to create a user with the userData
    mapDispatchToProps()
)(UserForm);
