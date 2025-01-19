import CreditProductCard from "../../components/credit-product-card/creditProductCard";

const CreditsPage = () => {
    const mockCreditProducts = [
        {
            id: 1,
            name: "Ипотека",
            type_product: "Жилищный кредит",
            percent: 6.5,
            repayment_period: 240,
            amount: 5000000,
            recommended_payment: 30000,
        },
        {
            id: 2,
            name: "Автокредит",
            type_product: "Кредит на автомобиль",
            percent: 7.2,
            repayment_period: 60,
            amount: 1000000,
            recommended_payment: 20000,
        },
        {
            id: 3,
            name: "Потребительский кредит",
            type_product: "Личный кредит",
            percent: 12.3,
            repayment_period: 36,
            amount: 300000,
            recommended_payment: 10000,
        },
    ];

    const handleApply = (productId) => {
        alert(`Заявка на продукт с ID ${productId} успешно подана!`);
    };

    return (
        <>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Кредитные продукты</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockCreditProducts.map((product) => (
                        <CreditProductCard
                            key={product.id}
                            product={product}
                            onApply={handleApply}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default CreditsPage;