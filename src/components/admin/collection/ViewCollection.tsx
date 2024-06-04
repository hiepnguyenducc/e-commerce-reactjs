import {useEffect, useState} from "react";
import axios from "axios";
import Loading from "../../loading/loading.tsx";
import {Button, Image, message, notification, Popconfirm, Space, Table} from "antd";
import {Link} from "react-router-dom";

function ViewCollection(){
  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState([]);
  useEffect(() => {
    axios.get(`api/view-collection`).then(res=>{
      if(res.data.status === 200){
        setCollection(res.data.collection)
        setLoading(false);
      }
    })
  }, []);
  const handleDelete = async (id:string)=>{
    axios(`/api/delete-collection/${id}`).then(res=>{
      if(res.data.status === 200){
        notification.success({
          message:'Success',
          description:res.data.message,
          placement:'bottomRight'
        })
        setCollection(prevCollection => prevCollection.filter(item => item.id !== id));
      }

      else if(res.data.status === 404){
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
    {title:'Name', dataIndex:'name',key:'name'},
    {title:'Slug', dataIndex:'slug',key:'slug'},

    {title:'Image', dataIndex:'image',key:'image', render: (image: string) => <Image src={`http://127.0.0.1:8001/${image}`} width={50} />,},
    {title: 'Status', dataIndex: 'status',key: 'status'},
    {
      title:'Action',
      key:'action',
      render:(text, record)=>(
        <Space size="middle">
          <Link to={`/admin/edit-collection/${record.id}`} className="btn btn-success btn-sm">Edit</Link>
          <Popconfirm
            title="Delete Brand"
            description="Are you sure you want to delete this collection?"
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
  if (loading){
    return <Loading></Loading>
  }

  return(
    <>
      <div className={"container-fluid px-4 mt-4 fade-in"}>
        <div className="card-header">
          <h4>
            Collection List
            <Link to={"/admin/add-collection"} className={"btn btn-primary btn-sm float-end"}>Add Collection</Link>
          </h4>
        </div>
        <Table columns={columns} dataSource={collection}></Table>
      </div>
    </>
  )
}
export  default ViewCollection
