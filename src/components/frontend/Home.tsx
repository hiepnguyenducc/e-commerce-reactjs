

import './css/bootstrap.css';
import './css/fontawesome.css';
import './css/style.css';
import './css/plugins.css';
import './css/color.css';
import './css/responsive.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import slide from '../../../public/image.png'
import { useEffect, useState } from 'react';
import axios from 'axios';
interface Product {
    id: number;
    category_id: {
        name: string;
    };
    slug: string;
    name: string;
    description: string;
    meta_title: string;
    meta_keyword: string;
    meta_description: string;
    brand_id: number;
    selling_price: number;
    original_price: number;
    quantity: number;
    image: string;
    featured: number;
    popular: number;
    sale:number;
    status: number;
}
function Home() {
    const [viewProduct, setProduct] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        document.title = "View Product"
        axios.get(`/api/view-product`).then(res => {
            if (res.data.status === 200) {
                setProduct(res.data.product)
                setLoading(false);
            }
        })
    });
    return (
        <>
            <main style={{ backgroundColor: '#fff' }}>

                <section className="bannerBlockHolder position-relative">
                    <div className="slick-fade">
                        <Swiper effect={'coverflow'}
                            grabCursor={true}
                            centeredSlides={true}
                            loop={true}
                            loopAdditionalSlides={2}
                            slidesPerView={'auto'}
                            coverflowEffect={{
                                rotate: 0,
                                stretch: 0,
                                depth: 0,
                                modifier: 0,
                            }}
                            pagination={{ el: '.pagination', clickable: true }}
                            navigation={{ prevEl: '.slick-prev', nextEl: '.slick-next', clickable: true }}
                            modules={[EffectCoverflow, Pagination, Navigation]}

                        >
                            <SwiperSlide>
                                <div>
                                    <div className="align w-100 d-flex align-items-center bgCover" style={{ backgroundImage: 'url("' + slide + '")' }}>
                                        <div className="container position-relative holder pt-xl-10">
                                            <div className="row">
                                                <div className="col-12 col-xl-7">
                                                    <div className="txtwrap pr-xl-10">
                                                        <span className="title d-block text-uppercase fwEbold position-relative pl-2 mb-md-5 mb-sm-3">wellcome to botanical</span>
                                                        <h1 className="fwEbold position-relative mb-md-7 mb-sm-4">Houseplant <span className="text-break d-block">The Perfect Choice.</span></h1>
                                                        <p className="mb-md-15 mb-sm-10">Lorem ipsum is simply dummy text of the printing and typesetting industry.</p>
                                                        <a href="shop.html" className="btn btnTheme btnShop fwEbold text-white md-round py-3 px-4">Shop Now <i className="fas fa-arrow-right ml-2"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div>
                                    <div className="align w-100 bgCover" style={{ backgroundImage: 'url(http://placehold.it/1920x900)' }}>
                                        <div className="container position-relative holder pt-14">

                                            <div className="row">
                                                <div className="col-12 text-center">
                                                    <div className="txtwrap pr-md-10">
                                                        <h1 className="fwEbold position-relative mb-0">NUTRIENTS PLANTS</h1>
                                                        <strong className="year d-block fwEbold mb-3">2019</strong>
                                                        <span className="sub-title d-block text-uppercase mb-md-12 mb-6">OCCASSIONAL BOUQUET</span>
                                                        <a href="shop.html" className="btn btnTheme btnShop fwEbold text-white md-round py-3 px-4">Shop Now <i className="fas fa-arrow-right ml-2"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>


                    </div>
                    <div className="slickNavigatorsWrap">
                        <a href="#" className="slick-prev"><i className="icon-leftarrow"></i></a>
                        <div className='pagination'></div>
                        <a href="#" className="slick-next"><i className="icon-rightarrow"></i></a>

                    </div>
                </section>

                <div className="contactListBlock container overflow-hidden pt-xl-24 pb-xl-12 pt-lg-20 pb-lg-10 pt-md-16 pb-md-4 pt-10 pb-1">
                    <div className="row">
                        <div className="col-12 col-sm-6 col-lg-3 mb-4 mb-lg-0">

                            <div className="contactListColumn border bg-lightGray overflow-hidden py-xl-5 py-md-3 py-2 px-xl-6 px-md-3 px-3 d-flex">
                                <span className="icon icon-van"></span>
                                <div className="alignLeft pl-2">
                                    <strong className="headingV fwEbold d-block mb-1">Free shipping order</strong>
                                    <p className="m-0">On orders over  $100</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3 mb-4 mb-lg-0">

                            <div className="contactListColumn border bg-lightGray overflow-hidden py-xl-5 py-md-3 py-2 px-xl-6 px-md-3 px-3 d-flex">
                                <span className="icon icon-gift"></span>
                                <div className="alignLeft pl-2">
                                    <strong className="headingV fwEbold d-block mb-1">Special gift card</strong>
                                    <p className="m-0">The perfect gift idea</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3 mb-4 mb-lg-0">

                            <div className="contactListColumn border bg-lightGray overflow-hidden py-xl-5 py-md-3 py-2 px-xl-4 px-md-2 px-3 d-flex">
                                <span className="icon icon-recycle"></span>
                                <div className="alignLeft pl-2">
                                    <strong className="headingV fwEbold d-block mb-1">Return &amp; exchange</strong>
                                    <p className="m-0">Free return within 3 days</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3 mb-4 mb-lg-0">

                            <div className="contactListColumn border bg-lightGray overflow-hidden py-xl-5 py-md-3 py-2 px-xl-6 px-md-3 px-3 d-flex">
                                <span className="icon icon-call"></span>
                                <div className="alignLeft pl-2">
                                    <strong className="headingV fwEbold d-block mb-1">Support 24 / 7</strong>
                                    <p className="m-0">Customer support</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container pt-xl-11 pb-xl-12 pt-lg-10 pb-lg-10 pt-md-8 pb-md-8 pt-5 pb-5">
                    <div className="row">
                        <div className="col-12">

                            <blockquote className="quotationBlock text-center d-block m-0">
                                <q className="d-block playfair mb-7">We ship healthy potted plants right to your doorstep. Each plant comes with simple care instructions from our plant experts.</q>
                                <cite className="d-block">
                                    <img src="images/signature.png" alt="signature" className="img-fluid mb-6" />
                                    <span className="d-flex flex-nowrap align-items-center justify-content-center">
                                        <strong className="fwEbold mr-1">Sarah Jefferson</strong>
                                        <span className="text-uppercase fwEbold pt-1">- CEO</span>
                                    </span>
                                </cite>
                            </blockquote>
                        </div>
                    </div>
                </div>

                <section className="featureSec container overflow-hidden pt-xl-12 pb-xl-9 pt-lg-10 pb-lg-4 pt-md-8 pb-md-2 pt-5">
                    <div className="row">

                        <header className="col-12 mainHeader mb-4 text-center">
                            <h1 className="headingIV playfair fwEblod mb-4">New Arrival</h1>
                            <span className="headerBorder d-block mb-5"><img src="images/hbdr.png" alt="Header Border" className="img-fluid img-bdr" /></span>
                            <p>There are many variations of passages of lorem ipsum available </p>
                        </header>
                    </div>
                    <div className="row">
                        {
                            viewProduct.map(
                                (item) => {
                                    if(item.status===1){
                                    return null;
                                }
                                    return (
                                        <div className="col-12 col-sm-6 col-lg-3 featureCol position-relative mb-6">
                                            <div className="border">
                                                <div className="imgHolder position-relative w-100 overflow-hidden">
                                                    <img src={`http://127.0.0.1:8000/${item.image}`} alt="image description" className="img-fluid w-100" />
                                                    <ul className="list-unstyled postHoverLinskList d-flex justify-content-center m-0">
                                                        <li className="mr-2 overflow-hidden"><a href="javascript:void(0);" className="icon-heart d-block"></a></li>
                                                        <li className="mr-2 overflow-hidden"><a href="javascript:void(0);" className="icon-cart d-block"></a></li>
                                                        <li className="mr-2 overflow-hidden"><a href="javascript:void(0);" className="icon-eye d-block"></a></li>
                                                        <li className="overflow-hidden"><a href="javascript:void(0);" className="icon-arrow d-block"></a></li>
                                                    </ul>
                                                </div>
                                                <div className="text-center py-xl-5 py-sm-4 py-2 px-xl-2 px-1">
                                                    <span className="title d-block mb-2"><a href="shop-detail.html">{item.name}</a></span>
                                                    {item.sale===1 ?(
                                                        <div>
                                                             <span className="price d-block fwEbold"><del>{item.selling_price}</del> {item.original_price}</span>
                                                               <span className="hotOffer green fwEbold text-uppercase text-white position-absolute d-block">Sale</span>
                                                               
                                                        </div>
                                                    ):(
                                                        <span className="price d-block fwEbold"> {item.original_price}</span>
                                                    )}
                
                                                    {item.popular === 1 && <span className={`hotOffer fwEbold text-uppercase text-white position-absolute d-block ${item.sale === 1 ? 'ml-8':''}`}>Hot</span>}
                                                  
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            )
                        }
                    </div>
                </section>

                <div className="categorySecBlock overflow-hidden pt-xl-9 pb-xl-6 px-xl-17 px-0 pt-lg-10 pb-lg-4 pt-md-8 pb-md-2 pt-5">

                    <div className="masonryHolder">

                        <div className="grid-item mb-6 px-3">
                            <div className="itemCol">
                                <div className="position-relative">
                                    <img src="http://placehold.it/410x845" alt="image description" className="img-fluid w-100" />
                                    <div className="hoverTextBlock position-absolute">
                                        <h2 className="headingIV playfair fwEbold mb-3"><a href="javascript:void(0);">Cactus Plant</a></h2>
                                        <span className="txt d-block">( 56 item )</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid-item mb-6 px-3">
                            <div className="itemCol">
                                <div className="position-relative">
                                    <img src="http://placehold.it/410x410" alt="image description" className="img-fluid w-100" />
                                    <div className="hoverTextBlock position-absolute">
                                        <h2 className="headingIV playfair fwEbold mb-3"><a href="javascript:void(0);">Indoor Plant</a></h2>
                                        <span className="txt d-block">( 36 item )</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid-item grid-item2 mb-6 px-3">
                            <div className="itemCol">
                                <div className="position-relative">
                                    <img src="http://placehold.it/845x410" alt="image description" className="img-fluid w-100" />
                                    <div className="hoverTextBlock position-absolute">
                                        <h2 className="headingIV playfair fwEbold mb-3"><a href="javascript:void(0);">Tropical Plant</a></h2>
                                        <span className="txt d-block">( 21 item )</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid-item grid-item2 mb-6 px-3">
                            <div className="itemCol">
                                <div className="position-relative">
                                    <img src="http://placehold.it/845x410" alt="image description" className="img-fluid w-100" />
                                    <div className="hoverTextBlock position-absolute">
                                        <h2 className="headingIV playfair fwEbold mb-3"><a href="javascript:void(0);">Floor Plant</a></h2>
                                        <span className="txt d-block">( 18 item )</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid-item mb-6 px-3">
                            <div className="itemCol">
                                <div className="position-relative">
                                    <img src="http://placehold.it/410x410" alt="image description" className="img-fluid w-100" />
                                    <div className="hoverTextBlock position-absolute">
                                        <h2 className="headingIV playfair fwEbold mb-3"><a href="javascript:void(0);">Table Plant</a></h2>
                                        <span className="txt d-block">( 36 item )</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="featureSec container overflow-hidden pt-xl-11 pb-xl-18 pt-lg-10 pb-lg-20 pt-md-8 pb-md-16 pt-5 pb-5">
                    <div className="row">

                        <header className="col-12 mainHeader mb-4 text-center">
                            <h1 className="headingIV playfair fwEblod mb-4">Best seller</h1>
                            <span className="headerBorder d-block mb-5"><img src="images/hbdr.png" alt="Header Border" className="img-fluid img-bdr" /></span>
                            <p>There are many variations of passages of lorem ipsum available </p>
                        </header>
                    </div>
                    <div className="row">

                        <div className="col-12 col-sm-6 col-lg-3 featureCol position-relative mb-6">
                            <div className="border">
                                <div className="imgHolder position-relative w-100 overflow-hidden">
                                    <img src="http://placehold.it/270x300" alt="image description" className="img-fluid w-100" />
                                    <ul className="list-unstyled postHoverLinskList d-flex justify-content-center m-0">
                                        <li className="mr-2 overflow-hidden"><a href="javascript:void(0);" className="icon-heart d-block"></a></li>
                                        <li className="mr-2 overflow-hidden"><a href="javascript:void(0);" className="icon-cart d-block"></a></li>
                                        <li className="mr-2 overflow-hidden"><a href="javascript:void(0);" className="icon-eye d-block"></a></li>
                                        <li className="overflow-hidden"><a href="javascript:void(0);" className="icon-arrow d-block"></a></li>
                                    </ul>
                                </div>
                                <div className="text-center py-xl-5 py-sm-4 py-2 px-xl-2 px-1">
                                    <span className="title d-block mb-2"><a href="shop-detail.html">Pellentesque aliquet</a></span>
                                    <span className="price d-block fwEbold mb-1"><del>80.50 $</del> 68.00 $</span>
                                    <span className="hotOffer fwEbold text-uppercase text-white position-absolute d-block">HOT</span>
                                    <span className="hotOffer green fwEbold text-uppercase text-white position-absolute d-block">Sale</span>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-lg-3 featureCol mb-6">
                            <div className="border">
                                <div className="imgHolder position-relative w-100 overflow-hidden">
                                    <img src="http://placehold.it/270x300" alt="image description" className="img-fluid w-100" />
                                    <ul className="list-unstyled postHoverLinskList d-flex justify-content-center m-0">
                                        <li className="mr-2 overflow-hidden"><a href="javascript:void(0);" className="icon-heart d-block"></a></li>
                                        <li className="mr-2 overflow-hidden"><a href="javascript:void(0);" className="icon-cart d-block"></a></li>
                                        <li className="mr-2 overflow-hidden"><a href="javascript:void(0);" className="icon-eye d-block"></a></li>
                                        <li className="overflow-hidden"><a href="javascript:void(0);" className="icon-arrow d-block"></a></li>
                                    </ul>
                                </div>
                                <div className="text-center py-xl-5 py-sm-4 py-2 px-xl-2 px-1">
                                    <span className="title d-block mb-2"><a href="shop-detail.html">Pellentesque aliquet</a></span>
                                    <span className="price d-block fwEbold mb-1">58.00 $</span>
                                </div>
                            </div>
                        </div>


                        <div className="col-12 col-sm-6 col-lg-3 featureCol position-relative mb-6">
                            <div className="border">
                                <div className="imgHolder position-relative w-100 overflow-hidden">
                                    <img src="http://placehold.it/270x300" alt="image description" className="img-fluid w-100" />
                                    <ul className="list-unstyled postHoverLinskList d-flex justify-content-center m-0">
                                        <li className="mr-2 overflow-hidden"><a href="javascript:void(0);" className="icon-heart d-block"></a></li>
                                        <li className="mr-2 overflow-hidden"><a href="javascript:void(0);" className="icon-cart d-block"></a></li>
                                        <li className="mr-2 overflow-hidden"><a href="javascript:void(0);" className="icon-eye d-block"></a></li>
                                        <li className="overflow-hidden"><a href="javascript:void(0);" className="icon-arrow d-block"></a></li>
                                    </ul>
                                </div>
                                <div className="text-center py-xl-5 py-sm-4 py-2 px-xl-2 px-1">
                                    <span className="title d-block mb-2"><a href="shop-detail.html">Pellentesque aliquet</a></span>
                                    <span className="price d-block fwEbold mb-1">60.00 $</span>
                                    <span className="hotOffer fwEbold text-uppercase text-white position-absolute d-block">Hot</span>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-lg-3 featureCol position-relative mb-6">
                            <div className="border">
                                <div className="imgHolder position-relative w-100 overflow-hidden">
                                    <img src="http://placehold.it/270x300" alt="image description" className="img-fluid w-100" />
                                    <ul className="list-unstyled postHoverLinskList d-flex justify-content-center m-0">
                                        <li className="mr-2 overflow-hidden"><a href="javascript:void(0);" className="icon-heart d-block"></a></li>
                                        <li className="mr-2 overflow-hidden"><a href="javascript:void(0);" className="icon-cart d-block"></a></li>
                                        <li className="mr-2 overflow-hidden"><a href="javascript:void(0);" className="icon-eye d-block"></a></li>
                                        <li className="overflow-hidden"><a href="javascript:void(0);" className="icon-arrow d-block"></a></li>
                                    </ul>
                                </div>
                                <div className="text-center py-xl-5 py-sm-4 py-2 px-xl-2 px-1">
                                    <span className="title d-block mb-2"><a href="shop-detail.html">Pellentesque aliquet</a></span>
                                    <span className="price d-block fwEbold mb-1"><del>80.50 $</del>65.00 $</span>
                                    <span className="hotOffer green fwEbold text-uppercase text-white position-absolute d-block">Sale</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="container-fluid px-xl-20 px-lg-10">

                    <section className="testimonailBlock bgCover py-xl-24 py-lg-20 py-md-16 py-10" style="background-image: url(http://placehold.it/1720x560)" style={{ backgroundImage: 'url(http://placehold.it/1720x560)' }}>
                        <header className="col-12 mainHeader mb-9 text-center">
                            <h1 className="headingIV playfair fwEblod">What Say Client</h1>
                        </header>
                        <div className="container">

                            <div className="testimonailSlider overflow-hidden">
                                <div>
                                    <div className="slide text-center mb-7">
                                        <span className="icon-qoute mb-2 d-block"></span>
                                        <p className="mb-7">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea com- modo consequat. </p>
                                        <strong className="title d-block fwEbold mb-1">Sarah Jefferson</strong>
                                        <span className="desination">BTV - Designer</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="slide text-center mb-7">
                                        <span className="icon-qoute mb-2 d-block"></span>
                                        <p className="mb-7">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea com- modo consequat. </p>
                                        <strong className="title d-block fwEbold mb-1">Sarah Jefferson</strong>
                                        <span className="desination">BTV - Designer</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="slide text-center mb-7">
                                        <span className="icon-qoute mb-2 d-block"></span>
                                        <p className="mb-7">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea com- modo consequat. </p>
                                        <strong className="title d-block fwEbold mb-1">Sarah Jefferson</strong>
                                        <span className="desination">BTV - Designer</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <section className="latestSec container overflow-hidden pt-xl-23 pb-xl-17 pt-lg-20 pb-lg-4 pt-md-16 pb-md-2 pt-10">
                    <div className="row">

                        <header className="col-12 mainHeader mb-4 text-center">
                            <h1 className="headingIV playfair fwEblod mb-4">Latest News</h1>
                            <span className="headerBorder d-block mb-5"><img src="images/hbdr.png" alt="Header Border" className="img-fluid img-bdr" /></span>
                            <p>There are many variations of passages of lorem ipsum available </p>
                        </header>
                    </div>
                    <div className="row">
                        <div className="col-12 col-sm-6 col-lg-4">

                            <div className="newsPostColumn text-center px-2 pb-6 mb-6">
                                <div className="imgHolder position-relative mb-6">
                                    <a href="blog-detail.html">
                                        <img src="http://placehold.it/370x250" alt="image description" className="img-fluid w-100" />
                                        <time className="time text-uppercase position-absolute py-2 px-1" dateTime="2019-02-03 20:00"> <strong className="fwEbold d-block">20</strong> Sep</time>
                                    </a>
                                </div>
                                <span className="postBy d-block mb-3">Post by: <a href="blog-detail.html">Jane doe</a></span>
                                <h2 className="headingV fwEbold mb-2"><a href="blog-detail.html">Aptent taciti soci litora cianpen</a></h2>
                                <p className="mb-0">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium...</p>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-4">

                            <div className="newsPostColumn text-center px-2 pb-6 mb-6">
                                <div className="imgHolder position-relative mb-6">
                                    <a href="blog-detail.html">
                                        <img src="http://placehold.it/370x250" alt="image description" className="img-fluid w-100" />
                                        <time className="time text-uppercase position-absolute py-2 px-1" dateTime="2019-02-03 20:00"> <strong className="fwEbold d-block">18</strong> Sep</time>
                                    </a>
                                </div>
                                <span className="postBy d-block mb-3">Post by: <a href="blog-detail.html">Jane doe</a></span>
                                <h2 className="headingV fwEbold mb-2"><a href="blog-detail.html">Aptent taciti soci litora cianpen</a></h2>
                                <p className="mb-0">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium...</p>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-4">

                            <div className="newsPostColumn text-center px-2 pb-6 mb-6">
                                <div className="imgHolder position-relative mb-6">
                                    <a href="blog-detail.html">
                                        <img src="http://placehold.it/370x250" alt="image description" className="img-fluid w-100" />
                                        <time className="time text-uppercase position-absolute py-2 px-1" dateTime="2019-02-03 20:00"> <strong className="fwEbold d-block">21</strong> Sep</time>
                                    </a>
                                </div>
                                <span className="postBy d-block mb-3">Post by: <a href="blog-detail.html">Jane doe</a></span>
                                <h2 className="headingV fwEbold mb-2"><a href="blog-detail.html">Aptent taciti soci litora cianpen</a></h2>
                                <p className="mb-0">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium...</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
export default Home;