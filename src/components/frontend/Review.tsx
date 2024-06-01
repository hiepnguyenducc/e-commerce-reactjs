import {useParams} from "react-router-dom";

import {useEffect, useState} from "react";
import axios from "axios";
import {message} from "antd";
function Review (){
  const {slug} = useParams();
  const [product, setProduct] = useState([]);
  const [reviewInput, setReviewInput]= useState({
    rating:'',
    product_id:product.id,
    title:'',
    content:'',
  })

  const [picture, setPicture] = useState<{image:File|null}>({image:null})
  const handleImage =(e)=>{
    if (e.target.files && e.target.files.length > 0) {
      setPicture({ image: e.target.files[0] });
  }}
  useEffect(() => {
    axios.get(`api/getProductBySlug/${slug}`).then(res=>{
      if(res.data.status===200){
        setProduct(res.data.product);
        setReviewInput(prevState => ({
          ...prevState,
          product_id: res.data.product.id
        }));
      }
    })
  }, [slug]);
  const handleInput =(e)=>{
    e.preventDefault();
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setReviewInput({ ...reviewInput, [e.target.name]: value });
  }
  const submitReview =(e)=>{
    e.preventDefault();
    if (!picture.image) {
      message.open({
        type: 'error',
        content: 'Please select an image !!'
      })
      return;
    }
    const formData = new FormData();
    formData.append('title',reviewInput.title);
    formData.append('content',reviewInput.content);
    formData.append('product_id',reviewInput.product_id);
    formData.append('rating',reviewInput.rating);

    if (picture.image) {
      formData.append('image', picture.image);
    }
    axios.post(`api/add-comment`,formData).then(res=>{
      if(res.data.status===200){
        message.open({
          type:'success',
          content:res.data.message
        })
      }else if(res.data.status===422){
        message.open({
          type:'error',
          content:res.data.message
        })
      }else if(res.data.status === 409){
        message.open({
          type:'error',
          content:res.data.message
        })
      }else if (res.data.status === 404){
        message.open({
          type:'error',
          content:res.data.message
        })
      }else if (res.data.status === 401){
        message.open({
          type:'error',
          content:res.data.message
        })
      }
    })
  }
  return(
    <>
      <div className="container margin_60_35">

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="write_review">
              <h1>Write a review for {product.name}</h1>
              <form action="multipart/form-data" onSubmit={submitReview}>

              <div className="rating_submit">
                <div className="form-group">
                  <label className="d-block">Overall rating</label>
                  <div className="form-group">
                    <input className="form-control" type="text" name="rating" onChange={handleInput} value={reviewInput.rating}
                           placeholder="If you could say it in one sentence, what would you say?"/>
                  </div>
                  {/*    <span className="rating mb-0">*/}
                  {/*	<input type="radio" className="rating-input icon-star" id="5_star" name="rating-input" value="5 Stars" onChange={handleInput}/><label*/}

                  {/*      htmlFor="5_star" className="rating-star"></label>*/}
                  {/*	<input type="radio" className="rating-input" id="4_star" name="rating" value="4 Stars"/><label*/}
                  {/*      htmlFor="4_star" className="rating-star"></label>*/}
                  {/*	<input type="radio" className="rating-input" id="3_star" name="rating" value="3 Stars"/><label*/}
                  {/*      htmlFor="3_star" className="rating-star"></label>*/}
                  {/*	<input type="radio" className="rating-input" id="2_star" name="rating" value="2 Stars"/><label*/}
                  {/*      htmlFor="2_star" className="rating-star"></label>*/}
                  {/*	<input type="radio" className="rating-input" id="1_star" name="rating" value="1 Star"/><label*/}
                  {/*      htmlFor="1_star" className="rating-star"></label>*/}
                  {/*</span>*/}
                </div>
              </div>

              <div className="form-group">
                <label>Title of your review</label>
                <input className="form-control" type="text" name="title" onChange={handleInput} value={reviewInput.title}
                       placeholder="If you could say it in one sentence, what would you say?"/>
              </div>
              <div className="form-group">
                <label>Your review</label>
                <textarea className="form-control" style={{height:'180px'}} name="content" onChange={handleInput} value={reviewInput.content}
                          placeholder="Write your review to help others learn about this online business"></textarea>
              </div>
              <div className="form-group">
                <label>Add your photo (optional)</label>
                <div className="fileupload"><input type="file" src={picture.image ? URL.createObjectURL(picture.image) : ''} name="image" accept="image/*" onChange={handleImage}/></div>
              </div>
              <div className="form-group">
                <div className="checkboxes float-left add_bottom_15 add_top_15">
                  <label className="container_check">Eos tollit ancillae ea, lorem consulatu qui ne, eu eros eirmod
                    scaevola sea. Et nec tantas accusamus salutatus, sit commodo veritus te, erat legere fabulas has ut.
                    Rebum laudem cum ea, ius essent fuisset ut. Viderer petentium cu his.
                    <input type="checkbox"/>
                    <span className="checkmark"></span>
                  </label>
                </div>
              </div>
              <button type="submit" className="btn_1">Submit review</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Review
