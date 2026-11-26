import { Suspense } from "react";
import { connection } from "next/server";
import { asc } from "drizzle-orm";
import { db } from "@/src/db";
import { viaggio } from "@/src/db/schema";

const formattaData = (iso: string) =>
  Temporal.PlainDate.from(iso).toLocaleString("it-IT", { dateStyle: "medium" });

async function ElencoViaggi() {
  await connection(); // dato a ogni richiesta: nessuna query durante la build
  const viaggi = await db.select().from(viaggio).orderBy(asc(viaggio.dataInizio));
  
  if (viaggi.length === 0) return <p>Nessun viaggio</p>;
  else return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Destinazione</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {viaggi.map((v) => (
          <tr key={`${v.id}`}>
            <td>{v.nome}</td>
            <td>{v.destinazione}</td>
            <td>{formattaData(v.dataInizio)} – {formattaData(v.dataFine)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Home() {
  return (
    <main>
      <h1>I miei viaggi</h1>
      <Suspense fallback={<p>Caricamento viaggi…</p>}>
        <ElencoViaggi />
      </Suspense>
    </main>
  );
}
