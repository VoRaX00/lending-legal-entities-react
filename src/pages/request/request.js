import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {jwtDecode} from "jwt-decode";
import Cookies from "universal-cookie";

const RequestsPage = () => {
    const [reqs, setReqs] = useState([]);
    const cookies = new Cookies();
    const [userInn, setUserInn] = useState("");


    const fetchRequest = async () => {
        try {
            const response = await fetch(`http://localhost:8080/request/user/${userInn}`);
            if (!response.ok) {
                throw new Error("Ошибка при загрузке данных");
            }
            const data = await response.json();
            console.log(data)
            setReqs(data);
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    useEffect(() => {
        if (userInn) {
            fetchRequest();
        }
        const token = cookies.get("jwt_authorization");

        if (token) {
            const decodedToken = jwtDecode(token);
            setUserInn(decodedToken.inn);
        }
    }, [userInn]);

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
                </tr>
                </thead>
                <tbody>
                {reqs.map((request) => (
                    <tr key={request.id}>
                        <td>{request.id}</td>
                        <td>{request.legal_user_inn}</td>
                        <td>{request.product_id}</td>
                        <td>{request.amount.toLocaleString()} ₽</td>
                        <td>{request.administrator_email}</td>
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
                    </tr>
                ))}
                </tbody>

            </table>
        </div>
    );
};

export default RequestsPage;
