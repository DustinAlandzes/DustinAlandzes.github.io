import React from "react";
import Image from "next/image";

import {Certification} from "@/app/data";



function CertificationItem({certification}: { certification: Certification }): JSX.Element {
    return <div className={"certification-item"} style={{filter: certification.expireDate < new Date() ? 'grayscale(100%)' : ''}}>
        <a href={certification.url.toString()} target={"_blank"}>
            <Image src={certification.image.src}
                   alt={`${certification.name} Badge`}
                   width="200"
                   height="200"
                   priority
            />
        </a>
    </div>
}


export default function CertificationsSection({certifications}: {certifications: Certification[]}) {
    return <section id={"certifications"} tabIndex={0}>
        <h1 className={"section-title"}>
            <a href={"#certifications"}>Certifications</a>
        </h1>
        <div className={"section-body"}>
            <div id={"certification-list"}>
                {certifications.map((certification, index) => <CertificationItem key={index}
                                                                                 certification={certification}/>)}
            </div>
        </div>
    </section>
}
