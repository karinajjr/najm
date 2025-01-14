import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string().nonempty("Пожалуйста, введите никнейм."),
  phone_number: z
    .string()
    .regex(
      /^\d{9}$/,
      "Пожалуйста, введите корректный номер телефона из 9 цифр."
    ),
  first_name: z.string().nonempty("Пожалуйста, укажите ваше имя."),
  last_name: z.string().nonempty("Пожалуйста, укажите вашу фамилию."),
  password: z.string().min(8, "Пароль должен содержать не менее 8 символов."),
});

export const defaultSignUp = {
  username: "malohat",
  phone_number: "950281216",
  first_name: "ilya",
  last_name: "pirova",
  password: "nmaekan123",
};
