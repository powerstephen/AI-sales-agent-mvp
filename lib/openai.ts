export async function generateInsight(contact: any) {
  const persona = contact.title;
  const signal = contact.companyData.signal;

  return {
    reasoning: `${contact.name} has not been contacted in ${contact.lastContactedDays} days but recently engaged. Company signal: ${signal}.`,
    angle: "Pipeline expansion",
    email: `Hi ${contact.name.split(" ")[0]},

Saw that ${contact.company} is ${signal.toLowerCase()}.

Teams at that stage often struggle with maintaining pipeline coverage as they scale.

Worth a quick chat to see how you're currently handling this?

Best,
Stephen`,
  };
}
