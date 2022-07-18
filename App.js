import Home from "./src/Screens/HomeScreen/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RedactorScreen from "./src/Screens/Redactor/RedactorScreen";
import { Amplify } from "aws-amplify";
import awsconfig from "./src/aws-exports";
Amplify.configure(awsconfig);
import { withAuthenticator } from "aws-amplify-react-native";
import Client from "./src/apollo/Client";
import ContextProvider from "./src/Context/Context";

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <Client>
      <NavigationContainer>
        <ContextProvider>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Redactor" component={RedactorScreen} />
          </Stack.Navigator>
        </ContextProvider>
      </NavigationContainer>
    </Client>
  );
};

const signUpConfig = {
  hideAllDefaults: true,
  signUpFields: [
    {
      label: "nombre",
      key: "name",
      require: true,
      displayOrder: 1,
      type: "string",
      placeholder: "nombre",
    },
    {
      label: "Username",
      key: "username",
      require: true,
      displayOrder: 2,
      type: "string",
      placeholder: "username",
    },
    {
      label: "Email",
      key: "email",
      require: true,
      displayOrder: 3,
      type: "string",
      placeholder: "mail",
    },
    {
      label: "password",
      key: "password",
      require: true,
      displayOrder: 4,
      type: "string",
      placeholder: "password",
    },
  ],
};
export default withAuthenticator(App, { signUpConfig });
