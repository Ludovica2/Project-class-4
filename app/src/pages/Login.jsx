import { useEffect, useState } from "react"
import { buildAuthUrl } from "../config/confing";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useRequest } from "../hooks/request";
import { toast } from "react-toastify";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data, error, request: loginRequest } = useRequest(buildAuthUrl("/token"), { method: "POST", enableCache: false });

    const [form ,setForm] = useState({
        email: "ilaria.mammana@gmail.com",
        password: "1234"
    });

    const handleInput = (e) => {
        const { name, value } = e.target;

        setForm((form) => ({ ...form, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        loginRequest({ data: { ...form } });
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        
        if (data) {
            dispatch(login(data));
            navigate("/app/");
        }
    }, [data, error])

    return (
        <>
            <h1>Login</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" value={form.email} onInput={handleInput} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" value={form.password} onInput={handleInput} />
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login