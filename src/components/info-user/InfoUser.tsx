import React, {useEffect, useState} from 'react';
import './InfoUserStyle.scss'
import {Link, useParams} from "react-router-dom";
import {deleteUser, getUser} from "../../api/api";
import IUser from "../../types/types";

function InfoUser() {
    // const test = {
    //     id: '43434',
    //     first_name: 'test',
    //     last_name: 'dfgdfgf',
    //     age: null,
    //     gender: 'dfgdfgdfg',
    //     birth_date: 'fdgfdgdfg',
    //     job: 'gfdgdfg',
    //     biography: 'fgfdgdfgdfg',
    //     is_active: false,
    // };
    const [user, setUser] = useState<IUser>();


    const {id} = useParams();

    useEffect(() => {
        id && getUser(id).then((data => {
          return  data && setUser(data.data);
        }))
        // setUser(test);
    }, []);

    function getInfoUser(name: string, info: string) {
        return <div className='boxLabel'>
            <label>{name}:</label><span>{info}</span>
        </div>
    }

    return <div className="infoUserComponent">{user && <div className="wrapperInfo">
        {getInfoUser("First name", user.first_name)}
        {getInfoUser("Last name", user.last_name)}
        {getInfoUser("Birthday", user.birth_date)}
        {getInfoUser("Gender", user.gender)}
        {getInfoUser("Job", user.job)}
        {getInfoUser("Biography", user.biography)}
        <label>Active:</label><span>{user.is_active ? "true" : "false"}</span>
        <div className="wrapperButtons">
            <Link id="btEdit" to={`/edit-user/${id}`}>
                <button id="btEdit">Edit</button>
            </Link>
            <Link to="/" onClick={() => id && deleteUser(id)}>
                <button id="btDelete"> Delete</button>
            </Link>

        </div>
    </div>}
    </div>
}

export default InfoUser;