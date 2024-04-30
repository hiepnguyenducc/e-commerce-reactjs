import { Navigate, RouteProps, useNavigate } from "react-router-dom";
import MasterLayout from "./layouts/admin/MasterLayout";
import axios from "axios";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import './components/loading/loading'
import Loading from "./components/loading/loading";

interface AdminPrivateRouteProps extends RouteProps {
    name: string;
}

function AdminPrivateRoute({ ...rest }: AdminPrivateRouteProps) {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAuthenticatedStatus = async () => {
            try {
                const response = await axios.get('/api/checkingAuthenticated');
                if (response.status === 200) {
                    setAuthenticated(true);
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAuthenticatedStatus();
    }, []);

    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            undefined,
            function axiosRetryIntercreptor(err) {
                if (err.response.status === 401) {
                    swal("Unauthorized", err.response.data.message, "warning");
                    navigate('/');
                }
                return Promise.reject(err);
            }
        );
        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, [navigate]);

    useEffect(()=>{
        axios.interceptors.response.use(function(response){
            return response;
        },function(error){
            if(error.response.status === 403){
                swal('Forbidden', error.response.data.message, "warning");
                navigate('/403')
            }else if(error.response.status === 404){
                swal('404 Error',"Url/Page Not Found", "warning");
                navigate('/404')
            }
            return Promise.reject(error);
        })
    })

    if(loading){
        return (
            <>
           <Loading></Loading>
            </>
        )
    }
    return authenticated ? <MasterLayout /> : <Navigate to="/" replace />;
}

export default AdminPrivateRoute;
