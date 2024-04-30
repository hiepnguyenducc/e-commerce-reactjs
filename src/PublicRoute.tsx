import {Route, RouteProps} from 'react-router-dom';
import FrontendLayout from './layouts/frontend/FrontendLayout.tsx';
interface PublicRouteProps extends RouteProps {
  name: string;
}
function PublicRoute ({ ...rest }:PublicRouteProps){
  
 return <FrontendLayout></FrontendLayout>
}

export default PublicRoute;
