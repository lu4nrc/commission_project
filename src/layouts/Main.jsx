import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";

import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import Loader from "../utils/loader";

const Main = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="flex h-screen">
      {user && (
        <Sidebar>
          <Menu>
            <SubMenu label="Cadastros">
              <MenuItem component={<Link to="/business" />}> Empresas </MenuItem>
              <MenuItem component={<Link to="/salesman" />}> Parceiros </MenuItem>
              <MenuItem component={<Link to="/signup" />}> Usuários </MenuItem>
            </SubMenu>
            <MenuItem component={<Link to="/dashboard" />}>
              {" "}
              DashBoard{" "}
            </MenuItem>
            <MenuItem component={<Link to="/payments" />}>
              {" "}
              Pagamentos{" "}
            </MenuItem>
          </Menu>
        </Sidebar>
      )}
      <div className="flex flex-col w-full">
        {user && (
          <nav className="bg-white w-full h-12 flex justify-between items-center border-b-[1px] px-3">
            <span className="font-medium text-lg">
       {/*    {user.user_metadata.first_name} */}
            </span>
            <div className="">
              <button
                onClick={() => {
                  signOut();
                }}
                className="bg-white"
              >
                Logout
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
};

export default Main;
