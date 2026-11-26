import Image from "next/image";
import styles from "./page.module.css";

import { Suspense } from "react";
import { connection } from "next/server";
import { asc } from "drizzle-orm";
import { db } from "@/src/db";
import { viaggio } from "@/src/db/schema";

type Viaggio = {
  nome: string;
  destinazione: string;
  dataInizio: Temporal.PlainDate;
  dataFine: Temporal.PlainDate;
};

const formattaData = (iso: string) =>
  Temporal.PlainDate.from(iso).toLocaleString("it-IT", { dateStyle: "medium" });

async function ElencoViaggi() {
  await connection(); // dato a ogni richiesta: nessuna query durante la build
  const viaggi = await db.select().from(viaggio).orderBy(asc(viaggio.dataInizio));
  
  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Destinazione</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {viaggi.map((viaggio) => (
          <tr key={`${viaggio.nome}-${viaggio.dataInizio}`}>
            <td>{viaggio.nome}</td>
            <td>{viaggio.destinazione}</td>
            <td>{formattaData(viaggio.dataInizio)} – {formattaData(viaggio.dataFine)}</td>
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
