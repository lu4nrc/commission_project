import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth';

import { Buildings, Gauge, Kanban, UserCirclePlus, UserList, Wallet } from '@phosphor-icons/react';
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';
import ThemeSwitcher from '../components/themeSwitcher';

function Main() {
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState('light');

  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className="flex h-screen">
      {user && (
        <Sidebar
          width="200px"
          backgroundColor={theme === 'light' ? 'white' : '#0F172A'}
          color={theme === 'light' ? 'black' : 'white'}
          breakPoint="sm"
          style={{ height: '100vh' }}
          collapsed={collapsed}
        >
          <h1 className="font-bold text-3xl py-5 dark:text-white">HellowCRM</h1>
          <Menu>
            <MenuItem
              icon={<Gauge size={32} color={theme === 'light' ? 'black' : 'white'} />}
              component={<Link to="/dashboard" />}
            >
              Painel
            </MenuItem>
            <SubMenu
              icon={<UserList size={32} color={theme === 'light' ? 'black' : 'white'} />}
              label="Cadastros"
            >
              <MenuItem
                icon={<Buildings size={32} color={theme === 'light' ? 'black' : 'white'} />}
                component={<Link to="/business" />}
              >
                Empresas
              </MenuItem>
              <MenuItem
                icon={<UserCirclePlus size={32} color={theme === 'light' ? 'black' : 'white'} />}
                component={<Link to="/salesman" />}
              >
                Parceiros
              </MenuItem>
              <MenuItem
                component={<Link to="/signup" color={theme === 'light' ? 'black' : 'white'} />}
              >
                Usuários
              </MenuItem>
            </SubMenu>

            <MenuItem
              icon={<Kanban size={32} color={theme === 'light' ? 'black' : 'white'} />}
              component={<Link to="/kanban" />}
            >
              Kanban
            </MenuItem>
            <MenuItem
              icon={<Wallet size={32} color={theme === 'light' ? 'black' : 'white'} />}
              component={<Link to="/payments" />}
            >
              Pagamentos
            </MenuItem>
          </Menu>
        </Sidebar>
      )}
      <div className="flex flex-col w-full">
{/*         {user && (
          <nav className="bg-[#F8FAFC] dark:bg-slate-900 dark:text-white w-full h-[65px] flex justify-between items-center border-b-[1px] dark:border-zinc-600 px-3">
            <div> <ThemeSwitcher theme={theme} setTheme={setTheme} /> </div>
            <div className="">
              <button
                type="button"
                onClick={() => {
                  signOut();
                }}
                className="text-zinc-700 dark:text-zinc-200"
              >
                Sair
              </button>
            </div>
          </nav>
        )} */}
        <div className="bg-[#F8FAFC] dark:bg-slate-900 w-full h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Main;
