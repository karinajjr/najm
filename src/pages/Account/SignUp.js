import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link } from "react-router-dom";
import { logo } from "../../assets/images";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultSignUp, signUpSchema } from "../../lib/validations";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../../components/ui/inputOTP";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";

const SignUp = () => {
  const [submitSuccessful, setSubmitSuccessful] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  // Submit data
  const submitData = async (data) => {
    try {
      const response = await axios.post(
        "http://38.242.226.165/users/register/",
        data
      );
      setSubmitSuccessful(true);
      setSuccessMsg(true);
      // Trigger success toast
      toast({
        title: "Код отправлен",
        description: "На ваш номер был отправлен код подтверждения.",
      });
    } catch (err) {
      console.log(err);
      // Trigger error toast
      toast({
        title: "Ошибка регистрации",
        description:
          "Произошла ошибка при создании аккаунта. Попробуйте снова.",
        status: "error",
      });
    }
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: defaultSignUp,
  });

  const FormSchema = z.object({
    verification_code: z.string().length(4, {
      message: "Код должен состоять из 4 цифр.",
    }),
  });

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      verification_code: "",
    },
  });

  async function onSubmit(data) {
    const newData = {
      phone_number: getValues("phone_number"),
      ...data,
    };
    try {
      const res = await axios.post(
        "http://38.242.226.165/users/verify/",
        newData
      );
      console.log(res);
      // Trigger success toast
      toast({
        title: "Аккаунт создан",
        description: "Ваш аккаунт успешно создан.",
      });
    } catch (err) {
      console.log(err);
      // Trigger error toast
      toast({
        title: "Неверный код подтверждения",
        description: "Пожалуйста, проверьте код и попробуйте снова.",
        status: "error",
      });
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-start">
      <div className="w-1/2 hidden lgl:inline-flex h-full">
        <div className="w-[450px] h-full bg-primeColor px-10 py-[38%]">
          <Link to="/" className="">
            <img src={logo} alt="Najm" className="w-[200px] m-auto" />
          </Link>
        </div>
      </div>
      <div className="w-full lgl:w-[500px] h-full">
        {successMsg ? (
          <div className="w-[500px]">
            <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
              {successMsg}
            </p>
            <Link to="/signin">
              <button className="w-full h-10 bg-primeColor rounded-md text-gray-200 text-base font-titleFont font-semibold tracking-wide hover:bg-black hover:text-white duration-300">
                Войти
              </button>
            </Link>
          </div>
        ) : submitSuccessful ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 w-[90%] container border py-2 rounded-sm my-[250px]"
            >
              <FormField
                control={form.control}
                name="verification_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Введите смс код</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={4} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      Введите одноразовый пароль, отправленный на ваш телефон.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="rounded-none">
                Отправить
              </Button>
            </form>
          </Form>
        ) : (
          <form
            onSubmit={handleSubmit(submitData)}
            className="w-full lgl:w-[500px] h-screen flex items-center justify-center"
          >
            <div className="px-6 py-4 w-full h-[96%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
                Создайте аккаунт
              </h1>
              <div className="flex flex-col gap-3">
                {/* User name */}
                <div className="flex flex-col gap-0.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Никнейм
                  </p>
                  <input
                    {...register("username", {
                      required: "Введите никнейм.",
                      maxLength: {
                        value: 20,
                        message: "Максимум 20 символов.",
                      },
                      minLength: { value: 6, message: "Минимум 6 символов." },
                    })}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="eg. malohat"
                  />
                  {errors.username && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      {errors.username.message}
                      <span className="font-bold italic mr-1">!</span>
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Имя
                  </p>
                  <input
                    {...register("first_name", {
                      required: "Введите имя.",
                      maxLength: {
                        value: 20,
                        message: "Максимум 20 символов.",
                      },
                      minLength: { value: 2, message: "Минимум 2 символов." },
                    })}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="eg. Malohat"
                  />
                  {errors.first_name && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      {errors.first_name.message}
                      <span className="font-bold italic mr-1">!</span>
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    фамилия
                  </p>
                  <input
                    {...register("last_name", {
                      required: "Введите фамилию.",
                      maxLength: {
                        value: 20,
                        message: "Максимум 20 символов.",
                      },
                      minLength: { value: 6, message: "Минимум 6 символов." },
                    })}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="eg. Rozmetova"
                  />
                  {errors.last_name && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      {errors.last_name.message}
                      <span className="font-bold italic mr-1">!</span>
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Номер телефона
                  </p>
                  <input
                    {...register("phone_number", {
                      required: "Введите номер телефона.",
                      maxLength: {
                        value: 9,
                        message: "Максимум 9 символов.",
                      },
                      minLength: { value: 9, message: "Минимум 9 символов." },
                    })}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="eg. 90 111 1212"
                  />
                  {errors.phone_number && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      {errors.phone_number.message}
                      <span className="font-bold italic mr-1">!</span>
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Пароль
                  </p>
                  <input
                    {...register("password", {
                      required: "Создайте пароль.",
                      maxLength: {
                        value: 20,
                        message: "Максимум 20 символов.",
                      },
                      minLength: { value: 6, message: "Минимум 6 символов." },
                    })}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="eg. *****"
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      {errors.password.message}
                      <span className="font-bold italic mr-1">!</span>
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-primeColor hover:bg-black cursor-pointer w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300"
                >
                  Создать аккаунт
                </button>
                <p className="text-sm text-center font-titleFont font-medium">
                  Уже есть аккаунт?{" "}
                  <Link to="/signin">
                    <span className="hover:text-blue-600 duration-300">
                      Войти
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

export default SignUp;
