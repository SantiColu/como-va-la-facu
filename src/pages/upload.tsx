import { Layout } from "@/components/layout";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useDatabase, Subject } from "src/hooks/useDatabase";

const Degree: NextPage = () => {
  const { subjects, uploadSubject } = useDatabase();
  const [json, setJson] = useState("");
  const [jsonValid, setJsonValid] = useState(false);

  useEffect(() => {
    setJson(JSON.stringify(subjects, null, 2));
    // eslint-disable-next-line
  }, [subjects]);

  useEffect(() => {
    if (!json || json === "") return setJsonValid(true);
    try {
      const _subjects: Subject[] = JSON.parse(json);
      // _subjects instanceof Subject[];
      setJsonValid(true);
    } catch (e) {
      setJsonValid(false);
    }
  }, [json]);

  return (
    <Layout
      title="Como va la facu?"
      desc=""
      className="prose-sm w-full sm:prose sm:max-w-none"
    >
      <div className="flex items-center justify-between">
        <h2>Subir materias como JSON</h2>
        <button
          onClick={() => {
            try {
              const _subjects: Subject[] = JSON.parse(json);
              uploadSubject(_subjects);
            } catch (e) {
              setJsonValid(false);
            }
          }}
          className="btn btn-success"
        >
          Guardar
        </button>
      </div>

      <textarea
        value={json}
        onChange={(e) => setJson(e.target.value)}
        className={`textare textarea-bordered h-screen w-full ${
          !jsonValid ? "textarea-error" : "textarea-primary"
        }`}
        placeholder={`[
  {
    "name": "Matematica", 
    "hours": 125, 
    "completed": false, 
    "score": null
  }, 
  {
    "name": "Estadisitica y Probabilidad", 
    "hours": 96, 
    "completed": false, 
    "score": null
  }, 
  ...
]`}
      />
    </Layout>
  );
};

export default Degree;
