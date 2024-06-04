import {Link, useNavigate, useParams} from "react-router-dom";
import {Input, message, notification, Typography} from "antd";
import {runes} from "runes2";
import {useEffect, useState} from "react";
import axios from "axios";
import Loading from "../../loading/loading.tsx";

function EditCollection(){
  const navigate = useNavigate();
  const [loading, setLoading]= useState(true);
  const [collectionInput, setCollectionInput] = useState([]);
  const [error, setError] = useState([]);
  let { id } = useParams();
  useEffect(()=>{
    axios.get(`/api/edit-collection/${id}`).then(res=>{
      if(res.data.status === 200){
        setCollectionInput(res.data.collection);
      }
      else if(res.data.status === 404){
        notification.error({
          message:'Error',
          description:res.data.message,
          placement:'bottomRight'
        })
        navigate('/admin/view-category')
      }
      setLoading(false);
    });
  },[id])

  const updateCollection =(e:React.ChangeEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const collection_id = id;
    const data = collectionInput;
    axios.post(`api/update-collection/${collection_id}`,data).then(res=>{
      if(res.data.status === 200){
        notification.success({
          message:'Success',
          description:res.data.message,
          placement:'bottomRight'
        })
        setError([]);
        navigate('/admin/view-collection')
      }
      else if (res.data.status === 422){
        notification.error({
          message:'Error',
          description:res.data.message,
          placement:'bottomRight'
        })
        setError(res.data.errors);
      }
      else if(res.data.status === 404){
        notification.error({
          message:'Error',
          description:res.data.message,
          placement:'bottomRight'
        })
        navigate('admin/view-collection');
      }
    })
  }
  const handleInput=(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLFormElement>)=>{
    e.persist();
    setCollectionInput({...collectionInput,[e.target.name]:e.target.value});
  }
  const [picture, setPicture] = useState<{ image: File | null }>({ image: null });
  const handleImage = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPicture({ image: e.target.files[0] });
      console.log({ image: e.target.files[0] })
    }
  }
  if(loading){
    return (
      <>
        <Loading></Loading>
      </>
    )}
    return(
    <>
      <div className="container-fluid px-4 fade-in">
        <div className="card-header float-end">

        </div>
        <h4 className="mt-4">
          Edit Collection
          <Link to="/admin/view-collection" className="btn btn-primary btn-sm float-end">View Collection</Link>
        </h4>
        <form action="multipart/form-data" onSubmit={updateCollection} className="needs-validation g-3" >

          <div className="form-group mb-3">

            <Typography.Title level={5}>Name</Typography.Title>
            <Input type="text" name="name" onChange={handleInput} value={collectionInput.name} size="large"
                   required placeholder="Enter Name" title={"Enter Name"}
            />
            {collectionInput.error_list && collectionInput.error_list.name && (
              <div className="invalid-feedback ">
                <span>{collectionInput.error_list.name}</span>
              </div>
            )}
            {collectionInput.name && (
              <div className="text-muted float-end">{runes(collectionInput.name).length}</div>
            )}
          </div>
          <div className="form-group mb-3">
            <Typography.Title level={5}>Slug</Typography.Title>
            <Input type="text" name="slug" onChange={handleInput} value={collectionInput.slug} size="large"
                   required placeholder="Enter Slug" title="Enter Slug"

            />
            {collectionInput.error_list && collectionInput.error_list.slug && (
              <div className="invalid-feedback ">
                <span>{collectionInput.error_list.slug}</span>
              </div>
            )}
            {collectionInput.slug && (
              <div className="text-muted float-end">{runes(collectionInput.slug).length}</div>
            )}
          </div>

          <div className="col-md-4 mb-3 form-group">
            <label htmlFor="image">Image</label>
            <Input type="file" name="image" onChange={handleImage}/>
            <img src={`http://127.0.0.1:8001/${collectionInput.image}`} alt="Image" width="50px"/>

          </div>
          <div className="checkbox-wrapper-33">
            <Typography.Title level={5}>Status</Typography.Title>
            {/*<p className="checkbox__textwrapper" title={"Check: Hidden, Uncheck: Visible"}>Status</p>*/}
            <label className="checkbox">
              <Input className="checkbox__trigger visuallyhidden" name="status" onChange={handleInput}
                     value={collectionInput.status} type="checkbox" title={"Check: Hidden, Uncheck: Visible"}/>
              <span className="checkbox__symbol">
                    <svg aria-hidden="true" className="icon-checkbox" width="28px" height="28px" viewBox="0 0 28 28"
                         version="1" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 14l8 7L24 7"></path>
                    </svg>
                  </span>
            </label>
          </div>

          <button type="submit" className="btn btn-primary px-4 float-end">Edit</button>

        </form>
      </div>
    </>
  )
}
export default EditCollection
