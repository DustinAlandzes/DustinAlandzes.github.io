import {Job, Jobs} from "@/app/data";
import {a} from "@react-spring/web";
import Image from "next/image";
import React from "react";

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
        {job.image && <Image src={job.image.src} alt={`${job.company} logo`} width="340" height="340"/>}
    </div>
}

export default function WorkExperienceSection({jobs}: {jobs: Job[]}) {
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
                {jobs.map((job, index) => <JobItem key={index} job={job}/>)}
            </div>
        </div>
    </section>
}