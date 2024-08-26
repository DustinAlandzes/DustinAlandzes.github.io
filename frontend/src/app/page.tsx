'use client';

import Image from 'next/image';
import GithubLogo from "./github-mark.png";
import LinkedInLogo from "./In-Blue-128@2x.png";
import {certifications, Jobs, projects} from "@/app/data";
import React, {useEffect, useState} from "react";
import {Dongle, Secular_One, Vollkorn} from "next/font/google";
import { useTrail, a } from '@react-spring/web'
import CertificationsSection from "@/components/Certifications";
import WorkExperienceSection from "@/components/WorkExperience";
import ProjectsSection from "@/components/Projects";
import ContactSection from "@/components/Contact";

const vollkorn = Vollkorn({ subsets: ["latin"], weight: ['400'] });
const secularOne = Secular_One({ subsets: ["latin"], weight: ['400'] });
const dongle = Dongle({ subsets: ["latin"], weight: ['400'] });

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
    }, [setOpen])

    return <header id={"header"}>
        <div style={{
          display: "flex",
          alignItems: "center",
          height: "100px",
          justifyContent: "center"
        }}>
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
    // const [darkMode, setDarkMode] = useState((window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? true : false);
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className={darkMode ? "dark" : "light"}>
            <Header darkMode={darkMode} setDarkMode={setDarkMode}/>
            <main className={dongle.className}>
                {/*<ThreeComponent/>*/}
                <CertificationsSection certifications={certifications}/>
                <WorkExperienceSection jobs={Jobs}/>
                <ProjectsSection projects={projects} />
                <ContactSection/>
            </main>
            <Footer />
        </div>
    )
}
