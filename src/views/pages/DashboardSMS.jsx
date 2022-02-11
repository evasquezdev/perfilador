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
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
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
import ModalN from '../../components/Modal';
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
    editModal: false,
    campaingSelect:[],
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

  toggleEditModal = () => {
    this.setState({
      editModal: !this.state.editModal
    });
  }

  


  checkPageMode = () => {
    let pageMode = document.body.classList.contains('white-content');
    let bgclass;
    let headerclass;
    switch (pageMode) {
      case true:
        bgclass = "bg-ligh";
        headerclass = "";
        break;
      default:
        bgclass = "bg-dark";
        headerclass = "text-primary";
        break;
    }
    return { bg: bgclass, hc: headerclass };
  }

  handleSelectChange = (event) => {
    let opts = [], opt;
    for (let i = 0, len = event.target.options.length; i < len; i++) {
      opt = event.target.options[i];
      if (opt.selected) {
        opts.push(opt.value);
      }
    }
    this.setState({campaingSelect: opts});
  };

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
      campaingData,
      downloadFile
    } = this.props;
    const {
      editModal,
      campaingSelect
    } = this.state;
    let name;
    return (<div className="content">
      <ModalN />
      <Modal
        isOpen={editModal}
        toggle={this.toggleEditModal}
        modalClassName={this.checkPageMode()}

      >
        <ModalHeader className="justify-content-center" toggle={this.toggleImportModal}>
          Selecciona las Campañas
        </ModalHeader>
        <ModalBody
          style={{ height: '800px !important' }}
        >
          <Row>
            <Col sm={12}>
              <Label>Campañas</Label>
       
                  <Input 
                    type="select" 
                    name="selectMulti" 
                    id="exampleSelectMulti1" 
                    multiple
                    ref={this.createService}
                    onChange={this.handleSelectChange}
                    value={this.state.campaingSelect}
                    style={{height: '200px', color: 'black'}}
                  >
                    {campaing.map((client,idx) => 
                      <option key={idx} value={client.campaign_id}>
                        {client.campaign_name} 
                      </option>
                    )}
                  </Input>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => this.toggleEditModal()}>
            Cerrar
          </Button>
          <Button color="primary" onClick={() => downloadFile(this.state.campaingSelect)}>
            Descargar
          </Button>
        </ModalFooter>
      </Modal>
      {userCompany.has_sms ?
        <Row>
          <Col sm='8'>
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
            <Button
              className="mt-4 ml-5"
              color="info"
              onClick={() => this.toggleEditModal()}
            >
              Descargar Datos de Campañas
            </Button>
          </Col>
          <Col sm='12'>
            <Card>
              <CardBody>
                <Label className='info' style={{ marginLeft: '10px', marginTop: '5px' }}>
                  TOTAL
                </Label>
                <ListGroup>
                  <Row>
                    <Col sm='6'>
                      <ListGroupItem className="" style={{ backgroundColor: '#344675' }}>
                        <Row>
                          <Col xs="8">
                            Cantidad de SMS programados
                          </Col>
                          {loadingData === false ?
                            <Col xs="4" style={{ textAlign: 'right' }}>
                              <Badge pill color="info">{campaingData.quantity_of_sms_programmed ? campaingData.quantity_of_sms_programmed : '0'}</Badge>
                            </Col>
                            :
                            <Col md={{ size: 2, offset: 2 }} style={{ textAlign: 'right', marginLeft: 350, marginTop: '-8px' }}>
                              <FadeLoader css={override} size={1} color={"#1d8cf8 "} margin={-10} />
                            </Col>
                          }
                        </Row>
                      </ListGroupItem>
                    </Col>
                    <Col sm='6'>
                      <ListGroupItem style={{ backgroundColor: '#344675' }}>
                        <Row>
                          <Col xs="8">
                            Cantidad de SMS Recibidos
                          </Col>
                          {loadingData === false ?
                            <Col xs="4" style={{ textAlign: 'right' }}>
                              <Badge pill color="info">{campaingData.quantity_of_sms_received ? campaingData.quantity_of_sms_received : '0'}</Badge>
                            </Col>
                            :
                            <Col md={{ size: 2, offset: 2 }} style={{ textAlign: 'right', marginLeft: 350, marginTop: '-8px' }}>
                              <FadeLoader css={override} size={1} color={"#1d8cf8 "} margin={-10} />
                            </Col>
                          }
                        </Row>
                      </ListGroupItem>
                    </Col>
                    <Col sm='6'>
                      <ListGroupItem className="justify-content-between" style={{ backgroundColor: '#344675' }}>
                        <Row>
                          <Col xs="8">
                            Cantidad de SMS rechazado
                          </Col>
                          {loadingData === false ?
                            <Col xs="4" style={{ textAlign: 'right' }}>
                              <Badge pill color="info">{campaingData.quantity_of_sms_rejected ? campaingData.quantity_of_sms_rejected : '0'}</Badge>
                            </Col>
                            :
                            <Col md={{ size: 2, offset: 2 }} style={{ textAlign: 'right', marginLeft: 350, marginTop: '-8px' }}>
                              <FadeLoader css={override} size={1} color={"#1d8cf8 "} margin={-10} />
                            </Col>
                          }
                        </Row>
                      </ListGroupItem>
                    </Col>
                    <Col sm='6'>
                      <ListGroupItem className="justify-content-between" style={{ backgroundColor: '#344675' }}>
                        <Row>
                          <Col xs="8">
                            Cantidad invertida en campaña
                          </Col>
                          {loadingData === false ?
                            <Col xs="4" style={{ textAlign: 'right' }}>
                              <Badge pill color="info">{campaingData.invested_money ? campaingData.invested_money : '0'}</Badge>
                            </Col>
                            :
                            <Col md={{ size: 2, offset: 2 }} style={{ textAlign: 'right', marginLeft: 350, marginTop: '-8px' }}>
                              <FadeLoader css={override} size={1} color={"#1d8cf8 "} margin={-10} />
                            </Col>
                          }
                        </Row>
                      </ListGroupItem>
                    </Col>
                    <Col sm='6'>
                      <ListGroupItem className="justify-content-between" style={{ backgroundColor: '#344675' }}>
                        <Row>
                          <Col xs="8">
                            Inversion real de campaña
                          </Col>
                          {loadingData === false ?
                            <Col xs="4" style={{ textAlign: 'right' }}>
                              <Badge pill color="info">{campaingData.real_invested_money ? campaingData.real_invested_money : '0'}</Badge>
                            </Col>
                            :
                            <Col md={{ size: 2, offset: 2 }} style={{ textAlign: 'right', marginLeft: 350, marginTop: '-8px' }}>
                              <FadeLoader css={override} size={1} color={"#1d8cf8 "} margin={-10} />
                            </Col>
                          }
                        </Row>
                      </ListGroupItem>
                    </Col>
                    <Col sm='6'>
                      <ListGroupItem className="justify-content-between" style={{ backgroundColor: '#344675' }}>
                        <Row>
                          <Col xs="8">
                            Precio de SMS para campaña
                          </Col>
                          {loadingData === false ?
                            <Col xs="4" style={{ textAlign: 'right' }}>
                              <Badge pill color="info">{campaingData.price_of_campaign ? campaingData.price_of_campaign : '0'}</Badge>
                            </Col>
                            :
                            <Col md={{ size: 2, offset: 2 }} style={{ textAlign: 'right', marginLeft: 350, marginTop: '-8px' }}>
                              <FadeLoader css={override} size={1} color={"#1d8cf8 "} margin={-10} />
                            </Col>
                          }
                        </Row>
                      </ListGroupItem>
                    </Col>
                    <Col sm='6'>
                      <ListGroupItem className="justify-content-between" style={{ backgroundColor: '#344675' }}>
                        <Row>
                          <Col xs="8">
                            % de efectividad
                          </Col>
                          {loadingData === false ?
                            <Col xs="4" style={{ textAlign: 'right' }}>
                              <Badge pill color="info">{campaingData.shipping_date ? campaingData.shipping_date.slice(0, 10) : '0'}</Badge>
                            </Col>
                            :
                            <Col md={{ size: 2, offset: 2 }} style={{ textAlign: 'right', marginLeft: 350, marginTop: '-8px' }}>
                              <FadeLoader css={override} size={1} color={"#1d8cf8 "} margin={-10} />
                            </Col>
                          }
                        </Row>
                      </ListGroupItem>
                    </Col>
                    <Col sm='6'>
                      <ListGroupItem className="justify-content-between" style={{ backgroundColor: '#344675' }}>
                        <Row>
                          <Col xs="8">
                            Programada por
                          </Col>
                          {loadingData === false ?
                            <Col xs="4" style={{ textAlign: 'right' }}>
                              <Badge pill color="info">{campaingData.created_by ? campaingData.created_by : ''}</Badge>
                            </Col>
                            :
                            <Col md={{ size: 2, offset: 2 }} style={{ textAlign: 'right', marginLeft: 350, marginTop: '-8px' }}>
                              <FadeLoader css={override} size={1} color={"#1d8cf8 "} margin={-10} />
                            </Col>
                          }
                        </Row>
                      </ListGroupItem>
                    </Col>
                  </Row>
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
    campaing: selector.getCampaingSMS(state),
    campaingData: selector.getCampaingDataSMS(state),
    loadingData: selector.getCampaingloadingData(state),
    loading: selector.getCampaingloading(state),
    userInfo: selector.getUserMsgInfo(state),
    loadingAction: selector.getActionloading(state),
    userCompany: selector.getUserCompany(state)

  }),
  (dispatch) => ({
    fetchCampaing() {
      dispatch(Actions.fetchCampaingSMS())
    },
    getCampaing(id) {
      dispatch(Actions.getCampaingSMS({
        id
      }))
    },
    downloadFile(campaing) {
      dispatch(Actions.getCampaingSMSFILE({
        id:campaing
      }))
    }
  })
)(Databases);