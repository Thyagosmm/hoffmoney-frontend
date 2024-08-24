import React, { useEffect, useState } from "react";
import yahooFinance from "yahoo-finance2";

const Acoes = async () => {
  const queryOptions = { count: 5, region: "US", lang: "en-US" };
  const result = await yahooFinance.dailyGainers(queryOptions);
  return result;
};

export default Acoes;
