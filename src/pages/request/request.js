import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const RequestsPage = () => {
    // Пример данных
    const [requests, setRequests] = useState([
        {
            id: 1,
            legal_user: { name: "ООО Ромашка", inn: "1234567890" },
            credit_product: { name: "Кредит 12%", amount: 100000 },
            status: "в обработке",
            administrator: { name: "Иванов Иван" },
        },
        {
            id: 2,
            legal_user: { name: "ИП Иванов", inn: "0987654321" },
            credit_product: { name: "Ипотека", amount: 500000 },
            status: "принято",
            administrator: { name: "Петров Петр" },
        },
        {
            id: 3,
            legal_user: { name: "ООО Лилия", inn: "1122334455" },
            credit_product: { name: "Автокредит", amount: 300000 },
            status: "отклонить",
            administrator: { name: "Сидоров Алексей" },
        },
    ]);

    // Функция для обновления статуса заявки
    const updateStatus = (id, newStatus) => {
        setRequests((prevRequests) =>
            prevRequests.map((request) =>
                request.id === id ? { ...request, status: newStatus } : request
            )
        );
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Список заявок</h1>
            <table className="table table-bordered">
                <thead className="thead-dark">
                <tr>
                    <th>#</th>
                    <th>Юридическое лицо</th>
                    <th>ИНН</th>
                    <th>Кредитный продукт</th>
                    <th>Сумма кредита</th>
                    <th>Администратор</th>
                    <th>Статус</th>
                </tr>
                </thead>
                <tbody>
                {requests.map((request) => (
                    <tr key={request.id}>
                        <td>{request.id}</td>
                        <td>{request.legal_user.name}</td>
                        <td>{request.legal_user.inn}</td>
                        <td>{request.credit_product.name}</td>
                        <td>{request.credit_product.amount.toLocaleString()} ₽</td>
                        <td>{request.administrator.name}</td>
                        <td>
                <span
                    className={`badge ${
                        request.status === "в обработке"
                            ? "bg-warning"
                            : request.status === "принято"
                                ? "bg-success"
                                : "bg-danger"
                    }`}
                >
                  {request.status}
                </span>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default RequestsPage;
