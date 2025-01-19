import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import CreditProductCard from "../../components/credit-product-card/creditProductCard";

const MainPage = () => {
    const cookies = new Cookies();
    const [creditProducts, setCreditProducts] = useState([]);
    const [userInn, setUserInn] = useState(""); // Состояние для хранения INN пользователя

    // Функция для получения кредитных продуктов
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

        // Получаем токен из куки
        const token = cookies.get("jwt_authorization"); // Извлекаем токен из куки

        if (token) {
            const decodedToken = jwtDecode(token); // Декодируем токен
            setUserInn(decodedToken.inn); // Извлекаем INN из полезной нагрузки токена
        }
    }, []);

    // Функция для отправки заявки
    const handleApply = async (productId) => {
        if (!userInn) {
            alert("Ошибка: не найден INN пользователя.");
            return;
        }

        try {
            const requestData = {
                legal_user_inn: userInn, // Данные пользователя
                credit_product_id: productId, // ID выбранного кредитного продукта
            };

            const response = await fetch("http://localhost:8080/request/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error("Ошибка при создании заявки");
            }

            // const result = await response.json();
            alert(`Заявка на продукт с ID ${productId} успешно подана!`);
        } catch (error) {
            console.error("Ошибка при отправке заявки:", error);
            alert("Произошла ошибка при подаче заявки");
        }
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
                            onApply={() => handleApply(product.id)} // Вызовем функцию при нажатии на кнопку
                            button={true}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default MainPage;