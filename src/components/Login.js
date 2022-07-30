import
React, {useState}
from
"react";

import { useNavigate } from "react-router-dom";


export default function Login() {

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    function validateForm() {

        return username.length > 0 && password.length > 0;

    }
    const navigate = useNavigate()
    function handleSubmit(event) {
        event.preventDefault();
        const user = { username, password }
        localStorage.setItem('user', JSON.stringify(user))
        navigate('/chat')
    }

    return (

        <div className="Login">

            <form onSubmit={handleSubmit}>



                    <label>Username</label>

                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}

                    />



                    <label>Password</label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                    />
            <button type={"submit"}> Submit</button>
            </form>

        </div>

    );

}