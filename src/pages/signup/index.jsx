import { useRef, useState } from "react";
import { supabase } from "../../services/supabase";
import Input from "../../components/input";
import Loader from "../../utils/loader";

const Signup = () => {
  const firstNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const typeRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const register = (email, password, first_name, type) =>
    supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name,
          type,
        },
      },
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !firstNameRef.current?.value ||
      !emailRef.current?.value ||
      !passwordRef.current?.value ||
      !confirmPasswordRef.current?.value
    ) {
      setErrorMsg("Por favor preencha todos os campos");
      return;
    }
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setErrorMsg("As senhas não correspondem");
      return;
    }
    try {
      setErrorMsg("");
      setLoading(true);
      const { data, error } = await register(
        emailRef.current.value,
        passwordRef.current.value,
        firstNameRef.current.value,
        typeRef.current.value
      );
      if (!error && data) {
        setMsg("Registo criado com sucesso. ");
      }
    } catch (error) {
      setErrorMsg("Erro ao criar conta");
    }
    setLoading(false);
  };

  return (
    <div className="p-4">
      <Loader disabled={loading} />
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <Input id="first_name" label="Nome" type="text" refs={firstNameRef} />
        <Input id="email" label="Email" type="email" refs={emailRef} />
        <div className="flex flex-col gap-1">
          <label>Perfil</label>
          <select
            name="type"
            ref={typeRef}
            defaultValue={"user"}
            className="bg-white rounded-lg py-1 w-full px-3 text-zinc-700 border border-[#e5e7eb]"
          >
            <option value="user">Parceiro</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <Input id="password" label="Senha" type="password" refs={passwordRef} />
        <Input
          id="confirm-password"
          label="Confirme a senha"
          type="password"
          refs={confirmPasswordRef}
        />
        <button disabled={loading} type="submit">
          Registrar
        </button>
      </form>
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      {msg && <p className="text-green-500">{msg}</p>}
    </div>
  );
};

export default Signup;
