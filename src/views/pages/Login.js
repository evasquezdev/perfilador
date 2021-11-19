import React from "react";
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import classnames from "classnames";
import { Redirect, Link } from "react-router-dom";
//import axios from "axios";
import NotificationAlert from "react-notification-alert";
import * as action from '../../_actions/login'
import { Field, reduxForm, reset/*FieldArray*/ } from 'redux-form';
import Modal from '../../components/Modal';
import './styles.scss'

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Form,
  Container,
  Col,
  Row,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label
} from "reactstrap";
import { connect } from "react-redux";

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Email: "",
      focusEmail: false,
      Password: "",
      focusPassword: false,
      _LoggedIn: false,
      _RecoverPass: false,
    }
  }


  componentDidMount() {
    document.body.classList.toggle("login-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("login-page");
  }

  handleEmailChange = (event) => {
    const value = event.target.value;
    this.setState({ Email: value });
  }

  handlePasswordChange = (event) => {
    const value = event.target.value;
    this.setState({ Password: value });
  }

  responseGoogle(response) {
    const {
      authGoogle
    } = this.props
    console.log('response', response)
    console.log('profile', response.profileObj)
    authGoogle(response.access_token,)
  }

  recover = () => {
    const path = "/recover"
    this.props.history.push({
      pathname: path
    })
    // views.push('/managments_boms')
    //    views.push('/approve_boms')
  }



  _homeRedirect = <Redirect to={{ pathname: "/admin/home" }} />

  _passRedirect = <Redirect to={{ pathname: "/admin/recover" }} />

  render() {
    const {
      loging,
      handleSubmit
    } = this.props
    return (<>
      <Modal />
      {this.state._LoggedIn ? this._homeRedirect : ''}
      {this.state._RecoverPass ? this._passRedirect : ''}
      <div className="content">
        <Container>
          <Col className="" lg="4" md="6">
            <Form className="form" onSubmit={handleSubmit(loging.bind(this))}>
              <Card className="card-login card-white">
                <CardHeader>
                  <CardTitle tag="h6" style={{ color: 'black', fontSize: '30px', marginTop: '10px' }}  >&nbsp; Ingresar </CardTitle>
                </CardHeader>
                <CardBody style={{ marginTop: '-80px' }}>
                  <Label>
                    Correo Electrónico
                  </Label>
                  <InputGroup className={classnames({
                    "input-group-focus": this.state.Emailfocus
                  })}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="tim-icons icon-single-02"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder="Email"
                      onFocus={e => this.setState({ Emailfocus: true })}
                      onBlur={e => this.setState({ Emailfocus: false })}
                      value={this.state.Email}
                      onChange={e => this.handleEmailChange(e)}
                    />
                  </InputGroup>
                  <Row>
                    <Col sm='6'>
                      <Label>
                        Contraseña
                      </Label>
                    </Col>
                    <Col sm="6">
                      <Link style={{color:"#1d8cf8", fontSize: '0.75rem'}}  to='/auth/recover'>Olvido la contraseña?</Link>
                    </Col>
                  </Row>
                  <InputGroup className={classnames({
                    "input-group-focus": this.state.Passwordfocus
                  })}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText><i className="tim-icons icon-single-02"></i></InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="password"
                      placeholder="Password"
                      onFocus={e => this.setState({ Passwordfocus: true })}
                      onBlur={e => this.setState({ Passwordfocus: false })}
                      value={this.state.Password}
                      onChange={e => this.handlePasswordChange(e)}
                    />
                  </InputGroup>

                  <Row>
                    <Col sm='12'>
                      <Button
                        onClick={() => loging(this.state.Email, this.state.Password)}
                        // type="submit"
                        size='lg'
                        style={{ width: '100%' }}
                      >
                        Ingresar
                      </Button>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm="12" className='buttonGoogle'>
                      <GoogleLogin
                        clientId="570853508603-01cnrc4ipnh08c3usuuqtr4q8bb5bf5b.apps.googleusercontent.com"
                        buttonText="Ingreso Google"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        style={{ width: '200px'}}
                      />
                      {/*
                       
                      <GoogleLogout
                       clientId="570853508603-01cnrc4ipnh08c3usuuqtr4q8bb5bf5b.apps.googleusercontent.com"
                       buttonText="Salir"
                       onLogoutSuccess={this.responseGoogle}
                      />
                     */}
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Form>
          </Col>
        </Container>
      </div>
    </>);
  }
}

const LoginState = reduxForm({
  form: 'Login',

})(Login);
export default connect(
  (state) => ({
    undefined
  }),
  (dispatch) => ({
    loging(email, password) {
      dispatch(action.signin({
        email,
        password
      }))
    }
  })
)(LoginState)