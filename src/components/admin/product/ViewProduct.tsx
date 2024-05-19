import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../loading/loading";
import { Image } from 'antd';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import {message} from "antd";
import { Button, Popconfirm } from 'antd';

interface Product {
    id: number;
    category_id: {
        id: number;
        name: string;
    };
    slug: string;
    name: string;
    description: string;
    meta_title: string;
    meta_keyword: string;
    meta_description: string;
    brand: string;
    selling_price: number;
    original_price: number;
    quantity: number;
    image: string;
    featured: boolean;
    popular: boolean;
    status: string;
}
function ViewProduct() {
    const [viewProduct,setProduct] = useState<Product[]>([]);
    const[viewCategory, setCategory] = useState<{id:string, name:string}[]>([]);
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        document.title = "View Product"
        axios.get(`/api/view-product`).then(res=>{
                if(res.data.status === 200){
                    setProduct(res.data.product)
                    setLoading(false);
                }
        })
    });
    useEffect(()=>{
        axios.get(`/api/view-category`).then(res=>{
            if(res.data.status === 200){
                setCategory(res.data.category)
            }
        })
    })
    const handleDelete= async (id:string)=>{
        axios(`/api/delete-product/${id}`).then(res=>{
            if(res.data.status === 200){
              message.open({
                type:'success',
                content: res.data.message
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
        {title: 'Id', dataIndex: 'id',key: 'id',},
        {
            title: 'Category Name',
            dataIndex: 'category_id',
            key: 'category_id',
            render: (category_id: number) => {
                const category = viewCategory.find((category) => category.id === category_id);
                return category ? category.name : 'N/A';
            },
        },
        {title: 'Slug',dataIndex: 'slug',key: 'slug',},
        {title: 'Product Name',dataIndex: 'name',key: 'name',},
        {title: 'Description',dataIndex: 'description',key: 'description',},
        {title: 'Brand', dataIndex: 'brand', key: 'brand'},
        {title: 'Selling_price',dataIndex: 'selling_price',key: 'selling_price'},
        {title: 'Original_price',dataIndex: 'original_price',key: 'original_price'},
        {title: 'Quantity',dataIndex: 'quantity', key: 'quantity'},  
        {title: 'Image',dataIndex: 'image',key: 'image',render: (image: string) => <Image src={`http://127.0.0.1:8001/${image}`} width={50} />, },
        {title: 'Featured', dataIndex: 'featured',key: 'featured'}, 
        {title: 'Popular',dataIndex: 'popular',key: 'popular'},
        {title: 'Status', dataIndex: 'status',key: 'status'},
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Link to={`/admin/edit-product/${record.id}`} className="btn btn-success btn-sm">Edit</Link>
                    <Popconfirm
                        title="Are you sure to delete this task?"
                        onConfirm={() => handleDelete(record.id.toString())}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
   
    if(loading){
       return <Loading></Loading>
    }
    else{
       
    }
    return (
        <>
            <div className="container-fuild px-4 mt-4 fade-in">
                <div className="card-header">
                    <h4>
                        View product
                        <Link to="/admin/add-product" className="btn btn-primary float-end"> Add product</Link>
                    </h4>
                </div>
                <Table columns={columns} dataSource={viewProduct} />
            </div>
        </>
    )
}
export default ViewProduct;
