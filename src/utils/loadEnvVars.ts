import { config } from 'dotenv';

/* Populate process.env with vars from .env and verify required vars are present. */
export function loadEnvVars(): void {
  config();
  const requiredEnvVars: string[] = [];
  for (const required of requiredEnvVars) {
    if (process.env[required] === undefined) {
      console.warn(
        `Required environment variable '${required}' is not set. Please consult the README.`
      );
      process.exit(1);
    }
  }
}
