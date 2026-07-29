import React from "react";

const Wrapper = ({ className = "", children }) => {
  return (
    <section className={`${className} container mx-auto px-4 md:px-8  my-6 `}>
      {children}
    </section>
  );
};

export default Wrapper;
