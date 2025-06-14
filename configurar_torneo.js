document.addEventListener("DOMContentLoaded", function () {
    const addTeamBtn = document.getElementById("addTeamBtn");
    const teamNameInput = document.getElementById("teamName");
    const teamsTableBody = document.getElementById("teamsTable").querySelector("tbody");
    let teamCounter = 1;
    let teams = [];

    // Función para agregar un equipo a la lista y la tabla
    function addTeam() {
        const teamName = teamNameInput.value.trim();
        if (teamName === "") {
            alert("Por favor, ingresa un nombre para el equipo.");
            return;
        }
        
        // Convertir la primera letra a mayúscula
        const formattedTeamName = teamName.charAt(0).toUpperCase() + teamName.slice(1).toLowerCase();
        teams.push(formattedTeamName);

        const newRow = document.createElement("tr");
        const numberCell = document.createElement("td");
        numberCell.textContent = teamCounter;
        const nameCell = document.createElement("td");
        nameCell.textContent = formattedTeamName;
        const deleteCell = document.createElement("td");
        
        // Crear el botón de eliminar
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'; // Icono de tacho de basura
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", function() {
            teams.splice(teams.indexOf(formattedTeamName), 1);
            newRow.remove();
            updateTeamCounter();
        });

        deleteCell.appendChild(deleteBtn);
        newRow.appendChild(numberCell);
        newRow.appendChild(nameCell);
        newRow.appendChild(deleteCell);
        teamsTableBody.appendChild(newRow);

        teamCounter++;
        teamNameInput.value = "";

        // Guardar equipos en localStorage
        localStorage.setItem("teams", JSON.stringify(teams));
    }

    // Función para actualizar el contador de equipos
    function updateTeamCounter() {
        const rows = teamsTableBody.querySelectorAll("tr");
        teamCounter = rows.length + 1; // Reajustar el contador de equipos
        rows.forEach((row, index) => {
            row.querySelector("td").textContent = index + 1; // Actualizar los números de fila
        });

        // Guardar equipos en localStorage
        localStorage.setItem("teams", JSON.stringify(teams));
    }

    // Guardar datos del torneo en localStorage
    document.getElementById("saveTournamentBtn").addEventListener("click", function () {
        const tournamentName = document.getElementById("tournamentName").value;
        const tournamentDescription = document.getElementById("tournamentDescription").value;
        const tournamentFormat = document.querySelector('input[name="tournamentFormat"]:checked').value; // Obtener el formato seleccionado

        // Guardar los datos del torneo en localStorage
        localStorage.setItem("tournamentName", tournamentName);
        localStorage.setItem("tournamentDescription", tournamentDescription);
        localStorage.setItem("tournamentFormat", tournamentFormat);
        
        // Redirigir a Configurar Torneo 2
        window.location.href = "configurar_torneo_2.html";
    });

    // Eventos de botones
    addTeamBtn.addEventListener("click", addTeam);
});
