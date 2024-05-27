
import { useEffect, useState } from 'react';
import './Category.css'
import axios from 'axios';
import { runes } from 'runes2';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {Input, message, Typography} from 'antd';
import TextArea from "antd/es/input/TextArea";


function Category() {
  (() => {
    'use strict'
    const forms = document.querySelectorAll('.needs-validation')
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
      }, false)
    })
  })()
  const [categoryInput, setCategory] = useState({
    slug: '',
    name: '',
    description: '',
    collection_id:'',
    status: '',
    meta_title: '',
    meta_keyword: '',
    meta_description: '',
    error_list: {} as { [key: string]: string },

  });
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    // e.presist();
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setCategory({ ...categoryInput, [e.target.name]: e.target.value });
    if (e.target.name === 'status') {
      console.log('Status:', value ? '1' : '0');
    }
    if (e.target.name === 'name') {
      const slug = generateSlug(value);
      setCategory((prevCategory) => ({ ...prevCategory, slug: slug }));
    }
  }
  const navigate = useNavigate();
  const submitCategory = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      slug: categoryInput.slug,
      name: categoryInput.name,
      description: categoryInput.description,
      collection_id:categoryInput.collection_id,
      status: categoryInput.status,
      meta_title: categoryInput.meta_title,
      meta_keyword: categoryInput.meta_keyword,
      meta_description: categoryInput.meta_description
    }
    axios.post(`/api/store-category`, data).then(res => {
      if (res.data.status === 200) {
        message.open({
          type: 'success',
          content: res.data.message,
        });
        navigate('/admin/view-category')
        const form_category = document.getElementById('category_form') as HTMLFormElement;
        form_category.reset();
      } else if (res.data.status === 400) {
        setCategory({ ...categoryInput, error_list: res.data.errors });
      }
    });
  }
  useEffect(() => {
    const generateSlug = (name) => {
      // Đổi tất cả ký tự thành chữ thường
      const slug = name.toLowerCase()
        // Loại bỏ các ký tự đặc biệt
        .replace(/[^\w\s]/g, '')
        // Thay thế khoảng trắng bằng dấu gạch ngang
        .replace(/\s+/g, '-');
      return slug;
    };

    const slug = generateSlug(categoryInput.name);
    setCategory((prevCategory) => ({ ...prevCategory, slug: slug }));
  }, [categoryInput.name]);
  return (
    <>
      <div className="container-fluid px-4 fade-in">
        <div className="card-header float-end">

        </div>
        <h4 className="mt-4">
          Add Category
          <Link to="/admin/view-category" className="btn btn-primary btn-sm float-end">View Category</Link>
        </h4>
        <form action="" onSubmit={submitCategory} id="category_form" className="needs-validation g-3" noValidate>

          <div className="form-group mb-3">
            <Input type="text" name="collection_id" onChange={handleInput} value={categoryInput.collection_id}></Input>
          </div>

          <div className="form-group mb-3">

            <Typography.Title level={5}>Name</Typography.Title>
            <Input type="text" name="name" onChange={handleInput} value={categoryInput.name} size="large"
            required placeholder="Enter Name" title={"Enter Name"}
            />
            {categoryInput.error_list && categoryInput.error_list.name && (
              <div className="invalid-feedback ">
                <span>{categoryInput.error_list.name}</span>
              </div>
            )}
            {categoryInput.name && (
              <div className="text-muted float-end">{runes(categoryInput.name).length}</div>
            )}

          </div>

          <div className="form-group mb-3">
            <Typography.Title level={5}>Slug</Typography.Title>
            <Input type="text" name="slug" onChange={handleInput} value={categoryInput.slug} size="large"
                   required placeholder="Enter Slug" title="Enter Slug"

            />
            {categoryInput.error_list && categoryInput.error_list.slug && (
              <div className="invalid-feedback ">
                <span>{categoryInput.error_list.slug}</span>
              </div>
            )}
            {categoryInput.slug && (
              <div className="text-muted float-end">{runes(categoryInput.slug).length}</div>
            )}
          </div>


          <div className="form-group mb-3">
            <Typography.Title level={5}>Description</Typography.Title>
            <TextArea name="description" onChange={handleInput} value={categoryInput.description} required
                      placeholder="Enter Description" title={"Enter Description"}
            />
            {categoryInput.error_list && categoryInput.error_list.description && (
              <div className="invalid-feedback ">
                <span>{categoryInput.error_list.description}</span>
              </div>
            )}
            {categoryInput.description && (
              <div className="text-muted float-end">{runes(categoryInput.description).length}</div>
            )}
          </div>

          {/* home */}

          <div className="form-group mb-3">
            <Typography.Title level={5}>Meta Title</Typography.Title>
            <Input type="text" name="meta_title" onChange={handleInput} value={categoryInput.meta_title} size="large"
                   placeholder="Enter Meta title" required title={"Enter Meta Title"}></Input>
            {categoryInput.error_list && categoryInput.error_list.meta_title && (
              <div className="invalid-feedback ">
                <span>{categoryInput.error_list.meta_title}</span>
              </div>
            )}
            {categoryInput.meta_title && (
              <div className="text-muted float-end">{runes(categoryInput.meta_title).length}</div>
            )}
          </div>
          <div className="form-group mb-3">
            <Typography.Title level={5}>Meta Keyword</Typography.Title>
            <TextArea name="meta_keyword" onChange={handleInput} value={categoryInput.meta_keyword} required
                      placeholder="Enter Meta Keyword" title={"Enter Meta Keyword"}></TextArea>
            {categoryInput.error_list && categoryInput.error_list.meta_keyword && (
              <div className="invalid-feedback ">
                <span>{categoryInput.error_list.meta_keyword}</span>
              </div>
            )}
            {categoryInput.meta_keyword && (
              <div className="text-muted float-end">{runes(categoryInput.meta_keyword).length}</div>
            )}
          </div>
          <div className="form-group mb-3">
            <Typography.Title level={5}>Meta Description</Typography.Title>
            <TextArea name="meta_description" onChange={handleInput} value={categoryInput.meta_description}
                      placeholder="Enter Meta Description" required title={"Enter Meta Description"} ></TextArea>

            {categoryInput.error_list && categoryInput.error_list.meta_description && (
              <div className="invalid-feedback ">
                <span>{categoryInput.error_list.meta_description}</span>
              </div>
            )}
            {categoryInput.meta_description && (
              <div className="text-muted float-end">{runes(categoryInput.meta_description).length}</div>
            )}

          </div>
          <div className="checkbox-wrapper-33">
            <Typography.Title level={5}>Status</Typography.Title>
            {/*<p className="checkbox__textwrapper" title={"Check: Hidden, Uncheck: Visible"}>Status</p>*/}
            <label className="checkbox">
              <Input className="checkbox__trigger visuallyhidden" name="status" onChange={handleInput}
                     value={categoryInput.status} type="checkbox" title={"Check: Hidden, Uncheck: Visible"} />
              <span className="checkbox__symbol">
                    <svg aria-hidden="true" className="icon-checkbox" width="28px" height="28px" viewBox="0 0 28 28"
                         version="1" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 14l8 7L24 7"></path>
                    </svg>
                  </span>
            </label>
          </div>
          {/* button */}
          <button type="submit" className="btn btn-primary px-4 float-end">Add</button>


        </form>
      </div>
    </>
  )
}

export default Category;
