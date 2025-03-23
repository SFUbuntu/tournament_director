import React from "react";
import { LanguageSelector, EmailReportForm } from "./components";

const App = () => {
  return (
    <div className="p-6">
      <LanguageSelector />
      <EmailReportForm tournamentName="USCF Tournament" />
    </div>
  );
};

export default App;