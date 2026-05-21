import { DbTeamMember } from "@/lib/supabase";

export const manualMembers: DbTeamMember[] = [
    {
        id: "abhay",
        name: "Abhay Sehdev",
        role: "Core Team",
        category: "core",
        image_url: "/teams/abhay tellora.png",
        color: "#A855F7",
        bio: "Architecting high-frequency growth ecosystems with precision.",
        skills: ["Growth Strategy", "Architecture", "Scale"],
        stats: [{ label: "ROI", value: "10X" }, { label: "Scale", value: "Global" }]
    },
    {
        id: "prakhar",
        name: "Prakhar Saxena",
        role: "Core Team",
        category: "core",
        image_url: "/teams/prakhar tellora.png",
        color: "#22C55E",
        bio: "Performance marketing specialist focused on ROAS and data-driven results.",
        skills: ["PPC", "Marketing", "Data"],
        stats: [{ label: "ROAS", value: "12X" }, { label: "Growth", value: "800%" }]
    },
    {
        id: "vansh",
        name: "Vansh Sharma",
        role: "Lead Developer",
        category: "development",
        image_url: "/teams/vansh tellora.png",
        color: "#F3E84A",
        bio: "Strategic growth specialist leading technical integrations and ops.",
        skills: ["Operations", "Strategy", "Tech"],
        stats: [{ label: "Efficiency", value: "98%" }, { label: "Nodes", value: "120+" }]
    },
    {
        id: "nandini",
        name: "Nandini",
        role: "Graphic Designer",
        category: "designing",
        image_url: "/teams/nandini tellora.png",
        color: "#EC4899",
        skills: ["Branding", "Visuals", "Motion"],
        bio: "Crafting brutalist aesthetic and high-converting visual narratives."
    },
    {
        id: "saksham",
        name: "Saksham",
        role: "Development Expert",
        category: "development",
        image_url: "/teams/saksham tellora.png",
        color: "#3B82F6",
        skills: ["Graphics", "Creative", "Assets"],
        bio: "Engineering pixel-perfect assets for market domination."
    },
    {
        id: "ananya",
        name: "Ananya",
        role: "WEB DEVELOPMENT EXPERT",
        category: "development",
        image_url: "/teams/ananya tellora.png",
        color: "#F59E0B",
        skills: ["WEB APPS", "ANIMATION", "PERFORMANCE"],
        bio: "Engineering pixel-perfect web platforms that perform at scale and ship on time."
    },
    {
        id: "tanisha",
        name: "Tanisha",
        role: "Graphic Designer Intern",
        category: "designing",
        image_url: "/teams/tanisha tellora.png",
        color: "#EC4899",
        skills: ["Design", "Visuals", "Creativity"],
        bio: "Bringing fresh and creative perspectives to graphic design."
    },
    {
        id: "aryan",
        name: "Aryan",
        role: "Business Development Intern",
        category: "development",
        image_url: "/teams/aryan tellora.png",
        color: "#3B82F6",
        skills: ["Strategy", "Growth", "Relations"],
        bio: "Identifying and expanding new business opportunities."
    },
];
