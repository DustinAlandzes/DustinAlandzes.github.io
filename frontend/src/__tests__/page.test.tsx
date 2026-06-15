import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from "react";
import { Certification, Job, Project } from "@/app/data";
import AWSSolutionsArchitectBadge from "../../public/aws-solutions-architect-associate.png";
import Home from "@/app/page"
import CertificationsSection from "@/components/Certifications";
import WorkExperienceSection from "@/components/WorkExperience";
import ProjectsSection from "@/components/Projects";
import ContactSection from "@/components/Contact";

const renderedAt = "2026-06-15T00:00:00.000Z";
const originalContactEndpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT;
const fetchMock = jest.fn();

beforeAll(() => {
  Object.defineProperty(global, 'fetch', {
    writable: true,
    value: fetchMock,
  });
});

afterEach(() => {
  fetchMock.mockReset();

  if (originalContactEndpoint === undefined) {
    delete process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT;
  } else {
    process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT = originalContactEndpoint;
  }
});

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
    render(<CertificationsSection certifications={certifications} renderedAt={renderedAt} />)
  });

  it('renders the jobs section', () => {
    const jobs: Job[] = [{
      company: "",
      position: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
    }]
    render(<WorkExperienceSection jobs={jobs} renderedAt={renderedAt} />)
  });

  it('renders the projects section', () => {
    const projects: Project[] = [{
      name: "",
      description: "",
      url: new URL("https://google.com"),
    }];

    render(<ProjectsSection projects={projects} />)
  });

  it('renders the contacts section', () => {
    render(<ContactSection />)
  });

  it('can submit the contact form', async () => {
    process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT = 'https://example.com/contact';
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, message: 'Contact form submitted successfully.' }),
    } as Response);

    render(<ContactSection />)

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Dustin' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'dustin@alandzes.com' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hey there' } });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    expect(fetchMock).toHaveBeenCalledWith('https://example.com/contact', expect.objectContaining({
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Dustin',
        email: 'dustin@alandzes.com',
        body: 'Hey there',
      }),
    }));

    await waitFor(() => {
      expect(screen.getByText('Thanks for your interest!')).toBeInTheDocument();
    });
  });

  it('shows a configuration error when the contact endpoint is missing', async () => {
    delete process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT;

    render(<ContactSection />)

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Dustin' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'dustin@alandzes.com' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hey there' } });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(fetchMock).not.toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Contact form is temporarily unavailable. Please email me directly.');
    });
  });
})

