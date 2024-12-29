import Navbar from "@/components/admin/navbar/Navbar";
import { List } from "antd";
import { Link, Outlet } from 'react-router-dom';


const AdminPage = () => {
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ width: 250 }}>
          <Navbar />
        </div>
        <div style={{ flex: 1 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
