import React, { Component } from "react";
import UserForm from "./Steps/UserForm";
import ProfileForm from "./Steps/ProfileForm";

class SignupForm extends Component {
    /*
      Concepts Covered: 
      - Passing Props to child component
      - Calling Parent Statehandler from child Component

    */

    // This is done to pass the handler as props to childern
    constructor(props) {
        super(props);
        this.handleSwitchForm = this.handleSwitchForm.bind(this);
    }

    state = {
        isFirstStepCompleted: false
    };

    // handler for switching form. Called from child component
    handleSwitchForm() {
        this.setState({
            isFirstStepCompleted: true
        });
    }

    render() {
        const renderObj = !this.state.isFirstStepCompleted ? (
            // Passing Props and handler to child component
            <UserForm state={this.state} switchForm={this.handleSwitchForm} />
        ) : (
            <ProfileForm />
        );

        return renderObj;
    }
}

export default SignupForm;
