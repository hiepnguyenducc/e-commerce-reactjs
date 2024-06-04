import {Link} from "react-router-dom";
import {Button, Image, message, Popconfirm, Space, Table} from "antd";
import {useEffect, useState} from "react";
import axios from "axios";
import Loading from "../../loading/loading.tsx";
interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
}
function ViewPost (){
  const [loading, setLoading] = useState(true);
  const [postList, setPostList] = useState<Post[]>([]);

  useEffect(()=>{
    axios.get(`/api/view-post`).then(res=>{
      if(res.data.status===200){
        setPostList(res.data.post)
        setLoading(false);
      }
    })
  },[])
  const handleDelete = async (id:string)=>{
    axios(`/api/delete-post/${id}`).then(res=>{
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
    {title: 'Title', dataIndex:'title', key:'title'},
    {title: 'Slug', dataIndex:'slug', key:'slug'},
    {title: 'Content', dataIndex:'content', key:'content'},
    {title:'Image', dataIndex:'image',key:'image', render: (image: string) => <Image src={`http://127.0.0.1:8001/${image}`} width={50} />,},
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/admin/edit-post/${record.id}`} className="btn btn-success btn-sm">Edit</Link>
          <Popconfirm
            title="Delete Category?"
            description="Are you sure you want to delete this post?"
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
    <>
      <div className="container-fuild px-4 mt-4 fade-in">
        <div className="card-hearder">
          <h4>
            Post List
            <Link to="/admin/add-category" className="btn btn-primary btn-sm float-end">
              Add Post
            </Link>
          </h4>
        </div>
        <Table columns={columns} dataSource={postList}></Table>
      </div>
    </>
  )
}

export default ViewPost
