//Tab Navigation
const sidebarButtons = document.querySelectorAll(".sidebar-btn");
const tabContents = document.querySelectorAll(".tab-content");
sidebarButtons.forEach(sidebarButton => {
    sidebarButton.addEventListener("click", () => {
        sidebarButtons.forEach(sidebarBtn => sidebarBtn.classList.remove("active"));
        tabContents.forEach(tabContent => tabContent.classList.remove("active"));
        sidebarButton.classList.add("active");
        document.getElementById(sidebarButton.dataset.tab)
            .classList.add("active");
    });
});

// Tab 1

function getNum(id) {
    const isNum = document.getElementById(id);
    return Number(isNum.value ?? isNum.textContent) || 0;
}

function updateStation(prefix) {
    document.getElementById(`${prefix}-earning_estimates`).textContent =
        getNum(`${prefix}-earning_efficiency`) * (100 + getNum(`${prefix}-bonus_earning_chance`)) / 100;
}

const regions = {
    "valley4_ov": ["refugee_camp", "infra_station", "reconstruction_hq"],
    "wuling_ov": ["sky_king_flats_construction_site"]
}

function updateRegion(regionId) {
    regions[regionId].forEach(updateStation);
    document.getElementById(`${regionId}-earning_estimates`).textContent =
        regions[regionId].reduce((sum, p) => sum + getNum(`${p}-earning_estimates`), 0);
}

document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", function() {
        const prefix = this.id.split("-")[0];

        for (const regionId in regions) {
            if (regions[regionId].includes(prefix)) {
                updateRegion(regionId);
                break;
            }
        }
    });
});

for (const regionId in regions) updateRegion(regionId)

// Tab 2 // Valley IV

function updateFactory