import type { NextPage } from "next";
import { Layout } from "@/components/layout";
import { useEffect, useState } from "react";
import { Subject, useDatabase } from "../hooks/useDatabase";
import { PencilIcon } from "@heroicons/react/solid";
import Link from "next/link";

const Home: NextPage = () => {
  const { name, subjects, updateSubject } = useDatabase();
  const [subjectPercentage, setSubjectPercentage] = useState(0);
  const [hoursPercentage, setHourPercentage] = useState(0);
  const [averageScore, setAverageScore] = useState(0);

  useEffect(() => {
    const completed = subjects.filter((s) => s.completed);

    if (completed.length === 0) {
      setSubjectPercentage(0);
      setHourPercentage(0);
      setAverageScore(0);
      return;
    }

    const totalHours = subjects.reduce((acc, sub) => acc + sub.hours, 0);
    const completedHours = completed.reduce((acc, sub) => acc + sub.hours, 0);

    const subPerc = Math.trunc((completed.length * 100) / subjects.length);
    const houPerc = Math.trunc((completedHours * 100) / totalHours);

    const subWithScore = completed.filter((sub) => sub.score !== null);

    const avgSco =
      subWithScore.reduce((acc, sub) => acc + (sub.score || 0), 0) /
        subWithScore.length || 0;

    setSubjectPercentage(subPerc);
    setHourPercentage(houPerc);
    setAverageScore(avgSco);
  }, [subjects]);

  return (
    <Layout
      title="Como va la facu?"
      desc=""
      className="prose-sm w-full sm:prose sm:max-w-none"
    >
      <h1>
        {name}{" "}
        <Link href="/degree" passHref>
          <button className="btn btn-secondary btn-md">
            <PencilIcon className="h-5 w-5" />
          </button>
        </Link>
      </h1>

      <div className="mt-7 flex justify-between">
        <span className="text-lg">Por Horas:</span>
        {hoursPercentage > 99 ? (
          <span className="text-lg">{hoursPercentage}%</span>
        ) : (
          <div>
            <span className="countdown text-lg">
              <span style={{ "--value": hoursPercentage }} />%
            </span>
          </div>
        )}
      </div>
      <progress
        className={`progress h-5 ${
          subjectPercentage < 100 ? "progress-primary" : "progress-success"
        }`}
        value={hoursPercentage}
        max="100"
      />
      <progress
        className={`progress h-3 ${
          subjectPercentage < 100 ? "progress-secondary" : "progress-success"
        }`}
        value={subjectPercentage}
        max="100"
      />
      <div className="mb-7 flex justify-between">
        <span>Por Materias: </span>
        {subjectPercentage > 99 ? (
          <span>{subjectPercentage}%</span>
        ) : (
          <div>
            <span className="countdown">
              <span style={{ "--value": subjectPercentage }} />%
            </span>
          </div>
        )}
      </div>

      <h3>Nota promedio: {averageScore}</h3>

      <div className="overflow-x-auto">
        <h3>
          Materias:{" "}
          <Link href="/degree" passHref>
            <button className="btn btn-secondary btn-sm">
              <PencilIcon className="h-5 w-5" />
            </button>
          </Link>
        </h3>
        <table className="table-zebra table w-full">
          <thead>
            <tr>
              <th />
              <th>Materia</th>
              <th>Horas</th>
              <th>Aprobada</th>
              <th>Promedio</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, i) => (
              <tr key={subject.name}>
                <th>{i + 1}</th>
                <td>{subject.name}</td>
                <td>{subject.hours}</td>
                <td>
                  <input
                    type="checkbox"
                    className="toggle toggle-accent"
                    checked={subject.completed}
                    onChange={() => {
                      updateSubject(i, {
                        score: null,
                        completed: !subject.completed,
                      });
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={subject.score || ""}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (isNaN(value) && e.target.value !== "") return;
                      updateSubject(i, {
                        ...subject,
                        score: value,
                      });
                    }}
                    className={`input input-bordered w-14 max-w-xs appearance-none text-center disabled:input-bordered`}
                    disabled={!subject.completed}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Home;
