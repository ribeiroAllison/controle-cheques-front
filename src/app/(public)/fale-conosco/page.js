"use client";

import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

import Button from "@/components/Button";
import Input from "@/components/Input";
import styles from "@/styles/faleConosco.module.css";
import Link from "next/link";
import { useForm } from "@formspree/react";

export default function FaleConosco() {
  const [state, handleFormSubmit] = useForm("xzblybnd");
  const router = useRouter();

  const notifySuccess = (msg) => toast.success(msg);

  if (state.succeeded) {
    notifySuccess("Mensagem enviada com sucesso!");
    const inputs = document.querySelectorAll("input");
    const textarea = document.querySelector("textarea");
    inputs.forEach((input) => {
      input.value = "";
    });
    textarea.value = "";

    setTimeout(() => {
      router.push("/");
    }, 2000);
  }

  return (
    <>
      <ToastContainer autoClose={1500} />
      <section className={styles.faleConoscoWrapper}>
        <div className={styles.formContainer}>
          <h1>Envie sua mensagem para nosso time</h1>
          <form id="fs-frm" onSubmit={handleFormSubmit}>
            <fieldset id="fs-frm-inputs" className={styles.fieldSet}>
              <Input
                type="text"
                name="name"
                id="full-name"
                placeholder="Nome"
                required=""
              />
              <Input
                type="email"
                name="_replyto"
                id="email-address"
                placeholder="E-mail"
                required=""
              />
              <textarea
                rows="5"
                name="message"
                id="message"
                placeholder="Mensagem"
                required=""
              ></textarea>
              <Input
                type="hidden"
                name="_subject"
                id="email-subject"
                value="Contact Form Submission"
              />
            </fieldset>
          </form>
          <Button type="submit" form="fs-frm" disabled={state.submitting}>
            Enviar
          </Button>
          <Link href="/login">Voltar para login.</Link>
        </div>
      </section>
    </>
  );
}
