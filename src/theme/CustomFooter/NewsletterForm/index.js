import clsx from "clsx";
import styles from "./styles.module.css";
import React, { useState } from "react";

export default function NewsletterForm() {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Stay tuned, ${name}—we haven't set up our newsletter, yet!`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Sign up for developer updates:</label>
      <div className="row row--no-gutters margin-top--sm">
        <div className="col margin-top--sm">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.formBoxInput}
          />
        </div>
        <div className="col margin-top--sm">
          <button
            type="submit"
            className={clsx("button button--secondary", styles.formBoxBtn)}
            onClick={handleSubmit}
          >
            Sign up
          </button>
        </div>
      </div>
    </form>
  );
}
