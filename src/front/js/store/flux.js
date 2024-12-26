const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			
			token: null,
			user: null,
			users: [],
			error: null,
			valite: null,
			email: null,
			role: null,
			isLoading: false,  
		},
		actions: {
			getUsers: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/user");
					if (!resp.ok) throw new Error('Failed to fetch users');
					const data = await resp.json();
					setStore({ users: data });
				} catch (error) {
					console.error('Error fetching users:', error);
					setStore({ error: 'Error fetching users' });
				}
			},

			deleteUser: async (id) => {
				try {
					const tokenLocal = localStorage.getItem('token');
					setStore({ token: tokenLocal });
					const token = getStore().token;

					const resp = await fetch(process.env.BACKEND_URL + "/api/user/" + id, {
						method: "DELETE",
						headers: {
							"Authorization": `Bearer ${token}`
						}
					});
					if (resp.ok) {
						const data = await resp.json();
						setStore({ users: data });
					} else {
						throw new Error('Failed to delete user');
					}
				} catch (error) {
					console.error('Error deleting user:', error);
					setStore({ error: 'Error deleting user' });
				}
			},

			editUser: async (id, name, lastname, email, phone, address, city, state, zipcode, birthday, is_active, role) => {
				try {
					const tokenLocal = localStorage.getItem('token');
					setStore({ token: tokenLocal });
					const token = getStore().token;

					const resp = await fetch(process.env.BACKEND_URL + "/api/user/" + id, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${token}`
						},
						body: JSON.stringify({
							name, lastname, email, phone, address, city, state, zipcode, birthday, is_active, role
						})
					});

					if (resp.ok) {
						const data = await resp.json();
						setStore({ users: data });
					} else {
						throw new Error('Failed to edit user');
					}
				} catch (error) {
					console.error('Error editing user:', error);
					setStore({ error: 'Error editing user' });
				}
			},

			login: async (email, password) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({ email, password })
					});

					if (resp.ok) {
						const data = await resp.json();
						localStorage.setItem('user', JSON.stringify(data.user));
						localStorage.setItem('token', data.access_token);
						setStore({ token: data.access_token, user: data.user, role: data.user.role });
					} else {
						const errorData = await resp.json();
						setStore({ error: errorData.msg || "Invalid email or password" });
					}
				} catch (error) {
					console.error('Login error:', error);
					setStore({ error: 'Error logging in' });
				}
			},

			register: async (name, lastname, email, password, phone, address, city, state, zipcode, birthday, is_active, role, navigate) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/signup", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							name, lastname, email, password, phone, address, city, state, zipcode, birthday, is_active, role
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
				try {
					const tokenLocal = localStorage.getItem('token');
					setStore({ token: tokenLocal });
					const token = getStore().token;

					const resp = await fetch(process.env.BACKEND_URL + "/api/private", {
						method: 'GET',
						headers: { 'Authorization': `Bearer ${token}` }
					});

					if (resp.ok) {
						const data = await resp.json();
						setStore({ email: data });
					} else {
						throw new Error('Failed to get private data');
					}
				} catch (error) {
					console.error('Error fetching private data:', error);
				}
			},

			getAdmin: async () => {
				try {
					const tokenLocal = localStorage.getItem('token');
					setStore({ token: tokenLocal });
					const token = getStore().token;

					const resp = await fetch(process.env.BACKEND_URL + "/api/admin", {
						method: 'GET',
						headers: { 'Authorization': `Bearer ${token}` }
					});

					if (resp.ok) {
						const data = await resp.json();
						setStore({ email: data });
					} else {
						throw new Error('Failed to fetch admin data');
					}
				} catch (error) {
					console.error('Error fetching admin data:', error);
				}
			}
		}
	};
};

export default getState;
