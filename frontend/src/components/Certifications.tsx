import React from "react";
import Image from "next/image";

import { Certification } from "@/app/data";



function CertificationItem({ certification, isExpired }: { certification: Certification, isExpired: boolean }): React.JSX.Element {
    return <div className={"certification-item"} style={{ filter: isExpired ? 'grayscale(100%)' : '' }}>
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


export default function CertificationsSection({ certifications, renderedAt }: { certifications: Certification[], renderedAt: string }) {
    const referenceDate = new Date(renderedAt)

    return <section id={"certifications"} tabIndex={0}>
        <h1 className={"section-title"}>
            <a href={"#certifications"}>Certifications</a>
        </h1>
        <div className={"section-body"}>
            <div id={"certification-list"}>
                {certifications
                    .toSorted((a, b) => b.startDate.getTime() - a.startDate.getTime())
                    .map((certification, index) =>
                        <CertificationItem
                            key={index}
                            certification={certification}
                            isExpired={certification.expireDate < referenceDate}
                        />
                    )}
            </div>
        </div>
    </section>
}
