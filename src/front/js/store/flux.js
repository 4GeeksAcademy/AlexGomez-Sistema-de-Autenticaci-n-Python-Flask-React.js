const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			token: null,
			user: null,
	
			error: null,
			
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
					
					setStore({ token: data.access_token, user: data.user });
					localStorage.setItem('user', JSON.stringify(data.user));
					localStorage.setItem('token', data.access_token);
				} else {
					setStore({ error: "Invalid email or password" });
				}
			},
			register: async (name, lastname, email, password, phone, address, city, state, zipcode, birthday,is_active,navigate) => {
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
							birstday: birthday,
							is_active: is_active
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
			}
			,
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

		
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
