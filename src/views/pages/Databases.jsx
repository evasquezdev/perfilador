import React from "react";
import Select from "react-select";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Label,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  CardFooter,
  TabPane,
  TabContent,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { connect } from 'react-redux';
import * as selector from '../../_reducers';
import * as dbActions from '../../_actions/db';
import * as modalActions from '../../_actions/modal';
import Modal from '../../components/Modal';

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? 'red' : 'blue',
    padding: 20,
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}

class Databases extends React.Component {
  state = {
    vTabs: 'vt1',
    isSelected: null,
    dbFIle: null,
    dbForm: {
      file: null,
      name: '',
      abbreviation: '',
    },
    rangeSelect: 'All',
    range: [
      {
        label: 'ELIMINAR',
        value: 'True'
      },
      {
        label: 'SINCRONIZAR',
        value: 'False'
      },
      {
        label: 'TODOS',
        value: 'All'
      },

    ]
  }
  componentDidMount() {
    const {
      getDbs,
    } = this.props;
    getDbs();
  }
  render() {
    const {
      dbForm: {
        file,
        name,
        abbreviation,
      },
    } = this.state;
    const {
      loading,
      dbs,
      postDb,
      syncDb,
      deleteDb,
      showError,
    } = this.props;

    return (<div className="content">
      <Modal />
      <Nav pills className="nav-pills-info nav-pills-icons">
        <NavItem>
          <NavLink
            className={this.state.vTabs === "vt1" ? "active" : ""}
            onClick={() => this.setState({ vTabs: "vt1" })}
          >
            Crear Base de Datos
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={this.state.vTabs === "vt2" ? "active" : ""}
            onClick={() => this.setState({ vTabs: "vt2" })}
          >
            Eliminar & Sincronizar Base de Datos
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={this.state.vTabs}>
        <TabPane tabId='vt1'>
          <Row>
            <Col style={{marginTop: '60px'}} sm={12} md={{ size: 8, offset: 2 }}>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Nueva Base de Datos</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={(e) => {
                    e.preventDefault();
                    if (
                      !file || !name || !abbreviation ||
                      name === '' || abbreviation === ''
                    ) {
                      showError("Se requiere informacion")
                    } else {
                      postDb(file, name, abbreviation);
                      this.setState({
                        dbForm: {
                          name: '',
                          abbreviation: '',
                        }
                      })
                    }
                  }}>
                    <FormGroup>
                      <Label>Nombre:</Label>
                      <Input
                        type="text"
                        value={name}
                        disabled={loading}
                        placeholder="Nombre de la base de datos a crear"
                        onChange={e => this.setState({
                          dbForm: {
                            ...this.state.dbForm,
                            name: e.target.value
                          }
                        })}
                      />
                    </FormGroup>
                  {/*  <FormGroup>
                      <Label>Abreviacion:</Label>
                      <Input
                        type="text"
                        value={abbreviation}
                        disabled={loading}
                        placeholder="Abreviacion para la base de datos a crear"
                        onChange={e => this.setState({
                          dbForm: {
                            ...this.state.dbForm,
                            abbreviation: e.target.value
                          }
                        })}
                      />
                    </FormGroup>
                      */}                
                  <Row>
                  <Col sm='7'>
                        <FormGroup>
                          <Button color="info" size="lg">
                            <Input type="file"
                              accept=".xlsx"
                              disabled={loading}
                              onChange={e => {
                                e.preventDefault();
                                this.setState({
                                  dbForm: {
                                    ...this.state.dbForm,
                                    file: e.target.files[0]
                                  }
                                })
                              }}
                            />
                             <i className="tim-icons icon-cloud-upload-94" />
                        {" "}
                            <Label>Subir Base de Datos</Label>
                          </Button>
                          {file && <span className="form-text text-info">
                            {file.name}
                          </span>}
                        </FormGroup>
                    </Col>
                    <Col sm='5'>
                      <Button type="submit" size="lg"
                      onClick={()=> postDb(this.state.dbForm.file, this.state.dbForm.name, this.state.dbForm.abbreviation)}
                      color="success" disabled={loading}>
                        <i className="tim-icons icon-single-copy-04" />
                        {" "}
                        <Label>
                        Crear Base de Datos
                        </Label>
                      </Button>
                    </Col>
                    {/*<Col sm='4'>
                      <Button
                      size="lg"
                      ///  className="btn-round"
                        color="default"
                        onClick={() => {
                          window.open(`${process.env.PUBLIC_URL}/Formato DB.xlsx`)
                        }}
                      >
                        <i className="tim-icons icon-cloud-download-93" /> 
                        {" "}
                        <Label>
                        Descargar Formato
                        </Label>
                      </Button>
                      </Col>*/}
                  </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId='vt2'>
          <Row>
            <Col md='3' style={{ marginBottom: '20px' }}>
              <FormGroup>
                <Select
                  styles={customStyles}
                  placeholder={'Seleccionar'}
                  options={this.state.range}
                  onChange={e => this.setState({
                    rangeSelect: e.value
                  })
                  } />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Row>
                {loading ? 'loading...' : dbs.map((db, i) =>
                (<>{(this.state.rangeSelect === db.ingested || this.state.rangeSelect === 'All') &&
                  <Col xs="6" md="2" key={i}>
                    <Card>
                      <CardImg top
                        src={process.env.PUBLIC_URL + "/excel.png"}
                        alt="excel_icon"
                        style={{
                          maxWidth: '10rem',
                          margin: 'auto'
                        }}
                      />
                      <CardBody>
                        <CardTitle>{db.abbreviation}</CardTitle>
                        <CardText>Name: {db.name}</CardText>
                      </CardBody>
                      <CardFooter>
                        <Row className="no-gutters">
                          <Col xs="12">
                            {db.ingested !== "False" ?
                              <Button size="sm"
                                color="danger" block
                                style={{ fontSize: '0.675rem' }} disabled={loading}
                                onClick={() => {
                                  deleteDb(db.id)
                                }}
                              >
                                Eliminar DB
                              </Button> :
                              <Button size="sm"
                                color="success" block
                                style={{ fontSize: '0.675rem' }} disabled={loading}
                                onClick={() => {
                                  syncDb(db.id)
                                }}
                              >
                                Sincronizar DB
                              </Button>}
                          </Col>
                        </Row>
                      </CardFooter>
                    </Card>
                  </Col>

                } </>))}
              </Row>
            </Col>
          </Row>
        </TabPane>
      </TabContent>

    </div>);
  }
}

export default connect(
  (state) => ({
    loading: selector.getDBloading(state),
    dbs: selector.getDBs(state),
  }),
  (dispatch) => ({
    getDbs() {
      dispatch(dbActions.getDbs());
    },
    postDb(file, name, abbreviation) {
      dispatch(dbActions.postDb({
        file,
        name,
        abbreviation,
      }));
    },
    syncDb(database) {
      dispatch(dbActions.syncDb({ database }))
    },
    deleteDb(database) {
      dispatch(dbActions.deleteDb({ database }))
    },
    showError(msg) {
      dispatch(modalActions.showError({
        message: msg,
        title: 'Error'
      }))
    }
  })
)(Databases);