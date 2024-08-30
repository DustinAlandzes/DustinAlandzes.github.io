import React from "react";
import {Job} from "@/app/data";


function JobItem({job}: {job: Job}): JSX.Element {
    return <div>
        <h1>
            {job.url ?
                <a className={"job-company-name"} href={job.url.toString()}>{job.company}</a>
                :
                <span className={"job-company-name"}>{job.company}</span>
            }
        </h1>
        {job.position}
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
        {/*{job.image && <Image src={job.image.src} alt={`${job.company} logo`} width="340" height="340"/>}*/}
    </div>
}

export default function WorkExperienceSection({jobs}: {jobs: Job[]}) {
    const jobsCopy = [...jobs]
    jobsCopy.sort((a: Job, b: Job) => a.startDate.getFullYear() - b.startDate.getFullYear())

    const first_job: Job = jobsCopy[0]
    const last_job: Job = jobsCopy[jobs.length - 1]
    const years_of_experience = last_job.endDate.getFullYear() - first_job.startDate.getFullYear()

    return <section id={"work-experience"} tabIndex={0}>
        <h1 className={"section-title"}>
            <a href={"#work-experience"} style={{
                flex: "1"
            }}>
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