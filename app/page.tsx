import Link from "next/link";
import { contacts } from "@/lib/data";
import { getICPScore, getPersona, getState } from "@/lib/scoring";

export default function Home() {
  const enriched = contacts.map((c) => ({
    ...c,
    persona: getPersona(c.title),
    icp: getICPScore(c.companyData),
    state: getState(c),
  }));

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">AI Revenue Opportunities</h1>

      <p className="mb-4">
        {enriched.length} opportunities identified
      </p>

      <table className="w-full border">
        <thead>
          <tr className="text-left">
            <th>Name</th>
            <th>Company</th>
            <th>Persona</th>
            <th>ICP</th>
            <th>State</th>
          </tr>
        </thead>

        <tbody>
          {enriched.map((c) => (
            <tr key={c.id} className="border-t">
              <td>
                <Link href={`/lead/${c.id}`} className="text-blue-500">
                  {c.name}
                </Link>
              </td>
              <td>{c.company}</td>
              <td>{c.persona}</td>
              <td>{c.icp}</td>
              <td>{c.state}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
