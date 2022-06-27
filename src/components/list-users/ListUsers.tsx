import React, {FC, useEffect, useState} from 'react';
import {deleteUser, getListUsers} from "../../api/api";
import IUser from "../../types/types";
import {Link} from "react-router-dom";
import "./ListUserStyle.scss";


const ListUsers: FC = () => {
    const [listUsers, setListUsers] = useState<IUser[]>([]);

    useEffect(() => {
            getListUsers().then(data => {
                data && data.length !== listUsers.length && setListUsers(data)
            })
        }, [],
    );


    return <div className="listUserComponent">
        {listUsers.map(item => {
            return <div className="userCard" key={item.id}>
                <Link to={`/user/${item.id}`}>
                    <div className="infoUser">
                        <span>Имя:</span> <label> {item.first_name} {item.last_name}</label>
                        <span>Дата рождения:</span><label> {item.birth_date}</label>
                        <span>Пол:</span> <label>{item.gender}</label>
                    </div>
                </Link>

                <div className="wrapperButtons">
                    <button onClick={() => deleteUser(item.id).then(() => {
                        return setListUsers(listUsers.filter(itemF => itemF.id !== item.id));
                    })}> Delete
                    </button>
                    <Link to={`/create-user`}>Add</Link>
                </div>
            </div>
        })}
    </div>

};
export default ListUsers;