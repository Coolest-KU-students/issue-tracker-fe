export const Importances = () => {
  return [
    { id: 1, name: "Critical" },
    { id: 2, name: "Very Important" },
    { id: 3, name: "Serious" },
    { id: 4, name: "Medium" },
    { id: 5, name: "Informational" },
  ];
};

export const ImportanceByID = (ID) => {
  return Importances()[ID - 1];
};
