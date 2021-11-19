import React from 'react';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Form,
    Container,
    Col,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    FormGroup
} from "reactstrap";
import classnames from "classnames";
import {Redirect,Link} from "react-router-dom";
//import axios from "axios";
import NotificationAlert from "react-notification-alert";
import * as action from '../../_actions/login'
import { Field, reduxForm, reset/*FieldArray*/ } from 'redux-form';
import Modal from '../../components/Modal';
import { connect } from "react-redux";
import * as modalActions from '../../_actions/modal';


class RecoverPassword extends React.Component{
    /**
     * 1 recover password
     * 2 confirm token
     * 3 reset password
     */

    constructor(props) {
        super(props)
        this.state = {
            Email: "",
            focusEmail: false,
            _LoggedIn: false,
            loading: false,
            codigo: '',
            newPassword: '',
            newPassword2: '',
            step: 1 
        }
    }

    userToken = localStorage.getItem('userToken') || '';
    _homeRedirect = <Redirect to={{pathname: "/admin/home"}}/>
    _isMounted=false;


    delay () {
        setTimeout(function() { //Start the timer
         //window.location.reload()
      }.bind(this), 2000)
      }
    

  

    checkPageMode = () => {
        let pageMode=document.body.classList.contains('white-content');
        let bgclass;
        let headerclass;
        switch(pageMode){
          case true:
            bgclass="bg-ligh";
            headerclass="";
            break;
          default:
            bgclass="bg-dark";
            headerclass="text-primary";
            break;
        }
        return {bg: bgclass,hc: headerclass};
    }

    componentDidMount(){
        this._isMounted=true;
    }

    componentWillUnmount(){
        this._isMounted=false;
    }


    handleRecoverPasswordToState(email){
        const {
            handleRecoverPassword
        } = this.props
        this.setState({
            step: 2
        })
        handleRecoverPassword(email)
    }
    confirmCode(email, codigo){
        const {
            confirmToken
        } = this.props
        this.setState({
            step: 3
        })
        confirmToken(email,codigo)
    }

    resetPassword(email,pass1, pass2,){
        const {
            resetpass
        } = this.props
        this.setState({
            step: 3
        })
        resetpass(email, pass1,pass2)
            
       
    }

    render() {
        const {
            handleRecoverPassword
        } = this.props
        const pageMode=this.checkPageMode();
        let inverted = pageMode.bg==="bg-ligh" ? 'inverted' : '';
        return (<>
            <div className="blackdiv" id="blackdiv" style={{display:this.state.loading?'':'none'}}>
              <div className="ui segment">
                <div className={`ui active transition ${inverted} visible dimmer`}>
                  <div className="content"><div className="ui text loader">Loading</div></div>
                </div>
                <div style={{minHeight:400}}><p>&nbsp;</p></div>
              </div>
            </div>
            {this.state._LoggedIn ? this._homeRedirect : ''}
            <div className="content">
            <Modal />
                <Container>
                    <Col className="" lg="4" md="6">
                        <Form className="form" onSubmit={e=>e.preventDefault()}>
                            <Card className="card-login card-white">
                                <CardHeader>
                                    <CardTitle tag="h1">Recupera tu Contraseña</CardTitle>
                                </CardHeader>
                                {this.state.step===1?<CardBody>
                                    <Label>Ingresa tu correo electronico</Label>
                                    <InputGroup className={classnames({
                                        "input-group-focus": this.state.Emailfocus
                                    })}>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText><i className="tim-icons icon-single-02"></i></InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            type="text"
                                            placeholder="Email"
                                            onFocus={e => this.setState({ Emailfocus: true })}
                                            onBlur={e => this.setState({ Emailfocus: false })}
                                            value={this.state.Email}
                                            onChange={e => this.setState({
                                                Email: e.target.value
                                            })}
                                        />
                                    </InputGroup>
                                    <Label>
                                        Un correo electronico sera enviado a tu bandeja con un numero. Ingresa este numero en la siguiente pantalla
                                    </Label>
                                    <Button type="button" onClick={e => {
                                        this.handleRecoverPasswordToState(this.state.Email)
                                        this.delay()
                                    }}>
                                        Enviar
                                    </Button>
                                </CardBody>:<></>}
                                {this.state.step===2?<CardBody>
                                    <Label>Ingresa el codigo enviado a tu corrreo</Label>
                                    <FormGroup>
                                        <Input
                                            type="text"
                                            placeholder="Codigo"
                                            value={this.state.codigo}
                                            onChange={e => this.setState({
                                                codigo: e.target.value
                                            })}
                                        />
                                    </FormGroup>
                                    <Button type="button" onClick={e=>{
                                        this.confirmCode(this.state.Email,this.state.codigo)
                                        this.delay()
                                    }}>
                                        Confirmar
                                    </Button>
                                </CardBody>:<></>}
                                {this.state.step===3?<CardBody>
                                    <h4>Ingresa el nuevo password</h4>
                                    <FormGroup>
                                        <Label>Ingresa tu Contraseña</Label>
                                        <Input
                                            type="password"
                                            placeholder="Contraseña"
                                            value={this.state.newPassword}
                                            onChange={e => this.setState({
                                                newPassword: e.target.value
                                            })}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Ingresa nuevamente tu Contraseña</Label>
                                        <Input
                                            type="password"
                                            placeholder="Contraseña"
                                            value={this.state.newPassword2}
                                            onChange={e => this.setState({
                                                newPassword2: e.target.value
                                            })}
                                        />
                                    </FormGroup>
                                    <Button type="button" onClick={e=>this.resetPassword(this.state.Email,this.state.newPassword,this.state.newPassword2)}>
                                        Confirmar
                                    </Button>
                                </CardBody>:<></>}
                            </Card>
                            <Link to='/auth/login'>Regresar</Link>
                        </Form>
                    </Col>
                </Container>
            </div>
        </>);
    }
} 

const RecoveryState = reduxForm({
    form: 'Login',
  
  })(RecoverPassword);
  export default connect(
    (state) => ({
     undefined
    }),
    (dispatch) => ({
        handleRecoverPassword(email){
        dispatch(action.forgot({
          email,
        }))
      },
      confirmToken(email,codigo){
          dispatch(action.confirm({
              email,
              token :codigo
          }))
      },
      resetpass(email,pass1, pass2){
          if (pass1 === pass2) {
              dispatch(action.reset({
                  email,
                  token:pass1
              }))
              window.location.reload()
          } else {
            dispatch(modalActions.showError({
                message: 'Error: Contraseñas no coinciden',
                title: 'Error'
              }))
          }
    }
    })
  )(RecoveryState)