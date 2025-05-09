import {
  Typography,
} from "@material-tailwind/react";
import ThemeProvider from "../theme-provider";

export function FrameworksPresentation() {
 
  return (
    <ThemeProvider>
      <div className="h-full w-screen place-items-center bg-white px-8 py-8">
        <div className="container mx-auto grid items-center relative lg:grid-cols-2">
          <div className="hidden lg:flex">
            <img src="logos/reactsvelte-logo.png" alt="iphone" className="max-w-xl rounded-3xl mx-auto" />
          </div>
          
          <div className="text-center lg:text-left">
            <Typography
              color="blue"
              className="flex items-center justify-center lg:justify-start !font-bold text-lg mb-5"
            >
              Javascript Frameworks
            </Typography>

            <Typography
              variant="h2"
              color="blue-gray"
              className="mb-8 leading-tight"
            >
              React, ReactNative & SvelteKit
            </Typography>
            <Typography color="gray" className="lg:pr-20">
              At the heart of every web developer lies a JavaScript framework; in my case, React, which has been with me since the beginning. For the past year, Sveltekit has also been living rent-free in my heart, and so far, I'm very happy with it.
            </Typography>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default FrameworksPresentation;
