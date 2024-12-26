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
				</div>
			</section>

		

			<section className="cta-section py-5">
				<div className="container text-center">
					<h2 className="mb-4">Ready to get started?</h2>
					<form onSubmit={handleSubscribe} className="form-inline justify-content-center">
						<input 
							type="email" 
							className="form-control mb-2 mr-sm-2" 
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

