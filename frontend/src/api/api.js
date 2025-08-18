const API_URL = import.meta.env.VITE_API_URL;

export default async function apiRequest(path, options) {
	try {
		console.log("Sending request to ", API_URL+path);
		const response = await fetch(API_URL + path, options);
		const data = await response.json();
		if (!response.ok || !data.success) {
			throw new Error(data.message);
		}

		return data;
	} catch (error) {
		throw new Error(error.message);
	}
}
