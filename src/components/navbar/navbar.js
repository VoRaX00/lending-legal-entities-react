import React from "react";
import {useAuth} from "../../context/auth";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
    const {logout} = useAuth()
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="flex justify-center space-x-4">
                <button
                    onClick={() => handleNavigate("/submit-application")}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
                >
                    Подать заявку
                </button>
                <button
                    onClick={() => handleNavigate("/make-payment")}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded"
                >
                    Внести платеж
                </button>
                <button
                    onClick={() => handleNavigate("/view-applications")}
                    className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded"
                >
                    Посмотреть свои заявки
                </button>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded"
                >
                    Выйти
                </button>
            </div>
        </nav>
    );
};

export default NavigationBar;
