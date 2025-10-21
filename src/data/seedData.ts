import type { StartupProfile } from "@/lib/types";

/**
 * Pre-seeded startup profiles for MVP
 *
 * In production, these would be user-submitted and database-backed.
 * For MVP, provides realistic data for testing matching algorithm.
 */
export const seedStartups: StartupProfile[] = [
    {
        id: "startup-1",
        name: "HealthScope AI",
        email: "team@healthscope.ai",
        industry: "Healthcare",
        stage: "Series A",
        raising: 3_000_000,
        geography: "Southeast Asia",
        description:
            "AI diagnostic platform for rural clinics in emerging markets. Built by former doctors with 50 clinics deployed across Philippines and Indonesia. Reducing diagnosis time by 70% and democratizing healthcare access.",
        website: "healthscope.ai",
        metrics: {
            arr: 500_000,
            customers: 50,
            growth: "25% MoM"
        },
        founders: [
            {
                name: "Dr. Maria Santos",
                avatarUrl: "https://ui-avatars.com/api/?name=Maria+Santos&background=4f46e5&color=fff&size=128&bold=true"
            },
            {
                name: "Dr. Raj Patel",
                avatarUrl: "https://ui-avatars.com/api/?name=Raj+Patel&background=0ea5e9&color=fff&size=128&bold=true"
            }
        ],
        createdAt: new Date().toISOString()
    },
    {
        id: "startup-2",
        name: "SolarGrid",
        email: "founders@solargrid.io",
        industry: "Climate Tech",
        stage: "Seed",
        raising: 2_000_000,
        geography: "US",
        description:
            "Solar + battery storage for commercial buildings with proprietary AI for energy optimization. Serving Fortune 500 clients with 3-year payback period. 15 buildings deployed, expanding to 50 by EOY.",
        website: "solargrid.io",
        metrics: {
            customers: 10,
            arr: 1_200_000
        },
        founders: [
            {
                name: "Sarah Chen",
                avatarUrl: "https://ui-avatars.com/api/?name=Sarah+Chen&background=10b981&color=fff&size=128&bold=true"
            },
            {
                name: "Michael Torres",
                avatarUrl: "https://ui-avatars.com/api/?name=Michael+Torres&background=f59e0b&color=fff&size=128&bold=true"
            }
        ],
        createdAt: new Date().toISOString()
    },
    {
        id: "startup-3",
        name: "PayFlow",
        email: "hello@payflow.com",
        industry: "Fintech",
        stage: "Series B",
        raising: 20_000_000,
        geography: "Latin America",
        description:
            "B2B payment infrastructure for Latin America processing $500M annually with 200+ enterprise customers. Replacing wire transfers with instant settlements. Strong unit economics and path to profitability.",
        website: "payflow.com",
        metrics: {
            arr: 15_000_000,
            customers: 200
        },
        founders: [
            {
                name: "Carlos Rodriguez",
                avatarUrl: "https://ui-avatars.com/api/?name=Carlos+Rodriguez&background=8b5cf6&color=fff&size=128&bold=true"
            },
            {
                name: "Ana Silva",
                avatarUrl: "https://ui-avatars.com/api/?name=Ana+Silva&background=ec4899&color=fff&size=128&bold=true"
            },
            {
                name: "Diego Martinez",
                avatarUrl: "https://ui-avatars.com/api/?name=Diego+Martinez&background=14b8a6&color=fff&size=128&bold=true"
            }
        ],
        createdAt: new Date().toISOString()
    },
    {
        id: "startup-4",
        name: "Vibe",
        email: "team@vibe.social",
        industry: "Consumer",
        stage: "Pre-seed",
        raising: 500_000,
        geography: "US",
        description:
            "Social app for college students to discover events and meet friends. Viral referral loops. 50K users across 5 universities with 40% weekly retention. Expanding to 20 schools this semester.",
        website: "vibe.social",
        metrics: {
            customers: 50_000,
            growth: "40% weekly retention"
        },
        founders: [
            {
                name: "Emma Johnson",
                avatarUrl: "https://ui-avatars.com/api/?name=Emma+Johnson&background=f43f5e&color=fff&size=128&bold=true"
            },
            {
                name: "Tyler Davis",
                avatarUrl: "https://ui-avatars.com/api/?name=Tyler+Davis&background=3b82f6&color=fff&size=128&bold=true"
            }
        ],
        createdAt: new Date().toISOString()
    },
    {
        id: "startup-5",
        name: "RoboWeld",
        email: "info@roboweld.tech",
        industry: "Robotics",
        stage: "Seed",
        raising: 4_000_000,
        geography: "US",
        description:
            "Computer vision welding robots for automotive manufacturing reducing defects by 95%. Deployed at 2 Tier-1 suppliers with $8M in LOIs. Founded by ex-Tesla robotics team.",
        website: "roboweld.tech",
        metrics: {
            customers: 2
        },
        founders: [
            {
                name: "James Kim",
                avatarUrl: "https://ui-avatars.com/api/?name=James+Kim&background=6366f1&color=fff&size=128&bold=true"
            },
            {
                name: "Lisa Anderson",
                avatarUrl: "https://ui-avatars.com/api/?name=Lisa+Anderson&background=a855f7&color=fff&size=128&bold=true"
            }
        ],
        createdAt: new Date().toISOString()
    },
    {
        id: "startup-6",
        name: "MedData Pro",
        email: "contact@meddata.pro",
        industry: "Healthcare",
        stage: "Seed",
        raising: 1_500_000,
        geography: "US",
        description:
            "HIPAA-compliant patient data platform for small clinics. SaaS with strong unit economics. 75 customers, $4K ACV, sub-5% churn, 15% MoM growth. Replacing legacy systems costing 10x more.",
        website: "meddata.pro",
        metrics: {
            arr: 300_000,
            customers: 75,
            growth: "15% MoM"
        },
        founders: [
            {
                name: "Robert Williams",
                avatarUrl: "https://ui-avatars.com/api/?name=Robert+Williams&background=059669&color=fff&size=128&bold=true"
            }
        ],
        createdAt: new Date().toISOString()
    },
    {
        id: "startup-7",
        name: "CarbonTech",
        email: "hello@carbontech.io",
        industry: "Climate Tech",
        stage: "Series A",
        raising: 5_000_000,
        geography: "Europe",
        description:
            "Direct air capture technology with partnerships across 3 countries. Proven carbon removal at scale with offtake agreements from Microsoft and Stripe. Novel chemistry IP with 40% cost reduction.",
        website: "carbontech.io",
        metrics: {
            customers: 8
        },
        founders: [
            {
                name: "Dr. Henrik Larsson",
                avatarUrl: "https://ui-avatars.com/api/?name=Henrik+Larsson&background=0891b2&color=fff&size=128&bold=true"
            },
            {
                name: "Sophie Dubois",
                avatarUrl: "https://ui-avatars.com/api/?name=Sophie+Dubois&background=7c3aed&color=fff&size=128&bold=true"
            }
        ],
        createdAt: new Date().toISOString()
    },
    {
        id: "startup-8",
        name: "ShopLocal",
        email: "team@shoplocal.app",
        industry: "Consumer",
        stage: "Seed",
        raising: 800_000,
        geography: "US",
        description:
            "Marketplace connecting local artisans with conscious consumers. 30% repeat purchase rate. 25K buyers, 500 sellers. 15% take rate with path to profitability in 18 months.",
        website: "shoplocal.app",
        metrics: {
            customers: 25_000,
            growth: "30% MoM GMV"
        },
        founders: [
            {
                name: "Olivia Brown",
                avatarUrl: "https://ui-avatars.com/api/?name=Olivia+Brown&background=d97706&color=fff&size=128&bold=true"
            },
            {
                name: "Marcus Thompson",
                avatarUrl: "https://ui-avatars.com/api/?name=Marcus+Thompson&background=dc2626&color=fff&size=128&bold=true"
            }
        ],
        createdAt: new Date().toISOString()
    }
];

