import React from "react";

import { Project } from "@/app/data";

function ProjectItem({
    project }: { project: Project }): React.JSX.Element {
    return <article className={"project-item"}>
        <h3 className={"project-item__name"}>
            <a className={"project-item__link"} href={project.url.toString()} target={"_blank"} rel={"noopener noreferrer"}>{project.name}</a>
        </h3>
        <p className={"project-item__description"}>
            {project.description}
        </p>
    </article>
}

export default function ProjectsSection({ projects }: { projects: Project[] }): React.JSX.Element {
    return <section id={"projects"} className={"site-section site-section--projects"}>
        <h2 className={"section-title"}>
            <a href={"#projects"}>Projects</a>
        </h2>
        <div className={"section-body"}>
            <div className={"project-list"}>
                {projects.map((project) => <ProjectItem key={project.name} project={project} />)}
            </div>
        </div>
    </section>
}