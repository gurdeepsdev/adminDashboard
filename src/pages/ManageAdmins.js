import { useEffect, useState } from 'react';
import axios from 'axios';

const ManageAdmins = () => {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        const fetchAdmins = async () => {
            const res = await axios.get('http://localhost:5000/api/admin/admins', { withCredentials: true });
            setAdmins(res.data);
        };
        fetchAdmins();
    }, []);

    return (
        <div>
            <h1>Manage Admins</h1>
            <ul>
                {admins.map(admin => (
                    <li key={admin.id}>{admin.email} - {admin.role}</li>
                ))}
            </ul>
        </div>
    );
};

export default ManageAdmins;
