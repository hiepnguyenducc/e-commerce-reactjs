import {useEffect, useState} from "react";
import axios from "axios";
import Loading from "../../loading/loading.tsx";
import {Button, Image, message, notification, Popconfirm, Space, Table} from "antd";
import {Link} from "react-router-dom";

function ViewCoupon(){
  const [loading, setLoading] = useState(true);
  const [coupon, setCoupon]= useState([]);
  useEffect(() => {
    axios.get(`api/view-coupon`).then(res=>{
      if(res.data.status === 200){
        setCoupon(res.data.coupon)
        setLoading(false);
      }
    })
  }, []);
  if (loading){
    return <Loading></Loading>
  }
  const handleDelete = async (id:string)=>{
    axios(`api/delete-coupon/${id}`).then(res=>{
      if (res.data.status===200){
       notification.success({
         message:'Success',
         description:res.data.message,
         placement:'bottomRight'
       })
      }else if(res.data.status===404){
        notification.error({
          message:'Error',
          description:res.data.message,
          placement:'bottomRight'
        })
      }
    })
  }
  const columns = [
    {title:'Id', dataIndex:'id',key:'id'},
    {title:'Code', dataIndex:'code',key:'code'},
    {title:'Discount Type', dataIndex:'discount_type',key:'discount_type'},
    {title:'Discount Value', dataIndex:'discount_value',key:'discount_value'},
    {title:'Max Uses', dataIndex:'max_uses',key:'max_uses'},
    {title:'Uses Count', dataIndex:'uses_count',key:'uses_count'},
    {title:'Start Date', dataIndex:'start_date',key:'start_date'},
    {title:'End Date', dataIndex:'end_date',key:'end_date'},
    {
      title:'Action',
      key:'action',
      render:(text, record)=>(
        <Space size="middle">
          <Link to={`/admin/edit-coupon/${record.id}`} className="btn btn-success btn-sm">Edit</Link>
          <Popconfirm
            title="Delete Coupon"
            description="Are you sure you want to delete this coupon?"
            okText="Yes"
            cancelText="No"
            onConfirm={()=>handleDelete(record.id.toString())}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>

      ),
    },
  ]
  return(
    <>
      <div className={"container-fluid px-4 mt-4 fade-in"}>
        <div className="card-header">
          <h4>
            Coupon List
            <Link to={"/admin/add-coupon"} className={"btn btn-primary btn-sm float-end"}>Add Coupon</Link>
          </h4>
        </div>
        <Table columns={columns} dataSource={coupon}></Table>
      </div>
    </>
  )
}

export default ViewCoupon
