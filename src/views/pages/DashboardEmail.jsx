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
import { Pie } from 'react-chartjs-2';

import ReactDatetime from "react-datetime";
import { connect } from 'react-redux';
import * as selector from '../../_reducers';
import * as Actions from '../../_actions/campaing';
import * as modalActions from '../../_actions/modal';
import Modal from '../../components/Modal';
import { css } from "@emotion/react";
import { FadeLoader } from "react-spinners";


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  size: 10px
`;


const data = {
  labels: ['Entregados', 'No Entregados'],
  datasets: [
    {
      label: '# of Votes',
      data: [30, 19],
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 99, 132, 0.2)',
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)',

      ],
      borderWidth: 1,
      options: {
        animation: {
          duration: 0 // general animation time
        },
        hover: {
          animationDuration: 0 // duration of animations when hovering an item
        },
      }
    },
  ],
};

const afterSubmit = (result, dispatch) =>
  dispatch(reset('Booking'));

class DatabasesForm extends React.Component {
  state = {
    campaingSelect: null,
    data: [
      {
        value: "hola",
        label: 'hola'
      }]


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
        onChange={value => {
          onChange(value.value)
          this.setState({
            campaingSelect: value.value
          })
          this.props.getCampaing(value.value)
        }}
        value={value}
        options={options.map(companyOptions => {
          return {
            value: companyOptions.campaign_id,
            label: `${companyOptions.campaign_name}`
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


  delay() {
    setTimeout(function () { //Start the timer
      window.location.reload()
    }.bind(this), 2000)
  }

  componentDidMount() {
    const {
      fetchCampaing
    } = this.props;
    fetchCampaing()
  }
  render() {
    const {
      campaing,
      loadingData,
      userCompany,
      campaingData
    } = this.props;
    const {

    } = this.state;
    let name;
    return (<div className="content">
      <Modal />
      {userCompany.has_sms ?
        <Row>
          <Col sm='12'>
            <Card>
              <CardBody>
                <Label>
                  Campañas
                </Label>
                <FormGroup >
                  <Field
                    name={`campaing`}
                    component={this.FormSelect}
                    //		validate={[this.required, this.verifyNumberProduction]}
                    placeholder="Campaña"
                    // type='number'
                    options={
                      campaing
                    }
                  />
                </FormGroup>
              </CardBody>
            </Card>
          </Col>
          <Col sm='4'>
            <Card>
              <CardBody>
                <Label className='info' style={{ marginLeft: '10px', marginTop: '5px' }}>
                  TOTAL
                </Label>
                <ListGroup>
                  <ListGroupItem className="justify-content-between" style={{ backgroundColor: '#344675' }}>
                    <Row>
                      <Col xs="6">
                        # de Enviado
                      </Col>
                      {loadingData === false ?
                        <Col xs="6" style={{ textAlign: 'right' }}>
                          <Badge pill color="info">{campaingData[0]? campaingData[0].total_sent : '0' }</Badge>
                        </Col>
                        :
                        <Col md={{ size: 2, offset: 2 }} style={{ textAlign: 'right', marginLeft: 350, marginTop: '-8px' }}>
                          <FadeLoader css={override} size={1} color={"#1d8cf8 "} margin={-10} />
                        </Col>
                      }
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="justify-content-between" style={{ backgroundColor: '#344675' }}>
                    <Row>
                      <Col xs="6">
                      % Efectividad
                      </Col>
                      {loadingData === false ?
                        <Col xs="6" style={{ textAlign: 'right' }}>
                          <Badge pill color="info">{campaingData[0]? campaingData[0].efectivity : '0' }</Badge>
                        </Col>
                        :
                        <Col md={{ size: 2, offset: 2 }} style={{ textAlign: 'right', marginLeft: 350, marginTop: '-8px' }}>
                          <FadeLoader css={override} size={1} color={"#1d8cf8 "} margin={-10} />
                        </Col>
                      }
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="justify-content-between" style={{ backgroundColor: '#344675' }}>
                    <Row>
                      <Col xs="6">
                        $ Costo Real
                      </Col>
                      {loadingData === false ?
                        <Col xs="6" style={{ textAlign: 'right' }}>
                          <Badge pill color="info">{campaingData[0]? campaingData[0].real_cost : '0' }</Badge>
                        </Col>
                        :
                        <Col md={{ size: 2, offset: 2 }} style={{ textAlign: 'right', marginLeft: 350, marginTop: '-8px' }}>
                          <FadeLoader css={override} size={1} color={"#1d8cf8 "} margin={-10} />
                        </Col>
                      }
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="justify-content-between" style={{ backgroundColor: '#344675' }}>
                    <Row>
                      <Col xs="6">
                        $ Costo Invertido
                      </Col>
                      {loadingData === false ?
                        <Col xs="6" style={{ textAlign: 'right' }}>
                          <Badge pill color="info">{campaingData[0]? campaingData[0].inverted_cost : '0' }</Badge>
                        </Col>
                        :
                        <Col md={{ size: 2, offset: 2 }} style={{ textAlign: 'right', marginLeft: 350, marginTop: '-8px' }}>
                          <FadeLoader css={override} size={1} color={"#1d8cf8 "} margin={-10} />
                        </Col>
                      }
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
          <Col sm='4'>
          <Card>
              <CardBody>
                <Label className='info' style={{ marginLeft: '10px', marginTop: '5px' }}>
                  ENTREGADOS
                </Label>
                <ListGroup>
                  <ListGroupItem className="justify-content-between" style={{ backgroundColor: '#344675' }}>
                    <Row>
                      <Col xs="6">
                        # de Enviado
                      </Col>
                      {loadingData === false ?
                        <Col xs="6" style={{ textAlign: 'right' }}>
                          <Badge pill color="info">{campaingData[1]? campaingData[1].total_sent : '0' }</Badge>
                        </Col>
                        :
                        <Col md={{ size: 2, offset: 2 }} style={{ textAlign: 'right', marginLeft: 350, marginTop: '-8px' }}>
                          <FadeLoader css={override} size={1} color={"#1d8cf8 "} margin={-10} />
                        </Col>
                      }
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="justify-content-between" style={{ backgroundColor: '#344675' }}>
                    <Row>
                      <Col xs="6">
                      % Efectividad Por Campaña
                      </Col>
                      {loadingData === false ?
                        <Col xs="6" style={{ textAlign: 'right' }}>
                          <Badge pill color="info">{campaingData[1]? campaingData[1].efectivity : '0' }</Badge>
                        </Col>
                        :
                        <Col md={{ size: 2, offset: 2 }} style={{ textAlign: 'right', marginLeft: 350, marginTop: '-8px' }}>
                          <FadeLoader css={override} size={1} color={"#1d8cf8 "} margin={-10} />
                        </Col>
                      }
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="justify-content-between" style={{ backgroundColor: '#344675' }}>
                    <Row>
                      <Col xs="6">
                        $ Costo
                      </Col>
                      {loadingData === false ?
                        <Col xs="6" style={{ textAlign: 'right' }}>
                          <Badge pill color="info">{campaingData[1]? campaingData[1].cost : '0' }</Badge>
                        </Col>
                        :
                        <Col md={{ size: 2, offset: 2 }} style={{ textAlign: 'right', marginLeft: 350, marginTop: '-8px' }}>
                          <FadeLoader css={override} size={1} color={"#1d8cf8 "} margin={-10} />
                        </Col>
                      }
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
          <Col sm='4'>
          <Card>
              <CardBody>
                <Label className='info' style={{ marginLeft: '10px', marginTop: '5px' }}>
                  NO ENTREGADOS
                </Label>
                <ListGroup>
                  <ListGroupItem className="justify-content-between" style={{ backgroundColor: '#344675' }}>
                    <Row>
                      <Col xs="6">
                        # de Enviado
                      </Col>
                      {loadingData === false ?
                        <Col xs="6" style={{ textAlign: 'right' }}>
                          <Badge pill color="info">{campaingData[2]? campaingData[2].total_sent : '0' }</Badge>
                        </Col>
                        :
                        <Col md={{ size: 2, offset: 2 }} style={{ textAlign: 'right', marginLeft: 350, marginTop: '-8px' }}>
                          <FadeLoader css={override} size={1} color={"#1d8cf8 "} margin={-10} />
                        </Col>
                      }
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="justify-content-between" style={{ backgroundColor: '#344675' }}>
                    <Row>
                      <Col xs="6">
                      % Efectividad Por Campaña
                      </Col>
                      {loadingData === false ?
                        <Col xs="6" style={{ textAlign: 'right' }}>
                          <Badge pill color="info">{campaingData[2]? campaingData[2].efectivity : '0' }</Badge>
                        </Col>
                        :
                        <Col md={{ size: 2, offset: 2 }} style={{ textAlign: 'right', marginLeft: 350, marginTop: '-8px' }}>
                          <FadeLoader css={override} size={1} color={"#1d8cf8 "} margin={-10} />
                        </Col>
                      }
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="justify-content-between" style={{ backgroundColor: '#344675' }}>
                    <Row>
                      <Col xs="6">
                        $ Costo
                      </Col>
                      {loadingData === false ?
                        <Col xs="6" style={{ textAlign: 'right' }}>
                          <Badge pill color="info">{campaingData[2]? campaingData[2].cost : '0' }</Badge>
                        </Col>
                        :
                        <Col md={{ size: 2, offset: 2 }} style={{ textAlign: 'right', marginLeft: 350, marginTop: '-8px' }}>
                          <FadeLoader css={override} size={1} color={"#1d8cf8 "} margin={-10} />
                        </Col>
                      }
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>
          </Col>

          <Col sm='4'>
          <Card>
              <CardBody>
                <Label className='info' style={{ marginLeft: '10px', marginTop: '5px' }}>
                  ABIERTOS
                </Label>
                <ListGroup>
                  <ListGroupItem className="justify-content-between" style={{ backgroundColor: '#344675' }}>
                    <Row>
                      <Col xs="6">
                        # de Enviado
                      </Col>
                      {loadingData === false ?
                        <Col xs="6" style={{ textAlign: 'right' }}>
                          <Badge pill color="info">{campaingData[3]? campaingData[3].total_sent : '0' }</Badge>
                        </Col>
                        :
                        <Col md={{ size: 2, offset: 2 }} style={{ textAlign: 'right', marginLeft: 350, marginTop: '-8px' }}>
                          <FadeLoader css={override} size={1} color={"#1d8cf8 "} margin={-10} />
                        </Col>
                      }
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="justify-content-between" style={{ backgroundColor: '#344675' }}>
                    <Row>
                      <Col xs="6">
                      % Efectividad Por Campaña
                      </Col>
                      {loadingData === false ?
                        <Col xs="6" style={{ textAlign: 'right' }}>
                          <Badge pill color="info">{campaingData[3]? campaingData[3].efectivity : '0' }</Badge>
                        </Col>
                        :
                        <Col md={{ size: 2, offset: 2 }} style={{ textAlign: 'right', marginLeft: 350, marginTop: '-8px' }}>
                          <FadeLoader css={override} size={1} color={"#1d8cf8 "} margin={-10} />
                        </Col>
                      }
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="justify-content-between" style={{ backgroundColor: '#344675' }}>
                    <Row>
                      <Col xs="6">
                        $ Costo
                      </Col>
                      {loadingData === false ?
                        <Col xs="6" style={{ textAlign: 'right' }}>
                          <Badge pill color="info">{campaingData[3]? campaingData[3].cost : '0' }</Badge>
                        </Col>
                        :
                        <Col md={{ size: 2, offset: 2 }} style={{ textAlign: 'right', marginLeft: 350, marginTop: '-8px' }}>
                          <FadeLoader css={override} size={1} color={"#1d8cf8 "} margin={-10} />
                        </Col>
                      }
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>
          </Col>

          <Col sm='4'>
          <Card>
              <CardBody>
                <Label className='info' style={{ marginLeft: '10px', marginTop: '5px' }}>
                  CLICK
                </Label>
                <ListGroup>
                  <ListGroupItem className="justify-content-between" style={{ backgroundColor: '#344675' }}>
                    <Row>
                      <Col xs="6">
                        # de Enviado
                      </Col>
                      {loadingData === false ?
                        <Col xs="6" style={{ textAlign: 'right' }}>
                          <Badge pill color="info">{campaingData[4]? campaingData[4].total_sent : '0' }</Badge>
                        </Col>
                        :
                        <Col md={{ size: 2, offset: 2 }} style={{ textAlign: 'right', marginLeft: 350, marginTop: '-8px' }}>
                          <FadeLoader css={override} size={1} color={"#1d8cf8 "} margin={-10} />
                        </Col>
                      }
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="justify-content-between" style={{ backgroundColor: '#344675' }}>
                    <Row>
                      <Col xs="6">
                      % Efectividad Por Campaña
                      </Col>
                      {loadingData === false ?
                        <Col xs="6" style={{ textAlign: 'right' }}>
                          <Badge pill color="info">{campaingData[4]? campaingData[4].efectivity : '0' }</Badge>
                        </Col>
                        :
                        <Col md={{ size: 2, offset: 2 }} style={{ textAlign: 'right', marginLeft: 350, marginTop: '-8px' }}>
                          <FadeLoader css={override} size={1} color={"#1d8cf8 "} margin={-10} />
                        </Col>
                      }
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="justify-content-between" style={{ backgroundColor: '#344675' }}>
                    <Row>
                      <Col xs="6">
                        $ Costo
                      </Col>
                      {loadingData === false ?
                        <Col xs="6" style={{ textAlign: 'right' }}>
                          <Badge pill color="info">{campaingData[4]? campaingData[4].cost : '0' }</Badge>
                        </Col>
                        :
                        <Col md={{ size: 2, offset: 2 }} style={{ textAlign: 'right', marginLeft: 350, marginTop: '-8px' }}>
                          <FadeLoader css={override} size={1} color={"#1d8cf8 "} margin={-10} />
                        </Col>
                      }
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
          <Col sm='4'>
          <Card>
              <CardBody>
                <Label className='info' style={{ marginLeft: '10px', marginTop: '5px' }}>
                  SPAM
                </Label>
                <ListGroup>
                  <ListGroupItem className="justify-content-between" style={{ backgroundColor: '#344675' }}>
                    <Row>
                      <Col xs="6">
                        # de Enviado
                      </Col>
                      {loadingData === false ?
                        <Col xs="6" style={{ textAlign: 'right' }}>
                          <Badge pill color="info">{campaingData[5]? campaingData[5].total_sent : '0' }</Badge>
                        </Col>
                        :
                        <Col md={{ size: 2, offset: 2 }} style={{ textAlign: 'right', marginLeft: 350, marginTop: '-8px' }}>
                          <FadeLoader css={override} size={1} color={"#1d8cf8 "} margin={-10} />
                        </Col>
                      }
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="justify-content-between" style={{ backgroundColor: '#344675' }}>
                    <Row>
                      <Col xs="6">
                      % Efectividad Por Campaña
                      </Col>
                      {loadingData === false ?
                        <Col xs="6" style={{ textAlign: 'right' }}>
                          <Badge pill color="info">{campaingData[5]? campaingData[5].efectivity : '0' }</Badge>
                        </Col>
                        :
                        <Col md={{ size: 2, offset: 2 }} style={{ textAlign: 'right', marginLeft: 350, marginTop: '-8px' }}>
                          <FadeLoader css={override} size={1} color={"#1d8cf8 "} margin={-10} />
                        </Col>
                      }
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem className="justify-content-between" style={{ backgroundColor: '#344675' }}>
                    <Row>
                      <Col xs="6">
                        $ Costo
                      </Col>
                      {loadingData === false ?
                        <Col xs="6" style={{ textAlign: 'right' }}>
                          <Badge pill color="info">{campaingData[5]? campaingData[5].cost : '0' }</Badge>
                        </Col>
                        :
                        <Col md={{ size: 2, offset: 2 }} style={{ textAlign: 'right', marginLeft: 350, marginTop: '-8px' }}>
                          <FadeLoader css={override} size={1} color={"#1d8cf8 "} margin={-10} />
                        </Col>
                      }
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>
        :
        <Row>
          <Col sm='4'>
          </Col>
          <Col sm='4'>
            <Card>
              <CardTitle style={{ textAlign: 'center' }}>
                <br></br>
                <Label>
                  Hola, tu usuario no cuenta con los permisos asignados en este momento, comunicate con tu administrador!
                </Label>
                <br></br>
                <i className="tim-icons icon-settings" />
              </CardTitle>
            </Card>
          </Col>
        </Row>
      }
    </div >);
  }
}

const Databases = reduxForm({
  form: 'Booking',
  //enableReinitialize: true

})(DatabasesForm);

export default connect(
  (state) => ({
    campaing: selector.getCampaing(state),
    campaingData: selector.getCampaingData(state),
    loadingData: selector.getCampaingloadingData(state),
    loading: selector.getCampaingloading(state),
    userInfo: selector.getUserMsgInfo(state),
    loadingAction: selector.getActionloading(state),
    userCompany: selector.getUserCompany(state)

  }),
  (dispatch) => ({
    fetchCampaing() {
      dispatch(Actions.fetchCampaing())
    },
    getCampaing(id) {
      dispatch(Actions.getCampaing({
        id
      }))
    },
  })
)(Databases);