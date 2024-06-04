import {Link, useNavigate} from "react-router-dom";
import {Input, notification, Typography} from "antd";
import {runes} from "runes2";
import TextArea from "antd/es/input/TextArea";
import {useEffect, useState} from "react";
import axios from "axios";

function AddPost (){
  const [postInput, setPostInput] = useState({
    slug: '',
    title: '',
    content: '',
    error_list: {} as { [key: string]: string },

  });
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    // e.presist();
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setPostInput({ ...postInput, [e.target.name]: value });
    console.log({...postInput,[e.target.name]:value})
    if (e.target.name === 'status') {
      console.log('Status:', value ? '1' : '0');
    }
    if (e.target.name === 'name') {
      const slug = generateSlug(value);
      setPostInput((prevCategory) => ({ ...prevCategory, slug: slug }));
    }
  }
  const [picture, setPicture]= useState<{image:File|null}>({image:null});

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPicture({ image: e.target.files[0] });
      console.log({ image: e.target.files[0] })
    }
  }
  const navigate = useNavigate();
  const submitPost = (e: React.ChangeEvent<HTMLFormElement>) => {
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
    formData.append('slug',postInput.slug);
    formData.append('title',postInput.title);
    formData.append('content',postInput.content);

    if (picture.image) {
      formData.append('image', picture.image);
    }

    axios.post(`/api/store-post`, formData).then(res => {
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
      console.log("du lieu", formData)
    });
  }
  useEffect(() => {
    const generateSlug = (name) => {

      const slug = name.toLowerCase()

        .replace(/[^\w\s]/g, '')

        .replace(/\s+/g, '-');
      return slug;
    };

    const slug = generateSlug(postInput.title);
    setPostInput((prevCategory) => ({ ...prevCategory, slug: slug }));
  }, [postInput.title]);
  return (
    <>
      <div className="container-fluid px-4 fade-in">
        <div className="card-header float-end">

        </div>
        <h4 className="mt-4">
          Add Post
          <Link to="/admin/view-post" className="btn btn-primary btn-sm float-end">View Post</Link>
        </h4>
        <form action="multipart/form-data" onSubmit={submitPost} className="needs-validation g-3" >

          <div className="form-group mb-3">

            <Typography.Title level={5}>Name</Typography.Title>
            <Input type="text" name="title" onChange={handleInput} value={postInput.title} size="large"
                   required placeholder="Enter Name" title={"Enter Name"}
            />
            {postInput.error_list && postInput.error_list.name && (
              <div className="invalid-feedback ">
                <span>{postInput.error_list.name}</span>
              </div>
            )}
            {postInput.title && (
              <div className="text-muted float-end">{runes(postInput.title).length}</div>
            )}
          </div>

          <div className="form-group mb-3">
            <Typography.Title level={5}>Slug</Typography.Title>
            <Input type="text" name="slug" onChange={handleInput} value={postInput.slug} size="large"
                   required placeholder="Enter Slug" title="Enter Slug"

            />
            {postInput.error_list && postInput.error_list.slug && (
              <div className="invalid-feedback ">
                <span>{postInput.error_list.slug}</span>
              </div>
            )}
            {postInput.slug && (
              <div className="text-muted float-end">{runes(postInput.slug).length}</div>
            )}
          </div>


          <div className="form-group mb-3">
            <Typography.Title level={5}>Content</Typography.Title>
            <TextArea name="content" onChange={handleInput} value={postInput.content} required
                      placeholder="Enter content" title={"Enter Content"}
            />
            {postInput.error_list && postInput.error_list.content && (
              <div className="invalid-feedback ">
                <span>{postInput.error_list.content}</span>
              </div>
            )}
            {postInput.content && (
              <div className="text-muted float-end">{runes(postInput.content).length}</div>
            )}
          </div>

          <div className="col-md-4 mb-3 form-group">
            <label htmlFor="image">Image</label>
            <Input type="file" name="image" onChange={handleImage}/>
            <img src={picture.image ? URL.createObjectURL(picture.image) : ''} alt="Image" width="50px"/>

          </div>

          {/* button */}
          <button type="submit" className="btn btn-primary px-4 float-end">Add</button>

        </form>
      </div>
    </>
  )
}
export default AddPost
