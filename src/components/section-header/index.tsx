import React from "react";

type Props = {
  title: String;
  className?: String ;
};

const SectionHeader = (props: Props) => {
  return (
    <h1 className="text-4xl sticky top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg flex items-center border-b">
      {props.title}
    </h1>
  );
};

export default SectionHeader;
