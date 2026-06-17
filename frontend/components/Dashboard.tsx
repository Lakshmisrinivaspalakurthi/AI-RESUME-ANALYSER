import MetricCard from "./MetricCard";

export default function Dashboard() {

  return (

    <section className="max-w-7xl mx-auto p-8">

      <div className="grid md:grid-cols-4 gap-6">

        <MetricCard
          title="ATS Score"
          value="84%"
        />

        <MetricCard
          title="Skills Match"
          value="79%"
        />

        <MetricCard
          title="Resume Quality"
          value="91%"
        />

        <MetricCard
          title="Job Readiness"
          value="86%"
        />

      </div>

    </section>
  );
}
