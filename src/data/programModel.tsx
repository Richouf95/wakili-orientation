export default interface formation {
  name: string;
  duration: number;
  description: string;
  degrees?: string[];
  opening: string[];
}

export default interface Program {
  authorizationDecree: string; // Authorization decree for the program
  formations: formation[];
}