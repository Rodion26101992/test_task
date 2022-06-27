import React, {FC, useEffect, useState} from 'react';
import {useForm, SubmitHandler} from "react-hook-form";
import {useParams, useNavigate} from 'react-router-dom';
import IUser from "../../types/types";
import {createUser, updateUser, getUser} from "../../api/api";
import './CreateUserStyle.scss';


const CreateUser: FC = () => {
    const {id} = useParams();
    const [user, setUser] = useState<IUser | any>();
    const [isCheck, setCheck] = useState<boolean>(false);
    const {handleSubmit, register} = useForm<IUser | any>();
    const navigate = useNavigate();

    useEffect(() => {
        id && getUser(id).then(data => {
            data && setUser(data.data);
            data && setCheck(data.data.is_active);
        });
    }, []);

    const onSubmit: SubmitHandler<IUser> = data => {
        data.is_active = isCheck;
        !id ? createUser(data).then(() => navigate('/'))
            : updateUser(data, id).then(() => navigate('/'))
    };

    function setInput(nameLabel: string, nameRegister: string) {
        return <>
            <label htmlFor={nameLabel}>{nameLabel}</label>
            <input {...register(nameRegister)} defaultValue={user ? user[nameRegister] : ''} required
                   maxLength={256}/>
        </>
    }

    function getCreateForm() {
        return <div className="wrapperInput">
            {setInput("First Name", "first_name")}
            {setInput("Last Name", "last_name")}
            <label>Birth Date</label>
            <input defaultValue={user ? user.birth_date : null} type={"date"}  {...register("birth_date")} required
                   min="1920-01-01" max="2020-07-07"
                   pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"/>
            <label>Gender Selection</label>
            <select {...register("gender")} defaultValue={user ? user["gender"] : "female"} required>
                <option value="female">female</option>
                <option value="male">male</option>
            </select>
            {setInput("Job", "job")}
            <label>Biography</label>
            <textarea defaultValue={user ? user["biography"] : ''}  {...register("biography")} maxLength={1024}
                      required/>
            <label>Active</label>
            <input checked={isCheck} type={"checkbox"}
                   onChange={() => setCheck(!isCheck)}/>
            <input type="submit" value={id ? "Edit" : "Create"}/>
        </div>
    }

    function getUpdateForm() {
        return <div className="wrapperInput">
            {setInput("First Name", "first_name")}
            {setInput("Last Name", "last_name")}
            <label>Birth Date</label>
            <input defaultValue={user.birth_date} type={"date"}  {...register("birth_date")} required
                   min="1920-01-01" max="2020-07-07"
                   pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"/>
            <label>Gender Selection</label>
            <select {...register("gender")} defaultValue={user["gender"]} required>
                <option value="female">female</option>
                <option value="male">male</option>
            </select>
            {setInput("Job", "job")}
            <label>Biography</label>
            <textarea defaultValue={user["biography"]}  {...register("biography")} maxLength={1024}
                      required/>
            <label>Active</label>
            <input checked={isCheck} type={"checkbox"}
                   onChange={() => setCheck(!isCheck)}/>
            <input type="submit" value={id ? "Edit" : "Create"}/>
        </div>
    }

    return <form onSubmit={handleSubmit(onSubmit)}>
        <div className="crateUserComponent">
            {user && id && getUpdateForm()}
            {!id && getCreateForm()}
        </div>
    </form>

};
export default CreateUser;