import { contacts } from "@/lib/data";
import { generateInsight } from "@/lib/ai";

export default async function LeadPage({ params }: any) {
  const contact = contacts.find((c) => c.id === params.id);

  if (!contact) return <div>Not found</div>;

  const insight = await generateInsight(contact);

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">{contact.name}</h1>

      <h2 className="font-semibold">Activity Timeline</h2>
      <ul className="mb-6">
        {contact.activities.map((a, i) => (
          <li key={i}>
            {a.type} — {a.note} ({a.daysAgo} days ago)
          </li>
        ))}
      </ul>

      <h2 className="font-semibold">AI Reasoning</h2>
      <p className="mb-4">{insight.reasoning}</p>

      <h2 className="font-semibold">Suggested Email</h2>
      <pre className="bg-gray-100 p-4">{insight.email}</pre>

      <div className="mt-4 flex gap-2">
        <button className="bg-black text-white px-4 py-2">Approve</button>
        <button className="border px-4 py-2">Regenerate</button>
      </div>
    </div>
  );
}
