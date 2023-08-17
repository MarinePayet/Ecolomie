import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.donkey.ecolomie',
  appName: 'Ecolomie',
  webDir: 'www',
  server: {
    androidScheme: 'http',
    iosScheme: 'http'
  },

  plugins: {
    LocalNotifications: {
      iconColor: "#488AFF",
    },
  },
};



export default config;
