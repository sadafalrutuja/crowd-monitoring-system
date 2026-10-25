export const templeZones = [
  {
    id: "samadhi-temple",
    name: "Samadhi Temple",
    icon: "🛕",
    cameraId: "CAM-01",
    people: 245,
    capacity: 300,

    guard: {
      id: "GRD-101",
      name: "Guard 01",
      shift: "Morning",
      availability: "On Duty",
      phone: "Not configured",
    },

    device: {
      id: "LORA-01",
      type: "LoRa Guard Alert",
      connection: "Demo Connected",
      battery: 92,
      lastAlert: "No live alert data",
    },
  },

  {
    id: "chavdi",
    name: "Chavdi",
    icon: "🏛️",
    cameraId: "CAM-02",
    people: 65,
    capacity: 200,

    guard: {
      id: "GRD-102",
      name: "Guard 02",
      shift: "Morning",
      availability: "On Duty",
      phone: "Not configured",
    },

    device: {
      id: "LORA-02",
      type: "LoRa Guard Alert",
      connection: "Demo Connected",
      battery: 85,
      lastAlert: "No live alert data",
    },
  },

  {
    id: "dwarkamai",
    name: "Dwarkamai",
    icon: "🪔",
    cameraId: "CAM-03",
    people: 120,
    capacity: 250,

    guard: {
      id: "GRD-103",
      name: "Guard 03",
      shift: "Afternoon",
      availability: "On Duty",
      phone: "Not configured",
    },

    device: {
      id: "LORA-03",
      type: "LoRa Guard Alert",
      connection: "Demo Connected",
      battery: 78,
      lastAlert: "No live alert data",
    },
  },

  {
    id: "gurusthan",
    name: "Gurusthan",
    icon: "🌳",
    cameraId: "CAM-04",
    people: 85,
    capacity: 200,

    guard: {
      id: "GRD-104",
      name: "Guard 04",
      shift: "Morning",
      availability: "On Duty",
      phone: "Not configured",
    },

    device: {
      id: "LORA-04",
      type: "LoRa Guard Alert",
      connection: "Demo Connected",
      battery: 88,
      lastAlert: "No live alert data",
    },
  },

  {
    id: "lendi-baug",
    name: "Lendi Baug",
    icon: "🌿",
    cameraId: "CAM-05",
    people: 145,
    capacity: 250,

    guard: {
      id: "GRD-105",
      name: "Guard 05",
      shift: "Afternoon",
      availability: "On Duty",
      phone: "Not configured",
    },

    device: {
      id: "LORA-05",
      type: "LoRa Guard Alert",
      connection: "Demo Connected",
      battery: 75,
      lastAlert: "No live alert data",
    },
  },

  {
    id: "buti-wada",
    name: "Buti Wada",
    icon: "🛕",
    cameraId: "CAM-06",
    people: 95,
    capacity: 200,

    guard: {
      id: "GRD-106",
      name: "Guard 06",
      shift: "Morning",
      availability: "On Duty",
      phone: "Not configured",
    },

    device: {
      id: "LORA-06",
      type: "LoRa Guard Alert",
      connection: "Demo Connected",
      battery: 90,
      lastAlert: "No live alert data",
    },
  },

  {
    id: "shani-mandir",
    name: "Shani Mandir",
    icon: "🙏",
    cameraId: "CAM-07",
    people: 175,
    capacity: 220,

    guard: {
      id: "GRD-107",
      name: "Guard 07",
      shift: "Afternoon",
      availability: "On Duty",
      phone: "Not configured",
    },

    device: {
      id: "LORA-07",
      type: "LoRa Guard Alert",
      connection: "Demo Connected",
      battery: 82,
      lastAlert: "No live alert data",
    },
  },

  {
    id: "hanuman-mandir",
    name: "Hanuman Mandir",
    icon: "🚩",
    cameraId: "CAM-08",
    people: 55,
    capacity: 180,

    guard: {
      id: "GRD-108",
      name: "Guard 08",
      shift: "Morning",
      availability: "On Duty",
      phone: "Not configured",
    },

    device: {
      id: "LORA-08",
      type: "LoRa Guard Alert",
      connection: "Demo Connected",
      battery: 95,
      lastAlert: "No live alert data",
    },
  },
];

export function getCrowdStatus(zone) {
  const percentage = (zone.people / zone.capacity) * 100;

  if (percentage >= 70) return "High";
  if (percentage >= 40) return "Medium";

  return "Low";
}

export function getOccupancy(zone) {
  return Math.round((zone.people / zone.capacity) * 100);
}