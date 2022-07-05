import { Layout } from "@/components/layout";
import { PlusIcon, TrashIcon } from "@heroicons/react/solid";
import type { NextPage } from "next";
import { useState } from "react";
import { useDatabase } from "src/hooks/useDatabase";

const Degree: NextPage = () => {
  const { name, subjects, deleteSubject, setName, addSubject } = useDatabase();
  const [subName, setSubName] = useState("");
  const [hours, setHours] = useState<number | null>(null);

  return (
    <Layout
      title="Como va la facu?"
      desc=""
      className="prose-sm w-full sm:prose sm:max-w-none"
    >
      <div className="form-control">
        <label className="label">
          <span className="label-text text-lg">Nombre de tu carrera</span>
        </label>
        <label className="input-group">
          <span>Carrera</span>
          <input
            type="text"
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>

      <div className="overflow-x-auto">
        <h2>Materias:</h2>

        <h3>Agregar materia:</h3>
        <div className="mt-12 flex items-end justify-between">
          <div className="form-control  mr-5 flex-grow">
            <label className="label">
              <span className="text-md label-text">Nombre de la materia</span>
            </label>
            <label className="input-group">
              <span>Nombre</span>
              <input
                type="text"
                className="input input-bordered w-full"
                value={subName}
                onChange={(e) => setSubName(e.target.value)}
              />
            </label>
          </div>

          <div className="form-control mr-5 ">
            <label className="label">
              <span className="text-md label-text">Cantidad de horas</span>
            </label>
            <label className="input-group">
              <span>Horas</span>
              <input
                type="text"
                className="input input-bordered w-full"
                value={hours || ""}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (isNaN(value) && e.target.value !== "") return;
                  setHours(value);
                }}
              />
            </label>
          </div>

          <button
            onClick={() => {
              addSubject(subName, hours ?? 0);
              setSubName("");
              setHours(null);
            }}
            disabled={!subName || !hours}
            className="btn btn-success mr-5"
          >
            <PlusIcon className="h-5 w-5 text-white" />
          </button>
        </div>

        <table className="table-zebra table w-full">
          <thead>
            <tr>
              <th />
              <th>Materia</th>
              <th>Horas</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, i) => (
              <tr key={subject.name}>
                <th>{i + 1}</th>
                <td>{subject.name}</td>
                <td>{subject.hours}</td>
                <td>
                  <button
                    onClick={() => deleteSubject(i)}
                    className="btn btn-error"
                  >
                    <TrashIcon className="h-5 w-5 text-white" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Degree;
