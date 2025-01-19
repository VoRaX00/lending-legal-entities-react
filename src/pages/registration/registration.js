import React, { useState } from "react";
import {useAuth} from "../../context/auth";
import {useNavigate} from "react-router-dom";

const RegistrationPage = () => {
    const [inn, setInn] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [activityType, setActivityType] = useState("");
    const [contactPerson, setContactPerson] = useState("");
    const [address, setAddress] = useState("");
    const [errors, setErrors] = useState({});

    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    const validateForm = () => {
        let formErrors = {};
        // Валидация ИНН (10 цифр)
        if (!/^\d{10}$/.test(inn)) {
            formErrors.inn = "ИНН должен быть числом из 10 символов.";
        }

        // Валидация наименование юр. лица
        if (!companyName.trim()) {
            formErrors.companyName = "Наименование юридического лица обязательно.";
        }

        // Валидация типа деятельности
        if (!activityType.trim()) {
            formErrors.activityType = "Тип деятельности обязателен.";
        }

        // Валидация контактного лица (ФИО)
        if (!/^[А-Я][а-я]+ [А-Я][а-я]+ [А-Я][а-я]+$/.test(contactPerson)) {
            formErrors.contactPerson = "Контактное лицо должно быть в формате: Фамилия Имя Отчество.";
        }

        // Валидация адреса
        if (!address.trim()) {
            formErrors.address = "Адрес обязателен.";
        }

        setErrors(formErrors);

        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateForm()) {
            try{
                const response = await fetch('http://localhost:8080/legal_user/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        inn: inn,
                        name: companyName,
                        type_activity: activityType,
                        contact_person: contactPerson,
                        address: address,
                    }),
                });

                if (response.ok) {
                    navigate('/login');
                } else {
                    const errorData = await response.json();
                    setError(errorData.detail || 'Произошла ошибка при регистрации');
                }
            }catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center">Регистрация пользователя</h1>
            <form onSubmit={handleSubmit} className="d-flex justify-content-center">
                <div className="col-12 col-md-6">
                    <div className="form-group m-3">
                        <label>ИНН</label>
                        <input
                            type="text"
                            className="form-control w-100"
                            value={inn}
                            onChange={(e) => setInn(e.target.value)}
                            maxLength="10"
                        />
                        {errors.inn && <small className="text-danger">{errors.inn}</small>}
                    </div>

                    <div className="form-group m-3">
                        <label>Наименование юридического лица</label>
                        <input
                            type="text"
                            className="form-control w-100"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                        {errors.companyName && <small className="text-danger">{errors.companyName}</small>}
                    </div>

                    <div className="form-group m-3">
                        <label>Тип деятельности</label>
                        <input
                            type="text"
                            className="form-control w-100"
                            value={activityType}
                            onChange={(e) => setActivityType(e.target.value)}
                        />
                        {errors.activityType && <small className="text-danger">{errors.activityType}</small>}
                    </div>

                    <div className="form-group m-3">
                        <label>Контактное лицо (ФИО)</label>
                        <input
                            type="text"
                            className="form-control w-100"
                            value={contactPerson}
                            onChange={(e) => setContactPerson(e.target.value)}
                            placeholder="Фамилия Имя Отчество"
                        />
                        {errors.contactPerson && <small className="text-danger">{errors.contactPerson}</small>}
                    </div>

                    <div className="form-group m-3">
                        <label>Адрес</label>
                        <input
                            type="text"
                            className="form-control w-100"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        {errors.address && <small className="text-danger">{errors.address}</small>}
                    </div>

                    <button type="submit" className="btn m-3 btn-primary btn-block">
                        Зарегистрировать
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegistrationPage;
