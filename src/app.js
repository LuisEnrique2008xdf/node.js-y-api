import express from "express";
import { readTickets } from "./data/fileStore.js";

export const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", service: "taca-tickets-api" });
})

app.get("/api/tickets", async (req, res, next) => {
    try {
        const tickets = await readTickets();
        res.status(200).json({ data: tickets, count: tickets.length });
    } catch (error) {
        next(error);
    }
});

app.use((req, res) => {
    res.status(404).json({ error: { code: "NOT_FOUND", message: "Ruta no encontrada" } });
});
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: { code: "INTERNAL_ERROR", message: "Error interno del servidor" } });
});