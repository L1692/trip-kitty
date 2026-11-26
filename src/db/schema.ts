import { char, date, int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

export const viaggio = mysqlTable("viaggio", {
  id: int("id", { unsigned: true }).autoincrement().primaryKey(),
  nome: varchar("nome", { length: 255 }).notNull().unique("uq_viaggio_nome"),
  destinazione: varchar("destinazione", { length: 255 }).notNull(),
  dataInizio: date("data_inizio", { mode: "string" }).notNull(),
  dataFine: date("data_fine", { mode: "string" }).notNull(),
  valuta: char("valuta", { length: 3 }).notNull().default("EUR"),
  creatoIl: timestamp("creato_il").notNull().defaultNow(),
});

export type Viaggio = typeof viaggio.$inferSelect;