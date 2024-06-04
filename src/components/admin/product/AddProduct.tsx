import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {Select, Space, Row, Col, Input, DatePicker, GetProps, DatePickerProps} from "antd";
import { message } from "antd";
import TextArea from "antd/es/input/TextArea";

function RangePicker(props: {
  onChange: (value, dateString) => void,
  showTime: { format: string },
  format: string,
  onOk: any
}) {
  return null;
}

function AddProduct() {
    const [categoryList, setCategoryList] = useState<{id: string, name:string}[]>([]);
    const [brandList, setBrandList] = useState<{id:string,name:string}[]>([]);
    const [sizeList,setSizeList]= useState<{id:string,name:string}[]>([]);
    const [colorList,setColorList]= useState<{id:string,name:string}[]>([]);
    const [collection, setCollection]= useState<{id:string,name:string}[]>([])
  const [saleDates, setSaleDates] = useState<[string, string]>(['', '']);

    const navigate = useNavigate();
    const [productInput, setProductInput] = useState({
        category_id: '',

         color_id:'',
      color_quantity:'',
        size_id:'',
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
      sale_start_date:'',
      sale_end_date:'',
      collection_id:'',
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
        axios.get(`/api/getCollection`).then(res=>{
          if(res.data.status===200){
            setCollection(res.data.collection)
          }
        })
    }, []);
  useEffect(() => {
    axios.get(`/api/all-brand`).then(res=>{
      if(res.data.status === 200){
        setBrandList(res.data.brand)
        console.log(brandList)
      }
    })
  }, []);
  useEffect(() => {
    axios.get(`/api/view-color`).then(res=>{
      if(res.data.status===200){
        setColorList(res.data.color)
        
      }
    })
    console.log("color",colorList)
  }, []);
  useEffect(() => {
    axios.get(`/api/all-size`).then(res=>{
      if(res.data.status===200){
        setSizeList(res.data.size)
        console.log("size",sizeList)
      }
    })
  }, []);
  const onDateRangeChange = (dates, dateStrings) => {
    console.log("dates:", dates);
    console.log("dateStrings:", dateStrings);

    setProductInput(prevState => ({
      ...prevState,
      sale_start_date: dateStrings[0],
      sale_end_date: dateStrings[1],
    }));
  };

  type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

  const { RangePicker } = DatePicker;

  const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
    console.log('onOk: ', value);
  };
    const submitProduct = (e: React.ChangeEvent<HTMLFormElement>) => {
      console.log("sale_start_date:", productInput.sale_start_date);
      console.log("sale_end_date:", productInput.sale_end_date);
        e.preventDefault();
        if (!picture.image) {
            message.open({
                type: 'error',
                content: 'Please select an image !!'
            })
            return;
        }
        const formData = new FormData();

        formData.append('category_id', productInput.category_id);
      formData.append('color_id', productInput.color_id);
      formData.append('size_id', productInput.size_id);
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
      formData.append('sale_start_date', productInput.sale_start_date);
      formData.append('sale_end_date', productInput.sale_end_date);
      formData.append('collection_id',productInput.collection_id);
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
                  color_id: '',
                  size_id: '',

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
          <div className="container-fluid px-4 fade-in">
            <h4 className="mt-4">
              Add product
              <Link to="/admin/view-product" className="btn btn-primary btn-sm float-end">View Product</Link>
            </h4>
              <form action="multipart/form-data" onSubmit={submitProduct}>

                  <Row gutter={[16, 16]}>
                    <Col span={6}>
                      <div className="form-group mb-3">
                        <label htmlFor="category_id">Category</label>
                        <br/>
                        <Space wrap>
                          <Select
                            name="category_id"
                            onChange={value => setProductInput({...productInput, category_id: value})}
                            value={productInput.category_id}
                            style={{width: 400, height: 38}}
                          >
                            <Select.Option value="">Select category</Select.Option>
                            {categoryList.map(item => (
                              <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                            ))}
                          </Select>
                        </Space>
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="form-group mb-3">
                        <label htmlFor="collection_id">Collection</label>
                        <br/>
                        <Space wrap>
                          <Select
                            name="collection_id"
                            onChange={value => setProductInput({...productInput, collection_id: value})}
                            value={productInput.collection_id}
                            style={{width: 400, height: 38}}
                          >
                            <Select.Option value="">Select collection</Select.Option>
                            {collection.map(item => (
                              <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                            ))}
                          </Select>
                        </Space>
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="form-group mb-3">
                        <label htmlFor="brand_id">Brand</label>
                        <br/>
                        <Space wrap>
                          <Select
                            name="brand_id"
                            onChange={value => setProductInput({...productInput, brand_id: value})}
                            value={productInput.brand_id}
                            style={{width: 400, height: 38}}
                          >
                            <Select.Option value="">Select Brand</Select.Option>
                            {brandList.map(item => (
                              <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                            ))}
                          </Select>
                        </Space>
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="form-group mb-3">
                        <label htmlFor="color_id">Color</label>
                        <br/>
                        <Space wrap>
                          <Select
                            name="color_id"
                            onChange={value => setProductInput({...productInput, color_id: value})}
                            value={productInput.color_id}
                            style={{width: 400, height: 38}}
                          >
                            <Select.Option value="">Select Color</Select.Option>
                            {colorList.map(item => (
                              <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                            ))}
                          </Select>
                        
                        </Space>

                      </div>

                    </Col>
                    <Col span={6}>
                      <div className="form-group mb-3">
                        <label htmlFor="size_id">Size</label>
                        <br/>
                        <Space wrap>
                          <Select
                            name="size_id"
                            onChange={value => setProductInput({...productInput, size_id: value})}
                            value={productInput.size_id}
                            style={{width: 400, height: 38}}
                          >
                            <Select.Option value="">Select Size</Select.Option>
                            {sizeList.map(item => (
                              <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                            ))}
                          </Select>
                        </Space>
                      </div>
                    </Col>
                  </Row>
                  <div className="form-group mb-3">
                    <label htmlFor="name">Name</label>
                    <Input type="text" name="name" onChange={handleInput} size="large"
                           value={productInput.name}/>
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="slug">Slug</label>
                    <Input type="text" name="slug" onChange={handleInput} value={productInput.slug}
                           size="large" placeholder="Slug"/>
                    <div className="invalid-feedback">
                      {productInput.error_list && productInput.error_list.slug &&
                        <span>{productInput.error_list.slug}</span>}
                    </div>
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="description">Description</label>
                    <TextArea name="description" onChange={handleInput} value={productInput.description}/>
                  </div>
                <div className="form-group mb-3">
                  <label htmlFor="meta_title">Meta Title</label>
                  <Input size="large" type="text" name="meta_title" onChange={handleInput}
                         value={productInput.meta_title}/>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="meta_keyword">Meta Keyword</label>
                  <Input size="large" type="text" name="meta_keyword" onChange={handleInput}
                         value={productInput.meta_keyword}/>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="meta_description">Meta Description</label>
                  <Input size="large" type="text" name="meta_description" onChange={handleInput}
                         value={productInput.meta_description}/>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3 form-group">
                    <label htmlFor="original_price">Original Price</label>
                    <Input size="large" type="text" name="original_price" onChange={handleInput}
                           value={productInput.original_price}/>
                  </div>
                  <div className="col-md-4 mb-3 form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <Input size="large" type="text" name="quantity" onChange={handleInput}
                           value={productInput.quantity}/>
                  </div>
                  <div className="col-md-4 mb-3 form-group">
                    <label htmlFor="selling_price">Selling Price</label>
                    <Input size="large" type="text" name="selling_price" onChange={handleInput}
                           value={productInput.selling_price} disabled={!productInput.sale}
                    title={!productInput.sale?'Please enable sale to edit the sale price':''}/>
                  </div>
                </div>
                <div className="row">

                  <div className="col-md-4 mb-3 form-group">
                    <label htmlFor="featured">Featured</label>
                    <Input size="large" type="checkbox" name="featured" onChange={handleInput}
                           value={productInput.featured} className="w-50 h-50"/>
                  </div>
                  <div className="col-md-4 mb-3 form-group">
                    <label htmlFor="popular">Sale</label>
                    <Input size="large" type="checkbox" name="sale" onChange={handleInput}
                           value={productInput.sale} className="w-50 h-50"/>
                  </div>
                  <div className="col-md-4 mb-3 form-group">
                    <label htmlFor="popular">Popular</label>
                    <Input size="large" type="checkbox" name="popular" onChange={handleInput}
                           value={productInput.popular} className="w-50 h-50"/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 mb-3 form-group">
                    <label htmlFor="image">Image</label>
                    <Input type="file" name="image" multiple onChange={handleImage}/>
                    <img src={picture.image ? URL.createObjectURL(picture.image) : ''} alt="Image" width="50px"/>

                  </div>
                  <div className="col-md-4 mb-3 form-group">
                    <Space direction="vertical" size={0}>
                      <label htmlFor="image">Time Sale</label>
                      <RangePicker
                        size="large"
                        showTime={{format: 'HH:mm'}}
                        format="YYYY-MM-DD HH:mm"
                        onChange={onDateRangeChange}
                        onOk={onOk}
                        disabled={!productInput.sale}
                        title={!productInput.sale ? 'Please enable sale to edit date':''}
                      />
                    </Space>
                  </div>
                  <div className="col-md-4 mb-3 form-group">
                    <label htmlFor="status">Status</label>
                    <Input size="large" type="checkbox" name="status" onChange={handleInput}
                           value={productInput.status} className="w-20 h-20"/>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary px-4 mt-2 float-end">Add</button>
              </form>
          </div>
        </>
    )
}

export default AddProduct;
