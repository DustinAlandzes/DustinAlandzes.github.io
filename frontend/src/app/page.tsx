'use client';
import {SubmitHandler, useForm } from "react-hook-form";

import Image from 'next/image';
import GithubLogo from "./github-mark.png";
import LinkedInLogo from "./In-Blue-128@2x.png";
import {Certification, Job, Project, certifications, Jobs, projects} from "@/app/data";
import React, {useEffect, useState} from "react";
import ThreeComponent from "@/app/three-component";
import {Dongle, Secular_One, Vollkorn} from "next/font/google";
import { useTrail, a } from '@react-spring/web'
import styles from './globals.css'

const vollkorn = Vollkorn({ subsets: ["latin"], weight: ['400'] });
const secularOne = Secular_One({ subsets: ["latin"], weight: ['400'] });
const dongle = Dongle({ subsets: ["latin"], weight: ['400'] });

// Global state?

function DarkModeToggle({darkMode, setDarkMode}: {darkMode: boolean, setDarkMode: any}): JSX.Element {
    return <>
        <select onChange={(event) => setDarkMode(event.target.value === "dark")} defaultValue={"light"}>
            <option value="light">Light mode</option>
            <option value="dark">Dark mode</option>
        </select>
    </>;
}

const Trail: React.FC<{ open: boolean, children: any }> = ({ open, children }) => {
  const items = React.Children.toArray(children)
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 0,
    height: open ? 110 : 0,
    from: { opacity: 0, x: 0, height: 0 },
  })
  return (
    <div>
      {trail.map(({ height, ...style }, index) => (
        <a.div key={index} style={style}>
          <a.div style={{ height }}>{items[index]}</a.div>
        </a.div>
      ))}
    </div>
  )
}

function Header({darkMode, setDarkMode}: {darkMode: boolean, setDarkMode: any}): JSX.Element {

    const [open, setOpen] = useState(false)

    useEffect(() => {
        setOpen(true)
    })

    return <header id={"header"}>
        <div className={styles.container}>
            <Trail open={open}>
                <a.div id={"name"} className={vollkorn.className}>{"Dustin Alandzes"}</a.div>
            </Trail>
        </div>
        <div id={"social-media"}>
        <a href={"https://linkedin.com/in/dustinalandzes"} target={"_blank"} id={"linkedin-icon"}>
                <Image src={LinkedInLogo} alt={"LinkedIn"} width={100}/>
            </a>
            <a href={"https://github.com/DustinAlandzes"} target={"_blank"} id={"github-icon"}>
                <Image src={GithubLogo} alt={"GitHub"} height={100}/>
            </a>
        </div>
        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode}/>
    </header>
}

function CertificationItem({certification, detailed}: {
    certification: Certification,
    detailed?: boolean
}): JSX.Element {
    return <div className={"certification-item"}
                style={{
                    filter: certification.expireDate < new Date() ? 'grayscale(100%)' : ''
        }}>
        {detailed && `${certification.name}- ${certification.description}`}
        <a href={certification.url.toString()} target={"_blank"}>
            <img src={certification.image.src} alt={`${certification.name} Badge`} width="340" height="340" />
        </a>
    </div>
}


export function CertificationsSection({certifications, detailed}: {certifications: Certification[], detailed?: boolean}) {
    return <section className={"section"} id={"certifications"}>
        <h1 className={"section-title"}>
            <a href={"#certifications"}>Certifications</a>
        </h1>
        <div className={"section-body"}>
            <div id={"certification-list"}>
                {certifications.map((certification, index) => <CertificationItem key={index}
                                                                                 certification={certification}
                                                                                 detailed={detailed}/>)}
            </div>
        </div>
    </section>
}

function JobItem({
    job
}: {
    job: Job}): JSX.Element {
    return <div style={{
        marginBottom: "10vh"
    }}>
        <h1 style={{
            fontSize: "32px"
        }}>
            {job.url ?
                <a className={"job-company-name"} href={job.url.toString()}>{job.company}</a>
                :
                <span className={"job-company-name"}>{job.company}</span>
            }
        </h1>
        <h2>{job.position}</h2>
        <div>
            <time dateTime={job.startDate.toISOString()}>
                {job.startDate.toLocaleDateString("en-US", {month: "long", year: "numeric"})}
            </time>
            {" - "}
            <time dateTime={job.endDate.toISOString()}>
                {job.endDate.toLocaleDateString("en-US", {month: "long", year: "numeric"})}
            </time>
        </div>
        <p>{job.description}</p>
        {job.image && <img src={job.image.src} alt={`${job.company} logo`} width="340" height="340"/>}
    </div>
}

export function JobsSection({jobs}: {jobs: Job[]}) {
    const startDates = jobs.toSorted((a, b) => a.startDate.getFullYear() - b.startDate.getFullYear())
    const first_job: Job = startDates[0]
    const last_job: Job = startDates[startDates.length - 1]
    const years_of_experience = last_job.endDate.getFullYear() - first_job.startDate.getFullYear()

    return <section className={"section"} id={"jobs"}>
        <h1 className={"section-title"}>
            <a href={"#jobs"}>
                {`Work Experience`}
            </a>
            <span id={"years-of-experience"}>
                {`${years_of_experience} years`}
            </span>
        </h1>
        <div className={"section-body"}>
            <div id={"jobs-list"}>
                {Jobs.map((job, index) => <JobItem key={index} job={job}/>)}
            </div>
        </div>
    </section>
}

function ProjectItem({
    project}: {project: Project}): JSX.Element {
    return <div className={"project"}>
        <div className={"project-name"}>
            <a href={project.url.toString()}>{project.name}</a>
        </div>
        <div className={"project-description"}>
            {project.description}
        </div>
        {project.image}
    </div>
}

export function ProjectsSection({projects}: {projects: Project[]}): JSX.Element {
    return <section className={"section"} id={"projects"}>
        <h1 className={"section-title"}>
            <a href={"#projects"}>Projects</a>
        </h1>
        <div className={"section-body"}>
            <div id={"project-list"}>
                {projects.map((project, index) => <ProjectItem key={index} project={project}/>)}
            </div>
        </div>
    </section>
}

export function ContactSection(): JSX.Element {
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
        console.log(data);
        // TODO: Captcha verification
        const CONTACT_FORM_API = "https://httpbin.com/post"
        try {
            const response = await fetch(CONTACT_FORM_API, {
                method: "POST",
                body: JSON.stringify(data)
            })
            const data = await response.json()
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
                    <div>{"Thanks for your interest!"}</div>
                    <div>{"I'll get back to you as soon as possible."}</div>
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

function Footer() {
        return <footer id={"footer"}>
        <address>
            <a href={"https://linkedin.com/in/dustinalandzes"} target={"_blank"}>
                {"https://linkedin.com/in/dustinalandzes"}
            </a>
        </address>
        <span id={"back-to-the-top-link"} onClick={() => {
            window.scrollTo(0, 0)
        }}>back to the top</span>
    </footer>;
}

export default function Home(): JSX.Element {
    const [darkMode, setDarkMode] = useState((window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? true : false);

    return (
        <div className={darkMode ? "dark" : "light"}>
            <Header darkMode={darkMode} setDarkMode={setDarkMode}/>
            <main className={dongle.className}>
                {/*<ThreeComponent/>*/}
                <CertificationsSection certifications={certifications}/>
                <JobsSection jobs={Jobs}/>
                <ProjectsSection projects={projects} />
                <ContactSection/>
            </main>
            <Footer />
        </div>
    )
}
