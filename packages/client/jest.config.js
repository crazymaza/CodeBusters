import dotenv from 'dotenv'
dotenv.config()

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^themes/(.*)$': '<rootDir>/src/themes/$1',
    '^sprites/(.*)$': '<rootDir>/src/assets/sprites/$1',
    '^images/(.*)$': '<rootDir>/src/assets/images/$1',
    '^icons/(.*)$': '<rootDir>/src/assets/icons/$1',
    '^fonts/(.*)$': '<rootDir>/src/assets/fonts/$1',
    '^.+\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^icons/(.*)$': 'identity-obj-proxy'
  },
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
}
