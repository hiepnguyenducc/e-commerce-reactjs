
import './loading.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
function Loading() {
  return (
    <>
         <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="ld ld-hourglass ld-spin-fast" style={{fontSize:'64px',color:'#8da'}}></div>
    </div>
    </>
  )
}

export default Loading;
