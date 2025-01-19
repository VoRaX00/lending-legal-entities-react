import { useEffect, useState } from "react";
import CreditProductCard from "../../components/credit-product-card/creditProductCard";

const MainPage = () => {
    const [creditProducts, setCreditProducts] = useState([]);

    const fetchCreditProducts = async () => {
        try {
            const response = await fetch("http://localhost:8080/credit_product/");
            if (!response.ok) {
                throw new Error("Ошибка при загрузке данных");
            }
            const data = await response.json();
            setCreditProducts(data);
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    useEffect(() => {
        fetchCreditProducts();
    }, []);


    const handleApply = (productId) => {
        alert(`Заявка на продукт с ID ${productId} успешно подана!`);
    };

    return (
        <>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Кредитные продукты</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {creditProducts.map((product) => (
                        <CreditProductCard
                            key={product.id}
                            product={product}
                            onApply={handleApply}
                            button={true}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default MainPage;