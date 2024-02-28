import { Location } from './location.js';

const location_base_title = "Test Name";
const location_base_description = "A place of imagination.";
const location_base_resources = [
    { name: "Fiber", quantity: 20 },
    { name: "Sticks", quantity: 20 },
    { name: "Stones", quantity: 20 },
    { name: "Berries", quantity: 20 },
    { name: "Herbs", quantity: 20 },
    { name: "Water", quantity: 20 },
];
const location_base_flags = [
    { name: "isDiscovered", value: true },
    { name: "isUnlocked", value: true },
];
export const location_base = new Location(
    location_base_title,
    location_base_description,
    {
        resources: location_base_resources,
        flags: location_base_flags,
    },
  );