import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  CardText,
  ListGroup, ListGroupItem, Badge
} from "reactstrap";
import { connect } from 'react-redux';
import * as selector from '../../_reducers';
import * as filterActions from '../../_actions/filter';
//import * as modalActions from '../../_actions/modal';
import Modal from '../../components/Modal';

class Databases extends React.Component{
  state = {
    FilterForm: {
      age_init: '',
      age_end: '',
      department: '',
      municipality: '',
      sex: '',
      sms_email: '0',
    }
  }
  componentDidMount(){
    const {
      getDeps,
    } = this.props;
    getDeps();
  }
  render(){
    const {
      departments,
      municipalities,
      data,
      loading,
      filterData,
      userInfo
    } = this.props;
    const {
      FilterForm
    } = this.state;
    //console.log(userInfo)
    return (<div className="content">
      <Modal />
      <Row>
        <Col xs="3">
          <Form onSubmit={e => e.preventDefault()}>
            <Card>
              <CardBody>
                <CardTitle>
                  Filtros
                </CardTitle>
                <FormGroup>
                  <Label>Edad Minima</Label>
                  <Input
                    type="number"
                    min="18"
                    step="1"
                    disabled={loading}
                    value={FilterForm.age_init}
                    onChange={(e) => this.setState({
                      FilterForm: {
                        ...FilterForm,
                        age_init: e.target.value
                      }
                    })}
                  />
                  <Label>Edad Maxima</Label>
                  <Input
                    type="number"
                    max="100"
                    step="1"
                    disabled={loading}
                    value={FilterForm.age_end}
                    onChange={(e) => this.setState({
                      FilterForm: {
                        ...FilterForm,
                        age_end: e.target.value
                      }
                    })}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Departamento</Label>
                  <Input 
                    type="select"
                    disabled={loading}
                    className="text-info"
                    value={FilterForm.department}
                    onChange={(e) => this.setState({
                      FilterForm: {
                        ...FilterForm,
                        department: e.target.value
                      }
                    })}
                  >
                    <option></option>
                    {departments.map((dep,i) => <option key={i}
                      value={dep}
                    >
                      {dep}
                    </option>)}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label>Municipalidad</Label>
                  <Input 
                    type="select"
                    disabled={loading}
                    className="text-info"
                    value={FilterForm.municipality}
                    onChange={(e) => this.setState({
                      FilterForm: {
                        ...FilterForm,
                        municipality: e.target.value
                      }
                    })}
                  >
                    <option></option>
                    {municipalities.map((mun,i) => <option key={i}
                      value={mun}
                    >
                      {mun}
                    </option>)}
                  </Input>
                </FormGroup>
                <Label>Sexo</Label>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" 
                      name="sex" 
                      value="M"
                      disabled={loading}
                      checked={FilterForm.sex === "M"}
                      onChange={e => this.setState({
                        FilterForm: {
                          ...FilterForm,
                          sex: e.target.value
                        }
                      })}
                    />{' '}
                    Male
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" 
                      name="sex" 
                      value="F" 
                      disabled={loading}
                      checked={FilterForm.sex === "F"}
                      onChange={e => this.setState({
                        FilterForm: {
                          ...FilterForm,
                          sex: e.target.value
                        }
                      })}
                    />{' '}
                    Female
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" 
                      name="sex" 
                      value="" 
                      disabled={loading}
                      checked={FilterForm.sex === ""}
                      onChange={e => this.setState({
                        FilterForm: {
                          ...FilterForm,
                          sex: e.target.value
                        }
                      })}
                    />{' '}
                    Ambos
                  </Label>
                </FormGroup>
                <Label className="mt-3">Forma de Envio</Label>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" 
                      name="sms_email" 
                      value="1"
                      disabled={loading}
                      checked={FilterForm.sms_email === "1"}
                      onChange={e => this.setState({
                        FilterForm: {
                          ...FilterForm,
                          sms_email: e.target.value
                        }
                      })}
                      />{' '}
                    Correo
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" 
                      name="sms_email" 
                      value="2"
                      disabled={loading}
                      checked={FilterForm.sms_email === "2"}
                      onChange={e => this.setState({
                        FilterForm: {
                          ...FilterForm,
                          sms_email: e.target.value
                        }
                      })}
                    />{' '}
                    SMS
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" 
                      name="sms_email" 
                      value="0"
                      disabled={loading}
                      checked={FilterForm.sms_email === "0"}
                      onChange={e => this.setState({
                        FilterForm: {
                          ...FilterForm,
                          sms_email: e.target.value
                        }
                      })}
                    />{' '}
                    Ambos
                  </Label>
                </FormGroup>
                <Button className="mt-3" 
                  color="info"
                  onClick={e=>{
                    e.preventDefault();
                    filterData(FilterForm)
                  }}
                >
                  Filtrar
                </Button>
              </CardBody>
            </Card>
          </Form>
        </Col>
        <Col xs="3">
          {data && <div style={{
            maxHeight: '45rem',
            overflowY: 'scroll'
          }}>
            <h3>Resumen Data</h3>
              {data.map((d,i) => {
                return <Card key={i}>
                  <CardBody>
                    <CardTitle>
                      Data {i+1}
                    </CardTitle>
                    <CardText>
                      <strong>EDAD</strong><br/>
                      {d.age_range}
                    </CardText>
                    <CardText>
                      <strong>DEPARTAMENTO</strong><br/>
                      {d.department}
                    </CardText>
                    <CardText>
                      <strong>MUNICIPALIDAD</strong><br/>
                      {d.municipality}
                    </CardText>
                    <CardText>
                      <strong>SEXO</strong><br/>
                      {d.sex}
                    </CardText>
                    <CardText>
                      <strong>CANTIDAD</strong><br/>
                      {d.dcount}<br/>
                    </CardText>
                  </CardBody>
                </Card>
              })}
          </div>}
        </Col>
        <Col xs="6">
          {data && <Card>
            <CardBody>
              <CardTitle>
                Envio de Mensajes
              </CardTitle>
              <ListGroup>
                <ListGroupItem className="justify-content-between">
                  Mensajes restantes por correo 
                  <Badge pill color="info">{userInfo.quantity_of_emails}</Badge>
                </ListGroupItem>
                <ListGroupItem className="justify-content-between">
                  Dapibus ac facilisis in 
                  <Badge pill color="info">{userInfo.quantity_of_sms}</Badge>
                </ListGroupItem>
              </ListGroup>
              <br/>
              <Form>
                <FormGroup>
                  <Label>
                    Titulo mensaje
                  </Label>
                  <Input type="text"/>
                </FormGroup>
                <FormGroup>
                  <Label>
                    Mensaje
                  </Label>
                  <Input type="textarea" style={{
                    maxHeight: '200px',
                    minHeight: '150px'
                  }}/>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>}
        </Col>
      </Row>
    </div>);
  }
}

export default connect(
  (state) => ({
    departments: selector.getDepartments(state),
    municipalities: selector.getMunicipalities(state),
    data: selector.getFilterData(state),
    loading: selector.getFilterloading(state),
    userInfo: selector.getUserMsgInfo(state)
  }),
  (dispatch) => ({
    getDeps(){
      dispatch(filterActions.getDeps())
    },
    filterData(FilterForm){
      dispatch(filterActions.filterData(FilterForm))
    }
  })
)(Databases);