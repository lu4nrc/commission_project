import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import Input from "../../components/input";
import Button from '../../components/button'
function Login  ()  {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { logIn } = useAuth();

  async function handleLogIn(e) {
    e.preventDefault();
    setErrorMsg("");

    if (!passwordRef.current?.value || !emailRef.current?.value) {
      console.log(emailRef.current?.value, passwordRef.current?.value);
      setErrorMsg("Por favor, preencha os campos");
      return;
    }

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const { error } = await logIn({ email, password });

    if (error) {
      setErrorMsg("Credenciais de login inválidas");
    } else {
      navigate("/dashboard");
    }
  }

  return (
    <div className=" w-screen h-screen flex justify-center items-center">
      <form
        className="flex flex-col items-center px-10 py-10 gap-3 border border-[#e5e7eb] rounded-lg"
        onSubmit={handleLogIn}
      >
        <h2 className="text-2xl py-3 font-semibold">Faça login em sua conta</h2>
        <Input w="w-full" id="email" refs={emailRef} label="Email" type="email" />
        <Input w="w-full" id="password" refs={passwordRef} label="Senha" type="password" />

        <Button type="submit" label="Login"/>

        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      </form>
    </div>
  );
};

export default Login;
