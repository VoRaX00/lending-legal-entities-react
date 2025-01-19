import React from "react";

const CreditProductCard = ({ product, onApply, button }) => {
    return (
        <div className="border rounded p-4 shadow-lg">
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p>Тип: {product.type_product}</p>
            <p>Процентная ставка: {product.percent}%</p>
            <p>Срок погашения: {product.repayment_period} мес.</p>
            <p>Сумма: {product.amount.toLocaleString()} ₽</p>
            <p>Рекомендуемый платеж: {product.recommended_payment.toLocaleString()} ₽</p>
            { button ? (
                <button
                    onClick={() => onApply(product.id)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-600"
                >
                    Подать заявку
                </button>
                ) : (
                    <></>
                )
            }
        </div>
    );
};

export default CreditProductCard;
