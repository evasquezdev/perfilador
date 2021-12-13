import Databases from "views/pages/Databases";
import SMS from 'views/pages/SMS';
import DashSMS from 'views/pages/DashboardSMS';
import DashEmail from 'views/pages/DashboardEmail';
import EMAIL from 'views/pages/EMAIL';
import Analitica from 'views/pages/Analitica';
import Campaing from 'views/pages/campaing';
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
    permission: 'master',
    views: [
      {
        path: "/user",
        name: "Usuarios",
        mini: "U",
        component: User,
        layout: "/admin",
        permission: 'master'
      },
      {
        path: "/company",
        name: "Empresas",
        mini: "E",
        component: Company,
        layout: "/admin",
        permission: 'master'

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
    path: "/dashboard_sms",
    name: "Dashboard SMS",
    icon: "tim-icons icon-send",
    component: DashSMS,
    layout: "/admin",
  },
  {
    path: "/dashboard_email",
    name: "Dashboard correo",
    icon: "tim-icons icon-email-85",
    component: DashEmail,
    layout: "/admin",
  },
  {
    path: "/analitica",
    name: "Analítica",
    icon: "tim-icons icon-atom",
    component: Analitica,
    layout: "/admin",
  },
  {
    path: "/Filtros",
    name: "Manejo de filtros",
    icon: "tim-icons icon-bullet-list-67",
    component: EMAIL,
    layout: "/admin",
  },
  {
    path: "/Campanas",
    name: "Campañas",
    icon: "tim-icons icon-notes",
    component: Campaing,
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
