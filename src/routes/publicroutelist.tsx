import Home from "../components/frontend/Home";
import About from "../components/frontend/About";
import Contact from "../components/frontend/Contact";
import Page404 from "../components/errors/Page404";
import {FC} from "react";
import Details from "../components/frontend/Details.tsx";
import Cart from "../components/frontend/Cart.tsx";

import ViewCotegory from "../components/frontend/collections/ViewCategory.tsx";

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

  {path:'/cart', exact:true, name:'Cart', component:Cart},
  {path:'/collections/:id',exact:true,name:'Collections',component:ViewCotegory},
  // {path:'/collections/:category/:product', exact:true, name:'Details', component:Details},
  {path:'/:slug',exact:true,name:'Details',component:Details}
];

export default publicrouteslist;
