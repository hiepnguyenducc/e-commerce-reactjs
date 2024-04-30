import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Loading from "../../loading/loading";
import {message} from "antd";

function EditCategory() {
    const navigate = useNavigate();
    const [loading, setLoading]= useState(true);
    const [categoryInput, setCategory] = useState([]);
    const [error, setError] = useState([]);

    let { id } = useParams();
    useEffect(()=>{
        axios.get(`/api/edit-category/${id}`).then(res=>{
            if(res.data.status === 200){
                setCategory(res.data.category);

            }
            else if(res.data.status === 404){
                swal("Error", res.data.message,"error");
                navigate('/admin/view-category')
            }
            setLoading(false);
        });
    },[id])
    const handleInput=(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLFormElement>)=>{
        e.persist();
        setCategory({...categoryInput,[e.target.name]:e.target.value});
    }
    const UpdateCategory =(e:React.ChangeEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const category_id = id;
        const data = categoryInput;
        axios.put(`api/update-category/${category_id}`,data).then(res=>{
            if(res.data.status === 200){
                message.open({
                  type:'success',
                  content:res.data.message,
                })
                setError([]);
                navigate('/admin/view-category')
            }
            else if (res.data.status === 422){
                swal("All fields are mandetory","","error");
                message.open({
                  type:'error',
                  content:res.data.message
                })
                setError(res.data.errors);
            }
            else if(res.data.status === 404){
              message.open({
                type:'error',
                content:res.data.message
              })
                navigate('admin/view-category');
            }
        })
    }
    if(loading){
        return (
            <>
            <Loading></Loading>

            </>
        )
    }
    return (
        <>

            <div className="container-fulid px-4">
                <div className="card mt-4">
                    <div className="card-header">
                        <h4>
                                Edit Category
                            <Link to="/admin/view-category" className="btn btn-primary btn-sm float-end">Back</Link>
                        </h4>
                    </div>
                    <form onSubmit={UpdateCategory}>
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Home</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">SEO tags</button>
                            </li>

                        </ul>

                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane card-body fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="form-group mb-3">
                                    <label>Slug</label>
                                    <input type="text" name="slug" onChange={handleInput} value={categoryInput.slug} className="form-control"></input>

                                </div>
                                <div className="form-group mb-3">
                                    <label>Name</label>
                                    <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control"></input>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Description</label>
                                    <textarea name="description" onChange={handleInput} value={categoryInput.description} className="form-control"></textarea>
                                </div>
                                <div className="checkbox-wrapper-33">
                                    <p className="checkbox__textwrapper">Status</p>
                                    <label className="checkbox">

                                        <input className="checkbox__trigger visuallyhidden" name="status" onChange={handleInput} value={categoryInput.status} type="checkbox" />
                                        <span className="checkbox__symbol">
                                            <svg aria-hidden="true" className="icon-checkbox" width="28px" height="28px" viewBox="0 0 28 28" version="1" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4 14l8 7L24 7"></path>
                                            </svg>
                                        </span>

                                    </label>
                                </div>
                            </div>
                            {/* home */}
                            <div className="tab-pane card-body fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab" >
                                <div className="form-group mb-3">
                                    <label>Meta Title</label>
                                    <input type="text" name="meta_title" onChange={handleInput} value={categoryInput.meta_title} className="form-control"></input>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Meta keyword</label>
                                    <textarea name="meta_keyword" onChange={handleInput} value={categoryInput.meta_keyword} className="form-control"></textarea>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Meta Description</label>
                                    <textarea name="meta_description" onChange={handleInput} value={categoryInput.meta_description} className="form-control"></textarea>
                                </div>
                            </div>
                            {/* button */}
                            <button className="btn btn-primary px-4 float-end">Submit</button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}
export default EditCategory;
