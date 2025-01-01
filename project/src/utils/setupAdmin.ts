import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { ADMIN_CREDENTIALS } from '../config/adminConfig';

export async function setupAdminUser() {
  const auth = getAuth();
  
  try {
    await createUserWithEmailAndPassword(
      auth,
      ADMIN_CREDENTIALS.email,
      ADMIN_CREDENTIALS.password
    );
    console.log('Admin user created successfully');
  } catch (error: any) {
    // If the user already exists, this is fine
    if (error.code === 'auth/email-already-in-use') {
      console.log('Admin user already exists');
    } else {
      console.error('Error creating admin user:', error);
      throw error;
    }
  }
}