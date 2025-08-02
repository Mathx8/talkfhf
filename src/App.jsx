import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from "./Pages/Home";
import Plantel from "./Pages/Plantel";
import Museu from "./Pages/Museu";
import TimeDetalhes from "./Pages/Time";
import Libertadores from "./Pages/Libertadores"
import DraftCup from "./Pages/Draft Cup";
import Login from "./Pages/Login"
import Gerenciador from "./Pages/Gerenciador";
import useTitleFromRoute from "./useTitleFromRoute"

const RouterWrapper = () => {
    useTitleFromRoute();

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/gerenciador" element={<Gerenciador />} />
            <Route path="/plantel" element={<Plantel />} />
            <Route path="/plantel/:id" element={<TimeDetalhes />} />
            <Route path="/museu" element={<Museu />} />
            <Route path="/libertadores" element={<Libertadores />} />
            <Route path="/draft-cup" element={<DraftCup />} />
        </Routes>
    );
};

const App = () => {
    return (
        <BrowserRouter>
            <RouterWrapper />
        </BrowserRouter>
    );
};

export default App;
