import React, { useEffect, useState } from "react";

//  Payment = {
//     id: number;
//     user_id: number;
//     amount: number;
//     due_date: string;
//     overdue_days: number;
//     penalty: number;
//     status: string;
// };

const PaymentsPage = () => {
    const [payments, setPayments] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState(null);

    useEffect(() => {
        fetch("/api/payments")
            .then((res) => res.json())
            .then((data) => setPayments(data));
    }, []);

    const handleUpdate = (paymentId, overdueDays, penalty) => {
        fetch(`/api/payments/${paymentId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ overdue_days: overdueDays, penalty: penalty }),
        })
            .then((res) => res.json())
            .then((data) => {
                alert(data.message);
                setPayments((prev) =>
                    prev.map((p) => (p.id === paymentId ? { ...p, overdue_days: data.payment.overdue_days, penalty: data.payment.penalty } : p))
                );
            });
    };

    return (
        <div>
            <h1>Payments</h1>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>User ID</th>
                    <th>Amount</th>
                    <th>Due Date</th>
                    <th>Overdue Days</th>
                    <th>Penalty</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {payments.map((payment) => (
                    <tr key={payment.id}>
                        <td>{payment.id}</td>
                        <td>{payment.user_id}</td>
                        <td>{payment.amount}</td>
                        <td>{payment.due_date}</td>
                        <td>{payment.overdue_days}</td>
                        <td>{payment.penalty}</td>
                        <td>{payment.status}</td>
                        <td>
                            <button onClick={() => setSelectedPayment(payment)}>Edit</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedPayment && (
                <div>
                    <h2>Edit Payment {selectedPayment.id}</h2>
                    <label>
                        Overdue Days:
                        <input
                            type="number"
                            defaultValue={selectedPayment.overdue_days}
                            onChange={(e) =>
                                setSelectedPayment({ ...selectedPayment, overdue_days: parseInt(e.target.value) })
                            }
                        />
                    </label>
                    <label>
                        Penalty:
                        <input
                            type="number"
                            defaultValue={selectedPayment.penalty}
                            onChange={(e) =>
                                setSelectedPayment({ ...selectedPayment, penalty: parseFloat(e.target.value) })
                            }
                        />
                    </label>
                    <button
                        onClick={() => {
                            handleUpdate(selectedPayment.id, selectedPayment.overdue_days, selectedPayment.penalty);
                            setSelectedPayment(null);
                        }}
                    >
                        Save
                    </button>
                </div>
            )}
        </div>
    );
};

export default PaymentsPage;
