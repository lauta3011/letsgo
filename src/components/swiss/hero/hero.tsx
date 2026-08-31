import React from "react";
import SplitText from "../../../utils/split-text";

export function Hero() {
  return (
    <section className="min-h-screen w-full text-swiss-lime">
      <div className="min-h-screen ">


        <div className="grid grid-cols-6 gap-4 ">
            <div className="max-w-5xl self-center col-span-6 md:col-span-4 px-8 ">
              <h2 className="font-light py-8 text-xl">Lautaro Rodriguez Juarez</h2>
              <SplitText text="SOFTWARE" tag="h1" className="text-4xl md:text-9xl font-bold flex w-full justify-between" />
              <SplitText text="DEV" tag="h1" className="sm:text-4xl  md:text-9xl font-extrabold flex w-full justify-between" />

            </div>

            <div className="col-span-6 md:col-span-2" >
              <div className="w-2/4 justify-self-end flex-col px-8 py-64">
                <SplitText text="SINCE" tag="span" className="text-4xl font-bold flex w-full justify-between"/>
                <SplitText text="2019" tag="span" className="flex w-full justify-between"/>
              </div>
            </div>
          
        </div>
      </div>
    </section>
  );
}

export default Hero;
