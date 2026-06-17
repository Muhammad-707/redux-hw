import { atom } from "jotai";
import { atomWithRefresh, loadable } from "jotai/utils";
import axios from "axios";

const api = "https://to-dos-api.softclub.tj/api/to-dos";

export const getDataAtom = atomWithRefresh(async () => {
    try {
        const { data } = await axios.get(api);
        return data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
});

export const addDataAtom = atom(null, async (get, set, todo: any) => {
    try {
        await axios.post(api, {
            Name: todo.name,
            Description: todo.description,
            Images: todo.image || new Blob([])
        }, { 
            headers: { "Content-Type": "multipart/form-data" } 
        });
        
        set(getDataAtom);
    } catch (error) {
        console.error(error);
    }
});

export const editDataAtom = atom(null, async (get, set, todo: any) => {
    try {
        await axios.put(api, todo);
        set(getDataAtom);
    } catch (error) {
        console.error(error);
    }
});

export const deleteDataAtom = atom(null, async (get, set, id: number) => {
    try {
        await axios.delete(`${api}?id=${id}`);
        set(getDataAtom);
    } catch (error) {
        console.error(error);
    }
});

export const getLoadableAtom = loadable(getDataAtom);