import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";

import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    };

    componentDidUpdate(prevProps) {
        const { error, alert, message } = this.props;

        // If any error
        if (prevProps.error !== error) {
            if (error.username) {
                alert.error("Email: User with that email already exists.");
            }
        }

        // If any message: Message can be of two types error or info
        if (prevProps.message !== message) {
            if (message.error) {
                alert.error(message.error);
            }
            if (message.info) {
                alert.success(message.info);
            }
        }
    }

    render() {
        return <Fragment />;
    }
}

const mapStateToProps = storeState => ({
    error: storeState.errorReducer.message,
    message: storeState.messageReducer.message
});

export default connect(mapStateToProps)(withAlert()(Alerts));
