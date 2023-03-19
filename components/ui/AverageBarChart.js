import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export default function AverageBarChart({ data, average }) {
  const dataFormatter = (number) => {
    return Intl.NumberFormat("us").format(number).toString();
  };

  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <BarChart data={data} stackOffset={"none"} layout={"horizontal"}>
        <CartesianGrid
          strokeDasharray={"3 3"}
          horizontal={true}
          vertical={false}
          stroke={"#475569"}
        />
        <XAxis
          dataKey={"name"}
          interval={"preserveStartEnd"}
          tick={{ transform: "translate(0, 6)" }}
          style={{ fontSize: "12px", marginTop: "20px" }}
          stroke={"#cbd5e1"}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          width={48}
          axisLine={false}
          tickLine={false}
          domain={[0, "auto"]}
          type={"number"}
          tick={{ transform: "translate(-3, 0)" }}
          style={{ fontSize: "12px" }}
          stroke={"#cbd5e1"}
          tickFormatter={dataFormatter}
        />
        {["Weight"].map((cat) => (
          <Bar
            maxBarSize={56}
            key={cat}
            name={cat}
            type={"linear"}
            dataKey={cat}
            fill={"#cbd5e1"}
            isAnimationActive={true}
          />
        ))}
        <ReferenceLine y={average} stroke={"#d946ef"} strokeWidth={2} />
      </BarChart>
    </ResponsiveContainer>
  );
}
