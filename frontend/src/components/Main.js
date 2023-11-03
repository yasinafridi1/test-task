import React from "react";

const Main = ({ children }) => {
  return (
    <section className="bg-gray-50">
      <div className="w-screen h-screen flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        {children}
      </div>
    </section>
  );
};

export default Main;
