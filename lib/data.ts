export const contacts = [
  {
    id: "c_001",
    name: "Barry O'Sullivan",
    email: "barry@revscale.io",
    title: "Head of Sales",
    company: "RevScale",
    companyData: {
      industry: "B2B SaaS",
      employees: 120,
      signal: "Hiring 5 SDRs",
    },
    lastContactedDays: 72,
    activities: [
      { type: "email_open", note: "Opened pricing email", daysAgo: 10 },
      { type: "call", note: "Discussed scaling outbound", daysAgo: 75 },
    ],
  },
  {
    id: "c_002",
    name: "Anna Meyer",
    email: "anna@revscale.io",
    title: "VP Revenue Operations",
    company: "RevScale",
    companyData: {
      industry: "B2B SaaS",
      employees: 120,
      signal: "Hiring SDRs",
    },
    lastContactedDays: 45,
    activities: [
      { type: "webinar", note: "Attended pipeline webinar", daysAgo: 30 },
      { type: "email_click", note: "Clicked case study", daysAgo: 28 },
    ],
  },
  {
    id: "c_003",
    name: "James Wright",
    email: "james@logihub.com",
    title: "Director of Sales",
    company: "LogiHub",
    companyData: {
      industry: "Logistics SaaS",
      employees: 300,
      signal: "Raised Series B",
    },
    lastContactedDays: 90,
    activities: [],
  },
];
