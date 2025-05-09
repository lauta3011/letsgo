import { Typography } from "@material-tailwind/react";

const logos = [
  "oktana",
  "habitue",
  "mosca",
  "globant",
];

export function LogoSectionOne() {
  return (
    <section className="py-8 px-8 lg:py-20">
      <div className="container mx-auto text-center">
        <Typography
          color="blue-gray"
          className="text-xl font-extrabold mb-8"
        >
          Worked on these companies
        </Typography>
        <div className="flex flex-wrap items-center justify-around gap-8">
          {logos.map((logo, key) => (
            <img
              key={key}
              src={`logos/${logo}-logo.png`}
              alt="logo"
              className="w-40 grayscale"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default LogoSectionOne;
