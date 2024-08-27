import React from "react";

import {Project} from "@/app/data";

function ProjectItem({
    project}: {project: Project}): JSX.Element {
    return <div className={"project"}>
        <div className={"project-name"}>
            <a href={project.url.toString()}>{project.name}</a>
        </div>
        <div className={"project-description"}>
            {project.description}
        </div>
    </div>
}

export default function ProjectsSection({projects}: {projects: Project[]}): JSX.Element {
    return <section id={"projects"}>
        <h1 className={"section-title"}>
            <a href={"#projects"}>Projects</a>
        </h1>
        <div className={"section-body"}>
            <div id={"project-list"}>
                {projects.map((project, index) => <ProjectItem key={index} project={project}/>)}
            </div>
        </div>
    </section>
}