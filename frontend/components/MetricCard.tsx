type Props = {
  title: string;
  value: string;
};

export default function MetricCard({
  title,
  value,
}: Props) {
  return (
    <div className="bg-slate-900 p-6 rounded-xl shadow-lg">

      <h3 className="text-slate-400">
        {title}
      </h3>

      <p className="text-4xl font-bold mt-3">
        {value}
      </p>

    </div>
  );
}
