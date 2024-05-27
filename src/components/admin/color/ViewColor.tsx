import {Link} from "react-router-dom";
import {Button, message, Popconfirm, Space, Table} from "antd";
import {useEffect, useState} from "react";
import axios from "axios";
import Loading from "../../loading/loading.tsx";
interface Color{
  id:string,
  name:string,
  code:string,
  hex_code:string,
  status:string
}

function ChromePicker(props: { disableAlpha: boolean }) {
  return null;
}

function ViewColor(){
  const [loading,setLoading]=useState(true);
  const [colorList, setColorList]=useState<Color[]>([]);
  useEffect(() => {
    axios.get(`api/view-color`).then(res=>{
      if(res.data.status===200){
        setColorList(res.data.color)
      }
      setLoading(false)
    })
  }, []);
  if(loading){
    return (
      <Loading></Loading>
    )
  }
  const handleDelete = async (id:string) =>{
    axios.get(`/api/delete-color/${id}`).then(res=>{
      if(res.data.status === 200){
        message.open({
          type:'success',
          content:res.data.message
        })

        setColorList(colorList.filter(color => color.id !== id));
      }else if(res.data.status===404){
        message.open({
          type:'error',
          content:res.data.message
        })
      }
    })
  }
  const columns=[
    {title:'Id', dataIndex:'id',key:'id'},
    {title:'Name', dataIndex:'name',key:'name'},
    {title:'Code', dataIndex:'code',key:'code'},
    {title:'Hex Code', dataIndex:'hex_code',key:'hex_code'},
    {
      title: 'Color',
      key: 'color',
      render: (text, record) => (
        <div style={{ width: '50px', height: '50px', backgroundColor: record.hex_code }}>
          <ChromePicker color={record.hex_code} disableAlpha={true} />
        </div>
      ),
    },
    {title: 'Action',
      key:'action',
      render:(text,record)=>(
        <Space size="middle">
          <Link to={`/admin/edit-color/${record.id}`} className={"btn btn-success btn-sm"}>Edit</Link>
          <Popconfirm title={"Delete Color"}
          description={"Are you sure you want to delete this color?"}
                      okText={"Yes"}
                      cancelText={"No"}
                      onConfirm={()=>handleDelete(record.id.toString())}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      )

    }
  ]
  return(
    <>
      <div className="container-fluid px-4 fade-in">
        <div className="card-header">
          <h4>
            Color List
            <Link to={"/admin/add-color"} className={"btn btn-primary btn-sm float-end"}>Add Color</Link>
          </h4>
        </div>
        <Table columns={columns} dataSource={colorList}></Table>
      </div>
    </>
  )
}
export default ViewColor
