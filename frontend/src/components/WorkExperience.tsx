'use client';

import React from "react";
import {Job} from "@/app/data";


function JobItem({ job, renderedAt }: { job: Job, renderedAt: string }): React.JSX.Element {
    return <article className={"job-item"}>
        <h3 className={"job-item__heading"}>
            {job.url ?
                <a className={"job-company-name"} href={job.url.toString()} target={"_blank"} rel={"noopener noreferrer"}>{job.company}</a>
                :
                <span className={"job-company-name"}>{job.company}</span>
            }
        </h3>
        <p className={"job-item__role"}>{job.position}</p>
        <div className={"job-item__dates"}>
            <time dateTime={job.startDate.toISOString()}>
                {job.startDate.toLocaleDateString("en-US", {month: "long", year: "numeric"})}
            </time>
            {" - "}
            {job.endDate === null ?
                <time dateTime={renderedAt}>
                    {"Current"}
                </time>
            :
                <time dateTime={job.endDate.toISOString()}>
                    {job.endDate.toLocaleDateString("en-US", {month: "long", year: "numeric"})}
                </time>
            }
        </div>
        <p className={"job-item__description"}>{job.description}</p>
        {/*{job.image && <Image src={job.image.src} alt={`${job.company} logo`} width="340" height="340"/>}*/}
    </article>
}

export default function WorkExperienceSection({ jobs, renderedAt }: { jobs: Job[], renderedAt: string }): React.JSX.Element {
    // calculate years of experience, sum the differences between each job's start and end
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#methods_of_the_date_object
    const msPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds per day
    const referenceDate = new Date(renderedAt)
    const lengthOfEachJob: number[] = [];
    jobs.forEach(job => {
        // if it's a current job, count the number of days since now
        if (job.endDate === null) {
            const lengthOfJobInDays = (referenceDate.getTime() - job.startDate.getTime()) / msPerDay;
            lengthOfEachJob.push(lengthOfJobInDays);
        } else {
            const lengthOfJobInDays = (job.endDate.getTime() - job.startDate.getTime()) / msPerDay;
            lengthOfEachJob.push(lengthOfJobInDays);
        }
    })
    const yearsOfExperience = Math.floor(lengthOfEachJob.reduce((acc, job) => acc + job, 0) / 365);

    return <section id={"work-experience"} className={"site-section site-section--experience"}>
        <div className={"section-title section-title--split"}>
            <h2 className={"section-title__heading"}>
                <a href={"#work-experience"}>
                {`Work Experience`}
                </a>
            </h2>
            <span className={"section-title__meta"}>
                {`${yearsOfExperience} years`}
            </span>
        </div>
        <div className={"section-body"}>
            <div className={"jobs-list"}>
                {jobs.map((job) => <JobItem key={`${job.company}-${job.startDate.toISOString()}`} job={job} renderedAt={renderedAt} />)}
            </div>
        </div>
    </section>
}