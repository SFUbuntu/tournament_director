import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const generateTournamentExcel = (tournamentData, playerData) => {
  // Create "Tournament Info" sheet
  const tournamentInfoWS = XLSX.utils.aoa_to_sheet([
    ["Tournament Name:", tournamentData.name],
    ["Number of Rounds:", tournamentData.rounds],
    ["Tournament Type:", tournamentData.type]
  ]);

  // Create "Player Roster" sheet
  const playerRosterHeader = ["Name", "USCF ID"];
  const playerRosterData = playerData.map(player => [player.name, player.uscfId]);
  const playerRosterWS = XLSX.utils.aoa_to_sheet([playerRosterHeader, ...playerRosterData]);

  // Create a new workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, tournamentInfoWS, "Tournament Info");
  XLSX.utils.book_append_sheet(wb, playerRosterWS, "Player Roster");

  // Generate Excel file and trigger download
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });

  // Sanitize filename
  const safeFilename = (tournamentData.name || "Tournament_Setup").replace(/[^a-z0-9_.-]/gi, '_') + '.xlsx';
  saveAs(data, safeFilename);
};
