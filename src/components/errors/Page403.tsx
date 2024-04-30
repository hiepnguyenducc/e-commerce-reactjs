import { Button, Result } from 'antd';
import errorImg404 from '../../../public/403.svg';
import { Link } from 'react-router-dom';


function Page403() {
    return (
        // <div className="container" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        //     <img src={errorImg404} alt="Error 404" style={{ width: '100%', height: 'auto' }} />
        // </div>
        <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={<Button type="primary"> <Link to="/">Back Home</Link></Button>}
      />
    );
}

export default Page403;
