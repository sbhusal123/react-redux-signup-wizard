import React, { Component } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { fetchUniversity } from "../../../redux/actions/university";
import { fetchCountry } from "../../../redux/actions/country";
import { createAgentProfile } from "../../../redux/actions/agent_profile";

import Select from "react-select";

class ProfileForm extends Component {
    // Props provided by store particulary for this Component
    static propTypes = {
        universities: PropTypes.array.isRequired,
        countries: PropTypes.array.isRequired,
        createAgentProfile: PropTypes.func.isRequired,
        agent: PropTypes.object
    };

    state = {
        selected_universities: [],
        imageFile: null
    };

    componentDidMount() {
        /* Api calls are not performed automatically by react redux for us. 
            So while mounting we can ask store to provide the state for our component using action creator.
        */
        this.props.fetchUniversity();
        this.props.fetchCountry();
    }

    handleChange = e => {
        const selected = [];

        if (e !== null) {
            for (let i = 0; i < e.length; i++) {
                selected.push(e[i].value);
            }
            this.setState({
                selected_universities: selected
            });
        } else if (e == null) {
            this.setState({
                selected_universities: []
            });
        }
    };

    onFileChange = event => {
        // Update the state file
        this.setState({ imageFile: event.target.files[0] });
    };

    handleFormSubmit = event => {
        event.preventDefault();

        // Get fileds from form
        const formData = new FormData();
        for (const field in this.refs) {
            formData.append(field, this.refs[field].value);
        }

        // Append Universities List
        for (let i = 0; i < this.state.selected_universities.length; i++) {
            formData.append("university", this.state.selected_universities[i]);
        }

        // Append User id stored in localStorage
        formData.append("user", localStorage.getItem("user_id"));

        // Append profile image data
        formData.append(
            "profile_image",
            this.state.imageFile,
            this.state.imageFile.name
        );

        this.props.createAgentProfile(formData);
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

        const data = this.props.universities.map((el, idx) => {
            return { value: el.id, label: el.name };
        });

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
                                ref="country"
                            >
                                {countriesOptionRender}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Group controlId="university">
                            <Form.Label>University</Form.Label>
                            <Select
                                className="dropdown"
                                placeholder="Select University"
                                options={data} // set list of the data
                                onChange={this.handleChange} // assign onChange function
                                isMulti
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6} xs={12}>
                        <Form.Group controlId="profile_picture">
                            <Form.Label>Agent Type</Form.Label>
                            <Form.Control
                                as="select"
                                placeholder="University"
                                required
                                ref="type"
                            >
                                <option disabled selected>
                                    Select Agent Type
                                </option>
                                <option value={1}>Education</option>
                                <option value={2}>Migration</option>
                                <option value={3}>Both</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={6} xs={12}>
                        <Form.Group controlId="profile_picture">
                            <Form.Label>Profile Picture</Form.Label>
                            <Form.Control
                                type="file"
                                required
                                ref="profile_image"
                                onChange={this.onFileChange}
                            />
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
        fetchCountry: () => dispatch(fetchCountry()),
        createAgentProfile: agentData => dispatch(createAgentProfile(agentData))
    };
};

// Map state from store to this component
const mapStateToProps = storeState => ({
    // PropsName: store.reducer.state
    universities: storeState.universityReducer.universities,
    countries: storeState.countryReducer.countries,
    agent: storeState.agentProfileReducer.agent
});

// Subscribe our Component to the redux store
export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
