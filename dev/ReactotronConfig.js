import Reactotron, { asyncStorage } from 'reactotron-react-native'
import {AsyncStorage} from 'react-native';

export default Reactotron
  .setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure() // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(asyncStorage())
  .connect() // let's connect!