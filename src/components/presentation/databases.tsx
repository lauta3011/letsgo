import React from "react";
import {
  Typography
} from "@material-tailwind/react";
import ThemeProvider from "../theme-provider";

export function DatabasePresentation() {
 
  return (
    <ThemeProvider>
      <div className="h-full w-screen place-items-center bg-white px-8 py-8">
        <div className="container mx-auto grid items-center relative lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <Typography
              color="blue"
              className="flex items-center justify-center lg:justify-start font-bold text-lg mb-5"
            >
              Database handling
            </Typography>

            <Typography
              variant="h2"
              color="blue-gray"
              className="mb-8 leading-tight"
            >
              From SQL to Serverless
            </Typography>
            <Typography color="blue-gray" className="lg:pr-20">
              Been using relational-databases from the beggining of my career (SQL) but certain freelance jobs I've done needed a serverless structure so I learned how to work with Firebase at first, now Supabase is my way to go when serverless is needed.
            </Typography>
          </div>
          <img src="code.png" alt="iphone" className="max-w-2xl rounded-3xl hidden md:flex mx-auto" />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default DatabasePresentation;
