import {useEffect, useState} from "react";
import axios from "axios";
import Loading from "../../loading/loading.tsx";
import {Link} from "react-router-dom";

import {Button, Image, message, notification, Popconfirm, Space, Table} from "antd";
interface Brand{
  id:string,
  name:string,
  slug:string,
  meta_keyword:string,
  meta_title:string,
  meta_description:string,
  description:string,
  image:string,
  status:string,
}
function ViewBrand(){
  const [loading, setLoading] = useState(true);
  const [brandList, setBrandList] = useState<Brand[]>([]);
  useEffect(() => {
    axios.get(`api/view-brand`).then(res=>{
      if(res.data.status === 200){
        setBrandList(res.data.brand)
        setLoading(false);
      }
    })
  }, []);
  const handleDelete = async (id:string)=>{
    axios(`api/delete-brand/${id}`).then(res=>{
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
  if (loading){
    return <Loading></Loading>
  }
  const columns = [
    {title:'Id', dataIndex:'id',key:'id'},
    {title:'Name', dataIndex:'name',key:'name'},
    {title:'Slug', dataIndex:'slug',key:'slug'},
    {title:'Description', dataIndex:'description',key:'description'},
    {title:'Meta_Title', dataIndex:'meta_title',key:'meta_title'},
    {title:'Meta_Keyword', dataIndex:'meta_keyword',key:'meta_keyword'},
    {title:'Meta_description', dataIndex:'meta_description',key:'meta_description'},
    {title:'Image', dataIndex:'image',key:'image', render: (image: string) => <Image src={`http://127.0.0.1:8001/${image}`} width={50} />,},
    {title: 'Status', dataIndex: 'status',key: 'status'},
    {
      title:'Action',
    key:'action',
      render:(text, record)=>(
        <Space size="middle">
          <Link to={`/admin/edit-brand/${record.id}`} className="btn btn-success btn-sm">Edit</Link>
          <Popconfirm
            title="Delete Brand"
            description="Are you sure you want to delete this category?"
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
      <div className={"container-fluid px-4 mt-4 fade-in"}>
        <div className="card-header">
          <h4>
            Brand List
            <Link to={"/admin/add-brand"} className={"btn btn-primary btn-sm float-end"}>Add Brand</Link>
          </h4>
        </div>
       <Table columns={columns} dataSource={brandList}></Table>
      </div>
    )
}
export default ViewBrand
