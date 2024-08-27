'use client';

import React, {useEffect, useState} from "react";
import Image from 'next/image';
import GithubLogo from "../../public/github-mark.png";
import LinkedInLogo from "../../public/In-Blue-128@2x.png";

import {Vollkorn} from "next/font/google";
import { useTrail, a } from '@react-spring/web'

import {certifications, Jobs, projects} from "@/app/data";

import CertificationsSection from "@/components/Certifications";
import WorkExperienceSection from "@/components/WorkExperience";
import ProjectsSection from "@/components/Projects";
import ContactSection from "@/components/Contact";

const vollkorn = Vollkorn({ subsets: ["latin"], weight: ['400'] });

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

function Header(): JSX.Element {

    const [open, setOpen] = useState(false)

    useEffect(() => {
        setOpen(true)
    }, [setOpen])

    return <header>
        <div id={"name"} className={vollkorn.className}>
            <Trail open={open}>
                <a.div id={"name"} className={vollkorn.className}>{"Dustin Alandzes"}</a.div>
            </Trail>
        </div>
        <div>
            <a href={"https://linkedin.com/in/dustinalandzes"} target={"_blank"} id={"linkedin-icon"}>
                <Image src={LinkedInLogo} alt={"LinkedIn"} width={50}/>
            </a>
            <a href={"https://github.com/DustinAlandzes"} target={"_blank"} id={"github-icon"}>
                <Image src={GithubLogo} alt={"GitHub"} width={50}/>
            </a>
        </div>
    </header>
}


function Footer() {
        return <footer>
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
    return (
        <>
            <Header/>
            <main>
                <CertificationsSection certifications={certifications}/>
                <WorkExperienceSection jobs={Jobs}/>
                <ProjectsSection projects={projects} />
                <ContactSection/>
            </main>
            <Footer />
        </>
    )
}
