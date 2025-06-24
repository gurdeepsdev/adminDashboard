import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    return (
        <div>
            <h1>Welcome, {user?.email}</h1>
            <p>Role: {user?.role}</p>
        </div>
    );
};

export default Dashboard;
