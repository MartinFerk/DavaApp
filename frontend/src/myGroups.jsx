import { useState, useEffect } from 'react';
import './styles/userRegister.css';
import apiFetch from './api';

function MyGroups() {
    const [groups, setGroups] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editData, setEditData] = useState({});

    const currentUser = JSON.parse(localStorage.getItem('prijavljenUporabnik'));

    useEffect(() => {
        if (!currentUser) return;

        apiFetch(`/_/backend/groups/${currentUser.username}`)
            .then(res => res.json())
            .then(data => setGroups(data))
            .catch(err => console.log("Napaka pri pridobivanju skupin", err));
    }, []);

    const handleDelete = async (id) => {
        const response = await apiFetch(`/_/backend/groups/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            setGroups(groups.filter(g => g._id !== id));
        } else {
            alert("Napaka pri brisanju.");
        }
    };

    const handleEdit = (g) => {
        setEditId(g._id);
        setEditData({
            groupName: g.groupName,
            groupAdmin: g.groupAdmin,
            members: g.members
        });
    };

    const handleSave = async (id) => {
        const response = await apiFetch(`/_/backend/groups/${id}`, {
            method: 'PUT',
            body: JSON.stringify(editData)
        });

        if (response.ok) {
            const updated = await response.json();
            setGroups(groups.map(g => g._id === id ? updated : g));
            setEditId(null);
        } else {
            alert("Napaka pri shranjevanju.");
        }
    };

    return (
        <div className="register-container">
            <h2>Moje skupine</h2>
            {groups.length === 0 ? (
                <p>Nisi v nobeni skupini.</p>
            ) : (
                groups.map(group => (
                    <div key={group._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                        {editId === group._id ? (
                            <>
                                <input value={editData.groupName} onChange={e => setEditData({...editData, groupName: e.target.value})} />
                                <button onClick={() => handleSave(group._id)}>Shrani</button>
                                <button onClick={() => setEditId(null)}>Prekliči</button>
                            </>
                        ) : (
                            <>
                                <h3>{group.groupName}</h3>
                                <p>Admin: {group.groupAdmin}</p>
                                <p>Člani: {group.members.join(', ')}</p>
                                {group.groupAdmin === currentUser.username && (
                                    <>
                                        <button onClick={() => handleEdit(group)}>Uredi</button>
                                        <button onClick={() => handleDelete(group._id)}>Zbriši</button>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

export default MyGroups;