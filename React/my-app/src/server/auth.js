export const subscribeToSite = async (email, password) => {
    try {
        const response = await fetch("http://localhost:3000/users/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                email,
                password,
                admin: false
             })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Signup failed');
        }

        return data.data.user;
        
    } catch (err) {
        console.error("Error Subscribing:", err.message);
        throw new Error(err?.message || "Unknown Error Occurred");
    }
};


export const loginToSite = async (email, password) => {
    try {
        const response = await fetch("http://localhost:3000/users/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({ 
                email,
                password
             })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Login failed');
        }
        return data.data.user;
        
    } catch (err) {
        console.error("Error Logging:", err.message);
        throw new Error(err?.message || "Unknown Error Occurred");
    }
};

export const changeInfo = async (id, fieldName, fieldValue, token) => {
    console.dir(process?.env)
    try {
        const response = await fetch(`http://localhost:3000/users/updateInfo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify({ 
                [fieldName]: fieldValue
             })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Changing Email failed');
        }

        return data.data.user;
        
    } catch (err) {
        console.error("Error Subscribing:", err.message);
        throw new Error(err?.message || "Unknown Error Occurred");
    }

}

export const deleteAccount = async (id, token) => {
    try {
        const response = await fetch(`http://localhost:3000/users/accounts`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Deletion failed');
        }
        
    } catch (err) {
        console.error("Error Subscribing:", err.message);
        throw new Error(err?.message || "Unknown Error Occurred");
    }
}