
import './loading.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Flex, Spin} from "antd";
function Loading() {
  return (
    <>
         <div className="d-flex justify-content-center align-items-center vh-100">
           <Flex align="center" gap="middle">

             <Spin size="large" />
           </Flex>

         </div>
    </>
  )
}

export default Loading;
