import axios, { formToJSON } from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { Select, Space, Row, Col, Input } from "antd";
import { message } from "antd";
import TextArea from "antd/es/input/TextArea";

function AddProduct() {
    const [categoryList, setCategoryList] = useState<{id: string, name:string}[]>([]);
    const navigate = useNavigate();
    const [productInput, setProductInput] = useState({
        category_id: '',
        slug: '',
        name: '',
        description: '',

        meta_title: '',
        meta_keyword: '',
        meta_description: '',

        selling_price: '',
        original_price: '',
        quantity: '',
        brand_id: '',

        featured: '',
        popular: '',
        sale: '',
        status: '',
        error_list: {} as { [key: string]: string },
    });

    const [picture, setPicture] = useState<{ image: File | null }>({ image: null });
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setProductInput({ ...productInput, [e.target.name]: value });
        console.log({ ...productInput, [e.target.name]: value });
    }

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setPicture({ image: e.target.files[0] });
            console.log({ image: e.target.files[0] })
        }
    }

    useEffect(() => {
        axios.get(`/api/all-category`).then(res => {
            if (res.data.status === 200) {
                setCategoryList(res.data.category)
                console.log(categoryList);
            }
        })
    }, []);

    const submitProduct = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!picture.image) {
            message.open({
                type: 'error',
                content: 'Please select an image !!'
            })
            // swal("Image Required", "Please select an image.", "error");
            return;
        }
        const formData = new FormData();

        formData.append('category_id', productInput.category_id);
        formData.append('slug', productInput.slug);

        formData.append('name', productInput.name);
        formData.append('description', productInput.description);

        formData.append('meta_title', productInput.meta_title);
        formData.append('meta_keyword', productInput.meta_keyword);
        formData.append('meta_description', productInput.meta_description);

        formData.append('brand_id', productInput.brand_id);
        formData.append('selling_price', productInput.selling_price);
        formData.append('original_price', productInput.original_price);
        formData.append('quantity', productInput.quantity);

        formData.append('featured', productInput.featured);
        formData.append('popular', productInput.popular);
        formData.append('sale', productInput.sale);
        formData.append('status', productInput.status);
        if (picture.image) {
            formData.append('image', picture.image);
        }

        axios.post(`/api/store-product`, formData).then(res => {

            if (res.data.status === 200) {
                message.open({
                    type: 'success',
                    content: res.data.message
                })
                navigate('/admin/view-product')

            }
            else if (res.data.status == 422) {
                message.open({
                    type: 'error',
                    content: "All files are mandetory !"
                })

                setProductInput({
                    ...productInput,
                    category_id: '',
                    slug: '',
                    name: '',
                    description: '',

                    meta_title: '',
                    meta_keyword: '',
                    meta_description: '',

                    selling_price: '',
                    original_price: '',
                    quantity: '',
                    brand_id: '',

                    featured: '',
                    popular: '',
                    status: '',
                });

                console.log("du lieu ", formData);
            }
        })

    }
    return (
        <>
            <div className="container-fluid px-4">
                <div className="card mt-4">
                    <div className="card-header">
                        <h4>
                            Add product
                            <Link to="/admin/view-product" className="btn btn-primary btn-sm float-end">View Product</Link>
                        </h4>
                    </div>
                </div>
                <div className="card-body">
                    <form action="multipart/form-data" onSubmit={submitProduct}>
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
                                <Row>
                                    <Col span={12}>
                                    <div className="form-group mb-3">
                                <label htmlFor="category_id">Category</label>
                                <br />
                                   <Space wrap>
                                <Select
                                    name="category_id"
                                    onChange={value => setProductInput({ ...productInput, category_id: value })}
                                    value={productInput.category_id}
                                    style={{ width: 880, height: 38 }}
                                >
                                    <Select.Option value="">Select category</Select.Option>
                                    {categoryList.map(item => (
                                        <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                                    ))}
                                </Select>
                                 </Space>
                            </div>
                                    </Col>
                                    <Col span={12}>
                                     <div className="form-group mb-3">
                                    <label htmlFor="slug">Slug</label>
                                    <Input type="text" name="slug" onChange={handleInput} value={productInput.slug} size="large" placeholder="Slug"  />

                                    <div className="invalid-feedback">
                                        {productInput.error_list && productInput.error_list.slug && <span>{productInput.error_list.slug}</span>}
                                    </div>
                                </div>
                                    </Col>
                                </Row>


                                <div className="form-group mb-3">
                                    <label htmlFor="name">Name</label>
                                    <Input type="text" name="name" onChange={handleInput} size="large" value={productInput.name}  />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="description">Description</label>
                                    <TextArea name="description" onChange={handleInput} value={productInput.description} />
                                </div>

                            </div>
                            <div className="tab-pane card-body  fade" id="seotag-tab-pane" role="tabpanel" aria-labelledby="seotag-tab" >
                                <div className="form-group mb-3">
                                    <label htmlFor="meta_title">Meta Title</label>
                                    <Input size="large" type="text" name="meta_title" onChange={handleInput} value={productInput.meta_title}  />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="meta_keyword">Meta Keyword</label>
                                    <Input size="large" type="text" name="meta_keyword" onChange={handleInput} value={productInput.meta_keyword}  />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="meta_description">Meta Description</label>
                                    <Input size="large" type="text" name="meta_description" onChange={handleInput} value={productInput.meta_description}  />
                                </div>
                            </div>
                            <div className="tab-pane card-body fade" id="ortherdetails-tab-pane" role="tabpanel" aria-labelledby="ortherdetails-tab" >
                                <div className="row">
                                    <div className="col-md-4 mb-3 form-group" >
                                        <label htmlFor="selling_price">Selling Price</label>
                                        <Input size="large" type="text" name="selling_price" onChange={handleInput} value={productInput.selling_price}  />
                                    </div>
                                    <div className="col-md-4 mb-3 form-group" >
                                        <label htmlFor="original_price">Original Price</label>
                                        <Input size="large" type="text" name="original_price" onChange={handleInput} value={productInput.original_price}  />
                                    </div>
                                    <div className="col-md-4 mb-3 form-group" >
                                        <label htmlFor="quantity">Quantity</label>
                                        <Input size="large" type="text" name="quantity" onChange={handleInput} value={productInput.quantity}  />
                                    </div>
                                    <div className="col-md-4 mb-3 form-group" >
                                        <label htmlFor="brand_id">Brand</label>
                                        <Input size="large" type="text" name="brand_id" onChange={handleInput} value={productInput.brand_id}  />
                                    </div>
                                    <div className="col-md-8 mb-3 form-group" >
                                        <label htmlFor="image">Image</label>
                                        <Input type="file" name="image" onChange={handleImage} />
                                        <img src={`http://127.0.0.1:8000/${productInput.image}`} alt="Image" width="50px" />
                                    </div>
                                    <div className="col-md-4 mb-3 form-group" >
                                        <label htmlFor="featured">Featured</label>
                                        <Input size="large" type="checkbox" name="featured" onChange={handleInput} value={productInput.featured} className="w-50 h-50" />
                                    </div>
                                    <div className="col-md-4 mb-3 form-group" >
                                        <label htmlFor="popular">Popular</label>
                                        <Input size="large" type="checkbox" name="popular" onChange={handleInput} value={productInput.popular} className="w-50 h-50" />
                                    </div>
                                    <div className="col-md-4 mb-3 form-group" >
                                        <label htmlFor="popular">Sale</label>
                                        <Input size="large" type="checkbox" name="sale" onChange={handleInput} value={productInput.sale} className="w-50 h-50" />
                                    </div>
                                    <div className="col-md-4 mb-3 form-group" >
                                        <label htmlFor="status">Status</label>
                                        <Input size="large" type="checkbox" name="status" onChange={handleInput} value={productInput.status} className="w-50 h-50" />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <button type="submit" className="btn btn-primary px-4 mt-2 float-end">Add</button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default AddProduct;
