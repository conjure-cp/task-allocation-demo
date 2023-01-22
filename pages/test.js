import useStickyState from "../utils/sticky-state-hook";

export default function Test() {
  const [c, setC, loading] = useStickyState(0, "counter");

  if (loading) {
    return <p>content loading</p>
  }

  return (
    <div>
      <p>count is currently {c}</p>
      <button className={"border"} onClick={() => setC(old => old + 1)}>inc</button>
    </div>
  );
}