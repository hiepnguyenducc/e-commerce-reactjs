import {Button, message, Popconfirm, Space, Table} from "antd";
import {Link} from "react-router-dom";
import axios from "axios";
import Loading from "../../loading/loading.tsx";
import {useEffect, useState} from "react";

function ViewOrder(){
  const [loading, setLoading] = useState(true);
  const [order, setOrder]= useState([])
  useEffect(()=>{
    axios.get(`/api/order`).then(res=>{
      if(res.data.status===200){
        setOrder(res.data.order)
        setLoading(false);
      }
    })
  },[])
  const handleDelete = async (id:string)=>{
    axios(`/api/delete-category/${id}`).then(res=>{
      if(res.data.status === 200){
        message.open({
          type:'success',
          content:res.data.message
        })
      }
      else if(res.data.status === 404){
        message.open({
          type:'error',
          content:res.data.message
        })
      }
    })
  }
  if (loading) {
    return <Loading />;
  }
  const columns = [
    {title: 'Id', dataIndex: 'id', key:'id'},
    {title: 'Name', dataIndex:'name', key:'name'},
    {title: 'tracking', dataIndex:'tracking_no', key:'tracking_no'},
    {title: 'Email', dataIndex:'email', key:'email'},
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/admin/edit-category/${record.id}`} className="btn btn-success btn-sm">Edit</Link>
          <Popconfirm
            title="Delete Category?"
            description="Are you sure you want to delete this order?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDelete(record.id.toString())}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <>
      <div className="container-fuild px-4 mt-4 fade-in">
        <div className="card-hearder">
          <h4>
            Order List
            <Link to="/admin/add-category" className="btn btn-primary btn-sm float-end">
              Add Category
            </Link>
          </h4>
        </div>
        <Table columns={columns} dataSource={order}></Table>
      </div>
    </>
  )
}export default ViewOrder
