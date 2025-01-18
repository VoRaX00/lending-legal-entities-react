import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const PaymentsPage = () => {
    // Пример данных
    const [payments, setPayments] = useState([
        {
            id: 1,
            legal_user: { name: "ООО Ромашка", inn: "1234567890" },
            recommended_payment: 1500.5,
            delay: 5,
            date_payment: "", // Платеж не оплачен
            date_replenishment: "2025-01-25",
        },
        {
            id: 2,
            legal_user: { name: "ИП Иванов", inn: "0987654321" },
            recommended_payment: 2000,
            delay: 0,
            date_payment: "2025-01-22", // Платеж оплачен
            date_replenishment: "2025-01-30",
        },
    ]);

    // Обработчик кнопки "Оплатить"
    const handlePay = (paymentId) => {
        setPayments((prevPayments) =>
            prevPayments.map((payment) =>
                payment.id === paymentId
                    ? { ...payment, date_payment: new Date().toISOString().split("T")[0] }
                    : payment
            )
        );
        alert(`Платеж с ID ${paymentId} успешно оплачен!`);
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Список платежей</h1>
            <table className="table table-bordered">
                <thead className="thead-dark">
                <tr>
                    <th>#</th>
                    <th>Юридическое лицо</th>
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
                    <tr key={payment.id}>
                        <td>{payment.id}</td>
                        <td>{payment.legal_user.name}</td>
                        <td>{payment.legal_user.inn}</td>
                        <td>{payment.recommended_payment.toFixed(2)} ₽</td>
                        <td>{payment.delay}</td>
                        <td>
                            {payment.date_payment
                                ? payment.date_payment
                                : <span className="text-muted">Не оплачено</span>}
                        </td>
                        <td>{payment.date_replenishment}</td>
                        <td>
                            {!payment.date_payment && (
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => handlePay(payment.id)}
                                >
                                    Оплатить
                                </button>
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
