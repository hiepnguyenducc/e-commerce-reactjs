
function About(){
    return(
        <>
       <main style={{backgroundColor:'#fff'}}>
			<section className="introBannerHolder d-flex w-100 bgCover" style={{backgroundImage:'url(http://placehold.it/1920x300)'}}>
				<div className="container">
					<div className="row">
						<div className="col-12 pt-lg-23 pt-md-15 pt-sm-10 pt-6 text-center">
							<h1 className="headingIV fwEbold playfair mb-4">About Us</h1>
							<ul className="list-unstyled breadCrumbs d-flex justify-content-center">
								<li className="mr-2"><a href="home.html">Home</a></li>
								<li className="mr-2">/</li>
								<li className="active">About</li>
							</ul>
						</div>
					</div>
				</div>
			</section>
			<section className="abtSecHolder container pt-xl-24 pb-xl-12 pt-lg-20 pb-lg-10 pt-md-16 pb-md-8 pt-10 pb-5">
				<div className="row">
					<div className="col-12 col-lg-6 pt-xl-12 pt-lg-8">
						<h2 className="playfair fwEbold position-relative mb-7 pb-5">
							<strong className="d-block">A Minimal Team</strong>
							<strong className="d-block">For a Better World</strong>
						</h2>
						<p className="pr-xl-16 pr-lg-10 mb-lg-0 mb-6">Lorem Khaled Ipsum is a major key to success. The ladies always say Khaled you smell good, I use no cologne. Cocoa butter is the key. To succeed you must believe. When you believe, you will succeed. They will try to close the door on you, just open it. The key is to drink coconut, fresh coconut, trust me. It’s important to use cocoa butter. It’s the key to more success, why not live smooth?</p>
					</div>
					<div className="col-12 col-lg-6">
						<img src="http://placehold.it/570x440" alt="image description" className="img-fluid"/>
					</div>
				</div>
			</section>
			<section className="counterSec container pt-xl-12 pb-xl-24 pt-lg-10 pb-lg-20 pt-md-8 pb-md-16 pt-5 pb-10">
				<div className="row">
					<div className="col-12">
					
						<ul className="progressCounter list-unstyled mb-2 d-flex flex-wrap text-capitalize text-center">
							<li className="mb-md-0 mb-3">
								<strong className="d-block fwEbold counter mb-2">229</strong>
								<strong className="d-block text-uppercase txtWrap">Happy Clients</strong>
							</li>
							<li className="mb-md-0 mb-3">
								<strong className="d-block fwEbold counter mb-2">109</strong>
								<strong className="d-block text-uppercase txtWrap">completed project</strong>
							</li>
							<li className="mb-md-0 mb-3">
								<strong className="d-block fwEbold counter mb-2">22</strong>
								<strong className="d-block text-uppercase txtWrap">awesome staff</strong>
							</li>
							<li className="mb-md-0 mb-3">
								<strong className="d-block fwEbold counter mb-2">11</strong>
								<strong className="d-block text-uppercase txtWrap">winning awards</strong>
							</li>
						</ul>
					</div>
				</div>
			</section>
			<section className="introSec bg-lightGray pt-xl-12 pb-xl-7 pt-10 pb-10">
				<div className="container">
					<div className="row">
						<div className="col-12 col-lg-6 mb-lg-0 mb-6">
							<img src="http://placehold.it/490x505" alt="image description" className="img-fluid"/>
						</div>
						<div className="col-12 col-lg-6">
							<div id="accordion" className="accordionList pt-lg-12">
								<div className="card mb-2">
									<div className="card-header px-xl-5 py-xl-3" id="headingOne">
										<h5 className="mb-0">
											<button className="btn btn-link fwEbold text-uppercase text-left w-100 p-0" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
											connecting people <i className="fas fa-sort-down float-right"></i>
											</button>
										</h5>
									</div>
									<div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
										<div className="card-body px-xl-5 py-0">
											<p className="mb-7">To succeed you must believe. When you believe, you will succeed. Surround yourself with angels, positive energy, beautiful people, beautiful souls, clean heart, angel. Let me be clear, you have to make it through the jungle to make it to paradise, that’s the key, Lion! Lion!</p>
										</div>
									</div>
								</div>
								<div className="card mb-2">
									<div className="card-header px-xl-5 py-xl-3" id="headingTwo">
										<h5 className="mb-0">
											<button className="btn btn-link fwEbold text-uppercase text-left w-100 collapsed p-0" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
											we build your dream <i className="fas fa-sort-down float-right"></i>
											</button>
										</h5>
									</div>
									<div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
										<div className="card-body px-xl-5 py-0">
											<p className="mb-7">To succeed you must believe. When you believe, you will succeed. Surround yourself with angels, positive energy, beautiful people, beautiful souls, clean heart, angel. Let me be clear, you have to make it through the jungle to make it to paradise, that’s the key, Lion! Lion!</p>
										</div>
									</div>
								</div>
								<div className="card mb-2">
									<div className="card-header px-xl-5 py-xl-3" id="headingThree">
										<h5 className="mb-0">
											<button className="btn btn-link fwEbold text-uppercase text-left w-100 collapsed p-0" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
											nothing to fear <i className="fas fa-sort-down float-right"></i>
											</button>
										</h5>
									</div>
									<div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
										<div className="card-body px-xl-5 py-0">
											<p className="mb-7">To succeed you must believe. When you believe, you will succeed. Surround yourself with angels, positive energy, beautiful people, beautiful souls, clean heart, angel. Let me be clear, you have to make it through the jungle to make it to paradise, that’s the key, Lion! Lion!</p>
										</div>
									</div>
								</div>
								<div className="card mb-2">
									<div className="card-header px-xl-5 py-xl-3" id="headingFour">
										<h5 className="mb-0">
											<button className="btn btn-link fwEbold text-uppercase text-left w-100 collapsed p-0" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
											make the world better <i className="fas fa-sort-down float-right"></i>
											</button>
										</h5>
									</div>
									<div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordion">
										<div className="card-body px-xl-5 py-0">
											<p className="mb-7">To succeed you must believe. When you believe, you will succeed. Surround yourself with angels, positive energy, beautiful people, beautiful souls, clean heart, angel. Let me be clear, you have to make it through the jungle to make it to paradise, that’s the key, Lion! Lion!</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="processStepSec container pt-xl-23 pb-xl-10 pt-lg-20 pb-lg-10 pt-md-16 pb-md-8 pt-10 pb-0">
				<div className="row">
					<header className="col-12 mainHeader mb-3 text-center">
						<h1 className="headingIV playfair fwEblod mb-4">Delivery Process</h1>
						<span className="headerBorder d-block mb-5"><img src="images/hbdr.png" alt="Header Border" className="img-fluid img-bdr"/></span>
					</header>
				</div>
				<div className="row">
					<div className="col-12 pl-xl-23 mb-lg-3 mb-10">
						<div className="stepCol position-relative bg-lightGray py-6 px-6">
							<strong className="mainTitle text-uppercase mt-n8 mb-5 d-block text-center py-1 px-3">step 01</strong>
							<h2 className="headingV fwEblod text-uppercase mb-3">Choose your products</h2>
							<p className="mb-5">There are many variations of passages of lorem ipsum available, but the majority have suffered alteration in some form, by injected humour. Both betanin</p>
						</div>
					</div>
					<div className="col-12 pr-xl-23 mb-lg-3 mb-10">
						<div className="stepCol rightArrow position-relative bg-lightGray py-6 px-6 float-right">
							<strong className="mainTitle text-uppercase mt-n8 mb-5 d-block text-center py-1 px-3">step 02</strong>
							<h2 className="headingV fwEblod text-uppercase mb-3">Connect nearest stored</h2>
							<p className="mb-5">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
						</div>
					</div>
					<div className="col-12 pl-xl-23 mb-lg-3 mb-10">
						<div className="stepCol position-relative bg-lightGray py-6 px-6">
							<strong className="mainTitle text-uppercase mt-n8 mb-5 d-block text-center py-1 px-3">step 03</strong>
							<h2 className="headingV fwEblod text-uppercase mb-3">Share your location</h2>
							<p className="mb-5">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore</p>
						</div>
					</div>
					<div className="col-12 pr-xl-23 mb-lg-3 mb-10">
						<div className="stepCol rightArrow position-relative bg-lightGray py-6 px-6 float-right">
							<strong className="mainTitle text-uppercase mt-n8 mb-5 d-block text-center py-1 px-3">step 04</strong>
							<h2 className="headingV fwEblod text-uppercase mb-3">Get delivered fast</h2>
							<p className="mb-5">On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment.</p>
						</div>
					</div>
				</div>
			</section>
			<section className="teamSec pt-xl-12 pb-xl-21 pt-lg-10 pb-lg-20 pt-md-8 pb-md-16 pt-0 pb-4">
				<div className="container">
					<div className="row">
						<header className="col-12 mainHeader mb-9 text-center">
							<h1 className="headingIV playfair fwEblod mb-4">Meet Our Team</h1>
							<span className="headerBorder d-block mb-5"><img src="images/hbdr.png" alt="Header Border" className="img-fluid img-bdr"/></span>
						</header>
					</div>
					<div className="row">
						<div className="col-12 col-sm-6 col-lg-4 mb-lg-0 mb-6">
							<article className="teamBlock overflow-hidden">
								<span className="imgWrap position-relative d-block w-100 mb-4">
									<img src="http://placehold.it/370x290" className="img-fluid" alt="image description"/>
									<ul className="list-unstyled position-absolute mb-0 d-flex justify-content-center socialNetworks">
										<li><a href="javascript:void(0);" className="fab fa-facebook-f"></a></li>
										<li><a href="javascript:void(0);" className="fab fa-twitter"></a></li>
										<li><a href="javascript:void(0);" className="fab fa-instagram"></a></li>
									</ul>
								</span>
								<div className="textDetail w-100 text-center">
									<h3>
										<strong className="text-uppercase d-block fwEbold name mb-2"><a href="javascript:void(0);">redikiel</a></strong>
										<strong className="text-capitalize d-block desination">Co - Founder & CEO</strong>
									</h3>
								</div>
							</article>
						</div>
						<div className="col-12 col-sm-6 col-lg-4 mb-lg-0 mb-6">
							<article className="teamBlock overflow-hidden">
								<span className="imgWrap position-relative d-block w-100 mb-4">
									<img src="http://placehold.it/370x290" className="img-fluid" alt="image description"/>
									<ul className="list-unstyled position-absolute mb-0 d-flex justify-content-center socialNetworks">
										<li><a href="javascript:void(0);" className="fab fa-facebook-f"></a></li>
										<li><a href="javascript:void(0);" className="fab fa-twitter"></a></li>
										<li><a href="javascript:void(0);" className="fab fa-instagram"></a></li>
									</ul>
								</span>
								<div className="textDetail w-100 text-center">
									<h3>
										<strong className="text-uppercase d-block fwEbold name mb-2"><a href="javascript:void(0);">Angela</a></strong>
										<strong className="text-capitalize d-block desination">Chief of Marketing Team</strong>
									</h3>
								</div>
							</article>
						</div>
						<div className="col-12 col-sm-6 col-lg-4 mb-lg-0 mb-6">
							<article className="teamBlock overflow-hidden">
								<span className="imgWrap position-relative d-block w-100 mb-4">
									<img src="http://placehold.it/370x290" className="img-fluid" alt="image description"/>
									<ul className="list-unstyled position-absolute mb-0 d-flex justify-content-center socialNetworks">
										<li><a href="javascript:void(0);" className="fab fa-facebook-f"></a></li>
										<li><a href="javascript:void(0);" className="fab fa-twitter"></a></li>
										<li><a href="javascript:void(0);" className="fab fa-instagram"></a></li>
									</ul>
								</span>
								<div className="textDetail w-100 text-center">
									<h3>
										<strong className="text-uppercase d-block fwEbold name mb-2"><a href="javascript:void(0);">kevin lee</a></strong>
										<strong className="text-capitalize d-block desination">Art Director</strong>
									</h3>
								</div>
							</article>
						</div>
					</div>
				</div>
			</section>
			<div className="container-fluid px-xl-20 mb-xl-24 mb-lg-20 mb-md-16 mb-10">
			
				<section className="subscribeSecBlock bgCover pt-xl-24 pb-xl-12 pt-lg-20 pb-lg-10 pt-md-16 pb-md-10 py-10 px-3" style={{backgroundImage:'url(http://placehold.it/1720x465)'}}>
					<header className="col-12 mainHeader mb-9 text-center">
						<h1 className="headingIV playfair fwEblod mb-4">Subscribe Our Newsletter</h1>
						<span className="headerBorder d-block mb-5"><img src="images/hbdr.png" alt="Header Border" className="img-fluid img-bdr"/></span>
						<p className="mb-6">Enter Your email address to join our mailing list and keep yourself update</p>
					</header>
					<form className="emailForm1 mx-auto overflow-hidden d-flex flex-wrap">
						<input type="email" className="form-control px-4 border-0" placeholder="Enter your mail..."/>
						<button type="submit" className="btn btnTheme btnShop fwEbold text-white py-3 px-4 py-md-3 px-md-4">Shop Now <i className="fas fa-arrow-right ml-2"></i></button>
					</form>
				</section>
			</div>
			
			
		</main>
        </>
    )
}
export default About;
