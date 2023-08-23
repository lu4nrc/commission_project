import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth';

import { Buildings, Gauge, Kanban, UserCirclePlus, UserList, Wallet } from '@phosphor-icons/react';
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';

function Main() {
  const [collapsed, setCollapsed] = useState(false);

  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
/* Luan */
  return (
    <div className="flex h-screen">
      {user && (
        <Sidebar
          width="200px"
          backgroundColor="white"
          breakPoint="sm"
          style={{ height: '100vh' }}
          collapsed={collapsed}
        >
          {/*           <div className="w-full p-2" onClick={() => setCollapsed(!collapsed)}>
            {!collapsed ? <CaretLeft size={24} /> : <CaretRight size={24} />}
          </div> */}
          <h1 className="font-bold py-5">PipeFly</h1>
          <Menu>
            <MenuItem icon={<Gauge size={32} />} component={<Link to="/dashboard" />}>
              Painel
            </MenuItem>
            <SubMenu icon={<UserList size={32} />} label="Cadastros">
              <MenuItem icon={<Buildings size={32} />} component={<Link to="/business" />}>
                Empresas
              </MenuItem>
              <MenuItem icon={<UserCirclePlus size={32} />} component={<Link to="/salesman" />}>
                Parceiros
              </MenuItem>
              <MenuItem component={<Link to="/signup" />}> Usuários </MenuItem>
            </SubMenu>

            <MenuItem icon={<Kanban size={32} />} component={<Link to="/kanban" />}>
              Kanban
            </MenuItem>
            <MenuItem icon={<Wallet size={32} />} component={<Link to="/payments" />}>
              Pagamentos
            </MenuItem>
          </Menu>
        </Sidebar>
      )}
      <div className="flex flex-col w-full">
        {user && (
          <nav className="bg-white w-full h-[65px] flex justify-between items-center border-b-[1px] px-3">
            <span className="font-medium text-lg">{/*    {user.user_metadata.first_name} */}</span>
            <div className="">
              <button
                type="button"
                onClick={() => {
                  signOut();
                }}
                className="bg-white"
              >
                Sair
              </button>
            </div>
          </nav>
        )}
        <div className="bg-[#F8FAFC] w-full h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Main;
