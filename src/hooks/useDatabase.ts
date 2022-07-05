import { useEffect, useState } from "react";

export type Subject = {
  name: string;
  hours: number;
  completed: boolean;
  score: number | null;
};

type UpdateSubject = {
  name?: string;
  hours?: number;
  completed?: boolean;
  score?: number | null;
};

type db = {
  name: string,
  subjects: Subject[]
}

export function useDatabase() {
  const [initiated, setInitiated] = useState(false)
  const [state, setState] = useState<db>({name: "Nombre de tu carrera", subjects: []});

  useEffect(()=> {
    const nameFromLocalStorage = localStorage.getItem("name")
    const subjectsFromLocalStorage = JSON.parse(localStorage.getItem("subjects") || "[]")

    if(!nameFromLocalStorage) localStorage.setItem("name", state.name)
    if(!subjectsFromLocalStorage) localStorage.setItem("subjects", JSON.stringify(state.subjects))

    setState({name: nameFromLocalStorage || "", subjects: subjectsFromLocalStorage || []})
    setInitiated(true)
    //eslint-disable-next-line
  },[]) 

  useEffect(()=>{
    if(!initiated) return
    localStorage.setItem("name", state.name)
    //eslint-disable-next-line
  }, [state.name])

  useEffect(()=>{
    if(!initiated) return
    localStorage.setItem("subjects", JSON.stringify(state.subjects))
    //eslint-disable-next-line
  }, [state.subjects])

  const setName = (name: string) => {
    setState({...state, name})
  }

  const addSubject = (name: string, hours: number) =>{
    const subjectsCopy: Subject[] = JSON.parse(JSON.stringify(state.subjects))
    subjectsCopy.push({name, hours, completed:false, score: null})
    setState({...state, subjects: subjectsCopy})
  }

  const deleteSubject = (i: number) =>{
    const subjectsCopy = JSON.parse(JSON.stringify(state.subjects))
    subjectsCopy.splice(i, 1)
    setState({...state, subjects: subjectsCopy})
  }

  const updateSubject = (i: number, data: UpdateSubject) => {
    const subjectsCopy = JSON.parse(JSON.stringify(state.subjects))
    subjectsCopy[i] = {...subjectsCopy[i], ...data}
    setState({...state, subjects: subjectsCopy})
  }

  const uploadSubject = (subjects: Subject[]) => {
    setState({...state, subjects})
  }

  return {...state, setName, addSubject, deleteSubject, updateSubject, uploadSubject}
}