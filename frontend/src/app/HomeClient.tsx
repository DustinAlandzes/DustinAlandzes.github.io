'use client';

import React, { useEffect, useState } from "react";
import Image from 'next/image';
import GithubLogo from "../../public/github-mark.png";
import LinkedInLogo from "../../public/In-Blue-128@2x.png";

import { Vollkorn } from "next/font/google";

import { certifications, Jobs, projects } from "@/app/data";

import CertificationsSection from "@/components/Certifications";
import WorkExperienceSection from "@/components/WorkExperience";
import ProjectsSection from "@/components/Projects";
import ContactSection from "@/components/Contact";

const vollkorn = Vollkorn({ subsets: ["latin"], weight: ['400'] });

function Header(): React.JSX.Element {
    return <header className={"site-header"}>
        <div className={"site-header__identity"}>
            <h1 className={`${vollkorn.className} site-header__name`}>
                {"Dustin Alandzes"}
            </h1>
            <p className={"site-header__tagline"}>
                {"Software engineer building Python, TypeScript, and AWS systems."}
            </p>
        </div>
        <nav className={"social-links"} aria-label={"Social links"}>
            <a
                className={"social-links__link"}
                href={"https://linkedin.com/in/dustinalandzes"}
                target={"_blank"}
                rel={"noopener noreferrer"}
                aria-label={"LinkedIn profile"}
            >
                <Image src={LinkedInLogo} alt={"LinkedIn"} width={42} />
            </a>
            <a
                className={"social-links__link"}
                href={"https://github.com/DustinAlandzes"}
                target={"_blank"}
                rel={"noopener noreferrer"}
                aria-label={"GitHub profile"}
            >
                <Image src={GithubLogo} alt={"GitHub"} width={42} />
            </a>
        </nav>
    </header>
}

function BackToTheTop(): React.JSX.Element | null {
    const [atTheTop, setAtTheTop] = useState(true);

    useEffect(() => {
        const handleScrollToTopButtonVisibility = () => {
            setAtTheTop(window.scrollY < 300);
        };
        handleScrollToTopButtonVisibility()
        window.addEventListener("scroll", handleScrollToTopButtonVisibility);

        return () => {
            window.removeEventListener("scroll", handleScrollToTopButtonVisibility);
        };
    }, []);

    if (atTheTop) {
        return null
    }

    return <button
        type={"button"}
        id={"back-to-the-top-link"}
        className={"back-to-top"}
        aria-label={"Back to top"}
        onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
    >
        {"↑"}
    </button>
}

function Footer(): React.JSX.Element {
    return <footer className={"site-footer"}>
    </footer>;
}

export default function HomeClient({ renderedAt }: { renderedAt: string }): React.JSX.Element {
    return (
        <>
            <Header />
            <main className={"site-main"}>
                <CertificationsSection certifications={certifications} renderedAt={renderedAt} />
                <WorkExperienceSection jobs={Jobs} renderedAt={renderedAt} />
                <ProjectsSection projects={projects} />
                <ContactSection />
            </main>
            <BackToTheTop />
            <Footer />
        </>
    )
}