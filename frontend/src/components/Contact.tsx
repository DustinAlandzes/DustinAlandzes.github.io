import React, {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {a} from "@react-spring/web";

export default function ContactSection(): JSX.Element {
    type FormValues = {
        name: string,
        email: string,
        body: string,
    }

    const [sent, setSent] = useState(false);
    const { register, handleSubmit, formState: { errors }, setError } = useForm<FormValues>({
        criteriaMode: 'all'
    });

    const onSubmit: SubmitHandler<FormValues> = async data => {
        try {
            // @ts-ignore
            const CONTACT_FORM_ENDPOINT: string = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT
            const response: Response = await fetch(CONTACT_FORM_ENDPOINT, {
                method: "POST",
                body: JSON.stringify(data)
            })
            const json = await response.json()
        } catch (error: any) {
            setError('root.serverError', {
              type: error.statusCode,
            })
            setSent(false)
        }
        setSent(true);
    }

    if (sent) {
         return <section className={"section"} id={"contact"}>
            <h1 className={"section-title"}>
                <a href={"#contact"}>{"Get in Touch"}</a>
            </h1>
             <div className={"section-body"}>
                <div id={"contact-email"}>
                    {"You can email me at "}<a href={"mailto:fezf00@gmail.com"} style={{color: "blue"}}>{"fezf00@gmail.com"}</a>{"."}
                </div>
                <strong id={"thanks-for-contacting-message"}>
                    <div>{"Thanks! I'll get back to you as soon as possible."}</div>
                </strong>
            </div>
        </section>
    } else {
         return <section className={"section"} id={"contact"}>
             <h1 className={"section-title"}>
                 <a href={"#contact"}>Get in Touch</a>
             </h1>
             <div className={"section-body"}>
                 <div id={"contact-email"}>
                     {"You can email me at "}<a href={"mailto:fezf00@gmail.com"} style={{color: "blue"}}>{"fezf00@gmail.com"}</a>{" or submit the form below."}
                 </div>
                 <form onSubmit={handleSubmit(onSubmit)} id={"contact-form"}>

                     <div className={"form-group"}>
                         <label htmlFor={"contact-form-input-name"}>Name</label>
                         <input {...register("name", {required: "Name is required"})}
                                placeholder={"Name"}
                                aria-invalid={errors.name ? "true" : "false"}
                                id={"contact-form-input-name"}
                         />
                         {errors.name && <span role={"alert"}>{errors.name.message}</span>}
                     </div>

                     <div className={"form-group"}>
                         <label htmlFor={"contact-form-input-email"}>Email</label>
                         <input {...register("email", {required: "Email Address is required"})}
                                type="email"
                                placeholder={"example@domain.tld"}
                                aria-invalid={errors.email ? "true" : "false"}
                                id={"contact-form-input-email"}
                         />
                         {errors.email && <span role="alert">{errors.email.message}</span>}
                     </div>

                     <div className={"form-group"}>
                         <label htmlFor={"contact-form-input-body"}>Message</label>
                         <textarea {...register("body", {required: false})}
                                   placeholder={"Hello! My name is ..."}
                                   rows={5}
                                   id="contact-form-input-body"/>
                     </div>
                     {errors?.root?.serverError.type === 400 && <p>server response message</p>}

                     <div className={"form-group"}>
                         <input type={"submit"} id={"submit-contact-button"}/>
                     </div>

                 </form>
             </div>
         </section>
    }
}
