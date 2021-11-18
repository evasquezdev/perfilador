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
import * as filterActions from '../../_actions/company';
import * as modalActions from '../../_actions/modal';
import Modal from '../../components/Modal';
import * as messageActions from '../../_actions/action';
import { FadeLoader } from "react-spinners";
import { css } from "@emotion/react";
import ReactTable from 'react-table';
import { matchSorter } from 'match-sorter';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  size: 10px
`;


class CompanyForm extends React.Component {
  state = {
    id: null,
    name: '',
    smsQuantity: '',
    emailQuantity: '',
    edit: false
  }

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

    </>
  )
  editCompany(data) {
    console.log('data', data)
    this.setState({
      id: data.id,
      name: data.name,
      smsQuantity: data.quantity_of_sms,
      emailQuantity: data.quantity_of_emails,
      edit: true
    })
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
      handleSubmit,
      postCompany,
      deleteCompany,
      patchCompany
    } = this.props;
    const {
      id,
      name,
      smsQuantity,
      emailQuantity,
      edit
    } = this.state
    return (<div className="content">
      <Modal />
      <Row>
        <Col sm='4'>
          <Form >
            <Label>Empresa: </Label>
            <FormGroup>
              <Input
                type="text"
                value={name}
                placeholder={'Nombre'}
                //disabled={loadingAction}
                onChange={(e) => {
                  this.setState({
                    name: e.target.value
                  })
                }}
              />
            </FormGroup>
            <Label>Cantidad de SMS: </Label>
            <FormGroup>
              <Input
                type="text"
                value={smsQuantity}
                placeholder={'Cantidad'}
                //disabled={loadingAction}
                onChange={(e) => {
                  this.setState({
                    smsQuantity: e.target.value
                  })
                }}
              />
            </FormGroup>
            <Label>Cantidad de Email: </Label>
            <FormGroup>
              <Input
                type="text"
                value={emailQuantity}
                placeholder={'Cantidad'}
                //disabled={loadingAction}
                onChange={(e) => {
                  this.setState({
                    emailQuantity: e.target.value
                  })
                }}
              />
            </FormGroup>
            {edit ?
              <Button
                color="info"
                type='submit'
                //  disabled={loadingAction}
                onClick={e => {
                  e.preventDefault();
                  patchCompany(id, name, smsQuantity, emailQuantity)
                  this.setState({
                    id: null,
                    name: '',
                    smsQuantity: '',
                    emailQuantity: ''
                  })
                }}
              >
                {edit ? 'Editar Empresa' : 'Crear Empresa'}
              </Button>
              : <Button
                color="info"
                type='submit'
                //  disabled={loadingAction}
                onClick={e => {
                  e.preventDefault();
                  postCompany(name, smsQuantity, emailQuantity)
                  this.setState({
                    name: '',
                    smsQuantity: '',
                    emailQuantity: ''
                  })
                }}
              >
                {edit ? 'Editar Empresa' : 'Crear Empresa'}
              </Button>
            }
          </Form>
        </Col>
        <Col>
          {departments &&
            <ReactTable responsive
              data={departments.map(index => {
                return {
                  id: index.id,
                  name: index.name,
                  email: index.quantity_of_emails,
                  sms: index.quantity_of_sms,
                  actions: (<>

                    <div className="" >


                      <Button
                        onClick={() => this.editCompany(index)}
                        color="info"
                        size="sm"
                      >
                        EDITAR <i className="fa fa-edit" />
                      </Button>

                      <Button
                        onClick={() => deleteCompany(index.id)}
                        color="danger"
                        size="sm"
                      >
                        Eliminar <i className={"fa fa-times"} />
                      </Button>

                      <br></br>


                    </div>
                  </>)
                }
              })}
              filterable

              columns={[
                {
                  Header: "NOMBRE",
                  accessor: "name",
                  filterMethod: (filter, row) =>
                    matchSorter(row, filter.value, { keys: ["name"] }),
                  filterAll: true,
                  sortable: true,
                  filterable: true,
                },
                {
                  Header: "Correo Electrónico",
                  accessor: "email",
                  filterMethod: (filter, row) =>
                  matchSorter(row, filter.value, { keys: ["email"] }),
                  filterAll: true,
                  sortable: true,
                  filterable: true,
                },
                {
                  Header: "SMS",
                  accessor: "sms",
                  filterMethod: (filter, row) =>
                    matchSorter(row, filter.value, { keys: ["sms"] }),
                  filterAll: true,
                  sortable: true,
                  filterable: true,
                },
                {
                  Header: "ACCIONES",
                  accessor: "actions",
                  sortable: false,
                  filterable: false,
                  width: 250
                }
              ]}
              defaultPageSize={5}
              showPaginationTop
              showPaginationBottom={false}
              previousText={ 'Anterior'}
              nextText=  {'Siguiente'}
              pageText={'Página'}
              ofText={'de'}
              rowsText={'filas'}
              className="-striped -highlight primary-pagination"
            />
          }
        </Col>
      </Row>
    </div >);
  }
}

const Company = reduxForm({
  form: 'Company',

})(CompanyForm);

export default connect(
  (state) => ({
    departments: selector.getCompany(state),

    loadingAction: selector.getActionloading(state),
  }),
  (dispatch) => ({
    getDeps() {
      dispatch(filterActions.fetchCompany())
    },
    postCompany(name, sms, email) {
      dispatch(filterActions.postCompany({
        name: name,
        smsQuantity: sms,
        emailQuantity: email
      }))
    },
    deleteCompany(id) {
      dispatch(filterActions.deleteCompany({ id }))
    },
    patchCompany(id, name, sms, email) {
      console.log(id,name, sms, email)
      dispatch(filterActions.patchCompany({
        id: id,
        name: name,
        smsQuantity: sms,
        emailQuantity: email
      }))
    }
  })
)(Company);