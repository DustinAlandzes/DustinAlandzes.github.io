import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type ContactResponse = {
    success?: boolean;
    message?: string;
}

type FormValues = {
    name: string,
    email: string,
    body: string,
}

export default function ContactSection(): React.JSX.Element {
    const [submitting, setSubmitting] = useState(false);
    const [sent, setSent] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset, setError } = useForm<FormValues>({
        criteriaMode: 'all'
    });

    const onSubmit: SubmitHandler<FormValues> = async data => {
        setSubmitting(true)

        try {
            const contactFormEndpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT

            if (!contactFormEndpoint) {
                setError('root.serverError', {
                    type: 'config',
                    message: 'Contact form is temporarily unavailable. Please email me directly.',
                })
                setSent(false)
                return
            }

            const response = await fetch(contactFormEndpoint, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            let payload: ContactResponse | null = null

            try {
                payload = await response.json() as ContactResponse
            } catch {
                payload = null
            }

            if (!response.ok || payload?.success === false) {
                setError('root.serverError', {
                    type: String(response.status),
                    message: payload?.message || 'Unable to send your message right now. Please try again later.',
                })
                setSent(false)
                return
            }

            reset()
            setSent(true)
        } catch {
            setError('root.serverError', {
                type: 'network',
                message: 'Network error while sending your message. Please try again later.',
            })
            setSent(false)
        } finally {
            setSubmitting(false)
        }
    }

    if (sent) {
        return <section id={"contact"} className={"site-section site-section--contact"}>
            <h1 className={"section-title"}>
                <a href={"#contact"}>{"Get in Touch"}</a>
            </h1>
            <div className={"section-body"}>
                <p className={"contact-form__note"}>
                    {"You can email me at "}<a className={"contact-form__link"} href={"mailto:fezf00@gmail.com"}>{"fezf00@gmail.com"}</a>{"."}
                </p>
                <strong className={"contact-form__success"} id={"thanks-for-contacting-message"}>
                    <div>{"Thanks for your interest!"}</div>
                    <div>{"I'll get back to you as soon as possible."}</div>
                </strong>
            </div>
        </section>
    }

    return <section id={"contact"} className={"site-section site-section--contact"}>
        <h1 className={"section-title"}>
            <a href={"#contact"}>Contact Me</a>
        </h1>
        <div className={"section-body"}>
            <p className={"contact-form__note"}>
                {"You can email me at "}<a className={"contact-form__link"} href={"mailto:fezf00@gmail.com"}>{"fezf00@gmail.com"}</a>{" or submit the form below."}
            </p>
            <form onSubmit={handleSubmit(onSubmit)} id={"contact-form"} className={"contact-form"}>
                {submitting && <p className={"contact-form__status"} aria-live={"polite"}>Please wait...</p>}
                <div className={"contact-form__group"}>
                    <label htmlFor={"contact-form-input-name"}>Name</label>
                    <input {...register("name", { required: "Name is required" })}
                        placeholder={"Name"}
                        aria-invalid={errors.name ? "true" : "false"}
                        id={"contact-form-input-name"}
                        type={"text"}
                        autoComplete={"name"}
                    />
                    {errors.name && <span role={"alert"}>{errors.name.message}</span>}
                </div>

                <div className={"contact-form__group"}>
                    <label htmlFor={"contact-form-input-email"}>Email</label>
                    <input {...register("email", { required: "Email Address is required" })}
                        type="email"
                        placeholder={"example@domain.tld"}
                        aria-invalid={errors.email ? "true" : "false"}
                        id={"contact-form-input-email"}
                        autoComplete={"email"}
                    />
                    {errors.email && <span role="alert">{errors.email.message}</span>}
                </div>

                <div className={"contact-form__group"}>
                    <label htmlFor={"contact-form-input-body"}>Message</label>
                    <textarea {...register("body", { required: false })}
                        placeholder={"Hello! My name is ..."}
                        rows={5}
                        id="contact-form-input-body"
                    />
                </div>

                {errors.root?.serverError?.message && <p className={"contact-form__alert"} role={"alert"}>{errors.root.serverError.message}</p>}

                <div className={"contact-form__group"}>
                    <button className={"contact-form__submit"} type={"submit"} id={"submit-contact-button"} disabled={submitting}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </section>
}
