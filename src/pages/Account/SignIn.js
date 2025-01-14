import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logo } from "../../assets/images";

const SignIn = () => {
  // ============= Initial State Start here =============
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  // ============= Initial State End here ===============
  // ============= Error Msg Start here =================
  const [errUserName, setErrUserName] = useState("");
  const [errPassword, setErrPassword] = useState("");

  // ============= Error Msg End here ===================
  const [successMsg, setSuccessMsg] = useState("");
  // ============= Event Handler Start here =============
  const handleUserName = (e) => {
    setUserName(e.target.value);
    setErrUserName("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };
  // ============= Event Handler End here ===============
  const handleSignUp = (e) => {
    e.preventDefault();

    if (!userName) {
      setErrUserName("Введите ваш никнейм");
    }

    if (!password) {
      setErrPassword("Введите пароль");
    }
    // ============== Getting the value ==============
    if (userName && password) {
      setSuccessMsg(
        `Добро пожаловать! Мы рады видеть вас в Najm, вашем лучшем магазине канцелярии. Исследуйте наш широкий ассортимент блокнотов, ручек и офисных принадлежностей, чтобы повысить вашу креативность и продуктивность!`
      );
      setUserName("");
      setPassword("");
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-1/2 hidden lgl:inline-flex h-full">
        <div className="w-[450px] h-full bg-primeColor px-10 py-[38%]">
          <Link to="/" className="">
            <img src={logo} alt="Najm" className="w-[200px] m-auto" />
          </Link>
        </div>
      </div>
      <div className="w-full lgl:w-1/2 h-full">
        {successMsg ? (
          <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
            <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
              {successMsg}
            </p>
            <Link to="/signup">
              <button
                className="w-full h-10 bg-primeColor text-gray-200 rounded-md text-base font-titleFont font-semibold 
            tracking-wide hover:bg-black hover:text-white duration-300"
              >
                Создайте аккаунт
              </button>
            </Link>
          </div>
        ) : (
          <form className="w-full lgl:w-[450px] h-screen flex items-center justify-center">
            <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
                Войти
              </h1>
              <div className="flex flex-col gap-3">
                {/* User name */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Никнейм
                  </p>
                  <input
                    onChange={handleUserName}
                    value={userName}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="malohat"
                  />
                  {errUserName && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errUserName}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Пароль
                  </p>
                  <input
                    onChange={handlePassword}
                    value={password}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="password"
                    placeholder="Введите пароль"
                  />
                  {errPassword && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errPassword}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleSignUp}
                  className="bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md  duration-300"
                >
                  Войти
                </button>
                <p className="text-sm text-center font-titleFont font-medium">
                  Нет аккаунта?{" "}
                  <Link to="/signup">
                    <span className="hover:text-blue-600 duration-300">
                      Создать аккаунт
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignIn;
