import { useState, useEffect } from 'react';
import './styles/userRegister.css';
import apiFetch from './api';

function AdminPage() {
    const [work, setWork] = useState([]);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        apiFetch('/_/backend/admin/work')
            .then(res => res.json())
            .then(data => setWork(data))
            .catch(err => console.log(err));

        apiFetch('/_/backend/admin/groups')
            .then(res => res.json())
            .then(data => setGroups(data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="register-container">
            <h2>Admin pregled</h2>

            <h3>Moje skupine</h3>
            {groups.length === 0 ? <p>Nisi ustvaril nobene skupine.</p> : (
                groups.map(g => (
                    <div key={g._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                        <h4>{g.groupName}</h4>
                        <p>Člani: {g.members.join(', ')}</p>
                    </div>
                ))
            )}

            <h3 style={{ marginTop: '30px' }}>Vsi termini</h3>
            {work.length === 0 ? <p>Ni nobenih terminov.</p> : (
                work.map(w => (
                    <div key={w._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                        <h4>{w.clientName}</h4>
                        <p>Voznik: {w.assignedUser}</p>
                        <p>Čas: {new Date(w.time).toLocaleString()}</p>
                        <p>Prevzem: {w.pickupAddress}</p>
                        <p>Cilj: {w.destinationAddress}</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default AdminPage;