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

import ReactDatetime from "react-datetime";
import { connect } from 'react-redux';
import * as selector from '../../_reducers';
import * as filterActions from '../../_actions/filter';
import * as modalActions from '../../_actions/modal';
import * as DBActions from '../../_actions/db';

import ModalN from '../../components/Modal';
import * as messageActions from '../../_actions/action';
import { FadeLoader, ClimbingBoxLoader } from "react-spinners";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  size: 10px
`;

const overrideCubo = css`
  display: block;
  margin: 20% auto;
  border-color: red;
  size: 30px
  zIndex: 2
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
    Form: null,
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
      company: '',
      date: '',
      time: '',
      countText: 0,
      filesize: 0
    },
    loading: false,
    editModal: false,
    dbsSelected: [],
    sex: [
      {
        value: 'F',
        label: "Femenino"
      },
      {
        value: 'M',
        label: "Masculino"
      },
      {
        value: 'D',
        label: "Desconocido"
      },
    ],
    departamentSelect: null,
    time: [
      {
        label: '12:00AM',
        value: 0
      },
      {
        label: '1:00AM',
        value: 1
      },
      {
        label: '2:00AM',
        value: 2
      },
      {
        label: '3:00AM',
        value: 3
      },
      {
        label: '4:00AM',
        value: 4
      },
      {
        label: '5:00AM',
        value: 5
      },
      {
        label: '6:00AM',
        value: 6
      },
      {
        label: '7:00AM',
        value: 7
      },
      {
        label: '8:00AM',
        value: 8
      },
      {
        label: '9:00AM',
        value: 9
      },
      {
        label: '10:00AM',
        value: 10
      },
      {
        label: '11:00AM',
        value: 11
      },
      {
        label: '12:00PM',
        value: 12
      },
      {
        label: '1:00PM',
        value: 13
      },
      {
        label: '2:00PM',
        value: 14
      },
      {
        label: '3:00PM',
        value: 15
      },
      {
        label: '4:00PM',
        value: 16
      },
      {
        label: '5:00PM',
        value: 17
      },
      {
        label: '6:00PM',
        value: 18
      },
      {
        label: '7:00PM',
        value: 19
      },
      {
        label: '8:00PM',
        value: 20
      },
      {
        label: '9:00PM',
        value: 21
      },
      {
        label: '10:00PM',
        value: 22
      },
      {
        label: '11:00PM',
        value: 23
      },
    ],
    range: [
      {
        label: 'Menor',
        value: 0
      },
      {
        label: 'Mayor',
        value: 1
      }
    ],
    departamentos: [
      {
        'label': "ALTA VERAPAZ",
        'value': "ALTA_VERAPAZ",
      },
      {
        'label': 'BAJA VERAPAZ',
        'value': "BAJA_VERAPAZ",

      },
      {
        'label': "CHIMALTENANGO",
        'value': "CHIMALTENANGO",

      },
      {
        'label': 'CHIQUIMULA',
        'value': "CHIQUIMULA",

      },
      {
        'label': "GUATEMALA",
        'value': "GUATEMALA",

      },
      {
        'label': 'EL PROGRESO',
        'value': "EL_PROGRESO",

      },

      //
      {
        'label': "ESCUINTLA",
        'value': "ESCUINTLA",

      },
      {
        'label': 'HUEHUETENANGO',
        'value': "HUEHUETENANGO",

      },
      {
        'label': "IZABAL",
        'value': "IZABAL",

      },
      {
        'label': 'JALAPA',
        'value': "JALAPA",

      },
      {
        'label': "JUTIAPA",
        'value': "JUTIAPA",

      },
      {
        'label': 'PETEN',
        'value': "PETEN",

      },
      //
      {
        'label': "QUETZALTENANGO",
        'value': "QUETZALTENANGO",

      },
      {
        'label': 'QUICHE',
        'value': "QUICHE",

      },
      {
        'label': "RETALHULEU",
        'value': "RETALHULEU",

      },
      {
        'label': 'SACATEPEQUEZ',
        'value': "SACATEPEQUEZ",

      },
      {
        'label': "SAN MARCOS",
        'value': "SAN_MARCOS",

      },
      {
        'label': 'SANTA ROSA',
        'value': "SANTA_ROSA",

      },
      //
      {
        'label': "SOLOLA",
        'value': "SOLOLA",

      },
      {
        'label': 'SUCHITEPEQUEZ',
        'value': "SUCHITEPEQUEZ",

      },
      {
        'label': "TOTONICAPAN",
        'value': "TOTONICAPAN",

      },
      {
        'label': 'ZACAPA',
        'value': "ZACAPA",

      },
    ],
    municipiosTotal: [
      { 'label': 'GUATEMALA', 'value': 'GUATEMALA' }, { 'label': 'SANTA_CATARINA_PINULA', 'value': 'SANTA_CATARINA_PINULA' }, { 'label': 'SAN_JOSE_PINULA', 'value': 'SAN_JOSE_PINULA' }, { 'label': 'SAN_JOSE_DEL_GOLFO', 'value': 'SAN_JOSE_DEL_GOLFO' }, { 'label': 'PALENCIA', 'value': 'PALENCIA' }, { 'label': 'CHINAUTLA', 'value': 'CHINAUTLA' }, { 'label': 'SAN_PEDRO_AYAMPUC', 'value': 'SAN_PEDRO_AYAMPUC' }, { 'label': 'MIXCO', 'value': 'MIXCO' }, { 'label': 'SAN_PEDRO_SACATEPEQUEZ', 'value': 'SAN_PEDRO_SACATEPEQUEZ' }, { 'label': 'SAN_JUAN_SACATEPEQUEZ', 'value': 'SAN_JUAN_SACATEPEQUEZ' }, { 'label': 'SAN_RAYMUNDO', 'value': 'SAN_RAYMUNDO' }, { 'label': 'CHUARRANCHO', 'value': 'CHUARRANCHO' }, { 'label': 'FRAIJANES', 'value': 'FRAIJANES' }, { 'label': 'AMATITLAN', 'value': 'AMATITLAN' }, { 'label': 'VILLA_NUEVA', 'value': 'VILLA_NUEVA' }, { 'label': 'VILLA_CANALES', 'value': 'VILLA_CANALES' }, { 'label': 'PETAPA', 'value': 'PETAPA' }, { 'label': 'GUASTATOYA', 'value': 'GUASTATOYA' }, { 'label': 'MORAZAN', 'value': 'MORAZAN' }, { 'label': 'SAN_AGUSTIN_ACASAGUASTLAN', 'value': 'SAN_AGUSTIN_ACASAGUASTLAN' }, { 'label': 'SAN_CRISTOBAL_ACASAGUASTLAN', 'value': 'SAN_CRISTOBAL_ACASAGUASTLAN' }, { 'label': 'EL_JICARO', 'value': 'EL_JICARO' }, { 'label': 'SANSARE', 'value': 'SANSARE' }, { 'label': 'SANARATE', 'value': 'SANARATE' }, { 'label': 'SAN_ANTONIO_LA_PAZ', 'value': 'SAN_ANTONIO_LA_PAZ' }, { 'label': 'ANTIGUA_GUATEMALA', 'value': 'ANTIGUA_GUATEMALA' }, { 'label': 'JOCOTENANGO', 'value': 'JOCOTENANGO' }, { 'label': 'PASTORES', 'value': 'PASTORES' }, { 'label': 'SUMPANGO', 'value': 'SUMPANGO' }, { 'label': 'SANTO_DOMINGO_XENACOJ', 'value': 'SANTO_DOMINGO_XENACOJ' }, { 'label': 'SANTIAGO_SACATEPEQUEZ', 'value': 'SANTIAGO_SACATEPEQUEZ' }, { 'label': 'SAN_BARTOLOME_MILPAS_ALTAS', 'value': 'SAN_BARTOLOME_MILPAS_ALTAS' }, { 'label': 'SAN_LUCAS_SACATEPEQUEZ', 'value': 'SAN_LUCAS_SACATEPEQUEZ' }, { 'label': 'SANTA_LUCIA_MILPAS_ALTAS', 'value': 'SANTA_LUCIA_MILPAS_ALTAS' }, { 'label': 'MAGDALENA_MILPAS_ALTAS', 'value': 'MAGDALENA_MILPAS_ALTAS' }, { 'label': 'SANTA_MARIA_DE_JESUS', 'value': 'SANTA_MARIA_DE_JESUS' }, { 'label': 'CIUDAD_VIEJA', 'value': 'CIUDAD_VIEJA' }, { 'label': 'SAN_MIGUEL_DUENAS', 'value': 'SAN_MIGUEL_DUENAS' }, { 'label': 'ALOTENANGO', 'value': 'ALOTENANGO' }, { 'label': 'SAN_ANTONIO_AGUAS_CALIENTES', 'value': 'SAN_ANTONIO_AGUAS_CALIENTES' }, { 'label': 'SANTA_CATARINA_BARAHONA', 'value': 'SANTA_CATARINA_BARAHONA' }, { 'label': 'CHIMALTENANGO', 'value': 'CHIMALTENANGO' }, { 'label': 'SAN_JOSE_POAQUIL', 'value': 'SAN_JOSE_POAQUIL' }, { 'label': 'SAN_MARTIN_JILOTEPEQUE', 'value': 'SAN_MARTIN_JILOTEPEQUE' }, { 'label': 'COMALAPA', 'value': 'COMALAPA' }, { 'label': 'SANTA_APOLONIA', 'value': 'SANTA_APOLONIA' }, { 'label': 'TECPAN_GUATEMALA', 'value': 'TECPAN_GUATEMALA' }, { 'label': 'PATZUN', 'value': 'PATZUN' }, { 'label': 'POCHUTA', 'value': 'POCHUTA' }, { 'label': 'PATZICIA', 'value': 'PATZICIA' }, { 'label': 'SANTA_CRUZ_BALANYA', 'value': 'SANTA_CRUZ_BALANYA' }, { 'label': 'ACATENANGO', 'value': 'ACATENANGO' }, { 'label': 'YEPOCAPA', 'value': 'YEPOCAPA' }, { 'label': 'SAN_ANDRES_ITZAPA', 'value': 'SAN_ANDRES_ITZAPA' }, { 'label': 'PARRAMOS', 'value': 'PARRAMOS' }, { 'label': 'ZARAGOZA', 'value': 'ZARAGOZA' }, { 'label': 'EL_TEJAR', 'value': 'EL_TEJAR' }, { 'label': 'ESCUINTLA', 'value': 'ESCUINTLA' }, { 'label': 'SANTA_LUCIA_COTZUMALGUAPA', 'value': 'SANTA_LUCIA_COTZUMALGUAPA' }, { 'label': 'LA_DEMOCRACIA', 'value': 'LA_DEMOCRACIA' }, { 'label': 'SIQUINALA', 'value': 'SIQUINALA' }, { 'label': 'MASAGUA', 'value': 'MASAGUA' }, { 'label': 'TIQUISATE', 'value': 'TIQUISATE' }, { 'label': 'LA_GOMERA', 'value': 'LA_GOMERA' }, { 'label': 'GUANAGAZAPA', 'value': 'GUANAGAZAPA' }, { 'label': 'SAN_JOSE', 'value': 'SAN_JOSE' }, { 'label': 'IZTAPA', 'value': 'IZTAPA' }, { 'label': 'PALIN', 'value': 'PALIN' }, { 'label': 'SAN_VICENTE_PACAYA', 'value': 'SAN_VICENTE_PACAYA' }, { 'label': 'NUEVA_CONCEPCION', 'value': 'NUEVA_CONCEPCION' }, { 'label': 'CUILAPA', 'value': 'CUILAPA' }, { 'label': 'BARBERENA', 'value': 'BARBERENA' }, { 'label': 'SANTA_ROSA_DE_LIMA', 'value': 'SANTA_ROSA_DE_LIMA' }, { 'label': 'CASILLAS', 'value': 'CASILLAS' }, { 'label': 'SAN_RAFAEL_LAS_FLORES', 'value': 'SAN_RAFAEL_LAS_FLORES' }, { 'label': 'ORATORIO', 'value': 'ORATORIO' }, { 'label': 'SAN_JUAN_TECUACO', 'value': 'SAN_JUAN_TECUACO' }, { 'label': 'CHIQUIMULILLA', 'value': 'CHIQUIMULILLA' }, { 'label': 'TAXISCO', 'value': 'TAXISCO' }, { 'label': 'SANTA_MARIA_IXHUATAN', 'value': 'SANTA_MARIA_IXHUATAN' }, { 'label': 'GUAZACAPAN', 'value': 'GUAZACAPAN' }, { 'label': 'SANTA_CRUZ_NARANJO', 'value': 'SANTA_CRUZ_NARANJO' }, { 'label': 'PUEBLO_NUEVO_VINAS', 'value': 'PUEBLO_NUEVO_VINAS' }, { 'label': 'NUEVA_SANTA_ROSA', 'value': 'NUEVA_SANTA_ROSA' }, { 'label': 'SOLOLA', 'value': 'SOLOLA' }, { 'label': 'SAN_JOSE_CHACAYA', 'value': 'SAN_JOSE_CHACAYA' }, { 'label': 'SANTA_MARIA_VISITACION', 'value': 'SANTA_MARIA_VISITACION' }, { 'label': 'SANTA_LUCIA_UTATLAN', 'value': 'SANTA_LUCIA_UTATLAN' }, { 'label': 'NAHUALA', 'value': 'NAHUALA' }, { 'label': 'SANTA_CATARINA_IXTAHUACAN', 'value': 'SANTA_CATARINA_IXTAHUACAN' }, { 'label': 'SANTA_CLARA_LA_LAGUNA', 'value': 'SANTA_CLARA_LA_LAGUNA' }, { 'label': 'CONCEPCION', 'value': 'CONCEPCION' }, { 'label': 'SAN_ANDRES_SEMETABAJ', 'value': 'SAN_ANDRES_SEMETABAJ' }, { 'label': 'PANAJACHEL', 'value': 'PANAJACHEL' }, { 'label': 'SANTA_CATARINA_PALOPO', 'value': 'SANTA_CATARINA_PALOPO' }, { 'label': 'SAN_ANTONIO_PALOPO', 'value': 'SAN_ANTONIO_PALOPO' }, { 'label': 'SAN_LUCAS_TOLIMAN', 'value': 'SAN_LUCAS_TOLIMAN' }, { 'label': 'SANTA_CRUZ_LA_LAGUNA', 'value': 'SANTA_CRUZ_LA_LAGUNA' }, { 'label': 'SAN_PABLO_LA_LAGUNA', 'value': 'SAN_PABLO_LA_LAGUNA' }, { 'label': 'SAN_MARCOS_LA_LAGUNA', 'value': 'SAN_MARCOS_LA_LAGUNA' }, { 'label': 'SAN_JUAN_LA_LAGUNA', 'value': 'SAN_JUAN_LA_LAGUNA' }, { 'label': 'SAN_PEDRO_LA_LAGUNA', 'value': 'SAN_PEDRO_LA_LAGUNA' }, { 'label': 'SANTIAGO_ATITLAN', 'value': 'SANTIAGO_ATITLAN' }, { 'label': 'TOTONICAPAN', 'value': 'TOTONICAPAN' }, { 'label': 'SAN_CRISTOBAL_TOTONICAPAN', 'value': 'SAN_CRISTOBAL_TOTONICAPAN' }, { 'label': 'SAN_FRANCISCO_EL_ALTO', 'value': 'SAN_FRANCISCO_EL_ALTO' }, { 'label': 'SAN_ANDRES_XECUL', 'value': 'SAN_ANDRES_XECUL' }, { 'label': 'MOMOSTENANGO', 'value': 'MOMOSTENANGO' }, { 'label': 'SANTA_MARIA_CHIQUIMULA', 'value': 'SANTA_MARIA_CHIQUIMULA' }, { 'label': 'SANTA_LUCIA_LA_REFORMA', 'value': 'SANTA_LUCIA_LA_REFORMA' }, { 'label': 'SAN_BARTOLO', 'value': 'SAN_BARTOLO' }, { 'label': 'QUETZALTENANGO', 'value': 'QUETZALTENANGO' }, { 'label': 'SALCAJA', 'value': 'SALCAJA' }, { 'label': 'OLINTEPEQUE', 'value': 'OLINTEPEQUE' }, { 'label': 'SAN_CARLOS_SIJA', 'value': 'SAN_CARLOS_SIJA' }, { 'label': 'SIBILIA', 'value': 'SIBILIA' }, { 'label': 'CABRICAN', 'value': 'CABRICAN' }, { 'label': 'CAJOLA', 'value': 'CAJOLA' }, { 'label': 'SAN_MIGUEL_SIGUILA', 'value': 'SAN_MIGUEL_SIGUILA' }, { 'label': 'OSTUNCALCO', 'value': 'OSTUNCALCO' }, { 'label': 'SAN_MATEO', 'value': 'SAN_MATEO' }, { 'label': 'CONCEPCION_CHIQUIRICHAPA', 'value': 'CONCEPCION_CHIQUIRICHAPA' }, { 'label': 'SAN_MARTIN_SACATEPEQUEZ', 'value': 'SAN_MARTIN_SACATEPEQUEZ' }, { 'label': 'ALMOLONGA', 'value': 'ALMOLONGA' }, { 'label': 'CANTEL', 'value': 'CANTEL' }, { 'label': 'HUITAN', 'value': 'HUITAN' }, { 'label': 'ZUNIL', 'value': 'ZUNIL' }, { 'label': 'COLOMBA', 'value': 'COLOMBA' }, { 'label': 'SAN_FRANCISCO_LA_UNION', 'value': 'SAN_FRANCISCO_LA_UNION' }, { 'label': 'EL_PALMAR', 'value': 'EL_PALMAR' }, { 'label': 'COATEPEQUE', 'value': 'COATEPEQUE' }, { 'label': 'GENOVA', 'value': 'GENOVA' }, { 'label': 'FLORES_COSTA_CUCA', 'value': 'FLORES_COSTA_CUCA' }, { 'label': 'LA_ESPERANZA', 'value': 'LA_ESPERANZA' }, { 'label': 'PALESTINA_DE_LOS_ALTOS', 'value': 'PALESTINA_DE_LOS_ALTOS' }, { 'label': 'MAZATENANGO', 'value': 'MAZATENANGO' }, { 'label': 'CUYOTENANGO', 'value': 'CUYOTENANGO' }, { 'label': 'SAN_FRANCISCO_ZAPOTITLAN', 'value': 'SAN_FRANCISCO_ZAPOTITLAN' }, { 'label': 'SAN_BERNARDINO', 'value': 'SAN_BERNARDINO' }, { 'label': 'SAN_JOSE_EL_IDOLO', 'value': 'SAN_JOSE_EL_IDOLO' }, { 'label': 'SANTO_DOMINGO_SUCHITEPEQUEZ', 'value': 'SANTO_DOMINGO_SUCHITEPEQUEZ' }, { 'label': 'SAN_LORENZO', 'value': 'SAN_LORENZO' }, { 'label': 'SAMAYAC', 'value': 'SAMAYAC' }, { 'label': 'SAN_PABLO_JOCOPILAS', 'value': 'SAN_PABLO_JOCOPILAS' }, { 'label': 'SAN_ANTONIO_SUCHITEPEQUEZ', 'value': 'SAN_ANTONIO_SUCHITEPEQUEZ' }, { 'label': 'SAN_MIGUEL_PANAN', 'value': 'SAN_MIGUEL_PANAN' }, { 'label': 'SAN_GABRIEL', 'value': 'SAN_GABRIEL' }, { 'label': 'CHICACAO', 'value': 'CHICACAO' }, { 'label': 'PATULUL', 'value': 'PATULUL' }, { 'label': 'SANTA_BARBARA', 'value': 'SANTA_BARBARA' }, { 'label': 'SAN_JUAN_BAUTISTA', 'value': 'SAN_JUAN_BAUTISTA' }, { 'label': 'SANTO_TOMAS_LA_UNION', 'value': 'SANTO_TOMAS_LA_UNION' }, { 'label': 'ZUNILITO', 'value': 'ZUNILITO' }, { 'label': 'PUEBLO_NUEVO', 'value': 'PUEBLO_NUEVO' }, { 'label': 'RIO_BRAVO', 'value': 'RIO_BRAVO' }, { 'label': 'SAN_JOSE_LA_MAQUINA', 'value': 'SAN_JOSE_LA_MAQUINA' }, { 'label': 'RETALHULEU', 'value': 'RETALHULEU' }, { 'label': 'SAN_SEBASTIAN', 'value': 'SAN_SEBASTIAN' }, { 'label': 'SANTA_CRUZ_MULUA', 'value': 'SANTA_CRUZ_MULUA' }, { 'label': 'SAN_MARTIN_ZAPOTITLAN', 'value': 'SAN_MARTIN_ZAPOTITLAN' }, { 'label': 'SAN_FELIPE', 'value': 'SAN_FELIPE' }, { 'label': 'SAN_ANDRES_VILLA_SECA', 'value': 'SAN_ANDRES_VILLA_SECA' }, { 'label': 'CHAMPERICO', 'value': 'CHAMPERICO' }, { 'label': 'NUEVO_SAN_CARLOS', 'value': 'NUEVO_SAN_CARLOS' }, { 'label': 'EL_ASINTAL', 'value': 'EL_ASINTAL' }, { 'label': 'SAN_MARCOS', 'value': 'SAN_MARCOS' }, { 'label': 'SAN_PEDRO_SACATEPEQUEZ', 'value': 'SAN_PEDRO_SACATEPEQUEZ' }, { 'label': 'SAN_ANTONIO_SACATEPEQUEZ', 'value': 'SAN_ANTONIO_SACATEPEQUEZ' }, { 'label': 'COMITANCILLO', 'value': 'COMITANCILLO' }, { 'label': 'SAN_MIGUEL_IXTAHUACAN', 'value': 'SAN_MIGUEL_IXTAHUACAN' }, { 'label': 'CONCEPCION_TUTUAPA', 'value': 'CONCEPCION_TUTUAPA' }, { 'label': 'TACANA', 'value': 'TACANA' }, { 'label': 'SIBINAL', 'value': 'SIBINAL' }, { 'label': 'TAJUMULCO', 'value': 'TAJUMULCO' }, { 'label': 'TEJUTLA', 'value': 'TEJUTLA' }, { 'label': 'SAN_RAFAEL_PIE_DE_LA_CUESTA', 'value': 'SAN_RAFAEL_PIE_DE_LA_CUESTA' }, { 'label': 'NUEVO_PROGRESO', 'value': 'NUEVO_PROGRESO' }, { 'label': 'EL_TUMBADOR', 'value': 'EL_TUMBADOR' }, { 'label': 'EL_RODEO', 'value': 'EL_RODEO' }, { 'label': 'MALACATAN', 'value': 'MALACATAN' }, { 'label': 'CATARINA', 'value': 'CATARINA' }, { 'label': 'AYUTLA', 'value': 'AYUTLA' }, { 'label': 'OCOS', 'value': 'OCOS' }, { 'label': 'SAN_PABLO', 'value': 'SAN_PABLO' }, { 'label': 'EL_QUETZAL', 'value': 'EL_QUETZAL' }, { 'label': 'LA_REFORMA', 'value': 'LA_REFORMA' }, { 'label': 'PAJAPITA', 'value': 'PAJAPITA' }, { 'label': 'IXCHIGUAN', 'value': 'IXCHIGUAN' }, { 'label': 'SAN_JOSE_OJETENAN', 'value': 'SAN_JOSE_OJETENAN' }, { 'label': 'SAN_CRISTOBAL_CUCHO', 'value': 'SAN_CRISTOBAL_CUCHO' }, { 'label': 'SIPACAPA', 'value': 'SIPACAPA' }, { 'label': 'ESQUIPULAS_PALO_GORDO', 'value': 'ESQUIPULAS_PALO_GORDO' }, { 'label': 'RIO_BLANCO', 'value': 'RIO_BLANCO' }, { 'label': 'SAN_LORENZO', 'value': 'SAN_LORENZO' }, { 'label': 'LA_BLANCA', 'value': 'LA_BLANCA' }, { 'label': 'HUEHUETENANGO', 'value': 'HUEHUETENANGO' }, { 'label': 'CHIANTLA', 'value': 'CHIANTLA' }, { 'label': 'MALACATANCITO', 'value': 'MALACATANCITO' }, { 'label': 'CUILCO', 'value': 'CUILCO' }, { 'label': 'NENTON', 'value': 'NENTON' }, { 'label': 'SAN_PEDRO_NECTA', 'value': 'SAN_PEDRO_NECTA' }, { 'label': 'JACALTENANGO', 'value': 'JACALTENANGO' }, { 'label': 'SOLOMA', 'value': 'SOLOMA' }, { 'label': 'IXTAHUACAN', 'value': 'IXTAHUACAN' }, { 'label': 'SANTA_BARBARA', 'value': 'SANTA_BARBARA' }, { 'label': 'LA_LIBERTAD', 'value': 'LA_LIBERTAD' }, { 'label': 'LA_DEMOCRACIA', 'value': 'LA_DEMOCRACIA' }, { 'label': 'SAN_MIGUEL_ACATAN', 'value': 'SAN_MIGUEL_ACATAN' }, { 'label': 'SAN_RAFAEL_LA_INDEPENDENCIA', 'value': 'SAN_RAFAEL_LA_INDEPENDENCIA' }, { 'label': 'TODOS_SANTOS_CUCHUMATAN', 'value': 'TODOS_SANTOS_CUCHUMATAN' }, { 'label': 'SAN_JUAN_ATITAN', 'value': 'SAN_JUAN_ATITAN' }, { 'label': 'SANTA_EULALIA', 'value': 'SANTA_EULALIA' }, { 'label': 'SAN_MATEO_IXTATAN', 'value': 'SAN_MATEO_IXTATAN' }, { 'label': 'COLOTENANGO', 'value': 'COLOTENANGO' }, { 'label': 'SAN_SEBASTIAN_HUEHUETENANGO', 'value': 'SAN_SEBASTIAN_HUEHUETENANGO' }, { 'label': 'TECTITAN', 'value': 'TECTITAN' }, { 'label': 'CONCEPCION_HUISTA', 'value': 'CONCEPCION_HUISTA' }, { 'label': 'SAN_JUAN_IXCOY', 'value': 'SAN_JUAN_IXCOY' }, { 'label': 'SAN_ANTONIO_HUISTA', 'value': 'SAN_ANTONIO_HUISTA' }, { 'label': 'SAN_SEBASTIAN_COATAN', 'value': 'SAN_SEBASTIAN_COATAN' }, { 'label': 'BARILLAS', 'value': 'BARILLAS' }, { 'label': 'AGUACATAN', 'value': 'AGUACATAN' }, { 'label': 'SAN_RAFAEL_PETZAL', 'value': 'SAN_RAFAEL_PETZAL' }, { 'label': 'SAN_GASPAR_IXCHIL', 'value': 'SAN_GASPAR_IXCHIL' }, { 'label': 'SANTIAGO_CHIMALTENANGO', 'value': 'SANTIAGO_CHIMALTENANGO' }, { 'label': 'SANTA_ANA_HUISTA', 'value': 'SANTA_ANA_HUISTA' }, { 'label': 'UNION_CANTINIL', 'value': 'UNION_CANTINIL' }, { 'label': 'SANTA_CRUZ_DEL_QUICHE', 'value': 'SANTA_CRUZ_DEL_QUICHE' }, { 'label': 'CHICHE', 'value': 'CHICHE' }, { 'label': 'CHINIQUE', 'value': 'CHINIQUE' }, { 'label': 'ZACUALPA', 'value': 'ZACUALPA' }, { 'label': 'CHAJUL', 'value': 'CHAJUL' }, { 'label': 'CHICHICASTENANGO', 'value': 'CHICHICASTENANGO' }, { 'label': 'PATZITE', 'value': 'PATZITE' }, { 'label': 'SAN_ANTONIO_ILOTENANGO', 'value': 'SAN_ANTONIO_ILOTENANGO' }, { 'label': 'SAN_PEDRO_JOCOPILAS', 'value': 'SAN_PEDRO_JOCOPILAS' }, { 'label': 'CUNEN', 'value': 'CUNEN' }, { 'label': 'SAN_JUAN_COTZAL', 'value': 'SAN_JUAN_COTZAL' }, { 'label': 'JOYABAJ', 'value': 'JOYABAJ' }, { 'label': 'NEBAJ', 'value': 'NEBAJ' }, { 'label': 'SAN_ANDRES_SAJCABAJA', 'value': 'SAN_ANDRES_SAJCABAJA' }, { 'label': 'USPANTAN', 'value': 'USPANTAN' }, { 'label': 'SACAPULAS', 'value': 'SACAPULAS' }, { 'label': 'SAN_BARTOLOME_JOCOTENANGO', 'value': 'SAN_BARTOLOME_JOCOTENANGO' }, { 'label': 'CANILLA', 'value': 'CANILLA' }, { 'label': 'CHICAMAN', 'value': 'CHICAMAN' }, { 'label': 'IXCAN', 'value': 'IXCAN' }, { 'label': 'PACHALUM', 'value': 'PACHALUM' }, { 'label': 'SALAMA', 'value': 'SALAMA' }, { 'label': 'SAN_MIGUEL_CHICAJ', 'value': 'SAN_MIGUEL_CHICAJ' }, { 'label': 'RABINAL', 'value': 'RABINAL' }, { 'label': 'CUBULCO', 'value': 'CUBULCO' }, { 'label': 'GRANADOS', 'value': 'GRANADOS' }, { 'label': 'EL_CHOL', 'value': 'EL_CHOL' }, { 'label': 'SAN_JERONIMO', 'value': 'SAN_JERONIMO' }, { 'label': 'PURULHA', 'value': 'PURULHA' }, { 'label': 'COBAN', 'value': 'COBAN' }, { 'label': 'SANTA_CRUZ_VERAPAZ', 'value': 'SANTA_CRUZ_VERAPAZ' }, { 'label': 'SAN_CRISTOBAL_VERAPAZ', 'value': 'SAN_CRISTOBAL_VERAPAZ' }, { 'label': 'TACTIC', 'value': 'TACTIC' }, { 'label': 'TAMAHU', 'value': 'TAMAHU' }, { 'label': 'TUCURU', 'value': 'TUCURU' }, { 'label': 'PANZOS', 'value': 'PANZOS' }, { 'label': 'SENAHU', 'value': 'SENAHU' }, { 'label': 'SAN_PEDRO_CARCHA', 'value': 'SAN_PEDRO_CARCHA' }, { 'label': 'SAN_JUAN_CHAMELCO', 'value': 'SAN_JUAN_CHAMELCO' }, { 'label': 'LANQUIN', 'value': 'LANQUIN' }, { 'label': 'CAHABON', 'value': 'CAHABON' }, { 'label': 'CHISEC', 'value': 'CHISEC' }, { 'label': 'CHAHAL', 'value': 'CHAHAL' }, { 'label': 'FRAY_BARTOLOME_DE_LAS_CASAS', 'value': 'FRAY_BARTOLOME_DE_LAS_CASAS' }, { 'label': 'SANTA_CATALINA_LA_TINTA', 'value': 'SANTA_CATALINA_LA_TINTA' }, { 'label': 'RAXRUHA', 'value': 'RAXRUHA' }, { 'label': 'FLORES', 'value': 'FLORES' }, { 'label': 'SAN_JOSE', 'value': 'SAN_JOSE' }, { 'label': 'SAN_BENITO', 'value': 'SAN_BENITO' }, { 'label': 'SAN_ANDRES', 'value': 'SAN_ANDRES' }, { 'label': 'LA_LIBERTAD', 'value': 'LA_LIBERTAD' }, { 'label': 'SAN_FRANCISCO', 'value': 'SAN_FRANCISCO' }, { 'label': 'SANTA_ANA', 'value': 'SANTA_ANA' }, { 'label': 'DOLORES', 'value': 'DOLORES' }, { 'label': 'SAN_LUIS', 'value': 'SAN_LUIS' }, { 'label': 'SAYAXCHE', 'value': 'SAYAXCHE' }, { 'label': 'MELCHOR_DE_MENCOS', 'value': 'MELCHOR_DE_MENCOS' }, { 'label': 'POPTUN', 'value': 'POPTUN' }, { 'label': 'LAS_CRUCES', 'value': 'LAS_CRUCES' }, { 'label': 'EL_CHAL', 'value': 'EL_CHAL' }, { 'label': 'PUERTO_BARRIOS', 'value': 'PUERTO_BARRIOS' }, { 'label': 'LIVINGSTON', 'value': 'LIVINGSTON' }, { 'label': 'EL_ESTOR', 'value': 'EL_ESTOR' }, { 'label': 'MORALES', 'value': 'MORALES' }, { 'label': 'LOS_AMATES', 'value': 'LOS_AMATES' }, { 'label': 'ZACAPA', 'value': 'ZACAPA' }, { 'label': 'ESTANZUELA', 'value': 'ESTANZUELA' }, { 'label': 'RIO_HONDO', 'value': 'RIO_HONDO' }, { 'label': 'GUALAN', 'value': 'GUALAN' }, { 'label': 'TECULUTAN', 'value': 'TECULUTAN' }, { 'label': 'USUMATLAN', 'value': 'USUMATLAN' }, { 'label': 'CABANAS', 'value': 'CABANAS' }, { 'label': 'SAN_DIEGO', 'value': 'SAN_DIEGO' }, { 'label': 'LA_UNION', 'value': 'LA_UNION' }, { 'label': 'HUITE', 'value': 'HUITE' }, { 'label': 'SAN_JORGE', 'value': 'SAN_JORGE' }, { 'label': 'CHIQUIMULA', 'value': 'CHIQUIMULA' }, { 'label': 'SAN_JOSE_LA_ARADA', 'value': 'SAN_JOSE_LA_ARADA' }, { 'label': 'SAN_JUAN_ERMITA', 'value': 'SAN_JUAN_ERMITA' }, { 'label': 'JOCOTAN', 'value': 'JOCOTAN' }, { 'label': 'CAMOTAN', 'value': 'CAMOTAN' }, { 'label': 'OLOPA', 'value': 'OLOPA' }, { 'label': 'ESQUIPULAS', 'value': 'ESQUIPULAS' }, { 'label': 'CONCEPCION_LAS_MINAS', 'value': 'CONCEPCION_LAS_MINAS' }, { 'label': 'QUETZALTEPEQUE', 'value': 'QUETZALTEPEQUE' }, { 'label': 'SAN_JACINTO', 'value': 'SAN_JACINTO' }, { 'label': 'IPALA', 'value': 'IPALA' }, { 'label': 'JALAPA', 'value': 'JALAPA' }, { 'label': 'SAN_PEDRO_PINULA', 'value': 'SAN_PEDRO_PINULA' }, { 'label': 'SAN_LUIS_JILOTEPEQUE', 'value': 'SAN_LUIS_JILOTEPEQUE' }, { 'label': 'SAN_MANUEL_CHAPARRON', 'value': 'SAN_MANUEL_CHAPARRON' }, { 'label': 'SAN_CARLOS_ALZATATE', 'value': 'SAN_CARLOS_ALZATATE' }, { 'label': 'MONJAS', 'value': 'MONJAS' }, { 'label': 'MATAQUESCUINTLA', 'value': 'MATAQUESCUINTLA' }, { 'label': 'JUTIAPA', 'value': 'JUTIAPA' }, { 'label': 'EL_PROGRESO', 'value': 'EL_PROGRESO' }, { 'label': 'SANTA_CATARINA_MITA', 'value': 'SANTA_CATARINA_MITA' }, { 'label': 'AGUA_BLANCA', 'value': 'AGUA_BLANCA' }, { 'label': 'ASUNCION_MITA', 'value': 'ASUNCION_MITA' }, { 'label': 'YUPILTEPEQUE', 'value': 'YUPILTEPEQUE' }, { 'label': 'ATESCATEMPA', 'value': 'ATESCATEMPA' }, { 'label': 'JEREZ', 'value': 'JEREZ' }, { 'label': 'EL_ADELANTO', 'value': 'EL_ADELANTO' }, { 'label': 'ZAPOTITLAN', 'value': 'ZAPOTITLAN' }, { 'label': 'COMAPA', 'value': 'COMAPA' }, { 'label': 'JALPATAGUA', 'value': 'JALPATAGUA' }, { 'label': 'CONGUACO', 'value': 'CONGUACO' }, { 'label': 'MOYUTA', 'value': 'MOYUTA' }, { 'label': 'PASACO', 'value': 'PASACO' }, { 'label': 'SAN_JOSE_ACATEMPA', 'value': 'SAN_JOSE_ACATEMPA' }, { 'label': 'QUESADA', 'value': 'QUESADA' }],
    municipios: [{ 'name': 'ALTA_VERAPAZ', 'minicipios': [{ 'label': 'COBAN', 'value': 'COBAN' }, { 'label': 'SANTA_CRUZ_VERAPAZ', 'value': 'SANTA_CRUZ_VERAPAZ' }, { 'label': 'SAN_CRISTOBAL_VERAPAZ', 'value': 'SAN_CRISTOBAL_VERAPAZ' }, { 'label': 'TACTIC', 'value': 'TACTIC' }, { 'label': 'TAMAHU', 'value': 'TAMAHU' }, { 'label': 'TUCURU', 'value': 'TUCURU' }, { 'label': 'PANZOS', 'value': 'PANZOS' }, { 'label': 'SENAHU', 'value': 'SENAHU' }, { 'label': 'SAN_PEDRO_CARCHA', 'value': 'SAN_PEDRO_CARCHA' }, { 'label': 'SAN_JUAN_CHAMELCO', 'value': 'SAN_JUAN_CHAMELCO' }, { 'label': 'LANQUIN', 'value': 'LANQUIN' }, { 'label': 'CAHABON', 'value': 'CAHABON' }, { 'label': 'CHISEC', 'value': 'CHISEC' }, { 'label': 'CHAHAL', 'value': 'CHAHAL' }, { 'label': 'FRAY_BARTOLOME_DE_LAS_CASAS', 'value': 'FRAY_BARTOLOME_DE_LAS_CASAS' }, { 'label': 'SANTA_CATALINA_LA_TINTA', 'value': 'SANTA_CATALINA_LA_TINTA' }, { 'label': 'RAXRUHA', 'value': 'RAXRUHA' }] }, { 'name': 'BAJA_VERAPAZ', 'minicipios': [{ 'label': 'SALAMA', 'value': 'SALAMA' }, { 'label': 'SAN_MIGUEL_CHICAJ', 'value': 'SAN_MIGUEL_CHICAJ' }, { 'label': 'RABINAL', 'value': 'RABINAL' }, { 'label': 'CUBULCO', 'value': 'CUBULCO' }, { 'label': 'GRANADOS', 'value': 'GRANADOS' }, { 'label': 'EL_CHOL', 'value': 'EL_CHOL' }, { 'label': 'SAN_JERONIMO', 'value': 'SAN_JERONIMO' }, { 'label': 'PURULHA', 'value': 'PURULHA' }] }, { 'name': 'CHIMALTENANGO', 'minicipios': [{ 'label': 'CHIMALTENANGO', 'value': 'CHIMALTENANGO' }, { 'label': 'SAN_JOSE_POAQUIL', 'value': 'SAN_JOSE_POAQUIL' }, { 'label': 'SAN_MARTIN_JILOTEPEQUE', 'value': 'SAN_MARTIN_JILOTEPEQUE' }, { 'label': 'COMALAPA', 'value': 'COMALAPA' }, { 'label': 'SANTA_APOLONIA', 'value': 'SANTA_APOLONIA' }, { 'label': 'TECPAN_GUATEMALA', 'value': 'TECPAN_GUATEMALA' }, { 'label': 'PATZUN', 'value': 'PATZUN' }, { 'label': 'POCHUTA', 'value': 'POCHUTA' }, { 'label': 'PATZICIA', 'value': 'PATZICIA' }, { 'label': 'SANTA_CRUZ_BALANYA', 'value': 'SANTA_CRUZ_BALANYA' }, { 'label': 'ACATENANGO', 'value': 'ACATENANGO' }, { 'label': 'YEPOCAPA', 'value': 'YEPOCAPA' }, { 'label': 'SAN_ANDRES_ITZAPA', 'value': 'SAN_ANDRES_ITZAPA' }, { 'label': 'PARRAMOS', 'value': 'PARRAMOS' }, { 'label': 'ZARAGOZA', 'value': 'ZARAGOZA' }, { 'label': 'EL_TEJAR', 'value': 'EL_TEJAR' }] }, { 'name': 'CHIQUIMULA', 'minicipios': [{ 'label': 'CHIQUIMULA', 'value': 'CHIQUIMULA' }, { 'label': 'SAN_JOSE_LA_ARADA', 'value': 'SAN_JOSE_LA_ARADA' }, { 'label': 'SAN_JUAN_ERMITA', 'value': 'SAN_JUAN_ERMITA' }, { 'label': 'JOCOTAN', 'value': 'JOCOTAN' }, { 'label': 'CAMOTAN', 'value': 'CAMOTAN' }, { 'label': 'OLOPA', 'value': 'OLOPA' }, { 'label': 'ESQUIPULAS', 'value': 'ESQUIPULAS' }, { 'label': 'CONCEPCION_LAS_MINAS', 'value': 'CONCEPCION_LAS_MINAS' }, { 'label': 'QUETZALTEPEQUE', 'value': 'QUETZALTEPEQUE' }, { 'label': 'SAN_JACINTO', 'value': 'SAN_JACINTO' }, { 'label': 'IPALA', 'value': 'IPALA' }] }, { 'name': 'GUATEMALA', 'minicipios': [{ 'label': 'GUATEMALA', 'value': 'GUATEMALA' }, { 'label': 'SANTA_CATARINA_PINULA', 'value': 'SANTA_CATARINA_PINULA' }, { 'label': 'SAN_JOSE_PINULA', 'value': 'SAN_JOSE_PINULA' }, { 'label': 'SAN_JOSE_DEL_GOLFO', 'value': 'SAN_JOSE_DEL_GOLFO' }, { 'label': 'PALENCIA', 'value': 'PALENCIA' }, { 'label': 'CHINAUTLA', 'value': 'CHINAUTLA' }, { 'label': 'SAN_PEDRO_AYAMPUC', 'value': 'SAN_PEDRO_AYAMPUC' }, { 'label': 'MIXCO', 'value': 'MIXCO' }, { 'label': 'SAN_PEDRO_SACATEPEQUEZ', 'value': 'SAN_PEDRO_SACATEPEQUEZ' }, { 'label': 'SAN_JUAN_SACATEPEQUEZ', 'value': 'SAN_JUAN_SACATEPEQUEZ' }, { 'label': 'SAN_RAYMUNDO', 'value': 'SAN_RAYMUNDO' }, { 'label': 'CHUARRANCHO', 'value': 'CHUARRANCHO' }, { 'label': 'FRAIJANES', 'value': 'FRAIJANES' }, { 'label': 'AMATITLAN', 'value': 'AMATITLAN' }, { 'label': 'VILLA_NUEVA', 'value': 'VILLA_NUEVA' }, { 'label': 'VILLA_CANALES', 'value': 'VILLA_CANALES' }, { 'label': 'PETAPA', 'value': 'PETAPA' }] }, { 'name': 'EL_PROGRESO', 'minicipios': [{ 'label': 'GUASTATOYA', 'value': 'GUASTATOYA' }, { 'label': 'MORAZAN', 'value': 'MORAZAN' }, { 'label': 'SAN_AGUSTIN_ACASAGUASTLAN', 'value': 'SAN_AGUSTIN_ACASAGUASTLAN' }, { 'label': 'SAN_CRISTOBAL_ACASAGUASTLAN', 'value': 'SAN_CRISTOBAL_ACASAGUASTLAN' }, { 'label': 'EL_JICARO', 'value': 'EL_JICARO' }, { 'label': 'SANSARE', 'value': 'SANSARE' }, { 'label': 'SANARATE', 'value': 'SANARATE' }, { 'label': 'SAN_ANTONIO_LA_PAZ', 'value': 'SAN_ANTONIO_LA_PAZ' }] }, { 'name': 'ESCUINTLA', 'minicipios': [{ 'label': 'ESCUINTLA', 'value': 'ESCUINTLA' }, { 'label': 'SANTA_LUCIA_COTZUMALGUAPA', 'value': 'SANTA_LUCIA_COTZUMALGUAPA' }, { 'label': 'LA_DEMOCRACIA', 'value': 'LA_DEMOCRACIA' }, { 'label': 'SIQUINALA', 'value': 'SIQUINALA' }, { 'label': 'MASAGUA', 'value': 'MASAGUA' }, { 'label': 'TIQUISATE', 'value': 'TIQUISATE' }, { 'label': 'LA_GOMERA', 'value': 'LA_GOMERA' }, { 'label': 'GUANAGAZAPA', 'value': 'GUANAGAZAPA' }, { 'label': 'SAN_JOSE', 'value': 'SAN_JOSE' }, { 'label': 'IZTAPA', 'value': 'IZTAPA' }, { 'label': 'PALIN', 'value': 'PALIN' }, { 'label': 'SAN_VICENTE_PACAYA', 'value': 'SAN_VICENTE_PACAYA' }, { 'label': 'NUEVA_CONCEPCION', 'value': 'NUEVA_CONCEPCION' }] }, { 'name': 'HUEHUETENANGO', 'minicipios': [{ 'label': 'HUEHUETENANGO', 'value': 'HUEHUETENANGO' }, { 'label': 'CHIANTLA', 'value': 'CHIANTLA' }, { 'label': 'MALACATANCITO', 'value': 'MALACATANCITO' }, { 'label': 'CUILCO', 'value': 'CUILCO' }, { 'label': 'NENTON', 'value': 'NENTON' }, { 'label': 'SAN_PEDRO_NECTA', 'value': 'SAN_PEDRO_NECTA' }, { 'label': 'JACALTENANGO', 'value': 'JACALTENANGO' }, { 'label': 'SOLOMA', 'value': 'SOLOMA' }, { 'label': 'IXTAHUACAN', 'value': 'IXTAHUACAN' }, { 'label': 'SANTA_BARBARA', 'value': 'SANTA_BARBARA' }, { 'label': 'LA_LIBERTAD', 'value': 'LA_LIBERTAD' }, { 'label': 'LA_DEMOCRACIA', 'value': 'LA_DEMOCRACIA' }, { 'label': 'SAN_MIGUEL_ACATAN', 'value': 'SAN_MIGUEL_ACATAN' }, { 'label': 'SAN_RAFAEL_LA_INDEPENDENCIA', 'value': 'SAN_RAFAEL_LA_INDEPENDENCIA' }, { 'label': 'TODOS_SANTOS_CUCHUMATAN', 'value': 'TODOS_SANTOS_CUCHUMATAN' }, { 'label': 'SAN_JUAN_ATITAN', 'value': 'SAN_JUAN_ATITAN' }, { 'label': 'SANTA_EULALIA', 'value': 'SANTA_EULALIA' }, { 'label': 'SAN_MATEO_IXTATAN', 'value': 'SAN_MATEO_IXTATAN' }, { 'label': 'COLOTENANGO', 'value': 'COLOTENANGO' }, { 'label': 'SAN_SEBASTIAN_HUEHUETENANGO', 'value': 'SAN_SEBASTIAN_HUEHUETENANGO' }, { 'label': 'TECTITAN', 'value': 'TECTITAN' }, { 'label': 'CONCEPCION_HUISTA', 'value': 'CONCEPCION_HUISTA' }, { 'label': 'SAN_JUAN_IXCOY', 'value': 'SAN_JUAN_IXCOY' }, { 'label': 'SAN_ANTONIO_HUISTA', 'value': 'SAN_ANTONIO_HUISTA' }, { 'label': 'SAN_SEBASTIAN_COATAN', 'value': 'SAN_SEBASTIAN_COATAN' }, { 'label': 'BARILLAS', 'value': 'BARILLAS' }, { 'label': 'AGUACATAN', 'value': 'AGUACATAN' }, { 'label': 'SAN_RAFAEL_PETZAL', 'value': 'SAN_RAFAEL_PETZAL' }, { 'label': 'SAN_GASPAR_IXCHIL', 'value': 'SAN_GASPAR_IXCHIL' }, { 'label': 'SANTIAGO_CHIMALTENANGO', 'value': 'SANTIAGO_CHIMALTENANGO' }, { 'label': 'SANTA_ANA_HUISTA', 'value': 'SANTA_ANA_HUISTA' }, { 'label': 'UNION_CANTINIL', 'value': 'UNION_CANTINIL' }] }, { 'name': 'IZABAL', 'minicipios': [{ 'label': 'PUERTO_BARRIOS', 'value': 'PUERTO_BARRIOS' }, { 'label': 'LIVINGSTON', 'value': 'LIVINGSTON' }, { 'label': 'EL_ESTOR', 'value': 'EL_ESTOR' }, { 'label': 'MORALES', 'value': 'MORALES' }, { 'label': 'LOS_AMATES', 'value': 'LOS_AMATES' }] }, { 'name': 'JALAPA', 'minicipios': [{ 'label': 'JALAPA', 'value': 'JALAPA' }, { 'label': 'SAN_PEDRO_PINULA', 'value': 'SAN_PEDRO_PINULA' }, { 'label': 'SAN_LUIS_JILOTEPEQUE', 'value': 'SAN_LUIS_JILOTEPEQUE' }, { 'label': 'SAN_MANUEL_CHAPARRON', 'value': 'SAN_MANUEL_CHAPARRON' }, { 'label': 'SAN_CARLOS_ALZATATE', 'value': 'SAN_CARLOS_ALZATATE' }, { 'label': 'MONJAS', 'value': 'MONJAS' }, { 'label': 'MATAQUESCUINTLA', 'value': 'MATAQUESCUINTLA' }] }, { 'name': 'JUTIAPA', 'minicipios': [{ 'label': 'JUTIAPA', 'value': 'JUTIAPA' }, { 'label': 'EL_PROGRESO', 'value': 'EL_PROGRESO' }, { 'label': 'SANTA_CATARINA_MITA', 'value': 'SANTA_CATARINA_MITA' }, { 'label': 'AGUA_BLANCA', 'value': 'AGUA_BLANCA' }, { 'label': 'ASUNCION_MITA', 'value': 'ASUNCION_MITA' }, { 'label': 'YUPILTEPEQUE', 'value': 'YUPILTEPEQUE' }, { 'label': 'ATESCATEMPA', 'value': 'ATESCATEMPA' }, { 'label': 'JEREZ', 'value': 'JEREZ' }, { 'label': 'EL_ADELANTO', 'value': 'EL_ADELANTO' }, { 'label': 'ZAPOTITLAN', 'value': 'ZAPOTITLAN' }, { 'label': 'COMAPA', 'value': 'COMAPA' }, { 'label': 'JALPATAGUA', 'value': 'JALPATAGUA' }, { 'label': 'CONGUACO', 'value': 'CONGUACO' }, { 'label': 'MOYUTA', 'value': 'MOYUTA' }, { 'label': 'PASACO', 'value': 'PASACO' }, { 'label': 'SAN_JOSE_ACATEMPA', 'value': 'SAN_JOSE_ACATEMPA' }, { 'label': 'QUESADA', 'value': 'QUESADA' }] }, { 'name': 'PETEN', 'minicipios': [{ 'label': 'FLORES', 'value': 'FLORES' }, { 'label': 'SAN_JOSE', 'value': 'SAN_JOSE' }, { 'label': 'SAN_BENITO', 'value': 'SAN_BENITO' }, { 'label': 'SAN_ANDRES', 'value': 'SAN_ANDRES' }, { 'label': 'LA_LIBERTAD', 'value': 'LA_LIBERTAD' }, { 'label': 'SAN_FRANCISCO', 'value': 'SAN_FRANCISCO' }, { 'label': 'SANTA_ANA', 'value': 'SANTA_ANA' }, { 'label': 'DOLORES', 'value': 'DOLORES' }, { 'label': 'SAN_LUIS', 'value': 'SAN_LUIS' }, { 'label': 'SAYAXCHE', 'value': 'SAYAXCHE' }, { 'label': 'MELCHOR_DE_MENCOS', 'value': 'MELCHOR_DE_MENCOS' }, { 'label': 'POPTUN', 'value': 'POPTUN' }, { 'label': 'LAS_CRUCES', 'value': 'LAS_CRUCES' }, { 'label': 'EL_CHAL', 'value': 'EL_CHAL' }] }, { 'name': 'QUETZALTENANGO', 'minicipios': [{ 'label': 'QUETZALTENANGO', 'value': 'QUETZALTENANGO' }, { 'label': 'SALCAJA', 'value': 'SALCAJA' }, { 'label': 'OLINTEPEQUE', 'value': 'OLINTEPEQUE' }, { 'label': 'SAN_CARLOS_SIJA', 'value': 'SAN_CARLOS_SIJA' }, { 'label': 'SIBILIA', 'value': 'SIBILIA' }, { 'label': 'CABRICAN', 'value': 'CABRICAN' }, { 'label': 'CAJOLA', 'value': 'CAJOLA' }, { 'label': 'SAN_MIGUEL_SIGUILA', 'value': 'SAN_MIGUEL_SIGUILA' }, { 'label': 'OSTUNCALCO', 'value': 'OSTUNCALCO' }, { 'label': 'SAN_MATEO', 'value': 'SAN_MATEO' }, { 'label': 'CONCEPCION_CHIQUIRICHAPA', 'value': 'CONCEPCION_CHIQUIRICHAPA' }, { 'label': 'SAN_MARTIN_SACATEPEQUEZ', 'value': 'SAN_MARTIN_SACATEPEQUEZ' }, { 'label': 'ALMOLONGA', 'value': 'ALMOLONGA' }, { 'label': 'CANTEL', 'value': 'CANTEL' }, { 'label': 'HUITAN', 'value': 'HUITAN' }, { 'label': 'ZUNIL', 'value': 'ZUNIL' }, { 'label': 'COLOMBA', 'value': 'COLOMBA' }, { 'label': 'SAN_FRANCISCO_LA_UNION', 'value': 'SAN_FRANCISCO_LA_UNION' }, { 'label': 'EL_PALMAR', 'value': 'EL_PALMAR' }, { 'label': 'COATEPEQUE', 'value': 'COATEPEQUE' }, { 'label': 'GENOVA', 'value': 'GENOVA' }, { 'label': 'FLORES_COSTA_CUCA', 'value': 'FLORES_COSTA_CUCA' }, { 'label': 'LA_ESPERANZA', 'value': 'LA_ESPERANZA' }, { 'label': 'PALESTINA_DE_LOS_ALTOS', 'value': 'PALESTINA_DE_LOS_ALTOS' }] }, { 'name': 'QUICHE', 'minicipios': [{ 'label': 'SANTA_CRUZ_DEL_QUICHE', 'value': 'SANTA_CRUZ_DEL_QUICHE' }, { 'label': 'CHICHE', 'value': 'CHICHE' }, { 'label': 'CHINIQUE', 'value': 'CHINIQUE' }, { 'label': 'ZACUALPA', 'value': 'ZACUALPA' }, { 'label': 'CHAJUL', 'value': 'CHAJUL' }, { 'label': 'CHICHICASTENANGO', 'value': 'CHICHICASTENANGO' }, { 'label': 'PATZITE', 'value': 'PATZITE' }, { 'label': 'SAN_ANTONIO_ILOTENANGO', 'value': 'SAN_ANTONIO_ILOTENANGO' }, { 'label': 'SAN_PEDRO_JOCOPILAS', 'value': 'SAN_PEDRO_JOCOPILAS' }, { 'label': 'CUNEN', 'value': 'CUNEN' }, { 'label': 'SAN_JUAN_COTZAL', 'value': 'SAN_JUAN_COTZAL' }, { 'label': 'JOYABAJ', 'value': 'JOYABAJ' }, { 'label': 'NEBAJ', 'value': 'NEBAJ' }, { 'label': 'SAN_ANDRES_SAJCABAJA', 'value': 'SAN_ANDRES_SAJCABAJA' }, { 'label': 'USPANTAN', 'value': 'USPANTAN' }, { 'label': 'SACAPULAS', 'value': 'SACAPULAS' }, { 'label': 'SAN_BARTOLOME_JOCOTENANGO', 'value': 'SAN_BARTOLOME_JOCOTENANGO' }, { 'label': 'CANILLA', 'value': 'CANILLA' }, { 'label': 'CHICAMAN', 'value': 'CHICAMAN' }, { 'label': 'IXCAN', 'value': 'IXCAN' }, { 'label': 'PACHALUM', 'value': 'PACHALUM' }] }, { 'name': 'RETALHULEU', 'minicipios': [{ 'label': 'RETALHULEU', 'value': 'RETALHULEU' }, { 'label': 'SAN_SEBASTIAN', 'value': 'SAN_SEBASTIAN' }, { 'label': 'SANTA_CRUZ_MULUA', 'value': 'SANTA_CRUZ_MULUA' }, { 'label': 'SAN_MARTIN_ZAPOTITLAN', 'value': 'SAN_MARTIN_ZAPOTITLAN' }, { 'label': 'SAN_FELIPE', 'value': 'SAN_FELIPE' }, { 'label': 'SAN_ANDRES_VILLA_SECA', 'value': 'SAN_ANDRES_VILLA_SECA' }, { 'label': 'CHAMPERICO', 'value': 'CHAMPERICO' }, { 'label': 'NUEVO_SAN_CARLOS', 'value': 'NUEVO_SAN_CARLOS' }, { 'label': 'EL_ASINTAL', 'value': 'EL_ASINTAL' }] }, { 'name': 'SACATEPEQUEZ', 'minicipios': [{ 'label': 'ANTIGUA_GUATEMALA', 'value': 'ANTIGUA_GUATEMALA' }, { 'label': 'JOCOTENANGO', 'value': 'JOCOTENANGO' }, { 'label': 'PASTORES', 'value': 'PASTORES' }, { 'label': 'SUMPANGO', 'value': 'SUMPANGO' }, { 'label': 'SANTO_DOMINGO_XENACOJ', 'value': 'SANTO_DOMINGO_XENACOJ' }, { 'label': 'SANTIAGO_SACATEPEQUEZ', 'value': 'SANTIAGO_SACATEPEQUEZ' }, { 'label': 'SAN_BARTOLOME_MILPAS_ALTAS', 'value': 'SAN_BARTOLOME_MILPAS_ALTAS' }, { 'label': 'SAN_LUCAS_SACATEPEQUEZ', 'value': 'SAN_LUCAS_SACATEPEQUEZ' }, { 'label': 'SANTA_LUCIA_MILPAS_ALTAS', 'value': 'SANTA_LUCIA_MILPAS_ALTAS' }, { 'label': 'MAGDALENA_MILPAS_ALTAS', 'value': 'MAGDALENA_MILPAS_ALTAS' }, { 'label': 'SANTA_MARIA_DE_JESUS', 'value': 'SANTA_MARIA_DE_JESUS' }, { 'label': 'CIUDAD_VIEJA', 'value': 'CIUDAD_VIEJA' }, { 'label': 'SAN_MIGUEL_DUENAS', 'value': 'SAN_MIGUEL_DUENAS' }, { 'label': 'ALOTENANGO', 'value': 'ALOTENANGO' }, { 'label': 'SAN_ANTONIO_AGUAS_CALIENTES', 'value': 'SAN_ANTONIO_AGUAS_CALIENTES' }, { 'label': 'SANTA_CATARINA_BARAHONA', 'value': 'SANTA_CATARINA_BARAHONA' }] }, { 'name': 'SAN_MARCOS', 'minicipios': [{ 'label': 'SAN_MARCOS', 'value': 'SAN_MARCOS' }, { 'label': 'SAN_PEDRO_SACATEPEQUEZ', 'value': 'SAN_PEDRO_SACATEPEQUEZ' }, { 'label': 'SAN_ANTONIO_SACATEPEQUEZ', 'value': 'SAN_ANTONIO_SACATEPEQUEZ' }, { 'label': 'COMITANCILLO', 'value': 'COMITANCILLO' }, { 'label': 'SAN_MIGUEL_IXTAHUACAN', 'value': 'SAN_MIGUEL_IXTAHUACAN' }, { 'label': 'CONCEPCION_TUTUAPA', 'value': 'CONCEPCION_TUTUAPA' }, { 'label': 'TACANA', 'value': 'TACANA' }, { 'label': 'SIBINAL', 'value': 'SIBINAL' }, { 'label': 'TAJUMULCO', 'value': 'TAJUMULCO' }, { 'label': 'TEJUTLA', 'value': 'TEJUTLA' }, { 'label': 'SAN_RAFAEL_PIE_DE_LA_CUESTA', 'value': 'SAN_RAFAEL_PIE_DE_LA_CUESTA' }, { 'label': 'NUEVO_PROGRESO', 'value': 'NUEVO_PROGRESO' }, { 'label': 'EL_TUMBADOR', 'value': 'EL_TUMBADOR' }, { 'label': 'EL_RODEO', 'value': 'EL_RODEO' }, { 'label': 'MALACATAN', 'value': 'MALACATAN' }, { 'label': 'CATARINA', 'value': 'CATARINA' }, { 'label': 'AYUTLA', 'value': 'AYUTLA' }, { 'label': 'OCOS', 'value': 'OCOS' }, { 'label': 'SAN_PABLO', 'value': 'SAN_PABLO' }, { 'label': 'EL_QUETZAL', 'value': 'EL_QUETZAL' }, { 'label': 'LA_REFORMA', 'value': 'LA_REFORMA' }, { 'label': 'PAJAPITA', 'value': 'PAJAPITA' }, { 'label': 'IXCHIGUAN', 'value': 'IXCHIGUAN' }, { 'label': 'SAN_JOSE_OJETENAN', 'value': 'SAN_JOSE_OJETENAN' }, { 'label': 'SAN_CRISTOBAL_CUCHO', 'value': 'SAN_CRISTOBAL_CUCHO' }, { 'label': 'SIPACAPA', 'value': 'SIPACAPA' }, { 'label': 'ESQUIPULAS_PALO_GORDO', 'value': 'ESQUIPULAS_PALO_GORDO' }, { 'label': 'RIO_BLANCO', 'value': 'RIO_BLANCO' }, { 'label': 'SAN_LORENZO', 'value': 'SAN_LORENZO' }, { 'label': 'LA_BLANCA', 'value': 'LA_BLANCA' }] }, { 'name': 'SANTA_ROSA', 'minicipios': [{ 'label': 'CUILAPA', 'value': 'CUILAPA' }, { 'label': 'BARBERENA', 'value': 'BARBERENA' }, { 'label': 'SANTA_ROSA_DE_LIMA', 'value': 'SANTA_ROSA_DE_LIMA' }, { 'label': 'CASILLAS', 'value': 'CASILLAS' }, { 'label': 'SAN_RAFAEL_LAS_FLORES', 'value': 'SAN_RAFAEL_LAS_FLORES' }, { 'label': 'ORATORIO', 'value': 'ORATORIO' }, { 'label': 'SAN_JUAN_TECUACO', 'value': 'SAN_JUAN_TECUACO' }, { 'label': 'CHIQUIMULILLA', 'value': 'CHIQUIMULILLA' }, { 'label': 'TAXISCO', 'value': 'TAXISCO' }, { 'label': 'SANTA_MARIA_IXHUATAN', 'value': 'SANTA_MARIA_IXHUATAN' }, { 'label': 'GUAZACAPAN', 'value': 'GUAZACAPAN' }, { 'label': 'SANTA_CRUZ_NARANJO', 'value': 'SANTA_CRUZ_NARANJO' }, { 'label': 'PUEBLO_NUEVO_VINAS', 'value': 'PUEBLO_NUEVO_VINAS' }, { 'label': 'NUEVA_SANTA_ROSA', 'value': 'NUEVA_SANTA_ROSA' }] }, { 'name': 'SOLOLA', 'minicipios': [{ 'label': 'SOLOLA', 'value': 'SOLOLA' }, { 'label': 'SAN_JOSE_CHACAYA', 'value': 'SAN_JOSE_CHACAYA' }, { 'label': 'SANTA_MARIA_VISITACION', 'value': 'SANTA_MARIA_VISITACION' }, { 'label': 'SANTA_LUCIA_UTATLAN', 'value': 'SANTA_LUCIA_UTATLAN' }, { 'label': 'NAHUALA', 'value': 'NAHUALA' }, { 'label': 'SANTA_CATARINA_IXTAHUACAN', 'value': 'SANTA_CATARINA_IXTAHUACAN' }, { 'label': 'SANTA_CLARA_LA_LAGUNA', 'value': 'SANTA_CLARA_LA_LAGUNA' }, { 'label': 'CONCEPCION', 'value': 'CONCEPCION' }, { 'label': 'SAN_ANDRES_SEMETABAJ', 'value': 'SAN_ANDRES_SEMETABAJ' }, { 'label': 'PANAJACHEL', 'value': 'PANAJACHEL' }, { 'label': 'SANTA_CATARINA_PALOPO', 'value': 'SANTA_CATARINA_PALOPO' }, { 'label': 'SAN_ANTONIO_PALOPO', 'value': 'SAN_ANTONIO_PALOPO' }, { 'label': 'SAN_LUCAS_TOLIMAN', 'value': 'SAN_LUCAS_TOLIMAN' }, { 'label': 'SANTA_CRUZ_LA_LAGUNA', 'value': 'SANTA_CRUZ_LA_LAGUNA' }, { 'label': 'SAN_PABLO_LA_LAGUNA', 'value': 'SAN_PABLO_LA_LAGUNA' }, { 'label': 'SAN_MARCOS_LA_LAGUNA', 'value': 'SAN_MARCOS_LA_LAGUNA' }, { 'label': 'SAN_JUAN_LA_LAGUNA', 'value': 'SAN_JUAN_LA_LAGUNA' }, { 'label': 'SAN_PEDRO_LA_LAGUNA', 'value': 'SAN_PEDRO_LA_LAGUNA' }, { 'label': 'SANTIAGO_ATITLAN', 'value': 'SANTIAGO_ATITLAN' }] }, { 'name': 'SUCHITEPEQUEZ', 'minicipios': [{ 'label': 'MAZATENANGO', 'value': 'MAZATENANGO' }, { 'label': 'CUYOTENANGO', 'value': 'CUYOTENANGO' }, { 'label': 'SAN_FRANCISCO_ZAPOTITLAN', 'value': 'SAN_FRANCISCO_ZAPOTITLAN' }, { 'label': 'SAN_BERNARDINO', 'value': 'SAN_BERNARDINO' }, { 'label': 'SAN_JOSE_EL_IDOLO', 'value': 'SAN_JOSE_EL_IDOLO' }, { 'label': 'SANTO_DOMINGO_SUCHITEPEQUEZ', 'value': 'SANTO_DOMINGO_SUCHITEPEQUEZ' }, { 'label': 'SAN_LORENZO', 'value': 'SAN_LORENZO' }, { 'label': 'SAMAYAC', 'value': 'SAMAYAC' }, { 'label': 'SAN_PABLO_JOCOPILAS', 'value': 'SAN_PABLO_JOCOPILAS' }, { 'label': 'SAN_ANTONIO_SUCHITEPEQUEZ', 'value': 'SAN_ANTONIO_SUCHITEPEQUEZ' }, { 'label': 'SAN_MIGUEL_PANAN', 'value': 'SAN_MIGUEL_PANAN' }, { 'label': 'SAN_GABRIEL', 'value': 'SAN_GABRIEL' }, { 'label': 'CHICACAO', 'value': 'CHICACAO' }, { 'label': 'PATULUL', 'value': 'PATULUL' }, { 'label': 'SANTA_BARBARA', 'value': 'SANTA_BARBARA' }, { 'label': 'SAN_JUAN_BAUTISTA', 'value': 'SAN_JUAN_BAUTISTA' }, { 'label': 'SANTO_TOMAS_LA_UNION', 'value': 'SANTO_TOMAS_LA_UNION' }, { 'label': 'ZUNILITO', 'value': 'ZUNILITO' }, { 'label': 'PUEBLO_NUEVO', 'value': 'PUEBLO_NUEVO' }, { 'label': 'RIO_BRAVO', 'value': 'RIO_BRAVO' }, { 'label': 'SAN_JOSE_LA_MAQUINA', 'value': 'SAN_JOSE_LA_MAQUINA' }] }, { 'name': 'TOTONICAPAN', 'minicipios': [{ 'label': 'TOTONICAPAN', 'value': 'TOTONICAPAN' }, { 'label': 'SAN_CRISTOBAL_TOTONICAPAN', 'value': 'SAN_CRISTOBAL_TOTONICAPAN' }, { 'label': 'SAN_FRANCISCO_EL_ALTO', 'value': 'SAN_FRANCISCO_EL_ALTO' }, { 'label': 'SAN_ANDRES_XECUL', 'value': 'SAN_ANDRES_XECUL' }, { 'label': 'MOMOSTENANGO', 'value': 'MOMOSTENANGO' }, { 'label': 'SANTA_MARIA_CHIQUIMULA', 'value': 'SANTA_MARIA_CHIQUIMULA' }, { 'label': 'SANTA_LUCIA_LA_REFORMA', 'value': 'SANTA_LUCIA_LA_REFORMA' }, { 'label': 'SAN_BARTOLO', 'value': 'SAN_BARTOLO' }] }, { 'name': 'ZACAPA', 'minicipios': [{ 'label': 'ZACAPA', 'value': 'ZACAPA' }, { 'label': 'ESTANZUELA', 'value': 'ESTANZUELA' }, { 'label': 'RIO_HONDO', 'value': 'RIO_HONDO' }, { 'label': 'GUALAN', 'value': 'GUALAN' }, { 'label': 'TECULUTAN', 'value': 'TECULUTAN' }, { 'label': 'USUMATLAN', 'value': 'USUMATLAN' }, { 'label': 'CABANAS', 'value': 'CABANAS' }, { 'label': 'SAN_DIEGO', 'value': 'SAN_DIEGO' }, { 'label': 'LA_UNION', 'value': 'LA_UNION' }, { 'label': 'HUITE', 'value': 'HUITE' }, { 'label': 'SAN_JORGE', 'value': 'SAN_JORGE' }] }]
  }


  FormSelectMunicipio = ({
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
          // this.setState({
          //  departamentSelect: value.value
          //})
        }}
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

  FormSelectSexo = ({
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
          // this.setState({
          //  departamentSelect: value.value
          //})
        }}
        value={value}
        options={this.state.sex

        }
        placeholder={placeholder}
        formNoValidate
      />
    </>
  );



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
            departamentSelect: value.value
          })
        }}
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

  FormSelectTime = ({
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
            FilterForm: {
              ...this.state.FilterForm,
              time: value.value
            }
          })
        }}
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
  FormFile = ({
    input: { onChange },
    placeholder,
    type,
    value,
    icon,
    meta: { error },
  }) => (
    <>
      <Input type="file"
        accept=".jpg,.png,.jpeg"
        // disabled={loading}
        color="info"
        onChange={e => (onChange(e.target.files[0]), 
          this.setState({
            filesize : e.target.files[0].size
          }),
          this.setState({
          FilterForm: {
            ...this.state.FilterForm,
            file: e.target.files[0]
          }
        }))}
        value={e => onChange(e.target.files[0].name)}

      />
      <label>
        {value}
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

  FormDateTime = ({
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
        style={{ color: 'black' }}
        timeFormat={false}
        value={value}
        onChange={value => onChange(

          this.setState({
            FilterForm: {
              ...this.state.FilterForm,
              date: (
                (value._d).getFullYear() + '/' + (parseInt((value._d).getMonth()) + 1) + '/' + (value._d).getDate())
            }


          }))}
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

  delay() {
    setTimeout(function () { //Start the timer
      window.location.reload()
    }.bind(this), 4000)
  }

  handleSelectChange = (event) => {
    let opts = [], opt;
    for (let i = 0, len = event.target.options.length; i < len; i++) {
      opt = event.target.options[i];
      if (opt.selected) {
        opts.push(opt.value);
      }
    }
    this.setState({ dbsSelected: opts });
  };
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

  toggleEditModal = () => {
    this.setState({
      editModal: !this.state.editModal
    });
  }

  componentDidMount() {
    const {
      getDeps,
      getInfo,
      getDB
    } = this.props;
    getDeps();
    getInfo();
    getDB()
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
      handleSubmit,
      info,
      dbs,
      userCompany,
      loadingData
    } = this.props;
    const {
      FilterForm,
      departamentos,
      municipios,
      departamentSelect,
      municipiosTotal,
      dbsSelected,
      editModal,
      countText
    } = this.state;
    let name;
    const pageMode = this.checkPageMode();
    let inverted = pageMode.bg === "bg-ligh" ? 'inverted' : '';
    let filteredmuns = municipios.filter(m => m.name === departamentSelect)
    return (
      <>
        <div className={`blackdiv ${loadingData ? 'spinner' : 'NoSpinner'} `} id="blackdiv"
        >
          <div className="ui segment">
            <div className={`ui active transition ${inverted} visible dimmer`}>
              <div className="content">
                <ClimbingBoxLoader css={overrideCubo} zIndex={2} size={25} color={"#1d8cf8 "} margin={0} />

              </div>
            </div>
            <div style={{ minHeight: 400 }}><p>&nbsp;</p></div>
          </div>
        </div>
        <div className="content">
          <ModalN />
          <Modal
            isOpen={editModal}
            toggle={this.toggleEditModal}
            modalClassName={this.checkPageMode()}

          >
            <ModalHeader className="justify-content-center" toggle={this.toggleImportModal}>
              Seleccionar Fecha y Hora
            </ModalHeader>
            <ModalBody
              style={{ height: '800px !important' }}
            >
              <Row>
                <Col sm={12}>
                  <Label>Fecha</Label>
                  <Field
                    name={'time'}
                    component={this.FormDateTime}
                    // validate={[this.verifyNumber]}
                    // icon= "icon-key-25"
                    placeholder=""
                  // type="file"
                  />
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <Label>Hora</Label>
                  <Field
                    name={`hora`}
                    component={this.FormSelectTime}
                    //		validate={[this.required, this.verifyNumberProduction]}
                    placeholder="Hora"
                    type='number'
                    options={this.state.time}
                  />
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={() => this.toggleEditModal()}>
                Cerrar
              </Button>
              <Button color="primary" onClick={() => this.toggleEditModal()}>
                Guardar Cambios
              </Button>
            </ModalFooter>
          </Modal>
          {userCompany.has_emails ?
            <Row>
              <Col xs="4">
                <Form onSubmit={handleSubmit(filterData.bind(this))}>
                  <Card>
                    <CardBody>
                      <CardTitle>
                        Filtros
                      </CardTitle>
                      {departments && departments.map((index, id) => (
                        <>
                          {
                            index.valid === true && (<>
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
                                      (index.type === 'string' && index.name !== "DEPARTAMENTO_TANGO"
                                        && index.name !== "DEPARTAMENTO_ROMEO"
                                        && index.name !== "DEPARTAMENTO"
                                        && index.name !== 'MUNICIPIO_TANGO'
                                        && index.name !== "MUNICIPIO_ROMEO"
                                        && index.name !== "MUNICIPIO"
                                        && index.name !== "SEXO") ?
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
                                        (index.name === 'DEPARTAMENTO_TANGO' || index.name === 'DEPARTAMENTO_ROMEO' ||
                                          index.name === 'DEPARTAMENTO') ?
                                          <Row>
                                            <Col>
                                              <FormGroup >
                                                <Field
                                                  name={`${index.name}|${index.type}-1`}
                                                  component={this.FormSelect}
                                                  //		validate={[this.required, this.verifyNumberProduction]}
                                                  placeholder="Departamentos"
                                                  // type='number'
                                                  options={departamentos}
                                                />
                                              </FormGroup>
                                            </Col>
                                          </Row>
                                          :
                                          (index.name === 'MUNICIPIO_TANGO' ||
                                            index.name === "MUNICIPIO_ROMEO" ||
                                            index.name === "MUNICIPIO") ?
                                            <Row>
                                              <Col>
                                                <FormGroup >
                                                  <Field
                                                    name={`${index.name}|${index.type}-1`}
                                                    component={this.FormSelectMunicipio}
                                                    //		validate={[this.required, this.verifyNumberProduction]}
                                                    placeholder="Municipios"
                                                    //   type='number'
                                                    options={departamentSelect ? (filteredmuns[0] && filteredmuns[0].minicipios) : municipiosTotal}
                                                  />
                                                </FormGroup>
                                              </Col>
                                            </Row>
                                            :
                                            index.name === 'SEXO' ?
                                              <Row>
                                                <Col>
                                                  <FormGroup >
                                                    <Field
                                                      name={`${index.name}|${index.type}`}
                                                      component={this.FormSelectSexo}
                                                      //		validate={[this.required, this.verifyNumberProduction]}
                                                      placeholder="SEXO"
                                                    //   type='number'se

                                                    />
                                                  </FormGroup>
                                                </Col>
                                              </Row>
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
                            </>)
                          }
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
              {<Col xs="4">
                <Card>
                  {
                    <CardBody>
                      <CardTitle>
                        Creditos disponibles
                      </CardTitle>
                      <ListGroup>
                        <ListGroupItem className="justify-content-between" style={{ backgroundColor: '#344675' }}>
                          <Row>
                            <Col xs="6">
                              Mensajes restantes por correo
                            </Col>
                            {loading === false ?
                              <Col xs="6" style={{ textAlign: 'right' }}>
                                <Badge pill color="info">
                                  <h3 style={{ margin: 0 }}>
                                    {info && info.email_credit}
                                  </h3>
                                </Badge>
                              </Col>
                              :
                              <Col md={{ size: 2, offset: 4 }} style={{ textAlign: 'right', marginLeft: 170 }}>
                                <FadeLoader css={override} size={1} color={"#1d8cf8 "} margin={-10} />
                              </Col>
                            }
                          </Row>
                        </ListGroupItem>
                        <ListGroupItem className="justify-content-between" style={{ backgroundColor: '#344675' }}>
                          <Row>
                            <Col xs="6">
                              Total Filtrado
                            </Col>

                            {loading === false ?
                              <Col xs="6" style={{ textAlign: 'right' }}>
                                <Badge pill color="info">
                                  <h3 style={{ margin: 0 }}>
                                    {filteredData ? filteredData.count : 0}
                                  </h3>
                                </Badge>
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
                <Card>
                  <CardBody>
                    <CardTitle>
                      Base de Datos
                    </CardTitle>
                    <ListGroup>
                      <ListGroup className="justify-content-between" style={{ backgroundColor: '#344675' }}>
                        <Row>
                          <Col>

                            {dbs &&
                              <Input
                                type="select"
                                name="selectMulti"
                                id="exampleSelectMulti1"
                                multiple
                                value={dbsSelected}
                                //ref={this.createService}
                                onChange={this.handleSelectChange}
                                style={{ height: '200px' }}
                              >
                                {dbs.map((size, idx) =>
                                  <option key={idx} value={size.value}>
                                    {size.label}
                                  </option>
                                )}
                              </Input>}
                          </Col>
                        </Row>
                      </ListGroup >
                    </ListGroup>
                  </CardBody>
                </Card>
              </Col>}
              <Col>
                <Row>
                  <Col>
                    <Card>
                      <CardBody>
                        <CardTitle>
                          Enviar Mensaje
                        </CardTitle>
                        <Form onSubmit={handleSubmit(sendMail.bind(this))}>
                          <FormGroup>
                            <Label>
                              Campaña
                            </Label>
                            <Input type="input"
                              value={FilterForm.company}
                              disabled={loadingAction}
                              onChange={(e) => {
                                this.setState({
                                  FilterForm: {
                                    ...FilterForm,
                                    company: e.target.value
                                  }
                                })
                              }}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label>
                              Titulo mensaje
                            </Label>
                            <Input type="input"
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
                              maxlength="160"

                              value={FilterForm.text}
                              disabled={loadingAction}
                              onChange={(e) => {
                                this.setState({
                                  FilterForm: {
                                    ...FilterForm,
                                    text: e.target.value,
                                    countText: e.target.value.length
                                  }
                                })
                              }}
                            />
                            <p>
                              {this.state.FilterForm.countText}/160
                            </p>
                          </FormGroup>
                          <Row>
                            <Col>
                              <FormGroup>
                                <Button color="info" size="sm"
                                  style={{ fontSize: 13, height: 40 }}>
                                  <Field
                                    name={`file`}
                                    component={this.FormFile}
                                    // validate={[this.verifyNumber]}
                                    // icon= "icon-key-25"
                                    placeholder=""
                                    type="file"
                                  />
                                  Subir Imagen Adjunta
                                </Button>
                                {FilterForm.file && <span className="form-text text-info">
                                  {FilterForm.file.name}
                                </span>}
                                {
                                  this.state.filesize > 25000000  &&
                                  <span className="form-text text-info">
                                  Limite de archivo son 25mb, su imagen contiene {this.state.filesize*0.000001}mb
                                </span>

                                }
                              </FormGroup>
                            </Col>
                            <Col>
                              {//date
                              }
                              <Button
                                color="info"
                                disabled={this.state.filesize > 25000000 ? true: false }
                                onClick={() => {
                                  sendMail(FilterForm, this.state.Form, dbsSelected)
                                  this.setState({
                                    FilterForm: {
                                      ...FilterForm,
                                      text: '',
                                      header: '',
                                      company: '',
                                      date: '',
                                      time: ''
                                    }
                                  })
                                  // this.delay()
                                }}
                                style={{ fontSize: 13, height: 40 }}
                              >
                                Enviar Mensaje
                              </Button>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <FormGroup>
                                <Button
                                  onClick={() => this.toggleEditModal()}
                                >
                                  Programar Envio
                                </Button>
                                {

                                }
                              </FormGroup>
                            </Col>
                          </Row>
                        </Form>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row>

                </Row>
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
        </div >
      </>);
  }
}

const Databases = reduxForm({
  form: 'Booking',

})(DatabasesForm);

export default connect(
  (state) => ({
    departments: selector.getFilters(state),
    municipalities: selector.getMunicipalities(state),
    filteredData: selector.getFilterData(state),
    loading: selector.getFilterloading(state),
    userInfo: selector.getUserMsgInfo(state),
    loadingAction: selector.getActionloading(state),
    info: selector.getInfo(state),
    dbs: selector.getDbsFilter(state),
    userCompany: selector.getUserCompany(state),
    loadingData: selector.getFilterloadingData(state)
  }),
  (dispatch) => ({
    getDB() {
      dispatch(DBActions.getDbsFilter())
    },
    getDeps() {
      dispatch(filterActions.getfilter())
    },
    getInfo() {
      dispatch(filterActions.filterInfo())
    },
    filterData(FilterForm) {


      dispatch(filterActions.filterData({
        FilterForm: FilterForm,
        dbs: this.state.dbsSelected,
        index: '1'
      }))



      this.setState({
        Form: FilterForm
      })
    },
    sendMail(FilterForm, Form, dbs) {
      if (
        (!FilterForm.header || FilterForm.header === "") ||
        (!FilterForm.text || FilterForm.text === "")
        //|| (!FilterForm.file)
      ) {
        dispatch(modalActions.showError({
          message: 'Error: Formulario incompleto',
          title: 'Error'
        }))
      }
      //else {
      // var filesize = ((FilterForm.file.size / 1024) / 1024).toFixed(4);
      // if (filesize > 2) {
      //  dispatch(modalActions.showError({
      //    message: 'Error: tamaño de imagen es muy grande',
      //   title: 'Error'
      // }))
      //} 
      else {
        dispatch(messageActions.sendEmail({
          ...FilterForm,
          Filter: Form,
          dbs: dbs
        }))
      }
      // }
    }
  })
)(Databases);