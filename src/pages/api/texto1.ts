import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        const db = await connectToDatabase();
        if (!db) {
            res.status(500).json({ error: "Falha ao conectar ao banco de dados" });
            return;
        }

        const collection = db.collection("texto1");
        const data = await collection.find({}).toArray();

        res.status(200).json(data);
    } catch (error) {
        console.error("Erro na API texto1:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
}
