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
    },
    {
        id: "startup-9",
        name: "EduQuest",
        email: "founders@eduquest.africa",
        industry: "EdTech",
        stage: "Seed",
        raising: 1_200_000,
        geography: "Africa",
        description:
            "Mobile-first learning platform for K-12 students in Sub-Saharan Africa. Works offline with SMS fallback. 200K students across Kenya, Nigeria, and Ghana. Partnered with governments for curriculum alignment.",
        website: "eduquest.africa",
        metrics: {
            customers: 200_000,
            arr: 400_000,
            growth: "35% MoM"
        },
        founders: [
            {
                name: "Amara Okafor",
                avatarUrl: "https://ui-avatars.com/api/?name=Amara+Okafor&background=16a34a&color=fff&size=128&bold=true"
            },
            {
                name: "Kwame Mensah",
                avatarUrl: "https://ui-avatars.com/api/?name=Kwame+Mensah&background=ea580c&color=fff&size=128&bold=true"
            }
        ],
        createdAt: new Date().toISOString()
    },
    {
        id: "startup-10",
        name: "SecureVault",
        email: "contact@securevault.io",
        industry: "Cybersecurity",
        stage: "Series A",
        raising: 8_000_000,
        geography: "US",
        description:
            "Zero-knowledge encryption platform for enterprise data protection. SOC2 Type II certified. Serving 150 mid-market companies with 99.99% uptime. Founded by former NSA engineers.",
        website: "securevault.io",
        metrics: {
            arr: 4_500_000,
            customers: 150,
            growth: "20% MoM"
        },
        founders: [
            {
                name: "Jennifer Park",
                avatarUrl: "https://ui-avatars.com/api/?name=Jennifer+Park&background=1e40af&color=fff&size=128&bold=true"
            },
            {
                name: "David Cohen",
                avatarUrl: "https://ui-avatars.com/api/?name=David+Cohen&background=be123c&color=fff&size=128&bold=true"
            },
            {
                name: "Ahmed Hassan",
                avatarUrl: "https://ui-avatars.com/api/?name=Ahmed+Hassan&background=0f766e&color=fff&size=128&bold=true"
            }
        ],
        createdAt: new Date().toISOString()
    },
    {
        id: "startup-11",
        name: "FarmTech Solutions",
        email: "hello@farmtech.in",
        industry: "AgTech",
        stage: "Series A",
        raising: 6_000_000,
        geography: "Asia",
        description:
            "IoT-based precision agriculture for smallholder farmers in India. AI-driven crop monitoring, soil analysis, and yield prediction. 10K farmers increased yields by 40%. Hardware + SaaS model.",
        website: "farmtech.in",
        metrics: {
            arr: 2_000_000,
            customers: 10_000,
            growth: "50% YoY"
        },
        founders: [
            {
                name: "Priya Sharma",
                avatarUrl: "https://ui-avatars.com/api/?name=Priya+Sharma&background=15803d&color=fff&size=128&bold=true"
            },
            {
                name: "Arjun Patel",
                avatarUrl: "https://ui-avatars.com/api/?name=Arjun+Patel&background=c2410c&color=fff&size=128&bold=true"
            }
        ],
        createdAt: new Date().toISOString()
    },
    {
        id: "startup-12",
        name: "QuantumLeap",
        email: "team@quantumleap.ai",
        industry: "DeepTech",
        stage: "Series B",
        raising: 25_000_000,
        geography: "US",
        description:
            "Quantum computing chips for drug discovery and materials science. 5 Fortune 100 pharma clients. 3 patents granted, 12 pending. Breakthrough in room-temperature quantum coherence. MIT spinout.",
        website: "quantumleap.ai",
        metrics: {
            arr: 8_000_000,
            customers: 5
        },
        founders: [
            {
                name: "Dr. Alan Chen",
                avatarUrl: "https://ui-avatars.com/api/?name=Alan+Chen&background=5b21b6&color=fff&size=128&bold=true"
            },
            {
                name: "Dr. Rebecca Martinez",
                avatarUrl: "https://ui-avatars.com/api/?name=Rebecca+Martinez&background=0369a1&color=fff&size=128&bold=true"
            }
        ],
        createdAt: new Date().toISOString()
    },
    {
        id: "startup-13",
        name: "LogiFlow",
        email: "founders@logiflow.com",
        industry: "Logistics",
        stage: "Seed",
        raising: 3_500_000,
        geography: "Europe",
        description:
            "AI-powered last-mile delivery optimization for e-commerce. Reducing delivery costs by 30% for 50+ brands across 8 European countries. Processing 100K deliveries monthly with 98% on-time rate.",
        website: "logiflow.com",
        metrics: {
            arr: 1_800_000,
            customers: 50,
            growth: "25% MoM"
        },
        founders: [
            {
                name: "Lucas Weber",
                avatarUrl: "https://ui-avatars.com/api/?name=Lucas+Weber&background=047857&color=fff&size=128&bold=true"
            },
            {
                name: "Elena Popov",
                avatarUrl: "https://ui-avatars.com/api/?name=Elena+Popov&background=b91c1c&color=fff&size=128&bold=true"
            },
            {
                name: "Omar Al-Rashid",
                avatarUrl: "https://ui-avatars.com/api/?name=Omar+AlRashid&background=1d4ed8&color=fff&size=128&bold=true"
            }
        ],
        createdAt: new Date().toISOString()
    },
    {
        id: "startup-14",
        name: "NeuroPulse",
        email: "contact@neuropulse.med",
        industry: "Healthcare",
        stage: "Series A",
        raising: 12_000_000,
        geography: "US",
        description:
            "Non-invasive brain-computer interface for paralysis patients. FDA breakthrough device designation. Clinical trials at Johns Hopkins and Mayo Clinic. 89% patient improvement in mobility tasks.",
        website: "neuropulse.med",
        metrics: {
            customers: 45,
            arr: 3_200_000
        },
        founders: [
            {
                name: "Dr. Samantha Lee",
                avatarUrl: "https://ui-avatars.com/api/?name=Samantha+Lee&background=7c2d12&color=fff&size=128&bold=true"
            },
            {
                name: "Dr. Marcus Johnson",
                avatarUrl: "https://ui-avatars.com/api/?name=Marcus+Johnson&background=4338ca&color=fff&size=128&bold=true"
            }
        ],
        createdAt: new Date().toISOString()
    },
    {
        id: "startup-15",
        name: "GameForge",
        email: "hello@gameforge.gg",
        industry: "Gaming",
        stage: "Pre-seed",
        raising: 750_000,
        geography: "US",
        description:
            "No-code game development platform for indie creators. 15K creators built 3K+ games. Viral TikTok growth. Monetization through asset marketplace with 20% take rate. 2M monthly active players.",
        website: "gameforge.gg",
        metrics: {
            customers: 15_000,
            growth: "60% MoM users"
        },
        founders: [
            {
                name: "Alex Rivera",
                avatarUrl: "https://ui-avatars.com/api/?name=Alex+Rivera&background=9333ea&color=fff&size=128&bold=true"
            },
            {
                name: "Jordan Lee",
                avatarUrl: "https://ui-avatars.com/api/?name=Jordan+Lee&background=dc2626&color=fff&size=128&bold=true"
            }
        ],
        createdAt: new Date().toISOString()
    },
    {
        id: "startup-16",
        name: "AquaPure",
        email: "team@aquapure.tech",
        industry: "Climate Tech",
        stage: "Seed",
        raising: 2_500_000,
        geography: "Middle East",
        description:
            "Low-cost desalination technology using renewable energy. Deployed in UAE and Saudi Arabia. 50% cheaper than traditional methods. MOUs with 3 governments. Addressing water scarcity crisis.",
        website: "aquapure.tech",
        metrics: {
            customers: 8,
            arr: 900_000
        },
        founders: [
            {
                name: "Dr. Fatima Al-Mansouri",
                avatarUrl: "https://ui-avatars.com/api/?name=Fatima+AlMansouri&background=0284c7&color=fff&size=128&bold=true"
            },
            {
                name: "Ibrahim Khalil",
                avatarUrl: "https://ui-avatars.com/api/?name=Ibrahim+Khalil&background=059669&color=fff&size=128&bold=true"
            }
        ],
        createdAt: new Date().toISOString()
    },
    {
        id: "startup-17",
        name: "TalentBridge",
        email: "founders@talentbridge.io",
        industry: "HR Tech",
        stage: "Seed",
        raising: 1_800_000,
        geography: "Europe",
        description:
            "AI-powered technical hiring platform removing resume bias. 300 companies including 15 unicorns. Improved diversity hiring by 45%. 95% candidate satisfaction. Processing 10K interviews monthly.",
        website: "talentbridge.io",
        metrics: {
            arr: 1_100_000,
            customers: 300,
            growth: "30% MoM"
        },
        founders: [
            {
                name: "Nina Kowalski",
                avatarUrl: "https://ui-avatars.com/api/?name=Nina+Kowalski&background=be185d&color=fff&size=128&bold=true"
            },
            {
                name: "Jamal Williams",
                avatarUrl: "https://ui-avatars.com/api/?name=Jamal+Williams&background=0891b2&color=fff&size=128&bold=true"
            }
        ],
        createdAt: new Date().toISOString()
    },
    {
        id: "startup-18",
        name: "NeoBanc",
        email: "hello@neobanc.com",
        industry: "Fintech",
        stage: "Series A",
        raising: 15_000_000,
        geography: "Southeast Asia",
        description:
            "Digital bank for unbanked populations in Vietnam and Thailand. 500K accounts opened. Micro-lending with AI credit scoring. 2% default rate vs 8% industry average. Licensed in 3 countries.",
        website: "neobanc.com",
        metrics: {
            arr: 6_000_000,
            customers: 500_000,
            growth: "40% QoQ"
        },
        founders: [
            {
                name: "Linh Nguyen",
                avatarUrl: "https://ui-avatars.com/api/?name=Linh+Nguyen&background=6366f1&color=fff&size=128&bold=true"
            },
            {
                name: "Somchai Wong",
                avatarUrl: "https://ui-avatars.com/api/?name=Somchai+Wong&background=dc2626&color=fff&size=128&bold=true"
            },
            {
                name: "Maya Tan",
                avatarUrl: "https://ui-avatars.com/api/?name=Maya+Tan&background=059669&color=fff&size=128&bold=true"
            }
        ],
        createdAt: new Date().toISOString()
    },
    {
        id: "startup-19",
        name: "SpaceCargo",
        email: "contact@spacecargo.space",
        industry: "Aerospace",
        stage: "Series B",
        raising: 40_000_000,
        geography: "US",
        description:
            "Reusable satellite delivery vehicles for low Earth orbit. 8 successful launches. Contracts with NASA, SpaceX, and ESA. 60% cost reduction vs traditional launch providers. Ex-Blue Origin team.",
        website: "spacecargo.space",
        metrics: {
            arr: 18_000_000,
            customers: 12
        },
        founders: [
            {
                name: "Captain Rachel Torres",
                avatarUrl: "https://ui-avatars.com/api/?name=Rachel+Torres&background=1e3a8a&color=fff&size=128&bold=true"
            },
            {
                name: "Dr. Yuki Tanaka",
                avatarUrl: "https://ui-avatars.com/api/?name=Yuki+Tanaka&background=7c3aed&color=fff&size=128&bold=true"
            }
        ],
        createdAt: new Date().toISOString()
    },
    {
        id: "startup-20",
        name: "FoodChain",
        email: "team@foodchain.tech",
        industry: "Supply Chain",
        stage: "Seed",
        raising: 2_200_000,
        geography: "Latin America",
        description:
            "Blockchain-based food traceability for preventing fraud and ensuring safety. Tracking coffee, cocoa, and beef across Brazil, Colombia, and Argentina. 200+ farms onboarded. Walmart pilot program.",
        website: "foodchain.tech",
        metrics: {
            customers: 200,
            arr: 650_000,
            growth: "45% QoQ"
        },
        founders: [
            {
                name: "Isabella Costa",
                avatarUrl: "https://ui-avatars.com/api/?name=Isabella+Costa&background=15803d&color=fff&size=128&bold=true"
            },
            {
                name: "Felipe Moreno",
                avatarUrl: "https://ui-avatars.com/api/?name=Felipe+Moreno&background=b45309&color=fff&size=128&bold=true"
            }
        ],
        createdAt: new Date().toISOString()
    },
    {
        id: "startup-21",
        name: "MindfulAI",
        email: "founders@mindful.ai",
        industry: "Mental Health",
        stage: "Seed",
        raising: 3_000_000,
        geography: "US",
        description:
            "AI therapist for preventive mental health care. 100K users with 4.8 app store rating. Clinical validation showing 65% reduction in anxiety scores. B2B2C model through employers and insurers.",
        website: "mindful.ai",
        metrics: {
            customers: 100_000,
            arr: 2_400_000,
            growth: "50% MoM"
        },
        founders: [
            {
                name: "Dr. Emily Zhang",
                avatarUrl: "https://ui-avatars.com/api/?name=Emily+Zhang&background=7e22ce&color=fff&size=128&bold=true"
            },
            {
                name: "Nathan Brooks",
                avatarUrl: "https://ui-avatars.com/api/?name=Nathan+Brooks&background=0e7490&color=fff&size=128&bold=true"
            }
        ],
        createdAt: new Date().toISOString()
    },
    {
        id: "startup-22",
        name: "BuilderOS",
        email: "hello@builderos.dev",
        industry: "Developer Tools",
        stage: "Pre-seed",
        raising: 600_000,
        geography: "US",
        description:
            "AI-powered code review and refactoring tool. 5K developers at 200 companies. Catches 3x more bugs than traditional linters. Integrates with GitHub, GitLab, and Bitbucket. YC alumni founders.",
        website: "builderos.dev",
        metrics: {
            customers: 5_000,
            arr: 180_000,
            growth: "70% MoM"
        },
        founders: [
            {
                name: "Kevin Huang",
                avatarUrl: "https://ui-avatars.com/api/?name=Kevin+Huang&background=4338ca&color=fff&size=128&bold=true"
            }
        ],
        createdAt: new Date().toISOString()
    },
    {
        id: "startup-23",
        name: "UrbanMobility",
        email: "contact@urbanmobility.city",
        industry: "Transportation",
        stage: "Series A",
        raising: 10_000_000,
        geography: "Asia",
        description:
            "Autonomous shuttle service for corporate campuses and universities. Operating in Singapore, Seoul, and Tokyo. 50K rides completed with zero accidents. Partnerships with 10 universities and 5 tech campuses.",
        website: "urbanmobility.city",
        metrics: {
            customers: 15,
            arr: 5_000_000,
            growth: "35% QoQ"
        },
        founders: [
            {
                name: "Dr. Hiroshi Yamamoto",
                avatarUrl: "https://ui-avatars.com/api/?name=Hiroshi+Yamamoto&background=0c4a6e&color=fff&size=128&bold=true"
            },
            {
                name: "Mei Lin",
                avatarUrl: "https://ui-avatars.com/api/?name=Mei+Lin&background=be123c&color=fff&size=128&bold=true"
            },
            {
                name: "Karthik Reddy",
                avatarUrl: "https://ui-avatars.com/api/?name=Karthik+Reddy&background=047857&color=fff&size=128&bold=true"
            }
        ],
        createdAt: new Date().toISOString()
    },
    {
        id: "startup-24",
        name: "BioMaterial",
        email: "team@biomaterial.bio",
        industry: "Materials Science",
        stage: "Seed",
        raising: 4_500_000,
        geography: "Europe",
        description:
            "Biodegradable plastic alternative from agricultural waste. Carbon-negative production. Partnerships with Unilever and Nestlé for packaging. Pilot production facility in Netherlands producing 100 tons monthly.",
        website: "biomaterial.bio",
        metrics: {
            customers: 12,
            arr: 1_500_000
        },
        founders: [
            {
                name: "Dr. Anna Bergström",
                avatarUrl: "https://ui-avatars.com/api/?name=Anna+Bergstrom&background=065f46&color=fff&size=128&bold=true"
            },
            {
                name: "Dr. Marco Bianchi",
                avatarUrl: "https://ui-avatars.com/api/?name=Marco+Bianchi&background=92400e&color=fff&size=128&bold=true"
            }
        ],
        createdAt: new Date().toISOString()
    },
    {
        id: "startup-25",
        name: "LegalTech Pro",
        email: "founders@legaltech.pro",
        industry: "LegalTech",
        stage: "Series A",
        raising: 7_000_000,
        geography: "US",
        description:
            "AI contract analysis for M&A due diligence. Reducing review time from weeks to hours. 40 law firms and 60 corporate legal teams as clients. Processing $50B in deal value annually.",
        website: "legaltech.pro",
        metrics: {
            arr: 5_500_000,
            customers: 100,
            growth: "25% MoM"
        },
        founders: [
            {
                name: "Sarah Mitchell",
                avatarUrl: "https://ui-avatars.com/api/?name=Sarah+Mitchell&background=6d28d9&color=fff&size=128&bold=true"
            },
            {
                name: "Andrew Goldstein",
                avatarUrl: "https://ui-avatars.com/api/?name=Andrew+Goldstein&background=b91c1c&color=fff&size=128&bold=true"
            }
        ],
        createdAt: new Date().toISOString()
    },
    {
        id: "startup-26",
        name: "PropelAI",
        email: "hello@propel.ai",
        industry: "Marketing Tech",
        stage: "Seed",
        raising: 2_000_000,
        geography: "Australia",
        description:
            "AI-generated personalized video ads at scale. 150 DTC brands including 5 unicorns. 4x improvement in conversion rates. Processing 1M+ video variations monthly. Integrates with Meta, Google, and TikTok ads.",
        website: "propel.ai",
        metrics: {
            arr: 1_300_000,
            customers: 150,
            growth: "40% MoM"
        },
        founders: [
            {
                name: "Jake Morrison",
                avatarUrl: "https://ui-avatars.com/api/?name=Jake+Morrison&background=be123c&color=fff&size=128&bold=true"
            },
            {
                name: "Sophia Lee",
                avatarUrl: "https://ui-avatars.com/api/?name=Sophia+Lee&background=0891b2&color=fff&size=128&bold=true"
            }
        ],
        createdAt: new Date().toISOString()
    }
];

