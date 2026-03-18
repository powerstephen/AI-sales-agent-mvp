export function getPersona(title: string) {
  if (title.toLowerCase().includes("sales")) return "Sales Leader";
  if (title.toLowerCase().includes("revenue")) return "RevOps";
  if (title.toLowerCase().includes("founder")) return "Founder";
  return "Other";
}

export function getICPScore(company: any) {
  if (company.industry.includes("SaaS") && company.employees >= 50 && company.employees <= 500) {
    return "High";
  }
  return "Medium";
}

export function getState(contact: any) {
  if (contact.lastContactedDays > 60) return "Dormant";
  if (contact.lastContactedDays > 30) return "At Risk";
  return "Active";
}
