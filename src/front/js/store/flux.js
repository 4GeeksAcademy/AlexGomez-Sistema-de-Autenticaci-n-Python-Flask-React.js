const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			token: null,
			user: null,
			error: null,
			valite: null,
			email:null,
			role: null,
			
		},
		actions: {
			
			login: async (email, password) => {
				const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				});
				
				if (resp.ok) {
					const data = await resp.json();

					localStorage.setItem('user', JSON.stringify(data.user));
					localStorage.setItem('token', data.access_token);
					setStore({ token: data.access_token, user: data.user, role: data.user.role });
					
				} else {
					setStore({ error: "Invalid email or password" });
				}
			},
			register: async (name, lastname, email, password, phone, address, city, state, zipcode, birthday,is_active,role,navigate) => {
			
				
				try {
				
					const resp = await fetch(process.env.BACKEND_URL + "api/signup", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							name: name,
							lastname: lastname,
							email: email,
							password: password,
							phone: phone,
							address: address,
							city: city,
							state: state,
							zipcode: zipcode,
							birthday: birthday,
							is_active: is_active,
							role: role

						})
					});
					
					if (resp.ok) {
						const data = await resp.json();
						setStore({ user: data.user });
						localStorage.setItem('user', JSON.stringify(data)); 
						navigate("/login");
					} else {
						const errorData = await resp.json();
						setStore({ error: errorData.msg || "An error occurred during registration." });
					}
				} catch (error) {
					console.error("Error during registration:", error);
					setStore({ error: "An error occurred during registration." });
				}
			},
			logout: () => {
				setStore({ token: null, user: null });
				localStorage.removeItem('token');
				localStorage.removeItem('user');
			},

			getPrivate: async () => {
				try{
				const tokenLocal = localStorage.getItem('token');
				setStore({ token: tokenLocal });
				const token = getStore().token;

				fetch(process.env.BACKEND_URL + "/api/private", {
					method: 'GET',
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				
				.then(response => {if(response.ok)response.json()})
				.then(data => {if(data)setStore({ email: data })})
				.catch(error => console.log('Error:', error));
			}
				catch (error) {
					console.log('Error:', error);
				}
			
				
				
			},
			getAdmin: async () => {
				const tokenLocal = localStorage.getItem('token');
				setStore({ token: tokenLocal });
				const token = getStore().token;

				fetch(process.env.BACKEND_URL + "/api/admin", {
					method: 'GET',
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				.then(response => response.json())
				.then(data => setStore({ email: data }))
				.catch(error => console.log('Error:', error));

				
				
				
			}
		
			
		}
	};
};

export default getState;
