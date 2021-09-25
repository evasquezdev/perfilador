import React from "react";

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
  CardFooter
} from "reactstrap";
import { connect } from 'react-redux';
import * as selector from '../../_reducers';
import * as dbActions from '../../_actions/db';
import * as modalActions from '../../_actions/modal';
import Modal from '../../components/Modal';

class Databases extends React.Component{
  state = {
    dbFIle: null,
    dbForm: {
      file: null,
      name: '',
      abbreviation: '',
    }
  }
  componentDidMount(){
    const {
      getDbs,
    } = this.props;
    getDbs();
  }
  render(){
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
      <Row>
        <Col sm={12} md="6">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Nueva Base de Datos</CardTitle>
            </CardHeader>
            <CardBody>
              <Form onSubmit={(e) => {
                e.preventDefault();
                if(
                  !file || !name || !abbreviation ||
                  name === '' || abbreviation === ''
                ){
                  showError("Se requiere informacion")
                }else {
                  postDb(file,name,abbreviation);
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
                    value = {name}
                    disabled={loading}
                    onChange={e => this.setState({
                      dbForm: {
                        ...this.state.dbForm,
                        name: e.target.value
                      }
                    })}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Abreviacion:</Label>
                  <Input
                    type="text"
                    value = {abbreviation}
                    disabled={loading}
                    onChange={e => this.setState({
                      dbForm: {
                        ...this.state.dbForm,
                        abbreviation: e.target.value
                      }
                    })}
                  />
                </FormGroup>
                <FormGroup>
                  <Button color="info" size="sm">
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
                    <Label>Seleccionar Archivo</Label>
                  </Button>
                  {file && <span className="form-text">
                    {file.name}
                  </span>}
                </FormGroup>
                <Button type="submit" color="success" disabled={loading}>
                  <i className="tim-icons icon-cloud-upload-94" />
                  {" "}
                  Subir DB
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
        <Col sm="12" md="6">
          <Button 
            className="btn-round" 
            color="primary"
            onClick={()=>{
              window.open(`${process.env.PUBLIC_URL}/Formato DB.xlsx`)
            }}
          >
            <i className="tim-icons icon-cloud-download-93" /> Descargar Formato DB
          </Button>
        </Col>
        <Col md="12">
          <Row>
            {loading ? 'loading...' : dbs.map((db,i) => <Col xs="6" md="2" key={i}>
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
                  <CardText>Total: </CardText>
                  <CardText>Hombres: </CardText>
                  <CardText>Mujeres: </CardText>
                </CardBody>
                <CardFooter>
                  <Row className="no-gutters">
                    <Col xs="12">
                      {db.ingested !== "False" ? 
                      <Button size="sm" 
                        color="danger" block
                        style={{fontSize: '0.675rem'}} disabled={loading}
                        onClick={()=>{
                          deleteDb(db.id)
                        }}
                      >
                        Eliminar DB
                      </Button> : 
                      <Button size="sm" 
                        color="success" block
                        style={{fontSize: '0.675rem'}} disabled={loading}
                        onClick={()=>{
                          syncDb(db.id)
                        }}
                      >
                        Sincronizar DB
                      </Button>}
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>)}
          </Row>
        </Col>
      </Row>
    </div>);
  }
}

export default connect(
  (state) => ({
    loading: selector.getDBloading(state),
    dbs: selector.getDBs(state),
  }),
  (dispatch) => ({
    getDbs(){
      dispatch(dbActions.getDbs());
    },
    postDb(file,name,abbreviation){
      dispatch(dbActions.postDb({
        file,
        name,
        abbreviation,
      }));
    },
    syncDb(database){
      dispatch(dbActions.syncDb({database}))
    },
    deleteDb(database){
      dispatch(dbActions.deleteDb({database}))
    },
    showError(msg){
      dispatch(modalActions.showError({
        message: msg,
        title: 'Error'
      }))
    }
  })
)(Databases);