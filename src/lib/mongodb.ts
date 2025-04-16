import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";
import '../pages/api/texto1.ts'

dotenv.config();
const uri: string = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.pdawi5d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client: MongoClient = new MongoClient(uri);

let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<Db | null> {
   
    if (cachedDb) {
        return cachedDb;
    }

    try {
        await client.connect();
        const db: Db = client.db("genetica");
        cachedDb = db;
        console.log("ok")
        return db;

    } catch (error) {
        console.error("Erro ao conectar ao MongoDB:", error);
        return null;
    }
}
