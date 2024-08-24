// user.ts
import { Character } from './char';

interface Seasons {
    season: number;
    score: number;
    completed: boolean;
    correces: number;
    seasonName: string;
}

interface Status {
    level?: number | undefined;
    completed: boolean;
    score: number;
}

class User {
    name: string;
    char?: Character | string;
    userStatus?: Status | undefined;
    level: number

    constructor(name: string, char: Character | string, userStatus: Status | undefined, level: number) {
        this.name = name;
        this.char = char;
        this.userStatus = userStatus ;
        this.level = level;
    }

    setName(newName: string) {
        this.name = newName;
    }

    setChar(newChar: Character) {
        this.char = newChar;
    }

    setLevel(newLevel: number) {
        this.level = newLevel;
    }

    updateuserStatus(level: number, completed: boolean, score: number) {
        if (this.userStatus) {
            this.userStatus = { level, completed, score };
        } else {
            this.userStatus = { level, completed, score };
        }
    }
    getuserStatus() {
        return this.userStatus;
    }

    // Convert User instance to a plain object
    toPlainObject() {
        return {
            name: this.name,
            char: this.char,
            userStatus: this.userStatus,
            level: this.level,
        };
    }

    // Create a User instance from a plain object
    static fromPlainObject(obj: any) {
        return new User(obj.name, obj.char, obj.userStatus, obj.level);
    }
}

export {User, Status, Seasons};
