import React from "react";
import { Helmet } from "react-helmet";

const MetaData = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  );
};

MetaData.defaultProps = {
  title: "Impresso Espresso",
  description: "Curated Coffee Products",
  keywords: "coffee, espresso, barista, beans, chocolate, machine",
};

export default MetaData;
