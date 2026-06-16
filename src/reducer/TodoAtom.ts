import { atom } from "jotai";
import { atomWithRefresh, loadable } from "jotai/utils";
import axios from "axios";

const api = "https://to-dos-api.softclub.tj/api/to-dos";

export const getDataAtom = atomWithRefresh(async () => {
    try {
        let { data } = await axios.get(api);
        return data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
});

export const addDataAtom = atom(null, async (get, set, newTodo: { name: string; description: string; image: File | null }) => {
    try {
        const formData = new FormData();
        formData.append("Name", newTodo.name);
        formData.append("Description", newTodo.description);
        
        if (newTodo.image) {
            formData.append("Images", newTodo.image);
        } else {
            formData.append("Images", new Blob([]), "default.png");
        }

        await axios.post(api, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        set(getDataAtom);
    } catch (error) {
        console.error(error);
    }
});

export const editDataAtom = atom(null, async (get, set, updatedTodo: { id: number; name: string; description: string }) => {
    try {
        await axios.put(api, updatedTodo, {
            headers: { "Content-Type": "application/json" }
        });
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