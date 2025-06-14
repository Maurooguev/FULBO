document.addEventListener("DOMContentLoaded", function () {
    // Obtener datos del torneo del localStorage
    const tournamentName = localStorage.getItem("tournamentName");
    const tournamentDescription = localStorage.getItem("tournamentDescription");
    const tournamentFormat = localStorage.getItem("tournamentFormat");
    const teams = JSON.parse(localStorage.getItem("teams")) || [];

    // Mostrar los datos del torneo
    document.getElementById("summaryTournamentName").textContent = tournamentName;
    document.getElementById("summaryTournamentDescription").textContent = tournamentDescription;
    document.getElementById("summaryTournamentFormat").textContent = tournamentFormat;

    // Mostrar equipos
    const teamsList = document.getElementById("teamsList");
    teams.forEach((team) => {
        const listItem = document.createElement("li");
        listItem.textContent = team;
        teamsList.appendChild(listItem);
    });

    // Generar calendario aleatorio
    document.getElementById("generateRandomCalendarBtn").addEventListener("click", function () {
        const calendarDisplay = document.getElementById("calendarDisplay");
        calendarDisplay.innerHTML = ""; // Limpiar el calendario anterior

        // Lógica para generar partidos
        const numTeams = teams.length;
        if (numTeams < 2) {
            alert("Se necesitan al menos 2 equipos para generar un calendario.");
            return;
        }

        // Generar el calendario
        const schedule = generateRoundRobinSchedule(teams);

        // Mezclar las fechas aleatoriamente
        shuffleArray(schedule);

        // Mostrar el calendario
        schedule.forEach((matches, dateIndex) => {
            const dateSection = document.createElement("div");
            dateSection.innerHTML = `<h4>Fecha ${dateIndex + 1}</h4>`;
            matches.forEach(match => {
                const matchDisplay = document.createElement("div");
                matchDisplay.textContent = `${match[0]} vs ${match[1]}`;
                dateSection.appendChild(matchDisplay);
            });
            calendarDisplay.appendChild(dateSection);
        });
    });

    // Función para generar el calendario Round Robin
    function generateRoundRobinSchedule(teams) {
        const schedule = [];
        const numTeams = teams.length;

        // Crear un array de fechas
        for (let i = 0; i < numTeams - 1; i++) {
            schedule[i] = [];
        }

        // Lógica de emparejamiento
        for (let round = 0; round < numTeams - 1; round++) {
            for (let match = 0; match < numTeams / 2; match++) {
                const home = (round + match) % (numTeams - 1);
                const away = (numTeams - 1 - match + round) % (numTeams - 1);

                if (match === 0) {
                    schedule[round].push([teams[home], teams[numTeams - 1]]);
                } else {
                    schedule[round].push([teams[home], teams[away]]);
                }
            }
        }

        return schedule;
    }

    // Función para mezclar un array aleatoriamente
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
});
