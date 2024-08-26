import {Certification} from "@/app/data";
import Image from "next/image";
import React from "react";


function CertificationItem({certification, detailed}: {
    certification: Certification,
    detailed?: boolean
}): JSX.Element {
    return <div className={"certification-item"}
                style={{
                    filter: certification.expireDate < new Date() ? 'grayscale(100%)' : ''
        }}>
        {detailed && `${certification.name}- ${certification.description}`}
        <a href={certification.url.toString()} target={"_blank"}>
            <Image src={certification.image.src} alt={`${certification.name} Badge`} width="340" height="340" />
        </a>
    </div>
}


export default function CertificationsSection({certifications, detailed}: {certifications: Certification[], detailed?: boolean}) {
    return <section className={"section"} id={"certifications"}>
        <h1 className={"section-title"}>
            <a href={"#certifications"}>Certifications</a>
        </h1>
        <div className={"section-body"}>
            <div id={"certification-list"}>
                {certifications.map((certification, index) => <CertificationItem key={index}
                                                                                 certification={certification}
                                                                                 detailed={detailed}/>)}
            </div>
        </div>
    </section>
}
