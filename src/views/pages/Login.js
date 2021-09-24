/*!

=========================================================
* Black Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Container,
  Col,
} from "reactstrap";
import { Field, reduxForm } from 'redux-form';
import {
  FormInput
} from "../../components/FormInputs/LoginInput";
import * as loginActions from '../../_actions/login';
import { connect } from 'react-redux';

const Login = ({
  handleSubmit,
  signin,
}) => {
  //const [state, setState] = React.useState({});
  React.useEffect(() => {
    document.body.classList.toggle("login-page");
    return function cleanup() {
      document.body.classList.toggle("login-page");
    };
  });
  return (
    <>
      <div className="content">
        <Container>
          <Col className="ml-auto mr-auto" lg="4" md="6">
            <Form className="form" onSubmit={handleSubmit(signin.bind(this))}>
              <Card className="card-login card-white">
                <CardHeader>
                  <img
                    alt="..."
                    src={require("assets/img/card-primary.png").default}
                  />
                  <CardTitle tag="h1">Log in</CardTitle>
                </CardHeader>
                <CardBody>
                  <Field
                    component={FormInput}
                    name="email"
                    placeholder="Email"
                    type="text"
                  />
                  <Field
                    component={FormInput}
                    name="password"
                    placeholder="Password"
                    type="password"
                  />
                </CardBody>
                <CardFooter>
                  <Button
                    block
                    className="mb-3"
                    color="primary"
                    size="lg"
                    type="submit"
                  >
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            </Form>
          </Col>
        </Container>
      </div>
    </>
  );
};

const validate = (values) => {
  let errors = {};
  if(!values.email){
    errors.email = "*required";
  }
  if(!values.password){
    errors.password = "*required";
  }
  return errors;
}

const LoginForm = reduxForm({
  form: 'login',
  validate,
  enableReinitialize: true,
})(Login);

export default connect(
  (state) => ({

  }),
  (dispatch) => ({
    signin(values) {
      dispatch(loginActions.signin({
        email: values.email,
        password: values.password,
      }));
    }
  })
)(LoginForm);
