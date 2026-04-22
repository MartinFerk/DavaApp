import { useState } from 'react'

import './styles/App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import UserRegister from "./userRegister.jsx";
import UserLogin from "./userLogin.jsx";
import WorkLog from "./createWorkLog.jsx";
import { useEffect } from "react";
import { Analytics } from '@vercel/analytics/react';
import CreateGroup from "./createGroup.jsx";
import MyGroups from "./myGroups.jsx";
import MyWorkLog from "./myWorkLog.jsx";
import AdminPage from './adminPage.jsx';
import HistoryPage from './historyLog.jsx';


function App() {
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {

        const shranjenUporabnik = localStorage.getItem('prijavljenUporabnik');

        if (shranjenUporabnik) {
            const podatki = JSON.parse(shranjenUporabnik);
            setUser(podatki);
            setIsLoggedIn(true);
            setIsAdmin(podatki.isAdmin || false);
        }
    }, []);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('prijavljenUporabnik');
        navigate('/');
    };

    return (
        <section>
            <nav className="globalNav">
              <span className="navigationButtons">
                  <button className="btn btn-gray" onClick={() => navigate('/')}>Domov</button>

                  {isAdmin && isLoggedIn && (
                      <span className="adminNav">
                          <button className="btn btn-gray" onClick={() => navigate('/create-group')}>Ustvari skupino</button>
                          <button className="btn btn-gray" onClick={() => navigate('/admin')}>Pregled</button>
                      </span>
                  )}

                  {isLoggedIn && (
                      <span className="userNav">
                          <button className="btn btn-gray" onClick={() => navigate('/my-groups')}>Moje skupine</button>
                          <button className="btn btn-gray" onClick={() => navigate('/my-worklog')}>Moje delo</button>
                          <button className="btn btn-gray" onClick={() => navigate('/history')}>Zgodovina</button>
                      </span>
                  )}
              </span>

                <span className="userNav">
                  {!isLoggedIn ? (
                      <>
                          <button className="btn btn-gray" onClick={() => navigate('/login')}>Prijava</button>
                          <button className="btn btn-gray" onClick={() => navigate('/register')}>Registracija</button>
                      </>
                  ) : (
                      <button className="btn btn-gray" onClick={handleLogout}>Odjava</button>
                  )}
              </span>
            </nav>

            <div className="page-container">
                <Routes>
                    <Route path="/" element={
                        <header style={{ textAlign: 'center', color: 'white', paddingTop: '100px' }}>
                            <h1>Work Wave</h1>
                            {isLoggedIn && user && (
                                <>
                                    <h2>Pozdravljen, {user.username}</h2>
                                    {isAdmin && (
                                        <div style={{ marginTop: '20px' }}>
                                            <button onClick={() => navigate('/work')} className="btn btn-gray" style={{ fontSize: '18px', padding: '12px 24px' }}>
                                                Ustvari Termin
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </header>
                    } />

                    <Route path="/register" element={<UserRegister />} />
                    <Route path="/login" element={<UserLogin setIsLoggedIn={setIsLoggedIn} setUser={setUser} setIsAdmin={setIsAdmin} />} />
                    <Route path="/work" element={<WorkLog />} />
                    <Route path="/create-group" element={<CreateGroup />} />
                    <Route path="/my-groups" element={<MyGroups />} />
                    <Route path="/my-worklog" element={<MyWorkLog />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/history" element={<HistoryPage />} />
                </Routes>
            </div>
            <Analytics />
        </section>
    )
}
export default App
