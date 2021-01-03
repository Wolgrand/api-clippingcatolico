import { MongoClient, Collection } from 'mongodb';


interface ConnectType {
  db: Collection;
  client: MongoClient;
}

const client = new MongoClient(String(process.env.DATABASE_URL), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function connect(collection:string): Promise<ConnectType> {
  if (!client.isConnected()) await client.connect();

  const db = client.db('clippingcatolico').collection(collection);
  return { db, client };
}
