import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const UsersPage = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:8080/legal_user/all"); // Замените на ваш URL API
            if (!response.ok) {
                throw new Error("Ошибка при загрузке данных пользователей");
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center">Информация о юр. лицах</h1>
            <table className="table table-bordered table-hover">
                <thead className="thead-dark">
                <tr>
                    <th>ИНН</th>
                    <th>Название</th>
                    <th>Тип деятельности</th>
                    <th>Контактное лицо</th>
                    <th>Адрес</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.inn}>
                        <td>{user.inn}</td>
                        <td>{user.name}</td>
                        <td>{user.type_activity}</td>
                        <td>{user.contact_person}</td>
                        <td>{user.address}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersPage;
