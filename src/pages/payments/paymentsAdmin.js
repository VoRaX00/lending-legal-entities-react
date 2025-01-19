import React, { useEffect, useState } from "react";

const PaymentsAdminPage = () => {
    const [payments, setPayments] = useState([]);
    const [editingPayment, setEditingPayment] = useState(null);
    const [recommendedPayment, setRecommendedPayment] = useState("");
    const [delay, setDelay] = useState("");

    const fetchPayments = async () => {
        try {
            const response = await fetch(`http://localhost:8080/payment/`);
            if (!response.ok) {
                throw new Error("Ошибка при загрузке данных");
            }
            const data = await response.json();
            setPayments(data);
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    const handleEdit = (paymentId, recommendedPayment, delay) => {
        setEditingPayment(paymentId);
        setRecommendedPayment(recommendedPayment);
        setDelay(delay);
    };

    const handleUpdate = async (dateReplenishment) => {
        if (!recommendedPayment || !delay) {
            return; // Проверка на валидность значений
        }

        try {
            const requestBody = {
                date_replenishment: dateReplenishment, // Передаем значение date_replenishment, без возможности редактировать
                recommended_payment: parseFloat(recommendedPayment),
                delay: parseFloat(delay),
            };

            const response = await fetch(`http://localhost:8080/payment/${editingPayment}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error("Ошибка при обновлении данных");
            }

            // Обновляем список после успешного обновления
            fetchPayments();
            setEditingPayment(null); // Снимаем режим редактирования
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);

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
                        <td>
                            {editingPayment === payment.id ? (
                                <input
                                    type="number"
                                    value={recommendedPayment}
                                    onChange={(e) => setRecommendedPayment(e.target.value)}
                                    className="form-control"
                                />
                            ) : (
                                <span>{payment.recommended_payment.toFixed(2)} ₽</span>
                            )}
                        </td>
                        <td>
                            {editingPayment === payment.id ? (
                                <input
                                    type="number"
                                    value={delay}
                                    onChange={(e) => setDelay(e.target.value)}
                                    className="form-control"
                                />
                            ) : payment.delay > 0 ? (
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
                                <>
                                    {editingPayment === payment.id ? (
                                        <button
                                            className="btn btn-success btn-sm"
                                            onClick={() => handleUpdate(payment.date_replenishment)} // Передаем date_replenishment в запрос
                                        >
                                            Сохранить
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() =>
                                                handleEdit(payment.id, payment.recommended_payment, payment.delay)
                                            }
                                        >
                                            Обновить
                                        </button>
                                    )}
                                </>
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

export default PaymentsAdminPage;
