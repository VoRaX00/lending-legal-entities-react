import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {jwtDecode} from "jwt-decode"; // Убедитесь, что импорт корректный
import Cookies from "universal-cookie";

const RequestsAllPage = () => {
    const [reqs, setReqs] = useState([]);
    const cookies = new Cookies();
    const [currentAdmin, setCurrentAdmin] = useState("");

    // Функция для получения заявок
    const fetchRequest = async () => {
        try {
            const response = await fetch(`http://localhost:8080/request`);
            if (!response.ok) {
                throw new Error("Ошибка при загрузке данных");
            }
            const data = await response.json();
            setReqs(data);
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    // Функция для обновления администратора заявки
    const takeRequest = async (requestId, status) => {
        try {
            const token = cookies.get("jwt_authorization");
            if (!token) {
                console.error("Ошибка: токен не найден")
                return;
            }

            const decodedToken = jwtDecode(token);
            const adminEmail = decodedToken.email;
            if (!adminEmail) {
                console.error("Ошибка: email администратора не найден.");
                return;
            }

            const requestBody = {
                status: status,
                email: adminEmail,
            };

            const response = await fetch(`http://localhost:8080/request/${requestId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error("Ошибка при обновлении заявки");
            }

            // Обновляем список заявок
            await fetchRequest();
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };


    // Эффект для загрузки заявок и получения текущего администратора из JWT
    useEffect(() => {
        fetchRequest();

        // Извлекаем логин администратора из токена
        const token = cookies.get("jwt_authorization");
        if (token) {
            const decodedToken = jwtDecode(token);
            setCurrentAdmin(decodedToken.login); // Сохраняем текущий логин администратора
        }
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Список заявок</h1>
            <table className="table table-bordered">
                <thead className="thead-dark">
                <tr>
                    <th>#</th>
                    <th>ИНН</th>
                    <th>Кредитный продукт</th>
                    <th>Сумма кредита</th>
                    <th>Администратор</th>
                    <th>Статус</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {reqs.map((request) => (
                    <tr key={request.id}>
                        <td>{request.id}</td>
                        <td>{request.legal_user_inn}</td>
                        <td>{request.product_id}</td>
                        <td>{request.amount.toLocaleString()} ₽</td>
                        <td>{request.administrator?.email || "Не определён"}</td>
                        <td>
                                <span
                                    className={`badge ${
                                        request.status === "в обработке"
                                            ? "bg-warning"
                                            : request.status === "принята"
                                                ? "bg-success"
                                                : "bg-danger"
                                    }`}
                                >
                                    {request.status}
                                </span>
                        </td>

                        <td>
                            {request.status !== "в обработке" ? (
                                <></>
                            ) : (
                                <>
                                {request.administrator?.email === "Не определён" ? (
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => takeRequest(request.id, "в обработке")}
                                        >
                                            Взять заявку
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                className="btn btn-success btn-sm"
                                                onClick={() => takeRequest(request.id,"принята")}
                                            >
                                                Одобрить
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => takeRequest(request.id, "отклонена")}
                                            >
                                                Отклонить
                                            </button>
                                        </>
                                    )}
                                </>
                            )
                            }
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default RequestsAllPage;
