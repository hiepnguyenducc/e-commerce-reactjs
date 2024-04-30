import { Button, Result } from 'antd';
import errorImg404 from '../../../public/404.svg';
import { Link } from 'react-router-dom';

function Page404() {
    return (
        // <div className="container" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        //     <img src={errorImg404} alt="Error 404" style={{ width: '50%', height: 'auto' }} />
        // </div>
        <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary"><Link to="/">Back Home</Link></Button>}
      />
    );
}

export default Page404;
