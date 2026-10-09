import 'dotenv/config';
import {readFileSync} from 'node:fs';
import {pool} from './pool.js';
const schema=readFileSync(new URL('./schema.sql',import.meta.url),'utf8');
const {products}=JSON.parse(readFileSync(new URL('../data/db.json',import.meta.url),'utf8'));
try {
 const client=await pool.connect();
 try {
  await client.query('BEGIN');
  await client.query(schema);
  for(const p of products) await client.query('INSERT INTO products(name,category,price,unit,image) VALUES($1,$2,$3,$4,$5)',[p.name,p.category??null,Math.round(Number(p.price)),p.unit??'кг',p.image??null]);
  await client.query('COMMIT');
  console.log(`Готово: таблицы созданы, товаров добавлено — ${products.length}`);
 } catch(e){await client.query('ROLLBACK');throw e;} finally {client.release();}
} catch(e){console.error(e);process.exitCode=1;} finally {await pool.end();}
