import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";


export const Home = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");

	const handleSubscribe = (e) => {
		e.preventDefault();
		
		alert(`Subscribed with email: ${email}`);
		setEmail("");
	};

	return (
		<div className="home-container">
			<header className="hero-section">
				<div className="container text-center">
					<h1 className="display-4 mb-4">Welcome to Our Amazing App</h1>
					<p className="lead mb-5">Discover the power of seamless integration and stunning design</p>
					<Link to="/signup" className="btn btn-primary btn-lg me-3 ">Get Started</Link>
					<Link to="/features" className="btn btn-outline-light btn-lg">Learn More</Link>
				</div>
			</header>
			<section className="about-section py-5">
				<div className="container">
					<h2 className="text-center mb-5">About Us</h2>
					<div className="row">
						<div className="col-md-6">
							<img src="https://cdn.prod.website-files.com/5e0f1144930a8bc8aace526c/65dd33d49a346d9be0b075ea_65dd12fa299e167d189f00f7-fed9c2116dfcf56370cea3063f4e88fa.jpeg" className="img-fluid" alt="About Us" />
						</div>
						<div className="col-md-6">
							<h3 className="mb-4">Our Mission</h3>
							<p className="lead">Our mission is to help businesses of all sizes succeed by providing them with the tools they need to grow and thrive.</p>
							<h3 className="mb-4">Our Vision</h3>
							<p className="lead">Our vision is to create a world where businesses can reach their full potential and achieve their goals with ease.</p>
						</div>
					</div>
				</div>
			</section>
			<section className="services-section py-5">
				<div className="container">
					<h2 className="text-center mb-5">Our Services</h2>
					<div className="row">
						<div className="col-md-4 mb-4">
							<div className="card h-100">
								<div className="card-body">
									<i className="fas fa-chart-bar fa-3x mb-3 text-primary"></i>
									<h3 className="card-title">Analytics</h3>
									<p className="card-text">Get valuable insights into your business with our powerful analytics tools.</p>
								</div>
							</div>
						</div>
						<div className="col-md-4 mb-4">
							<div className="card h-100">
								<div className="card-body">
									<i className="fas fa-cogs fa-3x mb-3 text-primary"></i>
									<h3 className="card-title">Customization</h3>
									<p className="card-text">Tailor the app to your needs with our flexible customization options.</p>
								</div>
							</div>
						</div>
						<div className="col-md-4 mb-4">
							<div className="card h-100">
								<div className="card-body">
									<i className="fas fa-mobile-alt fa-3x mb-3 text-primary"></i>
									<h3 className="card-title">Mobile</h3>
									<p className="card-text">Access your data on any device with our mobile-friendly design.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="features-section py-5">
				<div className="container">
					<h2 className="text-center mb-5">Key Features</h2>
					<div className="row">
						<div className="col-md-4 mb-4">
							<div className="card h-100">
								<div className="card-body">
									<i className="fas fa-rocket fa-3x mb-3 text-primary"></i>
									<h3 className="card-title">Lightning Fast</h3>
									<p className="card-text">Experience blazing fast performance with our optimized architecture.</p>
								</div>
							</div>
						</div>
						<div className="col-md-4 mb-4">
							<div className="card h-100">
								<div className="card-body">
									<i className="fas fa-shield-alt fa-3x mb-3 text-primary"></i>
									<h3 className="card-title">Secure</h3>
									<p className="card-text">Your data is protected with state-of-the-art security measures.</p>
								</div>
							</div>
						</div>
						<div className="col-md-4 mb-4">
							<div className="card h-100">
								<div className="card-body">
									<i className="fas fa-cogs fa-3x mb-3 text-primary"></i>
									<h3 className="card-title">Customizable</h3>
									<p className="card-text">Tailor the app to your needs with our flexible customization options.</p>
								</div>
							</div>
						</div>
					</div>
					<div className="row mt-4">
						<div className="col-md-4 mb-4">
							<div className="card h-100">
								<div className="card-body">
									<i className="fas fa-chart-line fa-3x mb-3 text-primary"></i>
									<h3 className="card-title">Insightful</h3>
									<p className="card-text">Get valuable insights into your business with our powerful analytics tools.</p>
								</div>
							</div>
						</div>
						<div className="col-md-4 mb-4">
							<div className="card h-100">
								<div className="card-body">
									<i className="fas fa-mobile-alt fa-3x mb-3 text-primary"></i>
									<h3 className="card-title">Responsive</h3>
									<p className="card-text">Access your data on any device with our mobile-friendly design.</p>
								</div>
							</div>
						</div>
						<div className="col-md-4 mb-4">
							<div className="card h-100">
								<div className="card-body">
									<i className="fas fa-headset fa-3x mb-3 text-primary"></i>
									<h3 className="card-title">Support</h3>
									<p className="card-text">Get 24/7 support from our team of dedicated professionals.</p>
								</div>
							</div>
						</div>
				</div>
			</div>
			</section>
			<section className="testimonials-section py-5">
				<div className="container">
					<h2 className="text-center mb-5">Testimonials</h2>
					<div className="row">
						<div className="col-md-4 mb-4">
							<div className="card h-100">
								<div className="card-body">
									<p className="card-text">"This app is amazing! It has helped me streamline my business and save time and money."</p>
									<div className="d-flex align-items-center mt-4">
										<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyzTWQoCUbRNdiyorem5Qp1zYYhpliR9q0Bw&s" width="100px" height="100px" alt="User" className="rounded-circle me-4" />
										<div>
											<h5 className="mb-0">John Doe</h5>
											<p className="small text-muted">CEO, Company Inc.</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-4 mb-4">
							<div className="card h-100">
								<div className="card-body">
									<p className="card-text">"I love the flexibility of this app. It's perfect for businesses of all sizes."</p>
									<div className="d-flex align-items-center mt-4">
										<img src="https://cdn.pixabay.com/photo/2016/11/29/13/14/attractive-1869761_1280.jpg" width="100px" height="110px" alt="User" className="rounded-circle me-3" />
										<div>
											<h5 className="mb-0">Jane Smith</h5>
											<p className="small text-muted">Founder, Company LLC</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-4 mb-4">
							<div className="card h-100">
								<div className="card-body">
									<p className="card-text">"I highly recommend this app to anyone looking to take their business to the next level."</p>
									<div className="d-flex align-items-center mt-4">
										<img src="https://hackspirit.com/wp-content/uploads/2021/06/Copy-of-Rustic-Female-Teen-Magazine-Cover.jpg" width="100px" height="100px" alt="User" className="rounded-circle me-3" />
										<div>
											<h5 className="mb-0">Sarah Johnson</h5>
											<p className="small text-muted">Owner, Company Co.</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		<section className="pricing-section py-5">
			<div className="container">
				<h2 className="text-center mb-5">Pricing</h2>
				<div className="row">
					<div className="col-md-4 mb-4">
						<div className="card h-100">
							<div className="card-body">
								<h3 className="card-title">Basic</h3>
								<p className="card-text">Perfect for small businesses</p>
								<h4 className="card-title pricing">$9.99/month</h4>
								<button className="btn btn-primary">Get Started</button>
							</div>
						</div>
					</div>
					<div className="col-md-4 mb-4">
						<div className="card h-100">
							<div className="card-body">
								<h3 className="card-title">Standard</h3>
								<p className="card-text">Great for growing businesses</p>
								<h4 className="card-title pricing">$19.99/month</h4>
								<button className="btn btn-primary">Get Started</button>
							</div>
						</div>
					</div>
					<div className="col-md-4 mb-4">
						<div className="card h-100">
							<div className="card-body">
								<h3 className="card-title">Premium</h3>
								<p className="card-text">Ideal for large businesses</p>
								<h4 className="card-title pricing">$29.99/month</h4>
								<button className="btn btn-primary">Get Started</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section className="faq-section py-5">
			<div className="container">
				<h2 className="text-center mb-5">FAQ</h2>
				<div className="accordion" id="faqAccordion">
					<div className="accordion-item">
						<h2 className="accordion-header" id="headingOne">
							<button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
								What is this app?
							</button>
						</h2>
						<div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
							<div className="accordion-body">
								This app is a powerful tool that helps you manage your business more efficiently.
							</div>
						</div>
					</div>
					<div className="accordion-item">
						<h2 className="accordion-header" id="headingTwo">
							<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
								How can I get started?
							</button>
						</h2>
						<div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
							<div className="accordion-body">
								You can get started by signing up for an account and exploring the app's features.
							</div>
						</div>
					</div>
					<div className="accordion-item">
						<h2 className="accordion-header" id="headingThree">
							<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
								Is this app secure?
							</button>
						</h2>
						<div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
							<div className="accordion-body">
								Yes, this app is secure and your data is protected with state-of-the-art security measures.
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		

			<section className="cta-section py-5">
				<div className="container text-center">
					<h2 className="mb-4">Ready to get started?</h2>
					<form onSubmit={handleSubscribe} className="form-inline justify-content-center">
						<input 
							type="email" 
							className="form-control mb-2 mr-sm-2 w-50 mx-auto" 
							placeholder="Enter your email" 
							value={email} 
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<button type="submit" className="btn btn-primary mb-2">Subscribe</button>
					</form>
				</div>
			</section>

			
		</div>
	);
};

