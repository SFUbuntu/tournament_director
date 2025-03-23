// 🔧 FIXED AND ENHANCED VERSION: Includes language selector and email report form
import { useEffect, useState } from "react";
import emailjs from "emailjs-com";

const translations = {
  en: {
    pairingSheets: "Printable Pairing Sheets",
    usePrint: "Use this to print the pairings per group so players know who they're facing.",
    printRoster: "Print Player Roster",
    exportExcel: "Export to Excel",
    exportWord: "Export to Word",
    exportRoundResults: "Export Round Results to Word",
    exportFinalStandings: "Export Final Standings",
    playerRoster: "Player Roster",
    finalStandings: "Final Standings",
    sendReport: "Send Report by Email",
    enterEmail: "Enter recipient email",
    selectReport: "Select report to send",
    send: "Send Report"
  },
  es: {
    pairingSheets: "Hojas de Pareo Imprimibles",
    usePrint: "Usa esto para imprimir los pareos por grupo para que los jugadores sepan con quién juegan.",
    printRoster: "Imprimir Lista de Jugadores",
    exportExcel: "Exportar a Excel",
    exportWord: "Exportar a Word",
    exportRoundResults: "Exportar Resultados por Ronda a Word",
    exportFinalStandings: "Exportar Clasificación Final",
    playerRoster: "Lista de Jugadores",
    finalStandings: "Clasificación Final",
    sendReport: "Enviar Reporte por Correo",
    enterEmail: "Ingresa el correo del destinatario",
    selectReport: "Selecciona el reporte a enviar",
    send: "Enviar Reporte"
  }
};

const getLang = () => localStorage.getItem("lang") || "en";
const setLang = (lang) => localStorage.setItem("lang", lang);
const t = (key) => translations[getLang()][key] || key;

const LanguageSelector = () => (
  <div className="absolute top-2 right-4 space-x-2 print:hidden">
    {Object.keys(translations).map((lang) => (
      <button
        key={lang}
        className="text-sm underline"
        onClick={() => {
          setLang(lang);
          window.location.reload();
        }}
      >
        {lang.toUpperCase()}
      </button>
    ))}
  </div>
);

const EmailReportForm = ({ tournamentName = "USCF Tournament" }) => {
  const [email, setEmail] = useState("");
  const [reportType, setReportType] = useState("standings");

  const sendReport = async (e) => {
    e.preventDefault();
    const content = `Report for ${tournamentName} - Type: ${reportType}`;
    const base64 = btoa(unescape(encodeURIComponent(content)));

    await emailjs.send("service_l79hb7y", "template_chess", {
      to_email: email,
      message: content,
      attachment: {
        content: base64,
        filename: `${reportType}.txt`,
        type: "text/plain"
      }
    }, "CN0GcgmddDXj8pXWE");

    alert("Report sent successfully to " + email);
  };

  return (
    <form onSubmit={sendReport} className="p-4 space-y-2 max-w-md">
      <h2 className="text-xl font-semibold">{t("sendReport")}</h2>
      <input
        type="email"
        name="to_email"
        placeholder={t("enterEmail")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full border px-3 py-2 rounded shadow"
      />
      <select
        name="report_type"
        value={reportType}
        onChange={(e) => setReportType(e.target.value)}
        className="w-full border px-3 py-2 rounded shadow"
      >
        <option value="standings">Final Standings</option>
        <option value="roster">Player Roster</option>
        <option value="pairings">Pairing Sheets</option>
        <option value="results">Round Results</option>
      </select>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {t("send")}
      </button>
    </form>
  );
};

export { LanguageSelector, EmailReportForm };
