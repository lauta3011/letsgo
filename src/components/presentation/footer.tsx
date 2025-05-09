import React from "react";

const YEAR = new Date().getFullYear();

export function FooterPresentation() {
  return (
    <footer className="relative z-50 bg-white px-8 pt-12 pb-6">
      <hr className="my-6 border-blue-gray-50" />
      <div className="container justify-center flex mx-auto">
          <div className="text-center lg:text-left">
            <div className="text-md mt-2 py-1 font-normal text-gray-600">
              Copyright &copy; {YEAR}{" "}
              <a className="text-inherit transition-all">
                AstroLaunch UI
              </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterPresentation;
