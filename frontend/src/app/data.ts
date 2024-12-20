import AWSSolutionsArchitectAssociateBadge from '../../public/aws-solutions-architect-associate.png'
import AWSSolutionsArchitectProfessionalBadge from '../../public/aws-solutions-architect-professional.png'
import TerraformAssociateBadge from '../../public/terraform-associate.png'
import DrChronoLogoCharcoal from '../../public/drchrono_logo_charcoal.png'
import LegalistLogoDark from '../../public/legalist_dark.png'
import { StaticImageData } from "next/image"

export interface Job {
    company: string;
    position: string;
    description: string;
    startDate: Date;
    endDate: Date;
    image?: StaticImageData;
    url?: URL;
}

export const Jobs: Job[] = [
    {
        company: "DrChrono",
        position: "Software Engineer",
        startDate: new Date(2020, 1, 1),
        endDate: new Date(2023, 10, 1),
        description: "Built features and fixed bugs for an electronic health record.",

        //https://www.drchrono.com/ehr-emr/logos/ ...
        image: DrChronoLogoCharcoal,
        url: new URL("https://drchrono.com/")
    },
    {
        company: "Legalist",
        position: "Junior Software Developer",
        startDate: new Date(2019, 3),
        endDate: new Date(2019, 8),
        description: "Built and monitored web scrapers that gathered lawsuits from major US counties.",
        image: LegalistLogoDark,
        url: new URL("https://www.legalist.com/")
    },
    {
        company: "Freelance Web Development",
        position: "Full-stack Web Developer",
        startDate: new Date(2018, 0),
        endDate: new Date(2019, 2),
        description: "Took customer requirements and used Python, Django and React to implement them for a social media website.",
    },
    {
        company: "N-Compass TV/Evergreen Digital",
        position: "System Administrator",
        startDate: new Date(2014, 7),
        endDate: new Date(2017, 11),
        description: "Built a web app hosted on AWS using Python and JavaScript for displaying information on screens in businesses.",
    },
    {
        company: "Armando Montelongo",
        position: "Web Development Intern",
        startDate: new Date(2014, 4),
        endDate: new Date(2014, 7),
        description: "Added features to an event management platform using JavaScript.",
    },
]


export interface Certification {
    name: string;
    description: string;
    image: StaticImageData;
    url: URL;
    startDate: Date;
    expireDate: Date;
}

export const certifications: Certification[] = [
    {
        name: "HashiCorp Certified: Terraform Associate (002)\n",
        image: TerraformAssociateBadge,
        url: new URL("https://www.credly.com/badges/d4012af6-1c9f-4ca8-aa2a-931c2c3c8e5b/public_url"),
        description: "Earners of the HashiCorp Certified: Terraform Associate certification know the basic concepts, skills, and use cases associated with open source HashiCorp Terraform. ",
        startDate: new Date(2021, 10, 1),
        expireDate: new Date(2023, 10, 1)
    },
    {
        name: "AWS Certified Solutions Architect – Associate",
        image: AWSSolutionsArchitectAssociateBadge,
        url: new URL("https://cp.certmetrics.com/amazon/en/public/verify/credential/bbfb48da3bd44da7a53e6281502fd230"), //https://www.credly.com/badges/86dbff9e-c208-41ac-9acd-fcb3f5320ed8/public_url",
        description: "Earners of this certification have a comprehensive understanding of AWS services and technologies.",
        startDate: new Date(2024, 8, 1),
        expireDate: new Date(2027, 8, 1),
    },
    {
        name: "AWS Certified Solutions Architect – Professional",
        image: AWSSolutionsArchitectProfessionalBadge,
        url: new URL("https://www.credly.com/badges/acd8e396-c679-443b-baaf-5135dc0934d8/public_url"),
        description: "Earners of this certification have an extensive understanding of designing technical strategies to accomplish specific business goals. They demonstrated the ability to balance best practices and trade-offs based on business context. Badge owners are able to design solutions across multiple platforms and providers.",
        startDate: new Date(2024, 12, 11),
        expireDate: new Date(2027, 12, 11),
    },
];


export interface Project {
    name: string;
    description: string;
    url: URL;
}

export const projects: Project[] = [
    {
        name: 'terraform-aws-github-pages-lambda',
        description: 'A Terraform module to quickly start a new project using Github Pages and AWS Lambda.',
        url: new URL("https://registry.terraform.io/modules/DustinAlandzes/github-pages-lambda/aws/latest")
    },
    {
        name: "joplin-s3-bucket",
        url: new URL("https://github.com/DustinAlandzes/terraform-aws-joplin-s3-bucket"),
        description: "A Terraform module for creating an S3 bucket to store notes from Joplin.",
    },
    {
        name: "Web Scraper for DuoLingo",
        url: new URL("https://github.com/DustinAlandzes/scrape-duolingo-audio"),
        description: "A project to scrape DuoLingo courses and turn them into Anki decks.",
    },
    {
        name: "Super Mario 64 Star Select",
        url: new URL("https://github.com/DustinAlandzes/super-mario-64-star-select"),
        description: "A recreation of the Super Mario 64 star select screen.",
    },
    {
        name: "Super Smash Bros. Melee models and animations in the browser",
        url: new URL("https://github.com/DustinAlandzes/react-three-fiber-ssbm"),
        description: "Use React Three Fiber to render Super Smash Brothers Melee models and animations.",
    },
]
