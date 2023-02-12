import { writable } from "svelte/store";
import type { IFolder } from "../models/models";

export const folders = writable<IFolder[]>([]);