import React from "react";
import Image from "next/image";

import { Certification } from "@/app/data";



function CertificationItem({ certification, isExpired }: { certification: Certification, isExpired: boolean }): React.JSX.Element {
    return <div className={"certification-item"} style={{ filter: isExpired ? 'grayscale(100%)' : undefined }}>
        <a href={certification.url.toString()} target={"_blank"} rel={"noopener noreferrer"}>
            <Image src={certification.image}
                alt={`${certification.name} Badge`}
                width="200"
                height="200"
                priority
            />
        </a>
    </div>
}


export default function CertificationsSection({ certifications, renderedAt }: { certifications: Certification[], renderedAt: string }): React.JSX.Element {
    const referenceDate = new Date(renderedAt)

    return <section id={"certifications"} className={"site-section site-section--certifications"}>
        <h2 className={"section-title"}>
            <a href={"#certifications"}>Certifications</a>
        </h2>
        <div className={"section-body"}>
            <div className={"certification-list"}>
                {certifications
                    .toSorted((a, b) => b.startDate.getTime() - a.startDate.getTime())
                    .map((certification) =>
                        <CertificationItem
                            key={certification.name}
                            certification={certification}
                            isExpired={certification.expireDate < referenceDate}
                        />
                    )}
            </div>
        </div>
    </section>
}
