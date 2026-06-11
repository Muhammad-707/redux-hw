import { atom } from "jotai"

export const dataAtom = atom([
  { id: 1, name: "Idris", job: "BOT" },
  { id: 2, name: "Muhammad", job: "DOCTOR" },
])

export const deleteItemDataAtom = atom(null, (get, set, id: number) => {
  set(dataAtom, get(dataAtom).filter((e) => e.id != id))
})

export const addItemDataAtom = atom(null, (get, set, newItem: { name: string; job: string }) => {
  set(dataAtom, [...get(dataAtom), { id: Date.now(), ...newItem }])
})

export const updateItemDataAtom = atom(null, (get, set, updatedItem: { id: number; name: string; job: string }) => {
  set(dataAtom, get(dataAtom).map((e) => e.id === updatedItem.id ? updatedItem : e))
})