import fs from 'fs';
import csv from 'csv-parser';
import dbConnect from '../config/database.js';
import Level from '../db/models/Level.js';
import Card from '../db/models/Card.js';

const levelsMap = new Map();

async function clearDatabase() {
  console.log('🧹 Cleaning database...');
  await Card.deleteMany({});
  await Level.deleteMany({});
  console.log('✅ Database cleared.');
}

async function extractLevelsFromCSV(filePath) {
  return new Promise((resolve, reject) => {
    const levels = new Set();
    let isFirstRow = true;

    fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      if (isFirstRow) {
        isFirstRow = false;
        return;
      }

      const values = Object.values(row);
      const firstCol = values[0];
      const levelMatch = firstCol.trim().match(/(\d+)$/);
      const levelNum = levelMatch ? parseInt(levelMatch[1], 10) : NaN;
      if (!isNaN(levelNum)) {
        levels.add(levelNum);
      }
    })
    .on('end', () => resolve([...levels].sort((a, b) => a - b)))
    .on('error', reject);
  });
}

async function createDynamicLevels(levelNums) {
  for (const num of levelNums) {
    const title = `Level ${num}`;
    let level = await Level.findOne({ levelNumber: num });

    if (!level) {
      level = await Level.create({ title, levelNumber: num });
    }

    levelsMap.set(title, level._id);
  }
}

async function seedFromCSV() {
  await dbConnect();
  await clearDatabase();

  const levelNums = await extractLevelsFromCSV('../data.csv');
  await createDynamicLevels(levelNums);

  const stream = fs.createReadStream('../data.csv').pipe(csv());
  let isFirstRow = true;

  for await (const row of stream) {
    if (isFirstRow) {
      isFirstRow = false;
      continue;
    }

    const values = Object.values(row);
    const firstCol = values[0];
    const question = values[1];
    const answer = values[2];

    const levelMatch = firstCol.trim().match(/(\d+)$/);
    const levelNum = levelMatch ? parseInt(levelMatch[1], 10) : NaN;
    const levelTitle = `Level ${levelNum}`;
    const levelId = levelsMap.get(levelTitle);

    if (!levelId) {
      console.warn(`⚠️ Skipping: No level found for ${levelTitle}`);
      continue;
    }

    await Card.create({
      question,
      answer,
      levelId,
    });
  }

  console.log('✅ Seeding complete!');
  process.exit(0);
}

seedFromCSV().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});