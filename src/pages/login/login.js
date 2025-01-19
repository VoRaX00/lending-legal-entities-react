import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {useAuth} from "../../context/auth";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [formData, setFormData] = useState({
        identifier: "",
    });
    const navigate = useNavigate();
    const {login} = useAuth()

    const handleSwitch = () => {
        setIsAdmin(!isAdmin);
        setFormData({ identifier: ""});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            console.log("Submitted data:", formData);
            if (!isAdmin) {
                const response = await fetch("http://localhost:8080/legal_user/login", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        inn: formData.identifier
                    })
                })
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.token) {
                        console.log(data.token);
                        login(data.token);
                        navigate("/")
                    }
                } else {
                    console.error("Неверные данные");
                }
            } else {
                const response = await fetch("http://localhost:8080/admin/login", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        email: formData.identifier
                    })
                })
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.token) {
                        console.log(data.token);
                        login(data.token);
                        navigate("/admin/credits");
                    }
                }
            }
        } catch (error) {
            console.log(`Error with login: ${error}`)
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center">
                                Вход {isAdmin ? "администратора" : "пользователя"}
                            </h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <label htmlFor="identifier">
                                        {isAdmin ? "Email" : "ИНН"}
                                    </label>
                                    <input
                                        type={isAdmin ? "email" : "text"}
                                        className="form-control"
                                        id="identifier"
                                        name="identifier"
                                        placeholder={
                                            isAdmin ? "Введите email" : "Введите ИНН"
                                        }
                                        value={formData.identifier}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </form>
                            <div className="text-center mt-3">
                                <button
                                    className="btn btn-link"
                                    onClick={handleSwitch}
                                >
                                    Войти как {isAdmin ? "пользователь" : "администратор"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
