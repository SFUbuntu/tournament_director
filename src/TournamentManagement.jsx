import React from 'react';
import { generateTournamentExcel } from './excelUtils'; // Import the utility function

const TournamentManagement = () => {
  const handleExportExcel = () => {
    // Sample data - this will eventually come from state/props managed by forms
    const tournamentData = {
      name: "Chess Club Championship 2024",
      rounds: 5,
      type: "Swiss System"
    };

    const playerData = [
      { name: "Alice Wonderland", uscfId: "12345678" },
      { name: "Bob The Builder", uscfId: "87654321" },
      { name: "Charlie Brown", uscfId: "11223344" },
      { name: "Diana Prince", uscfId: "55667788" }
    ];

    generateTournamentExcel(tournamentData, playerData);
  };

  return (
    <div style={{ margin: '1rem', padding: '1rem', border: '1px solid #ccc' }}>
      <h2>Tournament Management</h2>
      {/* Forms for tournament details and player info will go here */}
      <div style={{ marginTop: '1rem' }}>
        <button
          onClick={handleExportExcel}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Download Tournament Setup Sheet (Excel)
        </button>
      </div>
    </div>
  );
};

export default TournamentManagement;
