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

  // Check for environment variables
  const appId = process.env.VITE_APP_ID;
  const baseUrl = process.env.VITE_SUPERDEV_BASE_URL;

  if (!appId || !baseUrl) {
    console.log('⚠️  Environment variables not found. Creating manual setup instructions...');
    console.log('\n📋 To create test accounts manually:');
    console.log('1. Start the application with: npm run dev');
    console.log('2. Navigate to http://localhost:8080/register');
    console.log('3. Create the following accounts:');
    console.log('');
    console.log('┌─────────────────────────────────────────────────┐');
    console.log('│ Email                 │ Password    │ Name      │');
    console.log('├─────────────────────────────────────────────────┤');

    for (const user of testUsers) {
      console.log(`│ ${user.email.padEnd(21)} │ ${user.password.padEnd(10)} │ ${user.name.padEnd(9)} │`);
    }

    console.log('└─────────────────────────────────────────────────┘');
    console.log('\n💡 After creating these accounts, you can use them to test the application!');
    return;
  }

  // Initialize Superdev client
  const superdevClient = createSuperdevClient({
    appId: appId,
    requiresAuth: false,
    baseUrl: baseUrl,
    loginUrl: `${baseUrl}/auth/app-login?app_id=${appId}`,
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