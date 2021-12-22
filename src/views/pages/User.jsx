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
import * as filterActions from '../../_actions/user';
import * as Actions from '../../_actions/company';
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
    email: '',
    name: '',
    password: '',
    company: {
      value: null,
      label: ''
    },
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
    this.setState({
      id: data.user_id,
      name: data.user_name,
      //email: data.email,
      edit: true
    })
    this.state.company.value = data.company_id
    this.state.company.label = data.company_name
  }
  componentDidMount() {
    const {
      getDeps,
      getCompany
    } = this.props;
    getDeps();
    getCompany()
  }
  render() {
    const {
      departments,
      handleSubmit,
      postCompany,
      deleteCompany,
      patchCompany,
      companies
    } = this.props;
    const {
      id,
      name,
      password,
      company,
      edit,
      email
    } = this.state
    return (<div className="content">
      <Modal />
      <Row>
        <Col sm='4'>
          <Form >
            <Label>Nombre: </Label>
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
            <Label>Correo Electrónico: </Label>
            <FormGroup>
              {edit ?
                <Input
                  type="text"
                  value={email}
                  placeholder={'ejemplo@ejemplo.com'}
                  disabled={true}
                  onChange={(e) => {
                    this.setState({
                      email: e.target.value
                    })
                  }}
                />
                :
                <Input
                  type="text"
                  value={email}
                  placeholder={'ejemplo@ejemplo.com'}
                  //disabled={loadingAction}
                  onChange={(e) => {
                    this.setState({
                      email: e.target.value
                    })
                  }}
                />
              }
            </FormGroup>
            <Label>Contraseña: </Label>
            <FormGroup>
              {edit ?
                <Input
                  type="text"
                  value={password}
                  placeholder={'Contraseña'}
                  disabled={true}
                  onChange={(e) => {
                    this.setState({
                      password: e.target.value
                    })
                  }}
                />
                :
                <Input
                  type="text"
                  value={password}
                  placeholder={'Contraseña'}
                  //disabled={loadingAction}
                  onChange={(e) => {
                    this.setState({
                      password: e.target.value
                    })
                  }}
                />
              }
            </FormGroup>
            <Label>Empresa: </Label>
            <FormGroup>
              <Select
                className="react-select info"
                classNamePrefix="react-select"
                defaultValue={{
                  value: company.value,
                  label: company.label
                }}
                value={{
                  value: company.value,
                  label: company.label
                }}
                onChange={(e) => {
                  this.setState({
                    company: {
                      ...company,
                      value: e.value,
                      label: e.label
                    }
                  })
                }}
                //value={value}
                options={companies.map(companyOptions => {
                  return {
                    value: companyOptions.id,
                    label: `${companyOptions.name}`
                  }
                })}
              //   placeholder={placeholder}
              />
            </FormGroup>
            {edit ?
              <Button
                color="info"
                type='submit'
                //  disabled={loadingAction}
                onClick={e => {
                  e.preventDefault();
                  patchCompany(id, name, company)
                  this.setState({
                    company: {
                      ...company,
                      value: null,
                      label: '',
                    },
                    id: null,
                    name: '',
                    password: '',
                    email: ''
                  })
                }}
              >
                {edit ? 'Editar Usuario' : 'Crear Usuario'}
              </Button>
              : <Button
                color="info"
                type='submit'
                //  disabled={loadingAction}
                onClick={e => {
                  e.preventDefault();
                  postCompany(email, name, password, company)
                  this.setState({
                    company: {
                      ...company,
                      value: null,
                      label: '',
                    },
                    id: null,
                    name: '',
                    password: '',
                    email: ''
                  })
                }}
              >
                {edit ? 'Editar Usuario' : 'Crear Usuario'}
              </Button>
            }
          </Form>
        </Col>
        <Col>
          {departments &&
            <ReactTable responsive
              data={departments.map(index => {
                return {
                  id: index.user_id,
                  name: index.user_name,
                  company: index.company_name,
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
                        onClick={() => deleteCompany(index.user_id)}
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
                  Header: "Empresa",
                  accessor: "company",
                  filterMethod: (filter, row) =>
                    matchSorter(row, filter.value, { keys: ["company"] }),
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
              previousText={'Anterior'}
              nextText={'Siguiente'}
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
    departments: selector.getUser(state),
    companies: selector.getCompany(state),
    loadingAction: selector.getActionloading(state),
  }),
  (dispatch) => ({
    getDeps() {
      dispatch(filterActions.fetchUser())
    },
    getCompany() {
      dispatch(Actions.fetchCompany())
    },
    postCompany(email, name, password, company) {
      dispatch(filterActions.postUser({
        name: name,
        email: email,
        password: password,
        company: company.value
      }))
    },
    deleteCompany(id) {
      dispatch(filterActions.deleteUser({ id }))
    },
    patchCompany(id, name, company) {
      dispatch(filterActions.patchUser({
        id: id,
        name: name,
        company: company.value
      }))
    }
  })
)(Company);