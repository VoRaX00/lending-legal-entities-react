import React from "react";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        if (user && user.type) {
            navigate(path);
        } else {
            navigate("/login");
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    if (!user) {
        return null;
    }

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="flex justify-center space-x-4">
                {user.type === "user" && (
                    <>
                        <button
                            onClick={() => handleNavigate("/")}
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
                        >
                            Подать заявку
                        </button>
                        <button
                            onClick={() => handleNavigate("/payments")}
                            className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded"
                        >
                            Внести платеж
                        </button>
                        <button
                            onClick={() => handleNavigate("/request")}
                            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded"
                        >
                            Посмотреть свои заявки
                        </button>
                    </>
                )}

                {user.type === "admin" && (
                    <>
                        <button
                            onClick={() => handleNavigate("/admin/credits")}
                            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded"
                        >
                            Посмотреть кредитные продукты
                        </button>
                        <button
                            onClick={() => handleNavigate("/admin/addCredits")}
                            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded"
                        >
                            Добавить кредитный продукт
                        </button>
                        <button
                            onClick={() => handleNavigate("/admin/requests")}
                            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded"
                        >
                            Посмотреть заявки
                        </button>
                        <button
                            onClick={() => handleNavigate("/admin/payments")}
                            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded"
                        >
                            Посмотреть платежи
                        </button>
                    </>
                )}

                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded"
                >
                    Выйти
                </button>
            </div>
        </nav>
    );
};

export default NavigationBar;
