import Chat from "./chat/page";

export default function Home() {
  return (
    <div className="page-container">
      <h1>
        Chat G&T
        <img src="../assets/martini.png" />
      </h1>
      <p>What's to drink?</p>
      <Chat></Chat>
    </div>
  );
}
