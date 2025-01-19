import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const AddCreditProductForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(
                "http://localhost:8080/credit_product/",
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Продукт успешно добавлен:", response.data);
            alert("Кредитный продукт успешно создан!");
            reset();
        } catch (error) {
            console.error("Ошибка при создании кредитного продукта:", error.response?.data || error.message);
            alert("Произошла ошибка при создании продукта. Попробуйте снова.");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Добавить кредитный продукт</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="border p-4 rounded">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Название
                    </label>
                    <input
                        id="name"
                        type="text"
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                        {...register("name", { required: "Название обязательно" })}
                    />
                    {errors.name && (
                        <div className="invalid-feedback">{errors.name.message}</div>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="type_product" className="form-label">
                        Тип продукта
                    </label>
                    <input
                        id="type_product"
                        type="text"
                        className={`form-control ${errors.type_product ? "is-invalid" : ""}`}
                        {...register("type_product", { required: "Тип продукта обязателен" })}
                    />
                    {errors.type_product && (
                        <div className="invalid-feedback">{errors.type_product.message}</div>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="percent" className="form-label">
                        Процент
                    </label>
                    <input
                        id="percent"
                        type="number"
                        step="0.01"
                        className={`form-control ${errors.percent ? "is-invalid" : ""}`}
                        {...register("percent", {
                            required: "Процент обязателен",
                            min: { value: 0, message: "Процент не может быть отрицательным" },
                        })}
                    />
                    {errors.percent && (
                        <div className="invalid-feedback">{errors.percent.message}</div>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="repayment_period" className="form-label">
                        Период погашения (в месяцах)
                    </label>
                    <input
                        id="repayment_period"
                        type="number"
                        className={`form-control ${
                        errors.repayment_period ? "is-invalid" : ""
                        }`}
                        {...register("repayment_period", {
                            required: "Период погашения обязателен",
                            min: { value: 1, message: "Минимальный период — 1 месяц" },
                        })}
                    />
                    {errors.repayment_period && (
                        <div className="invalid-feedback">
                            {errors.repayment_period.message}
                        </div>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">
                        Сумма кредита
                    </label>
                    <input
                        id="amount"
                        type="number"
                        step="0.01"
                        className={`form-control ${errors.amount ? "is-invalid" : ""}`}
                        {...register("amount", {
                            required: "Сумма кредита обязательна",
                            min: { value: 0, message: "Сумма не может быть отрицательной" },
                        })}
                    />
                    {errors.amount && (
                        <div className="invalid-feedback">{errors.amount.message}</div>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="recommended_payment" className="form-label">
                        Рекомендуемый платеж
                    </label>
                    <input
                        id="recommended_payment"
                        type="number"
                        step="0.01"
                        className={`form-control ${
                            errors.recommended_payment ? "is-invalid" : ""
                        }`}
                        {...register("recommended_payment", {
                            required: "Рекомендуемый платеж обязателен",
                            min: {
                                value: 0,
                                message: "Рекомендуемый платеж не может быть отрицательным",
                            },
                        })}
                    />
                    {errors.recommended_payment && (
                        <div className="invalid-feedback">
                            {errors.recommended_payment.message}
                        </div>
                    )}
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Добавить продукт
                </button>
            </form>
        </div>
    );
};

export default AddCreditProductForm;