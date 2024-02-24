const skillsList = ["React", "Node", "React-Native"];
const LocationList = [
  "Ahmedabad",
  "Bengaluru",
  "Bhopal",
  "Chennai",
  "Goa",
  "Gurugram",
  "Hyderabad",
  "Indore",
  "Jaipur",
  "Kochi",
  "Kolkata",
  "Lucknow",
  "Mumbai",
  "Nagpur",
  "Noida",
  "Pune",
];
export const profileFormList = [
  {
    id: "email",
    label: "Email",
    type: "email",
  },
  {
    id: "fullname",
    label: "Full Name",
    type: "text",
  },
  {
    id: "experience",
    label: "Total Year of Experience",
    type: "number",
  },
  {
    id: "baselocation",
    label: "Base Location",
    type: "dropdown",
    isMultiSelect: false,
    items: LocationList,
  },
  {
    id: "preferredlocation",
    label: "Preferred Location",
    type: "dropdown",
    isMultiSelect: false,
    items: LocationList,
  },
  {
    id: "skills",
    label: "Skills",
    type: "dropdown",
    isMultiSelect: true,
    items: skillsList,
  },
  {
    id: "openToWork",
    label: "open2Work",
    type: "checkbox",
  },
];
