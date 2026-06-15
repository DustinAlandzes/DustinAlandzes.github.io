'use client';

import React from "react";
import {Job} from "@/app/data";


function JobItem({job}: {job: Job}): React.JSX.Element {
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
            {job.endDate === null ?
                <time dateTime={new Date().toISOString()}>
                    {"Current"}
                </time>
            :
                <time dateTime={job.endDate.toISOString()}>
                    {job.endDate.toLocaleDateString("en-US", {month: "long", year: "numeric"})}
                </time>
            }
        </div>
        <p>{job.description}</p>
        {/*{job.image && <Image src={job.image.src} alt={`${job.company} logo`} width="340" height="340"/>}*/}
    </div>
}

export default function WorkExperienceSection({jobs}: {jobs: Job[]}) {
    // calculate years of experience, sum the differences between each job's start and end
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#methods_of_the_date_object
    const msPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds per day
    const length_of_each_job: number[] = [];
    jobs.forEach(job => {
        // if it's a current job, count the number of days since now
        if (job.endDate === null) {
            const now = new Date();
            const length_of_job_in_days = (now.getTime() - job.startDate.getTime()) / msPerDay;
            length_of_each_job.push(length_of_job_in_days);
        } else {
            const length_of_job_in_days = (job.endDate.getTime() - job.startDate.getTime()) / msPerDay;
            length_of_each_job.push(length_of_job_in_days);
        }
    })
    const years_of_experience = Math.floor(length_of_each_job.reduce((acc, job) => acc + job, 0) / 365);

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