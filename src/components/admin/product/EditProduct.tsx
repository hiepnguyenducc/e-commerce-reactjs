import axios from "axios";
import { Image } from 'antd';
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import {message} from "antd";
import Loading from "../../loading/loading";
function EditProduct() {
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [productInput, setProductInput] = useState({
        category_id:'',
        slug:'',
        name:'',
        description:'',

        meta_title:'',
        meta_keyword:'',
        meta_description:'',

        selling_price:'',
        original_price:'',
        quantity:'',
        brand:'',

        featured:'',
        popular:'',
        status:'',
        error_list: {} as { [key: string]: string },
    });
    const [picture, setPicture] = useState<{ image: File | null }>({ image: null });
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setProductInput({ ...productInput, [e.target.name]: value });
        console.log({ ...productInput, [e.target.name]: value });
    }

    const handleImage = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setPicture({ image: e.target.files[0] });
            console.log({ image: e.target.files[0] })
        }
    }
    let {id} = useParams();
    useEffect(()=>{
        axios.get(`/api/all-category`).then(res => {
            if(res.data.status === 200){
                setCategoryList(res.data.category)

                console.log(categoryList);
            }
        });
        const product_id = id;
        axios.get(`/api/edit-product/${product_id}`).then(res=>{
            if(res.data.status === 200){
               setProductInput(res.data.product);
            }
            else if (res.data.status === 404){
                message.open({
                  type:'success',
                  content:res.data.message
                })
                navigate('/admin/view-product');
            }
        });

        setLoading(false);
    },[id,navigate]);

   const updateProduct =(e:React.ChangeEvent<HTMLFormElement>)=>{
    e.preventDefault();
    // if (!picture.image) {
    //     swal("Image Required", "Please select an image.", "error");
    //     return;
    // }
    const formData = new FormData();
    const product_id = id;
    formData.append('category_id',productInput.category_id);
    formData.append('slug',productInput.slug);

    formData.append('name',productInput.name);
    formData.append('description',productInput.description);

    formData.append('meta_title',productInput.meta_title);
    formData.append('meta_keyword',productInput.meta_keyword);
    formData.append('meta_description',productInput.meta_description);

    formData.append('brand',productInput.brand);
    formData.append('selling_price',productInput.selling_price);
    formData.append('original_price',productInput.original_price);
    formData.append('quantity',productInput.quantity);

    formData.append('featured',productInput.featured);
    formData.append('popular',productInput.popular);
    formData.append('status',productInput.status);
    if (picture.image) {
        formData.append('image', picture.image);
    }

    axios.post(`/api/update-product/${product_id}`,formData).then(res => {
        if(res.data.status === 200){
           // swal("Success",res.data.message,"success");
            message.open({
              type:'success',
              content:res.data.message
            })
          navigate('/admin/view-product');
        }
        else if (res.data.status == 422){
           // swal("All files are mandetory","","error");
          message.open({
            type:'error',
            content:res.data.message
          })

        console.log("du lieu ",formData);
        }
        else if (res.data.status === 404){
           // swal("Error",res.data.message,"error");
          message.open({
            type:'error',
            content:res.data.message
          })
            navigate('/admin/view-product')
        }
    })
   }
   if(loading){
    return(
        <Loading></Loading>
    )
   }
    return (
        <>
            <div className="container-fluid px-4">
                <div className="card mt-4">
                    <div className="card-header">
                        <h4>
                            Edit Product
                            <Link to="/admin/view-product" className="btn btn-primary btn-sm float-end">View Product</Link>
                        </h4>
                    </div>
                </div>
                <div className="card-body">
                    <form action="multipart/form-data" onSubmit={updateProduct}>
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Home</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="seotag-tab" data-bs-toggle="tab" data-bs-target="#seotag-tab-pane" type="button" role="tab" aria-controls="seotag-tab-pane" aria-selected="false">SEO Tags</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="ortherdetails-tab" data-bs-toggle="tab" data-bs-target="#ortherdetails-tab-pane" type="button" role="tab" aria-controls="ortherdetails-tab-pane" aria-selected="false">Orther Details</button>
                        </li>

                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane card-body  fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" >
                            <div className="form-group mb-3">
                                <label htmlFor="category_id">Category</label>
                                <select name="category_id" onChange={handleInput} value={productInput.category_id} className="form-control">

                                    {
                                        categoryList.map(
                                            (item)=>{
                                                return(
                                                    <option value={item.id} key={item.id}>{item.name}</option>
                                                )
                                            }
                                        )
                                    }

                                </select>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="slug">Slug</label>
                                <input type="text" name="slug" onChange={handleInput} value={productInput.slug} className="form-control"/>
                                <div className="invalid-feedback">
                  {productInput.error_list && productInput.error_list.slug && <span>{productInput.error_list.slug}</span>}
                </div>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" onChange={handleInput} value={productInput.name} className="form-control"/>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="description">Description</label>
                                <textarea  name="description" onChange={handleInput} value={productInput.description} className="form-control"/>
                            </div>

                        </div>
                        <div className="tab-pane card-body  fade" id="seotag-tab-pane" role="tabpanel" aria-labelledby="seotag-tab" >
                            <div className="form-group mb-3">
                                <label htmlFor="meta_title">Meta Title</label>
                                <input type="text" name="meta_title" onChange={handleInput} value={productInput.meta_title} className="form-control"/>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="meta_keyword">Meta Keyword</label>
                                <input type="text" name="meta_keyword" onChange={handleInput} value={productInput.meta_keyword} className="form-control"/>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="meta_description">Meta Description</label>
                                <input type="text" name="meta_description" onChange={handleInput} value={productInput.meta_description} className="form-control"/>
                            </div>
                        </div>
                        <div className="tab-pane card-body fade" id="ortherdetails-tab-pane" role="tabpanel" aria-labelledby="ortherdetails-tab" >
                            <div className="row">
                                <div className="col-md-4 mb-3 form-group" >
                                    <label htmlFor="selling_price">Selling Price</label>
                                    <input type="text" name="selling_price" onChange={handleInput} value={productInput.selling_price} className="form-control"/>
                                </div>
                                <div className="col-md-4 mb-3 form-group" >
                                    <label htmlFor="original_price">Original Price</label>
                                    <input type="text" name="original_price" onChange={handleInput} value={productInput.original_price} className="form-control"/>
                                </div>
                                <div className="col-md-4 mb-3 form-group" >
                                    <label htmlFor="quantity">Quantity</label>
                                    <input type="text" name="quantity" onChange={handleInput} value={productInput.quantity} className="form-control"/>
                                </div>
                                <div className="col-md-4 mb-3 form-group" >
                                    <label htmlFor="brand">Brand</label>
                                    <input type="text" name="brand" onChange={handleInput} value={productInput.brand} className="form-control"/>
                                </div>
                                <div className="col-md-8 mb-3 form-group" >
                                    <label htmlFor="image">Image</label>
                                    <input type="file" name="image" onChange={handleImage} className="form-control"/>
                                    <Image src={`http://127.0.0.1:8001/${productInput.image}`} alt="Image" width="50px"/>
                                </div>
                                <div className="col-md-4 mb-3 form-group" >
                                    <label htmlFor="featured">Featured</label>
                                    <input type="checkbox" name="featured" onChange={handleInput} value={productInput.featured} className="w-50 h-50"/>
                                </div>
                                <div className="col-md-4 mb-3 form-group" >
                                    <label htmlFor="popular">Popular</label>
                                    <input type="checkbox" name="popular" onChange={handleInput} value={productInput.popular} className="w-50 h-50"/>
                                </div>
                                <div className="col-md-4 mb-3 form-group" >
                                    <label htmlFor="status">Status</label>
                                    <input type="checkbox" name="status" onChange={handleInput} value={productInput.status} className="w-50 h-50"/>
                                </div>
                            </div>
                        </div>

                    </div>
                    <button type="submit" className="btn btn-primary px-4 mt-2 float-end">Update</button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default EditProduct;
