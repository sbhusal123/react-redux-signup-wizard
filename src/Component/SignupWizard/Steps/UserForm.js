import React, { Component } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import { withAlert } from "react-alert";

class UserForm extends Component {
    handleFormSubmit = event => {
        event.preventDefault();

        // Get form fields object
        const formData = {};
        for (const field in this.refs) {
            formData[field] = this.refs[field].value;
        }

        console.log(formData);

        const { password, confirm_password } = formData;

        if (password !== confirm_password) {
            this.props.alert.show("Password is not same.!!");
        } else {
            // Perform API Call and if successfull switch form
            this.props.switchForm();
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

export default withAlert()(UserForm);
