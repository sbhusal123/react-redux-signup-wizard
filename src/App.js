import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Provider } from "react-redux";

// Custom made
import SignupForm from "./Component/SignupWizard/SignUpForm";
import store from "./redux/store";

// Alerts Import
import { positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

// Alert App
import Alert from "./Component/Messages/Alert";

const alertOptions = {
    position: positions.BOTTOM_CENTER,
    timeout: 2000,
    offset: "30px"
};

class App extends React.Component {
    render() {
        return (
            // We must wrap our all component in Provider Component. So that every child component receives the state from store.
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Alert />
                    <Container>
                        <br />
                        <br />
                        <br />
                        <br />
                        <Row>
                            <Col xs={2}></Col>
                            <Col xs={8}>
                                <Card>
                                    <Card.Header>
                                        Register To Continue
                                    </Card.Header>
                                    <Card.Body>
                                        <SignupForm />
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs={2}></Col>
                        </Row>
                    </Container>
                </AlertProvider>
            </Provider>
        );
    }
}

export default App;
