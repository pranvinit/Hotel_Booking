import "./mailList.scss";
import { useState } from "react";

export default function MailList() {
  const [subscribe, setSubscribe] = useState(false);
  const [mail, setMail] = useState("");

  const handleSubscribe = () => {
    if (!mail) return;
    if (!mail.includes("@")) return;
    setSubscribe(true);
    setMail("");
  };

  return (
    <div className="mail">
      <h1 className="mailTitle">Save time, save money!</h1>
      <span className="mailDesc">
        Sign up and we'll send the best deals to you
      </span>
      <div className="mailInputContainer">
        <input
          value={mail}
          onChange={({ target }) => setMail(target.value)}
          type="email"
          placeholder="Your Email"
        />
        <button onClick={handleSubscribe} disabled={subscribe}>
          {!subscribe ? "Subscribe" : "Subscribed"}
        </button>
      </div>
    </div>
  );
}
