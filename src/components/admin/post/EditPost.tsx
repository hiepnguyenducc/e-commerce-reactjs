import {Link, useNavigate, useParams} from "react-router-dom";
import {Input, message, notification, Typography} from "antd";
import {runes} from "runes2";
import TextArea from "antd/es/input/TextArea";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Loading from "../../loading/loading.tsx";

function EditPost (){
  const [loading, setLoading] = useState(true);
  const [postInput, setPostInput] = useState({
    slug: '',
    title: '',
    content: '',
    error_list: {} as { [key: string]: string },

  });
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    // e.presist();

    setPostInput({ ...postInput, [e.target.name]: e.target.value });



  }
  const [picture, setPicture]= useState<{image:File|null}>({image:null});

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPicture({ image: e.target.files[0] });
      console.log({ image: e.target.files[0] })
    }
  }
  const navigate = useNavigate();
  let {id}=useParams();
  const post_id = id;
  useEffect(() => {
    axios.get(`api/edit-post/${post_id}`).then(res=>{
      if(res.data.status===200){
        setPostInput(res.data.post);
      }else if(res.data.status==404){
        message.open({
          type:'error',
          content:res.data.message
        })
        navigate('/admin/view-brand');
      }
    })
    setLoading(false);
  }, [id,navigate]);
  const updatePost = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!picture.image) {
      notification.error({
        message:'Error',
        description:"Please select an image",
        placement:'bottomRight'
      })
      return;
    }
    const formData = new FormData();
    const post_id = id;
    formData.append('slug',postInput.slug);
    formData.append('title',postInput.title);
    formData.append('content',postInput.content);

    if (picture.image) {
      formData.append('image', picture.image);
    }

    axios.post(`/api/update-post/${post_id}`, formData).then(res => {
      if (res.data.status === 200) {
        notification.success({
          message:'Success',
          description:res.data.message,
          placement:'bottomRight'
        })
        navigate('/admin/view-post')
        const form_category = document.getElementById('category_form') as HTMLFormElement;
        form_category.reset();
      } else if (res.data.status === 422) {
        notification.error({
          message:'Error',
          description:res.data.message,
          placement:'bottomRight'
        })
        setPostInput({ ...postInput, error_list: res.data.errors });
      }
      else if(res.data.status === 404){
        notification.error({
          message:'Error',
          description:res.data.message,
          placement:'bottomRight'
        })
        navigate('/admin/view-brand')
      }
      console.log("du lieu", formData)
    });
  }
  if(loading){
    return (
      <Loading></Loading>
    )
  }
  return (
    <>
      <div className="container-fluid px-4 fade-in">
        <div className="card-header float-end">

        </div>
        <h4 className="mt-4">
          Edit Post
          <Link to="/admin/view-post" className="btn btn-primary btn-sm float-end">View Post</Link>
        </h4>
        <form action="multipart/form-data" onSubmit={updatePost} className="needs-validation g-3" >

          <div className="form-group mb-3">

            <Typography.Title level={5}>Title</Typography.Title>
            <Input type="text" name="title" onChange={handleInput} value={ postInput.title} size="large"
                   required placeholder="Enter title" title={"Enter title"}
            />


          </div>
          <div className="form-group mb-3">
            <Typography.Title level={5}>Slug</Typography.Title>
            <Input type="text" name="slug" onChange={handleInput} value={postInput.slug} size="large"
                   required placeholder="Enter Slug" title="Enter Slug"
            />
          </div>
          <div className="form-group mb-3">
            <Typography.Title level={5}>Content</Typography.Title>
            <TextArea name="content" onChange={handleInput} value={postInput.content} required
                      placeholder="Enter content" title={"Enter Content"}
            />

          </div>

          <div className="col-md-4 mb-3 form-group">
            <label htmlFor="image">Image</label>
            <Input type="file" name="image" onChange={handleImage}/>
            <img src={`http://127.0.0.1:8001/${postInput.image}`} alt="Image" width="50px"/>

          </div>
          {/* button */}
          <button type="submit" className="btn btn-primary px-4 float-end">Add</button>

        </form>
      </div>
    </>
  )
}
export default EditPost
