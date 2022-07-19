import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type NotasMetaData = {
  readOnlyFields: 'updatedAt';
}

type NoteMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class User {
  readonly id: string;
  readonly name?: string | null;
  readonly username?: string | null;
  readonly Notas?: (Notas | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class Notas {
  readonly id: string;
  readonly createdAt: string;
  readonly titulo?: string | null;
  readonly subtitulo?: string | null;
  readonly userID: string;
  readonly User?: User | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Notas, NotasMetaData>);
  static copyOf(source: Notas, mutator: (draft: MutableModel<Notas, NotasMetaData>) => MutableModel<Notas, NotasMetaData> | void): Notas;
}

export declare class Note {
  readonly id: string;
  readonly title?: string | null;
  readonly subtitle?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Note, NoteMetaData>);
  static copyOf(source: Note, mutator: (draft: MutableModel<Note, NoteMetaData>) => MutableModel<Note, NoteMetaData> | void): Note;
}