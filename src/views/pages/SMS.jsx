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

class Databases extends React.Component {
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
        label: '21-30',
        value: 0
      },
      {
        label: '31-40',
        value: 1
      },
      {
        label: '41-50',
        value: 2
      },
      {
        label: '51-60',
        value: 3
      },
      {
        label: '61-70',
        value: 4
      },
      {
        label: '71-80',
        value: 5
      },
      {
        label: '81-90',
        value: 6
      },
      {
        label: '91-100',
        value: 7
      },
      {
        label: '101-110',
        value: 8
      },
    ]
  }









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
    } = this.props;
    const {
      FilterForm
    } = this.state;
    let filteredmuns = municipalities.filter(m => m.department === FilterForm.departmentlabel)
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
                <Label>Rango de Edad</Label>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Select
                        options={this.state.range}
                        onChange={e => this.setState({
                          FilterForm: {
                            ...FilterForm,
                            range: e.value
                          }
                        })
                        } />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label>Departamento</Label>
                  <Select
                    disabled={loading}
                    className="text-info"
                    //value={FilterForm.department}
                    onChange={(e) => this.setState({
                      FilterForm: {
                        ...FilterForm,
                        departmentid: e.value,
                        departmentlabel: e.label
                      }
                    })}
                    options={departments.map((dep, i) => {
                      return {
                        value: i,
                        label: dep
                      }
                    }
                    )}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Municipio</Label>
                  <Select
                    disabled={loading}
                    className="text-info"
                    //value={FilterForm.department}
                    onChange={(e) => this.setState({
                      FilterForm: {
                        ...FilterForm,
                        municipality: e.label
                      }
                    })}
                    options={filteredmuns.map((dep, i) => {
                      return {
                        value: i,
                        label: dep.municipality
                      }
                    }
                    )}
                  />

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
                    Hombre
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
                    Mujer
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
                {this.state.FilterForm.municipality !== '' ?
                  <Button className="mt-3"
                    color="info"

                    onClick={e => {
                      e.preventDefault();
                      filterData(FilterForm)
                    }}
                  >
                    Filtrar
                  </Button>
                  :
                  <Button className="mt-3"
                    color="info"
                    disabled
                    onClick={e => {
                      e.preventDefault();
                      filterData(FilterForm)
                    }}
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
                          <Badge pill color="info">{filteredData && filteredData.total_of_filters}</Badge>
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
      dispatch(filterActions.filterData(FilterForm))
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