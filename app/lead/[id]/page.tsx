import { notFound } from "next/navigation";
import { contacts } from "@/lib/data";
import { generateInsight } from "@/lib/openai";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function LeadPage({ params }: PageProps) {
  const contact = contacts.find((c) => c.id === params.id);

  if (!contact) {
    notFound();
  }

  const insight = await generateInsight(contact);

  return (
    <main className="min-h-screen bg-white px-6 py-10 md:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-sm text-gray-500">Lead detail</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {contact.name}
          </h1>
          <p className="mt-2 text-base text-gray-600">
            {contact.title} at {contact.company}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Activity Timeline</h2>
            <div className="mt-5 space-y-4">
              {contact.activities && contact.activities.length > 0 ? (
                contact.activities.map((activity, index) => (
                  <div
                    key={`${activity.type}-${index}`}
                    className="rounded-xl border border-gray-100 bg-gray-50 p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm font-medium capitalize text-gray-900">
                        {activity.type.replace(/_/g, " ")}
                      </p>
                      <p className="text-sm text-gray-500">{activity.daysAgo} days ago</p>
                    </div>
                    <p className="mt-2 text-sm text-gray-700">{activity.note}</p>
                  </div>
                ))
              ) : (
                <p className="mt-4 text-sm text-gray-500">No recent activity found.</p>
              )}
            </div>
          </section>

          <aside className="space-y-8">
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">AI Reasoning</h2>
              <p className="mt-4 text-sm leading-6 text-gray-700">{insight.reasoning}</p>

              {"angle" in insight && insight.angle ? (
                <div className="mt-4 rounded-xl bg-gray-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Suggested angle
                  </p>
                  <p className="mt-1 text-sm text-gray-900">{insight.angle}</p>
                </div>
              ) : null}
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">Suggested Email</h2>
              <div className="mt-4 rounded-xl bg-gray-50 p-4">
                <pre className="whitespace-pre-wrap text-sm leading-6 text-gray-800">
                  {insight.email}
                </pre>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800">
                  Approve
                </button>
                <button className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                  Regenerate
                </button>
                <button className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                  Push to nurture
                </button>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
