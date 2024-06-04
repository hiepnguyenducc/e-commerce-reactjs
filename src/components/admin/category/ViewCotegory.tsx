import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../loading/loading";
import { Button, message, Popconfirm, Table, Space } from 'antd'; // Assuming Ant Design

interface Category {
  id: string;
  name: string;
  slug: string;
  status: string;
}

function ViewCategory() {
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  useEffect(()=>{
    axios.get(`/api/view-category`).then(res=>{
      if(res.data.status===200){
      setCategoryList(res.data.category)
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
  const columns = [
    {title: 'Id', dataIndex: 'id', key:'id'},
    {title: 'Name', dataIndex:'name', key:'name'},
    {title: 'Slug', dataIndex:'slug', key:'slug'},
    {title: 'Status', dataIndex:'status', key:'status'},
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
          <Space size="middle">
              <Link to={`/admin/edit-category/${record.id}`} className="btn btn-success btn-sm">Edit</Link>
              <Popconfirm
            title="Delete Category?"
            description="Are you sure you want to delete this category?"
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

  if (loading) {
    return <Loading />;
  }
  return (

    <div className="container-fuild px-4 mt-4 fade-in">
      <div className="card-hearder">
        <h4>
          Category List
          <Link to="/admin/add-category" className="btn btn-primary btn-sm float-end">
            Add Category
          </Link>
        </h4>
      </div>
        <Table columns={columns} dataSource={categoryList}></Table>
    </div>
  );
}

export default ViewCategory;
