import React from "react";
import {
  Typography,
} from "@material-tailwind/react";
import ThemeProvider from "../theme-provider";

export function LanguagePresentation() {
 
  return (
    <ThemeProvider>
      <div className="h-full w-screen place-items-center bg-white py-20">
        <div className="container mx-auto grid items-center relative lg:grid-cols-2">
          
          <div className="mb-8 lg:text-start text-center">
            <Typography
              color="blue"
              className="flex justify-center items-center lg:justify-start font-bold text-lg mb-5"
            >
              Programing languages
            </Typography>

            <Typography
              variant="h2"
              color="blue-gray"
              className="mb-4 leading-tight"
            >
              Javascript, Typescript & NodeJs
            </Typography>
            <Typography color="blue-gray" className="lg:pr-32">
              Since the beggining of my career I've been using Javascript, learned NodeJs after moving on from C# in order to have a full JS ecosystem. Adding Typescript to this knowdledge is the cherry on the cake.
            </Typography>
          </div>
          <img src="ts-js.jpg" alt="typescriot and javascript" className=" mx-auto hidden md:flex" />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default LanguagePresentation;
