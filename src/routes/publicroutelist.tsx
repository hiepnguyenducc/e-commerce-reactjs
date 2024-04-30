import Home from "../components/frontend/Home";
import About from "../components/frontend/About";
import Contact from "../components/frontend/Contact";
import Page404 from "../components/errors/Page404";
import {FC} from "react";


interface RouteConfig {
  path: string;
  exact: boolean;
  name: string;
  component: FC;
}

const publicrouteslist: RouteConfig[] = [
  { path: '*', exact:true, name: '404', component: Page404 },
  { path: '/', exact:true, name: 'Home', component: Home },
  { path: '/about', exact:true, name: 'About', component: About },
  { path: '/contact', exact:true, name: 'Contact', component: Contact },
];

export default publicrouteslist;
