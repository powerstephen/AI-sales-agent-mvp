export async function generateInsight(contact: any) {
  const signal = contact.companyData?.signal || "showing growth signals";

  return {
    reasoning: `${contact.name} has not been contacted in ${contact.lastContactedDays} days. Their company is ${signal.toLowerCase()}, which suggests this may be a good time for a relevant re-engagement.`,
    angle: "Pipeline coverage and timing",
    email: `Hi ${contact.name.split(" ")[0]},

I noticed ${contact.company} is ${signal.toLowerCase()}.

Often when companies hit this stage, keeping pipeline coverage strong becomes more important, especially across the right accounts and personas.

Thought it might be worth reaching out to see whether this is a priority for you right now.

Best,
Stephen`,
  };
}
