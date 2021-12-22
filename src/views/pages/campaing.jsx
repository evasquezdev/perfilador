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
import ReactTable from 'react-table';
import { matchSorter } from 'match-sorter';

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
          + '/' +
          (parseInt((value._d).getMonth()) + 1)

          + '/' +
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
      changeFlag
    } = this.props;
    const {
      FilterForm
    } = this.state;
    let name;
    // let filteredmuns = municipalities.filter(m => m.department === FilterForm.departmentlabel)
    return (<div className="content">
      <Modal />
      <Row>
        <Col>
          {departments &&
            <ReactTable responsive
              data={departments.map(index => {
                return {
                  name: index.name,
                  type: index.type,
                  actions: (<>

                    <div className="" >
                      {
                        index.valid === false ?
                          <Button
                            onClick={() => changeFlag((index.name + '|' + index.type), 0)}
                            color="info"
                            size="sm"
                          >
                            Agregar <i className="fa fa-edit" />
                          </Button>
                          :
                          <Button
                            onClick={() => changeFlag((index.name + '|' + index.type), 1)}
                            color="danger"
                            size="sm"
                          >
                            Eliminar <i className={"fa fa-times"} />
                          </Button>
                      }
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
                  Header: "TIPO",
                  accessor: "type",
                  filterMethod: (filter, row) =>
                    matchSorter(row, filter.value, { keys: ["type"] }),
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

const Databases = reduxForm({
  form: 'Campaing',

})(DatabasesForm);

export default connect(
  (state) => ({
    departments: selector.getFilters(state),
    municipalities: selector.getMunicipalities(state),
    filteredData: selector.getFilterData(state),
    loading: selector.getFilterloading(state),
    userInfo: selector.getUserMsgInfo(state),
    loadingAction: selector.getActionloading(state),
  }),
  (dispatch) => ({
    getDeps() {
      dispatch(filterActions.getfilter())
    },
    filterData(FilterForm) {
      dispatch(filterActions.filterData({ FilterForm: FilterForm }))
    },
    changeFlag(value, flag) {
      dispatch(filterActions.changeFlag({ 
        value: value, 
        flag: flag }))
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