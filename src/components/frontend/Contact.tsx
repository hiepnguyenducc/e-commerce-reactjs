
function Contact(){
    return(
        <>
       <main style={{backgroundColor:'#fff'}}>

			<section className="introBannerHolder d-flex w-100 bgCover"  style={{backgroundImage:'url(http://placehold.it/1920x300)'}}>
				<div className="container">
					<div className="row">
						<div className="col-12 pt-lg-23 pt-md-15 pt-sm-10 pt-6 text-center">
							<h1 className="headingIV fwEbold playfair mb-4">Contact</h1>
							<ul className="list-unstyled breadCrumbs d-flex justify-content-center">
								<li className="mr-2"><a href="home.html">Home</a></li>
								<li className="mr-2">/</li>
								<li className="active">Contact</li>
							</ul>
						</div>
					</div>
				</div>
			</section>
			<div className="contactSec container pt-xl-24 pb-xl-23 py-lg-20 pt-md-16 pb-md-10 pt-10 pb-0">
				<div className="row">
					<div className="col-12">
						<ul className="list-unstyled contactListHolder mb-0 d-flex flex-wrap text-center">
							<li className="mb-lg-0 mb-6">
								<span className="icon d-block mx-auto bg-lightGray py-4 mb-4"><i className="fas fa-map-marker-alt"></i></span>
								<strong className="title text-uppercase playfair mb-5 d-block">address</strong>
								<address className="mb-0">7th floor - Palace Building - 221B Walk of Fame -<span className="d-block"> London - UK</span></address>
							</li>
							<li className="mb-lg-0 mb-6">
								<span className="icon d-block mx-auto bg-lightGray py-4 mb-3"><i className="fas fa-headphones"></i></span>
								<strong className="title text-uppercase playfair mb-5 d-block">phone</strong>
								<a href="tel:84123456789" className="d-block">(+84) - 123 - 456 - 789</a>
								<a href="tel:84321654987" className="d-block">(+84) - 321 - 654 - 987</a>
							</li>
							<li className="mb-lg-0 mb-6">
								<span className="icon d-block mx-auto bg-lightGray py-5 mb-3"><i className="fas fa-envelope"></i></span>
								<strong className="title text-uppercase playfair mb-5 d-block">email</strong>
								<a href="#" className="d-block">Two-support@Two.lnk</a>
								<a href="#" className="d-block">info@Two.lnk</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			
			<div className="mapHolder">
				<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.91477127143!2d-74.11976341808828!3d40.697403441901386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1573223498837!5m2!1sen!2s" style={{border:'0'}} allowFullScreen={true}>
				</iframe>
			</div>
			<section className="contactSecBlock container pt-xl-23 pb-xl-24 pt-lg-20 pb-lg-10 pt-md-16 pb-md-8 py-10">
				<div className="row">
					<header className="col-12 mainHeader mb-10 text-center">
						<h1 className="headingIV playfair fwEblod mb-7">Get In Touch</h1>
						<p>Lorem ipsum dolor consectetuer adipiscing elit sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna<br className="d-block"/> aliquam erat volutpatcommodo consequat.</p>
					</header>
				</div>
				<div className="row">
					<div className="col-12">
						<form className="contactForm">
							<div className="d-flex flex-wrap row1 mb-md-1">
								<div className="form-group coll mb-5">
									<input type="text" id="name" className="form-control" name="name" placeholder="Your name  *"/>
								</div>
								<div className="form-group coll mb-5">
									<input type="email" className="form-control" id="email" name="Email" placeholder="Your email  *"/>
								</div>
								<div className="form-group coll mb-5">
									<input type="tel" className="form-control" id="tel" name="tel" placeholder="Telephone number  *"/>
								</div>
							</div>
							<div className="form-group w-100 mb-6">
								<textarea className="form-control" placeholder="Meesage  *"></textarea>
							</div>
							<div className="text-center">
								<button type="submit" className="btn btnTheme btnShop md-round fwEbold text-white py-3 px-4 py-md-3 px-md-4">Send Message</button>
							</div>
						</form>
					</div>
				</div>
			</section>
		
		</main>
        </>
    )
}
export default Contact;
