import { SEO_CONFIG } from "@/lib/seo";

export interface JobPostingSchemaProps {
    title: string;
    description: string;
    datePosted: string;
    validThrough?: string;
    employmentType: string;
    jobLocation?: string;
    isRemote?: boolean;
}

export default function JobPostingSchema({ job }: { job: JobPostingSchemaProps }) {
    if (!job) return null;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        "title": job.title,
        "description": job.description,
        "datePosted": job.datePosted,
        "validThrough": job.validThrough,
        "employmentType": job.employmentType,
        "hiringOrganization": {
            "@type": "Organization",
            "name": SEO_CONFIG.organizationName,
            "sameAs": SEO_CONFIG.siteUrl,
            "logo": `${SEO_CONFIG.siteUrl}/logo.png`
        },
        "jobLocation": {
            "@type": "Place",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": job.jobLocation || SEO_CONFIG.address.city,
                "addressRegion": "Delhi",
                "addressCountry": SEO_CONFIG.address.country
            }
        },
        "applicantLocationRequirements": job.isRemote ? {
            "@type": "Country",
            "name": "India"
        } : undefined,
        "jobLocationType": job.isRemote ? "TELECOMMUTE" : undefined
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
