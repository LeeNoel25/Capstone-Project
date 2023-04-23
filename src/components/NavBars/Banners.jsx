import SephoraIcon from "../SephoraIcon";

export default function () {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <div>
        <img src="https://i.imgur.com/lhaMADj.jpg" alt="Banner Image 1"></img>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            height: 95,
          }}
        >
          <SephoraIcon />
          <img src="https://i.imgur.com/d3tmwL3.png" alt="Banner Image 2"></img>
        </div>
      </div>
    </div>
  );
}
