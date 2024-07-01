import Program from "./programModel";
import Coordonnee from "./coordonneeModel";

export default class School {
    id: number;
    name: string;
    coordonnee?: Coordonnee;
    numberOfStudents?: number;
    numberOfTeachers?: number;
    typeSecteur?: string;
    levels?: string[];
    establishedYear?: number;
    programs?: Program[];
    openingDecree?: string;

    constructor(
        name: string,
        id?: number,
        coordonnee?: Coordonnee,
        numberOfStudents?: number,
        numberOfTeachers?: number,
        typeSecteur?: string,
        levels?: string[],
        establishedYear?: number,
        programs?: Program[],
        openingDecree?: string
    ) {
        this.name = name;
        this.id = id || 0; // Default value or undefined if not provided
        this.coordonnee = coordonnee;
        this.numberOfStudents = numberOfStudents;
        this.numberOfTeachers = numberOfTeachers;
        this.typeSecteur = typeSecteur;
        this.levels = levels;
        this.establishedYear = establishedYear;
        this.programs = programs;
        this.openingDecree = openingDecree;
    }
}
