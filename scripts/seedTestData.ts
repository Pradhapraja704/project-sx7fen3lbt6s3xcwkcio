import { createSuperdevClient } from '@superdevhq/client';

interface TestUser {
  email: string;
  password: string;
  name: string;
}

const testUsers: TestUser[] = [
  {
    email: 'test1@lexifix.com',
    password: 'test123',
    name: 'Test User 1'
  },
  {
    email: 'test2@lexifix.com',
    password: 'test123',
    name: 'Test User 2'
  }
];

async function seedTestData() {
  console.log('🌱 Starting to seed test data...');

  // Initialize Superdev client
  const superdevClient = createSuperdevClient({
    appId: process.env.VITE_APP_ID || '',
    requiresAuth: false,
    baseUrl: process.env.VITE_SUPERDEV_BASE_URL || '',
    loginUrl: `${process.env.VITE_SUPERDEV_BASE_URL}/auth/app-login?app_id=${process.env.VITE_APP_ID}`,
  });

  try {
    for (const user of testUsers) {
      console.log(`Creating user: ${user.email}`);

      try {
        // Check if user already exists
        const existingUsers = await superdevClient.auth.listUsers();
        const userExists = existingUsers.some((existingUser: any) => existingUser.email === user.email);

        if (userExists) {
          console.log(`✅ User ${user.email} already exists, skipping...`);
          continue;
        }

        // Create new user
        const newUser = await superdevClient.auth.signUp({
          email: user.email,
          password: user.password,
          name: user.name
        });

        if (newUser) {
          console.log(`✅ Successfully created user: ${user.email}`);
        } else {
          console.log(`❌ Failed to create user: ${user.email}`);
        }
      } catch (error: any) {
        console.error(`❌ Error creating user ${user.email}:`, error.message);

        // Continue with next user even if one fails
        continue;
      }
    }

    console.log('🎉 Test data seeding completed!');
    console.log('\n📋 Test Accounts Created:');
    console.log('┌─────────────────────────────────────────────────┐');
    console.log('│ Email                 │ Password    │ Name      │');
    console.log('├─────────────────────────────────────────────────┤');

    for (const user of testUsers) {
      console.log(`│ ${user.email.padEnd(21)} │ ${user.password.padEnd(10)} │ ${user.name.padEnd(9)} │`);
    }

    console.log('└─────────────────────────────────────────────────┘');
    console.log('\n💡 You can now use these accounts to test the application!');

  } catch (error: any) {
    console.error('❌ Error during seeding:', error.message);
    process.exit(1);
  }
}

// Run the seed function
seedTestData().catch((error) => {
  console.error('❌ Seed script failed:', error);
  process.exit(1);
});