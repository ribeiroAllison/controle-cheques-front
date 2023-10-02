"use client";

import { useEffect, useState } from "react";
import { getCookie } from "@/utils/cookie";
import HeaderLine from "@/components/HeaderLine";
import ButtonAlternative from "@/components/ButtonAlternative";
import styles from "@/styles/suporte.module.css";
import { ToastContainer, toast } from "react-toastify";
import User from "@/apiServices/UserService";

export default function Suporte() {
  const notifySuccess = (msg) => toast.success(msg);
  const notifyFailure = (msg) => toast.error(msg);

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formValues.message.trim().length === 0) {
        notifyFailure("Por favor enviar algum corpo de texto na mensagem!");
        return;
      }

      const response = await User.sendIssue(formValues);

      if (response) {
        notifySuccess(response.data);

        setFormValues({
          email: "",
          message: ""
        })
      }
    } catch (error) {
      notifyFailure(error.message);
    }
  };

  useEffect(() => {
    setFormValues({ ...formValues, name: getCookie("user").trim() });
  }, []);

  return (
    <>
      <ToastContainer autoClose={2000} />
      <HeaderLine name="Suporte" />
      <section className={styles.wrapper}>
        <h1>Precisa de ajuda?</h1>
        <p>Envie-nos uma mensagem e responderemos assim que possível!</p>
        <form className={styles.formArea} onSubmit={handleSubmit}>
          <div className="inputField">
            <label htmlFor="subject">E-mail:</label>
            <input
              type="email"
              name="email"
              required
              placeholder="exemplo@gmail.com"
              value={formValues.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="inputField">
            <label htmlFor="subject">Assunto:</label>
            <select 
              className={styles.select}
              name="subject"
              required
              onChange={handleInputChange}
            >
              <option selected value="Dúvida">Dúvida</option>
              <option value="Feedback">Feedback</option>
              <option value="Bug">Bug</option>
            </select>
          </div>
          <div className="inputField">
            <label htmlFor="message">Mensagem:</label>
            <textarea
              name="message"
              onChange={handleInputChange}
              autoComplete="off"
              value={formValues.message}
            />
          </div>
          <ButtonAlternative type="submit">Enviar</ButtonAlternative>
        </form>
      </section>
    </>
  );
}
