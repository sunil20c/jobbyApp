const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "cricketTeam.db");

const app = express();
app.use(express.json());
let db = null;

const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

const convertDbObjectToResponseObject = (dbObject) => {
  return {
    playerId: dbObject.player_id,
    playerName: dbObject.playerName,
    jerseyNumber: dbObject.jerseyNumber,
    role: dbObject.role,
  };
};

//Get all players list
app.get("/players/", async (request, response) => {
  const getPlayersList = `
        SELECT * FROM cricket_team;`;

  const arrayList = await db.all(getPlayersList);
  response.send(
    arrayList.map((eachPlayer) => convertDbObjectToResponseObject(eachPlayer))
  );
});

//SELECT by specific ID
app.get("/players/:playerId)", async (request, response) => {
  const { player_Id } = request.params;
  const getPlayer = `
    SELECT * FROM cricket_team WHERE 
    player_id = ${player_Id};`;
  const arrayList = await db.get(getPlayer);
  response.send(convertDbObjectToResponseObject(arrayList));
});

//Adding new players
app.post("/players/", async (request, response) => {
  const { playerName, jerseyNumber, role } = request.body;
  const addedList = `INSERT INTO cricket_team 
    (playerName, jerseyNumber, role)
    VALUES (${playerName} ,${jerseyNumber}, ${role})`;

  await db.run(addedList);
  response.send("Player Added to  Team");
});

//Update API
app.put("/players/:player_Id", async (request, response) => {
  const { player_Id } = request.params;
  const playerDetails = request.body;

  const { playerName, jerseyNumber, role } = playerDetails;
  const updatedPlayer = `
    UPDATE cricket_team 
    SET 
        playerName = ${playerName},
        jerseyNumber = ${jerseyNumber},
        role = ${role} 
    WHERE 
        player_id = ${player_Id}`;

  await db.run(updatedPlayer);
  response.send("player details updated");
});

//DELETE API
app.delete("/players/:player_Id", async (request, response) => {
  const { player_Id } = request.params;
  const deletePlayer = `
  DELETE FROM 
    cricket_team 
    WHERE 
    player_id = ${player_Id};`;

  await db.run(deletePlayer);
  response.send("Player Removed");
});

module.exports = app;
