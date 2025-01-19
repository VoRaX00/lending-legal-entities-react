import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "universal-cookie";
import {jwtDecode} from "jwt-decode";

const PaymentsPage = () => {
    const [payments, setPayments] = useState([]);
    const cookies = new Cookies();
    const [userInn, setUserInn] = useState("");

    const fetchPayments = async () => {
        try {
            const response = await fetch(`http://localhost:8080/payment/user/${userInn}`);
            if (!response.ok) {
                throw new Error("Ошибка при загрузке данных");
            }
            const data = await response.json();
            console.log(data)
            setPayments(data);
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    useEffect(() => {
        if (userInn) {
            fetchPayments();
        }
        const token = cookies.get("jwt_authorization");

        if (token) {
            const decodedToken = jwtDecode(token);
            setUserInn(decodedToken.inn);
        }
    }, [userInn]);


    const handlePay = async (paymentId, recommended_payment, delay) => {
        try {
            const now = new Date().toISOString();
            const requestBody = {
                date_replenishment: now,
                recommended_payment: recommended_payment,
                delay: delay,
            };

            const response = await fetch(`http://localhost:8080/payment/${paymentId}`, {
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
            await fetchPayments();
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center">Управление платежами</h1>
            <table className="table table-bordered table-hover">
                <thead className="thead-dark">
                <tr>
                    <th>#</th>
                    <th>ИНН</th>
                    <th>Рекомендуемый платеж</th>
                    <th>Просрочка (дни)</th>
                    <th>Дата платежа</th>
                    <th>Дата пополнения</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {payments.map((payment) => (
                    <tr key={payment.id} className={payment.delay > 0 ? "table-danger" : ""}>
                        <td>{payment.id}</td>
                        <td>{payment.legal_user_inn}</td>
                        <td>{payment.recommended_payment.toFixed(2)} ₽</td>
                        <td>
                            {payment.delay > 0 ? (
                                <span className="text-danger">{payment.delay}</span>
                            ) : (
                                <span className="text-success">0</span>
                            )}
                        </td>
                        <td>
                            {payment.date_payment ? (
                                <span className="text-success">{payment.date_payment}</span>
                            ) : (
                                <span className="text-muted">Не оплачено</span>
                            )}
                        </td>
                        <td>{payment.date_replenishment}</td>
                        <td>
                            {!payment.date_replenishment ? (
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => handlePay(payment.id, payment.recommended_payment, payment.delay)}
                                >
                                    Оплатить
                                </button>
                            ) : (
                                <span className="text-success">Оплачено</span>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentsPage;
