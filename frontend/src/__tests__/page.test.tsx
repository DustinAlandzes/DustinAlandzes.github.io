import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page, {CertificationsSection, ContactSection, JobsSection, ProjectsSection} from '../app/page'
import React from "react";
import {Certification, Job, Project} from "@/app/data";
import AWSSolutionsArchitectBadge from "@/app/aws-solutions-architect-associate.png";

describe('Page', () => {
  it('renders', () => {
    render(<Page />)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
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

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
  });


  it('renders the jobs section', () => {
    const jobs: Job[] = [{
      company: "",
      position: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
    }]
    render(<JobsSection jobs={jobs}/>)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
  });


  it('renders the projects section', () => {
    const projects: Project[] = [{
      name: "",
      description: "",
      url: new URL("https://google.com"),
      image: null
    }];

    render(<ProjectsSection projects={projects} />)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
  });

  it('renders the contacts section', () => {
    render(<ContactSection />)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
  });

  it('can submit the contact form', () => {
    // https://react-hook-form.com/advanced-usage#TestingForm
    render(<ContactSection />)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
  });


})

