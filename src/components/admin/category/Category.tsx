
import { useEffect, useState } from 'react';
import './css/Category.css'
import axios from 'axios';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

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
  }
  const navigate = useNavigate();


  const submitCategory = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      slug: categoryInput.slug,
      name: categoryInput.name,
      description: categoryInput.description,
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
                <label htmlFor="slug" className="form-label">Slug</label>
                <input type="text" name="slug" onChange={handleInput} value={categoryInput.slug} className="form-control" required></input>
                <div className="invalid-feedback">
                  {categoryInput.error_list && categoryInput.error_list.slug && <span>{categoryInput.error_list.slug}</span>}
                </div>
              </div>

              <div className="form-group mb-3">
                <label>Name</label>
                <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control" required></input>
                <div className="invalid-feedback">
                  {categoryInput.error_list && categoryInput.error_list.name && <span>{categoryInput.error_list.name}</span>}
                </div>
              </div>
              <div className="form-group mb-3">
                <label>Description</label>
                <textarea name="description" onChange={handleInput} value={categoryInput.description} className="form-control" required></textarea>
                <div className="invalid-feedback">
                  {categoryInput.error_list && categoryInput.error_list.description && <span>{categoryInput.error_list.description}</span>}
                </div>
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
            <div className="tab-pane card-body  fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab" >
              <div className="form-group mb-3">
                <label>Meta Title</label>
                <input type="text" name="meta_title" onChange={handleInput} value={categoryInput.meta_title} className="form-control" required></input>
                <div className="invalid-feedback">
                  {categoryInput.error_list && categoryInput.error_list.meta_title && <span>{categoryInput.error_list.meta_title}</span>}
                </div>
              </div>
              <div className="form-group mb-3">
                <label>Meta keyword</label>
                <textarea name="meta_keyword" onChange={handleInput} value={categoryInput.meta_keyword} className="form-control" required></textarea>
                <div className="invalid-feedback">
                  {categoryInput.error_list && categoryInput.error_list.meta_keyword && <span>{categoryInput.error_list.meta_keyword}</span>}
                </div>
              </div>
              <div className="form-group mb-3">
                <label>Meta Description</label>
                <textarea name="meta_description" onChange={handleInput} value={categoryInput.meta_description} className="form-control" required></textarea>
                <div className="invalid-feedback">
                  {categoryInput.error_list && categoryInput.error_list.meta_description && <span>{categoryInput.error_list.meta_description}</span>}
                </div>
              </div>
            </div>
            {/* button */}
            <button type="submit" className="btn btn-primary px-4 float-end">Add</button>

          </div>
        </form>
      </div>
    </>
  )
}
export default Category;
