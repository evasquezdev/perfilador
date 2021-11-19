/*!

=========================================================
* Black Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*import VectorMap from "views/maps/VectorMap.js";
import GoogleMaps from "views/maps/GoogleMaps.js";
import FullScreenMap from "views/maps/FullScreenMap.js";
import ReactTables from "views/tables/ReactTables.js";
import RegularTables from "views/tables/RegularTables.js";
import ExtendedTables from "views/tables/ExtendedTables.js";
import Wizard from "views/forms/Wizard.js";
import ValidationForms from "views/forms/ValidationForms.js";
import ExtendedForms from "views/forms/ExtendedForms.js";
import RegularForms from "views/forms/RegularForms.js";
import Calendar from "views/Calendar.js";
import Widgets from "views/Widgets.js";
import Charts from "views/Charts.js";*/
import Dashboard from "views/Dashboard.js";
/*import Buttons from "views/components/Buttons.js";
import SweetAlert from "views/components/SweetAlert.js";
import Notifications from "views/components/Notifications.js";
import Grid from "views/components/Grid.js";
import Typography from "views/components/Typography.js";
import Panels from "views/components/Panels.js";
import Icons from "views/components/Icons.js";
import Pricing from "views/pages/Pricing.js";
import Register from "views/pages/Register.js";
import Timeline from "views/pages/Timeline.js";
import User from "views/pages/User.js";
import Rtl from "views/pages/Rtl.js";
import Lock from "views/pages/Lock.js";*/
import Databases from "views/pages/Databases";
import SMS from 'views/pages/SMS';
import EMAIL from 'views/pages/EMAIL';
import Filters from 'views/pages/Filters';
import Company from 'views/pages/Company';
import User from 'views/pages/User.jsx';

import Login from "views/pages/Login.js";
import RecoverPassword from 'views/pages/RecoverPassword'
const routes = [
  {
    collapse: true,
    name: "Administración",
    icon: "tim-icons icon-badge",
    state: "pagesCollapseCosting",
    views: [
      {
        path: "/user",
        name: "Usuarios",
        mini: "U",
        component: User,
        layout: "/admin"
      },
      {
        path: "/company",
        name: "Empresas",
        mini: "E",
        component: Company,
        layout: "/admin"
      },
    ]
  },
 /* {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin",
  },*/
  {
    path: "/databases",
    name: "Base de Datos",
    icon: "tim-icons icon-laptop",
    component: Databases,
    layout: "/admin",
  },
  {
    path: "/enviosSMS",
    name: "envios SMS",
    icon: "tim-icons icon-send",
    component: SMS,
    layout: "/admin",
  },
  {
    path: "/enviosEmail",
    name: "envios correo",
    icon: "tim-icons icon-email-85",
    component: EMAIL,
    layout: "/admin",
  },
  {
    path: "/Filtros",
    name: "Manejo de filtros",
    icon: "tim-icons icon-notes",
    component: Filters,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    mini: "L",
    component: Login,
    layout: "/auth",
    invisible: true,
  },
  {
    path: "/recover",
    name: "Recover Password",
    icon: "tim-icons icon-bank",
    component: RecoverPassword,
    layout: "/auth",
    invisible: true
  },
];

export default routes;
