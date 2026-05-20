import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { announcementsSeed } from './data/announcements.seed';
import { eventsSeed } from './data/events.seed';
import { membersSeed } from './data/members.seed';
import { donationsSeed } from './data/donations.seed';

dotenv.config();

const MONGODB_URI =
  process.env['MONGODB_URI'] ?? 'mongodb://localhost:27017/community-connect';

async function seed() {
  console.log('🌱 Starting database seed...');
  console.log(`📡 Connecting to: ${MONGODB_URI.replace(/\/\/.*@/, '//<credentials>@')}`);

  await mongoose.connect(MONGODB_URI);
  console.log('✅ Connected to MongoDB');

  const db = mongoose.connection.db;
  if (!db) {
    throw new Error('Database connection not established');
  }

  // Clear existing data
  const collections = ['announcements', 'events', 'members', 'donations'];
  for (const name of collections) {
    try {
      await db.dropCollection(name);
      console.log(`  🗑️  Dropped collection: ${name}`);
    } catch {
      console.log(`  ℹ️  Collection ${name} does not exist, skipping drop`);
    }
  }

  // Insert seed data
  await db.collection('announcements').insertMany(announcementsSeed);
  console.log(`  ✅ Inserted ${announcementsSeed.length} announcements`);

  await db.collection('events').insertMany(eventsSeed);
  console.log(`  ✅ Inserted ${eventsSeed.length} events`);

  await db.collection('members').insertMany(membersSeed);
  console.log(`  ✅ Inserted ${membersSeed.length} members`);

  await db.collection('donations').insertMany(donationsSeed);
  console.log(`  ✅ Inserted ${donationsSeed.length} donations`);

  console.log('\n🎉 Database seeded successfully!');
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((error) => {
  console.error('❌ Seed failed:', error);
  process.exit(1);
});
