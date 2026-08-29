import React from "react";

const logos = ["oktana", "habitue", "mosca", "globant"];

export function Logos() {
  return (
    <section className="w-screen text-swiss-lime">
      <div className="border-y border-swiss-plum">
        <h2 className="border-b border-swiss-plum px-6 py-4 text-xs uppercase tracking-widest">
          Worked on these companies
        </h2>
        <div className="grid grid-cols-2 divide-x divide-y divide-swiss-plum sm:grid-cols-4">
          {logos.map((logo) => (
            <div key={logo} className="flex items-center justify-center px-6 py-10">
              <img
                src={`logos/${logo}-logo.png`}
                alt={`${logo} logo`}
                className="w-32 grayscale invert opacity-80 sm:w-40"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Logos;
