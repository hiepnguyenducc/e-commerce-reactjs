import {Link, useNavigate} from "react-router-dom"
import {Button, Input, message, } from "antd";

import React, { useState } from "react";
import axios from "axios";

function AddBrand() {
  const navigate = useNavigate();;
  const [picture, setPicture] = useState<{image: File| null}>({image:null})
    const handleImage = (e:React.ChangeEvent<HTMLInputElement>)=>{
    if(e.target.files && e.target.files.length>0){
      setPicture({image:e.target.files[0]});
      console.log({image: e.target.files[0]})
    }
  }

  const handleInput = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const value = e.target.type === 'checkbox' ? e.target.checked: e.target.value;
    setBrandInput({...brandInput,[e.target.name]: value})
    console.log({...brandInput,[e.target.name]:value});
  }
    const [brandInput, setBrandInput]= useState({
        name:'',
        slug:'',
        description:'',
        meta_title:'',
        meta_keyword:'',
        meta_description:''
    });
    const submitBrand = (e:React.ChangeEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if (!picture.image){
          message.open({
            type:'error',
            content:'Please select an image !!'
          });
          return;
        }
        const formData = new FormData();
        formData.append('name',brandInput.name);
        formData.append('slug', brandInput.slug);
        formData.append('description', brandInput.description);
        formData.append('meta_title', brandInput.meta_title);
        formData.append('meta_keyword', brandInput.meta_keyword);
        formData.append('meta_description', brandInput.meta_description);
        if (picture.image){
          formData.append('image', picture.image);
        }
        axios.post(`/api/store-brand`, formData).then(res =>{
          if(res.data.status === 200){
            message.open({
              type:'success',
              content: res.data.message
            })
            navigate('/admin/view-brand')
          }else if(res.data.status === 422){
            message.open({
              type:'error',
              content:'All files are mandatory !!'
            })
            setBrandInput({
              ...brandInput,
              name: '',
              slug: '',
              description: '',
              meta_title: '',
              meta_keyword: '',
              meta_description: ''
            })
            console.log("du lieu ", formData);
          }
        })
    }

    return (
        <>
            <div className="container-fuild px-4 mt-4 fade-in">

                <div className="card-hearder">
                    <h4>
                        Add Brand
                        <Link to="/admin/view-brand" className="btn btn-primary btn-sm float-end">
                            View Brand
                        </Link>
                    </h4>
                </div>
                <div className="card-body">
                <form action="multipart/form-data" onSubmit={submitBrand} id="brand_form">

                <div className="form-group mb-3">
                    <label htmlFor="name">Name</label>
                    <Input size="large" name="name" placeholder="Name" onChange={handleInput} value={brandInput.name} />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="name">Slug</label>
                    <Input size="large" name="slug" onChange={handleInput} value={brandInput.slug} placeholder="Slug" />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="name">Description</label>
                    <Input size="large" name="description" onChange={handleInput} value={brandInput.description} placeholder="Description" />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="name">Meta_Title</label>
                    <Input size="large" name="meta_title" onChange={handleInput} value={brandInput.meta_title} placeholder="Meta_Title" />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="name">Meta_Keyword</label>
                    <Input size="large" name="meta_keyword" onChange={handleInput} value={brandInput.meta_keyword} placeholder="Meta_Keyword" />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="name">Meta_Description</label>
                    <Input size="large" name="meta_description" onChange={handleInput} value={brandInput.meta_description} placeholder="Meta_Description" />
                </div>
                  <div className="form-group mb-3">
                    <label htmlFor="name">Image</label>


                    <Input type="file" name="image" onChange={handleImage} />
                    <img src={`http://127.0.0.1:8001/${brandInput.image}`} alt="Image" width="50px" />

                </div>

                <Button type="primary" htmlType="submit" className="float-end"> Add</Button>
                </form>
                </div>
            </div>
        </>
    )
}
export default AddBrand
