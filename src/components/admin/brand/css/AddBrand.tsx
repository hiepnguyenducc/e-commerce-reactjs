import { Link } from "react-router-dom"
import { Button, Input } from "antd";
import { ChangeEvent, useState } from "react";
function AddBrand() {
    const [brandInput, setBrand]= useState({
        name:'',
        slug:'',
        description:'',
        meta_title:'',
        meta_keyword:'',
        meta_description:''
    });
    const submitBrand = (e:React.ChangeEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const data = {
            name:brandInput.name,
            slug:brandInput.slug,
            description:brandInput.description,
            meta_title:brandInput.meta_title,
        }
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
                <form action="" onSubmit={submitBrand} id="brand_form">

                <div className="form-group mb-3">
                    <label htmlFor="name">Name</label>
                    <Input size="large" name="name" placeholder="Name" />
                </div>
                    
                <div className="form-group mb-3">
                    <label htmlFor="name">Slug</label>
                    <Input size="large" name="slug" placeholder="Slug" />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="name">Description</label>
                    <Input size="large" name="description" placeholder="Description" />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="name">Meta_Title</label>
                    <Input size="large" name="meta_title" placeholder="Meta_Title" />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="name">Meta_Keyword</label>
                    <Input size="large" name="meta_keyword" placeholder="Meta_Keyword" />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="name">Meta_Description</label>
                    <Input size="large" name="meta_description" placeholder="Meta_Description" />
                </div>
                <Button type="primary" htmlType="submit" className="float-end"> Add</Button>
                </form>
                </div>
            </div>
        </>
    )
}
export default AddBrand