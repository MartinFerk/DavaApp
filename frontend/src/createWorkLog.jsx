import { useState, useEffect } from 'react';
import './styles/global.css'
import apiFetch from './api';

function WorkLog() {
    const [type, setType] = useState('prevoz');
    const [time, setTime] = useState('');
    const [assignedUser, setAssignedUser] = useState('');
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Prevoz
    const [clientName, setClientName] = useState('');
    const [pickupAddress, setPickupAddress] = useState('');
    const [destinationAddress, setDestinationAddress] = useState('');

    // Servis
    const [vehicle, setVehicle] = useState('');
    const [serviceDescription, setServiceDescription] = useState('');

    // Dostava
    const [packageDesc, setPackageDesc] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [recipient, setRecipient] = useState('');

    // Sestanek
    const [topic, setTopic] = useState('');
    const [location, setLocation] = useState('');

    // IT Ticket
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('nizka');

    const currentUser = JSON.parse(localStorage.getItem('prijavljenUporabnik'));

    useEffect(() => {
        setLoading(true);
        apiFetch(`/_/backend/groups/${currentUser.username}`)
            .then(res => res.json())
            .then(data => {
                const allMembers = [...new Set(data.flatMap(group => group.members))];
                setUsers(allMembers);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const resetForm = () => {
        setTime(''); setAssignedUser('');
        setClientName(''); setPickupAddress(''); setDestinationAddress('');
        setVehicle(''); setServiceDescription('');
        setPackageDesc(''); setDeliveryAddress(''); setRecipient('');
        setTopic(''); setLocation('');
        setTitle(''); setDescription(''); setPriority('nizka');
    };

    const handleCreateLog = async (e) => {
        e.preventDefault();

        const workData = {
            type,
            time,
            assignedUser,
            // Prevoz
            clientName, pickupAddress, destinationAddress,
            // Servis
            vehicle, serviceDescription,
            // Dostava
            packageDesc, deliveryAddress, recipient,
            // Sestanek
            topic, location,
            // IT Ticket
            title, description, priority
        };

        try {
            const response = await apiFetch('/_/backend/create-work', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(workData)
            });

            if (response.ok) {
                setMessage({ text: "Termin uspešno ustvarjen!", type: 'success' });
                resetForm();
            } else {
                setMessage({ text: "Napaka pri ustvarjanju termina.", type: 'error' });
            }
        } catch (error) {
            setMessage({ text: "Povezava s strežnikom ni uspela.", type: 'error' });
        }
    };

    if (loading) return (
        <div className="page-container">
            <p style={{ color: 'white', fontSize: '18px' }}>Nalaganje...</p>
        </div>
    );

    if (error) return (
        <div className="page-container">
            <p style={{ color: '#f44336', background: 'white', padding: '16px', borderRadius: '12px' }}>
                ⚠️ {error}
            </p>
        </div>
    );

    return (
        <div className="page-container">
            <h2 className="page-title">Ustvari Termin</h2>
            <form className="form-card" onSubmit={handleCreateLog}>

                <div className="form-group">
                    <label>Tip termina:</label>
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="prevoz">🚗 Prevoz</option>
                        <option value="servis">🔧 Servis</option>
                        <option value="dostava">📦 Dostava</option>
                        <option value="sestanek">📅 Sestanek</option>
                        <option value="it_ticket">💻 IT Zahtevek</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Čas:</label>
                    <input type="datetime-local" value={time} onChange={(e) => setTime(e.target.value)} required />
                </div>

                {type === 'prevoz' && (
                    <>
                        <div className="form-group">
                            <label>Stranka:</label>
                            <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Naslov prevzema:</label>
                            <input type="text" value={pickupAddress} onChange={(e) => setPickupAddress(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Naslov cilja:</label>
                            <input type="text" value={destinationAddress} onChange={(e) => setDestinationAddress(e.target.value)} required />
                        </div>
                    </>
                )}

                {type === 'servis' && (
                    <>
                        <div className="form-group">
                            <label>Vozilo:</label>
                            <input type="text" value={vehicle} onChange={(e) => setVehicle(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Opis okvare:</label>
                            <textarea value={serviceDescription} onChange={(e) => setServiceDescription(e.target.value)} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }} />
                        </div>
                    </>
                )}

                {type === 'dostava' && (
                    <>
                        <div className="form-group">
                            <label>Opis paketa:</label>
                            <input type="text" value={packageDesc} onChange={(e) => setPackageDesc(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Naslov dostave:</label>
                            <input type="text" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Prejemnik:</label>
                            <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} required />
                        </div>
                    </>
                )}

                {type === 'sestanek' && (
                    <>
                        <div className="form-group">
                            <label>Tema:</label>
                            <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Lokacija:</label>
                            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
                        </div>
                    </>
                )}

                {type === 'it_ticket' && (
                    <>
                        <div className="form-group">
                            <label>Naslov:</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Opis:</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }} />
                        </div>
                        <div className="form-group">
                            <label>Prioriteta:</label>
                            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                                <option value="nizka">🟢 Nizka</option>
                                <option value="srednja">🟡 Srednja</option>
                                <option value="visoka">🔴 Visoka</option>
                            </select>
                        </div>
                    </>
                )}

                <div className="form-group">
                    <label>Dodeli uporabniku:</label>
                    <select value={assignedUser} onChange={(e) => setAssignedUser(e.target.value)} required>
                        <option value="">Izberi uporabnika</option>
                        {users.map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                </div>

                <button type="submit">Ustvari</button>

                {message && (
                    <p style={{
                        color: message.type === 'error' ? '#f44336' : '#4CAF50',
                        marginTop: '10px'
                    }}>
                        {message.type === 'error' ? '⚠️' : '✓'} {message.text}
                    </p>
                )}
            </form>
        </div>
    );
}

export default WorkLog;