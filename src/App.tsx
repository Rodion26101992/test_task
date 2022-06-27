import React from 'react';
import {Routes, Route} from "react-router-dom";
import ListUsers from "./components/list-users/ListUsers"
import CreateUser from "./components/create-user/CreateUser";
import InfoUser from "./components/info-user/InfoUser";

function App() {


    return <div>
        <Routes>
            <Route path="/" element={<ListUsers/>}/>
            <Route path="/edit-user/:id" element={<CreateUser/>}/>
            <Route path="/create-user" element={<CreateUser/>}/>
            <Route path="/user/:id" element={<InfoUser/>}/>
        </Routes>
    </div>
}

export default App;
