import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.donkey.ecolomie',
  appName: 'Ecolomie',
  webDir: 'www',
  server: {
    androidScheme: 'https',
    iosScheme: 'http'
  }
};

export default config;
