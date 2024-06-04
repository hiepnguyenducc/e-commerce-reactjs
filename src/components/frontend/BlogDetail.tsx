import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

function BlogDetail(){
  const [blogdetail, setBlogDetail] = useState([])
  const [loading, setLoading] = useState(true);
  const slug = useParams();
  useEffect(() => {
    axios.get(`api/product-by-slug/${slug}`).then(res=>{
      if(res.data.status===200){
        setBlogDetail(res.data.post);
      }
    })
  }, []);
  return (
    <>
        <div className="container margin_30">
          <div className="page_header">
            <div className="breadcrumbs">
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Category</a></li>
                <li>Page active</li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-9">
              <div className="singlepost">
                <figure><img alt="" className="img-fluid" src={`http://127.0.0.1:8001/${blogdetail.image}`}/></figure>
                <h1>{blogdetail.title}</h1>
                <div className="postmeta">
                  <ul>
                    <li><a href="#"><i className="ti-folder"></i> Category</a></li>
                    <li><i className="ti-calendar"></i> 23/12/2015</li>
                    <li><a href="#"><i className="ti-user"></i> Admin</a></li>
                    <li><a href="#"><i className="ti-comment"></i> (14) Comments</a></li>
                  </ul>
                </div>

                <div className="post-content">
                  <div className="dropcaps">
                    <p>{blogdetail.content}</p>
                  </div>

                </div>

              </div>


              <div id="comments">
                <h5>Comments</h5>
                <ul>
                  <li>
                    <div className="avatar">
                      <a href="#"><img src="img/avatar1.jpg" alt=""/>
                      </a>
                    </div>
                    <div className="comment_right clearfix">
                      <div className="comment_info">
                        By <a href="#">Anna Smith</a><span>|</span>25/10/2019<span>|</span><a href="#"><i
                        className="icon-reply"></i></a>
                      </div>
                      <p>
                        Nam cursus tellus quis magna porta adipiscing. Donec et eros leo, non pellentesque arcu.
                        Curabitur vitae mi enim, at vestibulum magna. Cum sociis natoque penatibus et magnis dis
                        parturient montes, nascetur ridiculus mus. Sed sit amet sem a urna rutrumeger fringilla. Nam vel
                        enim ipsum, et congue ante.
                      </p>
                    </div>
                    <ul className="replied-to">
                      <li>
                        <div className="avatar">
                          <a href="#"><img src="img/avatar2.jpg" alt=""/>
                          </a>
                        </div>
                        <div className="comment_right clearfix">
                          <div className="comment_info">
                            By <a href="#">Anna Smith</a><span>|</span>25/10/2019<span>|</span><a href="#"><i
                            className="icon-reply"></i></a>
                          </div>
                          <p>
                            Nam cursus tellus quis magna porta adipiscing. Donec et eros leo, non pellentesque arcu.
                            Curabitur vitae mi enim, at vestibulum magna. Cum sociis natoque penatibus et magnis dis
                            parturient montes, nascetur ridiculus mus. Sed sit amet sem a urna rutrumeger fringilla. Nam
                            vel enim ipsum, et congue ante.
                          </p>
                          <p>
                            Aenean iaculis sodales dui, non hendrerit lorem rhoncus ut. Pellentesque ullamcorper
                            venenatis elit idaipiscingi Duis tellus neque, tincidunt eget pulvinar sit amet, rutrum nec
                            urna. Suspendisse pretium laoreet elit vel ultricies. Maecenas ullamcorper ultricies
                            rhoncus. Aliquam erat volutpat.
                          </p>
                        </div>
                        <ul className="replied-to">
                          <li>
                            <div className="avatar">
                              <a href="#"><img src="img/avatar2.jpg" alt=""/>
                              </a>
                            </div>
                            <div className="comment_right clearfix">
                              <div className="comment_info">
                                By <a href="#">Anna Smith</a><span>|</span>25/10/2019<span>|</span><a href="#"><i
                                className="icon-reply"></i></a>
                              </div>
                              <p>
                                Nam cursus tellus quis magna porta adipiscing. Donec et eros leo, non pellentesque arcu.
                                Curabitur vitae mi enim, at vestibulum magna. Cum sociis natoque penatibus et magnis dis
                                parturient montes, nascetur ridiculus mus. Sed sit amet sem a urna rutrumeger fringilla.
                                Nam vel enim ipsum, et congue ante.
                              </p>
                              <p>
                                Aenean iaculis sodales dui, non hendrerit lorem rhoncus ut. Pellentesque ullamcorper
                                venenatis elit idaipiscingi Duis tellus neque, tincidunt eget pulvinar sit amet, rutrum
                                nec urna. Suspendisse pretium laoreet elit vel ultricies. Maecenas ullamcorper ultricies
                                rhoncus. Aliquam erat volutpat.
                              </p>
                            </div>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <div className="avatar">
                      <a href="#"><img src="img/avatar3.jpg" alt=""/>
                      </a>
                    </div>

                    <div className="comment_right clearfix">
                      <div className="comment_info">
                        By <a href="#">Anna Smith</a><span>|</span>25/10/2019<span>|</span><a href="#"><i
                        className="icon-reply"></i></a>
                      </div>
                      <p>
                        Cursus tellus quis magna porta adipiscin
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <hr/>

              <h5>Leave a comment</h5>
              <div className="row">
                <div className="col-md-4 col-sm-6">
                  <div className="form-group">
                    <input type="text" name="name" id="name2" className="form-control" placeholder="Name"/>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6">
                  <div className="form-group">
                    <input type="text" name="email" id="email2" className="form-control" placeholder="Email"/>
                  </div>
                </div>
                <div className="col-md-4 col-sm-12">
                  <div className="form-group">
                    <input type="text" name="email" id="website3" className="form-control" placeholder="Website"/>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <textarea className="form-control" name="comments" id="comments2" rows="6"
                          placeholder="Comment"></textarea>
              </div>
              <div className="form-group">
                <button type="submit" id="submit2" className="btn_1 add_bottom_15">Submit</button>
              </div>

            </div>


            <aside className="col-lg-3">
              <div className="widget search_blog">
                <div className="form-group">
                  <input type="text" name="search" id="search" className="form-control" placeholder="Search.."/>
                  <button type="submit"><i className="ti-search"></i></button>
                </div>
              </div>

              <div className="widget">
                <div className="widget-title">
                  <h4>Latest Post</h4>
                </div>
                <ul className="comments-list">
                  <li>
                    <div className="alignleft">
                      <a href="#0"><img src="img/blog-5.jpg" alt=""/></a>
                    </div>
                    <small>Category - 11.08.2016</small>
                    <h3><a href="#" title="">Verear qualisque ex minimum...</a></h3>
                  </li>
                  <li>
                    <div className="alignleft">
                      <a href="#0"><img src="img/blog-6.jpg" alt=""/></a>
                    </div>
                    <small>Category - 11.08.2016</small>
                    <h3><a href="#" title="">Verear qualisque ex minimum...</a></h3>
                  </li>
                  <li>
                    <div className="alignleft">
                      <a href="#0"><img src="img/blog-4.jpg" alt=""/></a>
                    </div>
                    <small>Category - 11.08.2016</small>
                    <h3><a href="#" title="">Verear qualisque ex minimum...</a></h3>
                  </li>
                </ul>
              </div>

              <div className="widget">
                <div className="widget-title">
                  <h4>Categories</h4>
                </div>
                <ul className="cats">
                  <li><a href="#">Food <span>(12)</span></a></li>
                  <li><a href="#">Places to visit <span>(21)</span></a></li>
                  <li><a href="#">New Places <span>(44)</span></a></li>
                  <li><a href="#">Suggestions and guides <span>(31)</span></a></li>
                </ul>
              </div>

              <div className="widget">
                <div className="widget-title">
                  <h4>Popular Tags</h4>
                </div>
                <div className="tags">
                  <a href="#">Food</a>
                  <a href="#">Bars</a>
                  <a href="#">Cooktails</a>
                  <a href="#">Shops</a>
                  <a href="#">Best Offers</a>
                  <a href="#">Transports</a>
                  <a href="#">Restaurants</a>
                </div>
              </div>

            </aside>

          </div>

        </div>

    </>
  )
}

export default BlogDetail
