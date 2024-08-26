import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import React from "react";
import {Certification, Job, Project} from "@/app/data";
import AWSSolutionsArchitectBadge from "@/app/aws-solutions-architect-associate.png";
import Home from "@/app/page"
import CertificationsSection from "@/components/Certifications";
import WorkExperienceSection from "@/components/WorkExperience";
import ProjectsSection from "@/components/Projects";
import ContactSection from "@/components/Contact";

describe('Home', () => {
  it('renders', () => {
    render(<Home />)
  });

  it('renders the certifications section', () => {
    const certifications: Certification[] = [{
      name: "",
      description: "",
      url: new URL("https://google.com"),
      startDate: new Date(),
      expireDate: new Date(),
      image: AWSSolutionsArchitectBadge
    }]
    render(<CertificationsSection certifications={certifications} />)
  });


  it('renders the jobs section', () => {
    const jobs: Job[] = [{
      company: "",
      position: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
    }]
    render(<WorkExperienceSection jobs={jobs}/>)
  });


  it('renders the projects section', () => {
    const projects: Project[] = [{
      name: "",
      description: "",
      url: new URL("https://google.com"),
      image: null
    }];

    render(<ProjectsSection projects={projects} />)
  });

  it('renders the contacts section', () => {
    render(<ContactSection />)
  });

  it('can submit the contact form', () => {
    // https://react-hook-form.com/advanced-usage#TestingForm
    render(<ContactSection />)
  });


})

