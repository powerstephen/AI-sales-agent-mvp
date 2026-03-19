import { notFound } from "next/navigation";
import Link from "next/link";
import { getLeadById } from "@/lib/data";
import { getLeadScore, getPersona, getLeadState } from "@/lib/scoring";
import { buildICP } from "@/lib/icp";

export default function LeadPage({ params }: { params: { id: string } }) {
  const lead = getLeadById(params.id);
  if (!lead) notFound();

  const score = getLeadScore(lead);
  const persona = getPersona(lead.title);
  const state = getLeadState(lead);

  const icp = buildICP([lead]);

  const reasons = [];

  if (score >= 80) reasons.push("Strong ICP match");
  if (persona === "Sales Leader") reasons.push("High-converting persona");
  if (lead.lastContactedDays > 60)
    reasons.push("Previously engaged but not followed up");
  if (lead.companyData?.signal)
    reasons.push(`Trigger: ${lead.companyData.signal}`);
  if (lead.activity_1)
    reasons.push("Recent meaningful activity or conversation");

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-4xl">

        <Link href="/" className="text-sm text-gray-500">
          ← Back
        </Link>

        {/* TOP CARD */}
        <div className="mt-4 rounded-2xl border bg-white p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-semibold">{lead.name}</h1>
              <p className="text-gray-600">{lead.title}</p>
              <p className="text-sm text-gray-500 mt-1">{lead.company}</p>
            </div>

            <div className="text-right">
              <p className="text-4xl font-bold text-green-600">{score}</p>
              <p className="text-sm text-gray-500">Lead Score</p>
            </div>
          </div>
        </div>

        {/* WHY THIS LEAD */}
        <div className="mt-6 rounded-2xl border bg-white p-6">
          <h2 className="text-lg font-semibold mb-4">
            Why this lead now
          </h2>

          <div className="grid gap-3">
            {reasons.map((r, i) => (
              <div
                key={i}
                className="bg-green-50 text-green-900 px-4 py-3 rounded-xl text-sm"
              >
                {r}
              </div>
            ))}
          </div>
        </div>

        {/* ACTIVITY */}
        <div className="mt-6 rounded-2xl border bg-white p-6">
          <h2 className="text-lg font-semibold mb-4">Activity</h2>

          <div className="space-y-3 text-sm text-gray-700">
            {lead.activity_1 && <p>• {lead.activity_1}</p>}
            {lead.activity_2 && <p>• {lead.activity_2}</p>}
            {lead.activity_3 && <p>• {lead.activity_3}</p>}
          </div>
        </div>

        {/* EMAIL */}
        <div className="mt-6 rounded-2xl border bg-white p-6">
          <h2 className="text-lg font-semibold mb-4">Suggested email</h2>

          <div className="bg-gray-50 p-4 rounded-xl text-sm leading-relaxed">
            <p>Hi {lead.name.split(" ")[0]},</p>

            <p className="mt-3">
              Noticed {lead.company} is currently {lead.companyData?.signal?.toLowerCase()}.
            </p>

            <p className="mt-3">
              We often see teams in this position sitting on warm pipeline that never gets properly reactivated.
            </p>

            <p className="mt-3">
              Worth a quick chat on how to turn that into revenue?
            </p>

            <p className="mt-3">Best,</p>
          </div>
        </div>

      </div>
    </main>
  );
}
