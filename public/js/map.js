const mythData = {
  olympus: {
    name: "Mount Olympus",
    myth: "Home of the Olympian gods, ruled by Zeus."
  },
  delphi: {
    name: "Delphi",
    myth: "Sacred site of Apollo’s oracle and divine prophecy."
  },
  crete: {
    name: "Crete",
    myth: "Island of King Minos and the fearsome Minotaur."
  },
  troy: {
    name: "Troy",
    myth: "The legendary city at the center of the Trojan War, a major conflict involving gods and heroes like Achilles and Hector."
  },
  athens: {
    name: "Athens",
    myth: "City dedicated to Athena, goddess of wisdom and warfare."
  },
  ithaca: {
    name: "Ithaca",
    myth: "Home of Odysseus, famed for his long journey in the Odyssey."
  },
  sparta: {
    name: "Sparta",
    myth: "Renowned for its military prowess and the legendary Battle of Thermopylae."
  }, 
  olympia: {
    name: "Olympia",
    myth: "Site of the ancient Olympic Games, honoring Zeus."
  }
};

 function showInfo(place) {
    const box = document.getElementById('info-box');
    const data = mythData[place];
    box.innerHTML = `<h2>${data.name}</h2><p>${data.myth}</p>`;
    box.style.display = "block";
 }
 function hideInfo() {
    const box = document.getElementById('info-box');
    box.style.display = "none";
 }