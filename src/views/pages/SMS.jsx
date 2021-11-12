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
  ListGroup, ListGroupItem, Badge
} from "reactstrap";
import Select from "react-select";
import { Field, reduxForm, reset/*FieldArray*/ } from 'redux-form';

import ReactDatetime from "react-datetime";
import { connect } from 'react-redux';
import * as selector from '../../_reducers';
import * as filterActions from '../../_actions/filter';
import * as modalActions from '../../_actions/modal';
import Modal from '../../components/Modal';
import * as messageActions from '../../_actions/action';
import { FadeLoader } from "react-spinners";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  size: 10px
`;

const data = {
  "columns": [
    {
      "name": "CUI",
      "type": "ints"
    },
    {
      "name": "CUIString",
      "type": "string"
    },
    {
      "name": "FECHA_DE_NACIMIENTO",
      "type": "date"
    }
  ]
}

class DatabasesForm extends React.Component {
  state = {
    FilterForm: {
      age_init: '',
      age_end: '',
      range: null,
      departmentid: null,
      departmentlabel: '',
      municipality: '',
      sex: '',
      sms_email: '0',
      header: '',
      text: '',
      file: null,
    },
    range: [
      {
        label: 'Menor',
        value: 0
      },
      {
        label: 'Mayor',
        value: 1
      }
    ]
  }


  FormSelect = ({
    input: { onChange },
    placeholder,
    value,
    options,
  }) => (
    <>
      <Select
        className="react-select info"
        classNamePrefix="react-select"
        onChange={value => onChange(value.value)}
        value={value}
        options={options.map(companyOptions => {
          return {
            value: companyOptions.value,
            label: `${companyOptions.label}`
          }
        })}
        placeholder={placeholder}
        formNoValidate
      />
    </>
  );

  FormInput = ({
    input: { onChange },
    placeholder,
    type,
    value,
    icon,
    meta: { error },
  }) => (
    <>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={({ target }) => onChange((target.value))}
        autoFocus={false}
        formNoValidate
      />
      <label className="error">
        {this.state.error}
      </label>
    </>
  )

  FormDate = ({
    input: { onChange },
    placeholder,
    value,
  }) => (
    <>
      <ReactDatetime
        inputProps={{
          className: "form-control",
          placeholder,
        }}
        timeFormat={false}
        value={value}
        onChange={value => onChange((
          (value._d).getFullYear())
          +'/'+
          (parseInt((value._d).getMonth())+1)
          
          +'/'+
          (value._d).getDate())
        }
        formNoValidate

      />

      <label className="error">{this.state.error}</label>
    </>
  )

  FormCheck = ({
    input,
    placeholder,
    type,
  }) => (
    <>
      <Input {...input} type="radio" />
      {placeholder}
      <label>
        <Field name="sex" component="input" type="radio" value="male" />{' '}
        Male
      </label>
      <label>
        <Field name="sex" component="input" type="radio" value="female" />{' '}
        Female
      </label>
      <label>
        <Field name="sex" component="input" type="radio" value="other" />{' '}
        Other
      </label>
    </>
  )



  componentDidMount() {
    const {
      getDeps,
    } = this.props;
    getDeps();
  }
  render() {
    const {
      departments,
      municipalities,
      filteredData,
      loading,
      filterData,
      loadingAction,
      sendMail,
      handleSubmit
    } = this.props;
    const {
      FilterForm
    } = this.state;
    let name;
    console.log('filter', departments, municipalities)
   // let filteredmuns = municipalities.filter(m => m.department === FilterForm.departmentlabel)
    return (<div className="content">
      <Modal />
      <Row>
        <Col xs="3">
          <Form onSubmit={handleSubmit(filterData.bind(this))}>
            <Card>
              <CardBody>
                <CardTitle>
                  Filtros
                </CardTitle>
                {departments.columns && departments.columns.map((index, id) => (
                  <>
                    <Label>{index.name}</Label>
                    <Row>
                      <Col xs="12">
                        <FormGroup>
                          {index.type === 'int' ?
                          <Row>
                            <Col>
                            <FormGroup >
                              <Field
                                name={`${index.name}|${index.type}-1`}
                                component={this.FormInput}
                                //		validate={[this.required, this.verifyNumberProduction]}
                                placeholder="Min"
                                type='number'
                                options={this.state.range}
                              />
                            </FormGroup>
                            </Col>
                            <Col>
                            <FormGroup >
                              <Field
                                name={`${index.name}|${index.type}-2`}
                                component={this.FormInput}
                                //		validate={[this.required, this.verifyNumberProduction]}
                                placeholder="Max"
                                type='number'
                                options={this.state.range}
                              />
                            </FormGroup>
                            </Col>
                            </Row>
                            :
                            index.type === 'string' ?
                              <FormGroup>
                                <Field
                                  name={`${index.name}|${index.type}`}
                                  component={this.FormInput}
                                  // validate={[this.verifyNumber]}
                                  // icon= "icon-key-25"
                                  placeholder=""
                                />
                              </FormGroup>

                              :
                              <Row>
                                <Col sm='6'>
                                  <FormGroup >
                                    <Label>Fecha Inicio</Label>
                                    <Field
                                      name={`${index.name}|${index.type}-1`}
                                      component={this.FormDate}
                                      //validate={[this.verifyDate]}
                                      placeholder="Seleccione Fecha"
                                    />
                                  </FormGroup>
                                </Col>
                                <Col sm='6'>
                                  <FormGroup >
                                    <Label>Fecha Fin</Label>
                                    <Field
                                      name={`${index.name}|${index.type}-2`}
                                      component={this.FormDate}
                                      //validate={[this.verifyDate]}
                                      placeholder="Seleccione Fecha"
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                          }
                        </FormGroup>
                      </Col>
                    </Row>
                  </>
                ))


                }
          {/*      <Label>Sexo</Label>
                <FormGroup>
                  <label>
                    <Field name="sex" component="input" type="radio" value="M" />{' '}
                    Hombre
                  </label>
                  <br></br>
                  <label>
                    <Field name="sex" component="input" type="radio" value="F" />{' '}
                    Mujer
                  </label>
                  <br></br>
                  <label>
                    <Field name="sex" component="input" type="radio" value="" />{' '}
                    Ambos
                  </label>
                </FormGroup>
                <Label className="mt-3">Forma de Envio</Label>
                <FormGroup>
                  <label>
                    <Field name="sms_email" component="input" type="radio" value="1" />{' '}
                    Correo
                  </label>
                  <br></br>
                  <label>
                    <Field name="sms_email" component="input" type="radio" value="2" />{' '}
                    SMS
                  </label>
                  <br></br>
                  <label>
                    <Field name="sms_email" component="input" type="radio" value="0" />{' '}
                    Ambos
                  </label>
                </FormGroup>*/}
                {this.state.FilterForm.municipality === '' ?
                  <Button className="mt-3"
                    color="info"

                  // onClick={e => {
                  // e.preventDefault();
                  // filterData(FilterForm)
                  //}}
                  >
                    Filtrar
                  </Button>
                  :
                  <Button className="mt-3"
                    color="info"
                    disabled
                  // onClick={e => {
                  //  e.preventDefault();
                  // filterData(FilterForm)
                  // }}
                  >
                    Filtrar
                  </Button>
                }

              </CardBody>
            </Card>
          </Form>
        </Col>
        {/*   <Col xs="3">
          {filteredData && <div style={{
            maxHeight: '45rem',
            overflowY: 'scroll'
          }}>
            <h3>Resumen Data</h3>
            {filteredData.data.map((d, i) => {
              return <Card key={i}>
                <CardBody>
                  <CardTitle>
                    Data {i + 1}
                  </CardTitle>
                  <CardText>
                    <strong>EDAD</strong><br />
                    {d.age_range}
                  </CardText>
                  <CardText>
                    <strong>DEPARTAMENTO</strong><br />
                    {d.department}
                  </CardText>
                  <CardText>
                    <strong>MUNICIPALIDAD</strong><br />
                    {d.municipality}
                  </CardText>
                  <CardText>
                    <strong>SEXO</strong><br />
                    {d.sex}
                  </CardText>
                  <CardText>
                    <strong>CANTIDAD</strong><br />
                    {d.dcount}<br />
                  </CardText>
                </CardBody>
              </Card>
            })}
          </div>}
        </Col>
        */}
        <Col>
          <Card>
            <CardBody>
              <CardTitle>
                Enviar Mensaje
              </CardTitle>
              <Form onSubmit={e => e.preventDefault()}>
                <FormGroup>
                  <Label>
                    Titulo mensaje
                  </Label>
                  <Input
                    type="text"
                    value={FilterForm.header}
                    disabled={loadingAction}
                    onChange={(e) => {
                      this.setState({
                        FilterForm: {
                          ...FilterForm,
                          header: e.target.value
                        }
                      })
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>
                    Mensaje
                  </Label>
                  <Input type="textarea"
                    style={{
                      maxHeight: '200px',
                      minHeight: '150px'
                    }}
                    value={FilterForm.text}
                    disabled={loadingAction}
                    onChange={(e) => {
                      this.setState({
                        FilterForm: {
                          ...FilterForm,
                          text: e.target.value
                        }
                      })
                    }}
                  />
                </FormGroup>
                <Row>
                  <Col>
                    <FormGroup>
                      <Button color="info" size="sm"
                        style={{ fontSize: 13, height: 40 }}>
                        <Input type="file"
                          accept=".jpg,.png,.jpeg"
                          disabled={loading}
                          color="info"
                          onChange={e => {
                            e.preventDefault();
                            this.setState({
                              FilterForm: {
                                ...FilterForm,
                                file: e.target.files[0]
                              }
                            })
                          }}

                        />
                        Subir Imagen Adjunta
                      </Button>
                      {FilterForm.file && <span className="form-text text-info">
                        {FilterForm.file.name}
                      </span>}
                    </FormGroup>
                  </Col>
                  <Col>
                    <Button
                      color="info"
                      disabled={loadingAction}
                      onClick={() => {
                        sendMail(FilterForm)
                      }}
                      style={{ fontSize: 13, height: 40 }}
                    >
                      Enviar Mensaje
                    </Button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
        {<Col xs="5">
          <Card>
            {
              <CardBody>
                <CardTitle>
                  Creditos disponibles
                </CardTitle>
                <ListGroup>
                  <ListGroupItem className="justify-content-between">
                    <Row>
                      <Col xs="6">
                        Mensajes restantes por correo
                      </Col>
                      {loading === false ?
                        <Col xs="6" style={{ textAlign: 'right' }}>
                          <Badge pill color="info">{filteredData && filteredData.email_available}</Badge>
                        </Col>
                        :
                        <Col md={{ size: 2, offset: 4 }} style={{ textAlign: 'right', marginLeft: 170 }}>
                          <FadeLoader css={override} size={1} color={"#1d8cf8 "} margin={-10} />
                        </Col>
                      }
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="justify-content-between">
                    <Row>
                      <Col xs="6">
                        Mensajes restantes por SMS
                      </Col>
                      {loading === false ?
                        <Col xs="6" style={{ textAlign: 'right' }}>
                          <Badge pill color="info">{filteredData && filteredData.sms_available}</Badge>

                        </Col>
                        :
                        <Col md={{ size: 2, offset: 4 }} style={{ textAlign: 'right', marginLeft: 170 }}>
                          <FadeLoader css={override} size={1} color={"#1d8cf8 "} margin={-10} />
                        </Col>
                      }
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="justify-content-between">
                    <Row>
                      <Col xs="6">
                        Total Filtrado
                      </Col>

                      {loading === false ?
                        <Col xs="6" style={{ textAlign: 'right' }}>
                          <Badge pill color="info">{filteredData && filteredData.count}</Badge>
                        </Col>
                        :
                        <Col md={{ size: 2, offset: 4 }} style={{ textAlign: 'right', marginLeft: 170 }}>
                          <FadeLoader css={override} size={1} color={"#1d8cf8 "} margin={-10} />
                        </Col>
                      }
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </CardBody>

            }

          </Card>
        </Col>}
      </Row>
    </div >);
  }
}

const Databases = reduxForm({
  form: 'Booking',

})(DatabasesForm);

export default connect(
  (state) => ({
    departments: selector.getDepartments(state),
    municipalities: selector.getMunicipalities(state),
    filteredData: selector.getFilterData(state),
    loading: selector.getFilterloading(state),
    userInfo: selector.getUserMsgInfo(state),
    loadingAction: selector.getActionloading(state),
  }),
  (dispatch) => ({
    getDeps() {
      dispatch(filterActions.getDeps())
    },
    filterData(FilterForm) {
      dispatch(filterActions.filterData({FilterForm: FilterForm}))
    },
    sendMail(FilterForm) {
      if (
        (!FilterForm.header || FilterForm.header === "") ||
        (!FilterForm.text || FilterForm.text === "") ||
        (!FilterForm.file)
      ) {
        dispatch(modalActions.showError({
          message: 'Error: Formulario incompleto',
          title: 'Error'
        }))
      } else {
        var filesize = ((FilterForm.file.size / 1024) / 1024).toFixed(4);
        if (filesize > 2) {
          dispatch(modalActions.showError({
            message: 'Error: tamaño de imagen es muy grande',
            title: 'Error'
          }))
        } else {
          dispatch(messageActions.sendMail({
            ...FilterForm,
          }))
        }
      }
    }
  })
)(Databases);