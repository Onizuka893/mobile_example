import {
  GetUserEmail,
  GetUserName,
  Logout,
  UpdateUsername,
} from "@/lib/authentication";
import { router } from "expo-router";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function SettingsScreen() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      setUsername(GetUserName());
      setEmail(GetUserEmail());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogout = async () => {
    await Logout();
    router.replace("/login");
  };

  const handleChangeUsername = async () => {
    if (!username) return;
    await UpdateUsername(username);
  };

  if (loading)
    return (
      <Box className="justify-center items-center w-full h-full">
        <Spinner />
      </Box>
    );

  return (
    <Box className="justify-start p-5 w-full h-full">
      <VStack space="md">
        <Heading>Instellingen</Heading>
        <Text>Email</Text>
        <Input
          variant="outline"
          size="md"
          isDisabled={true}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField placeholder="email" value={email} />
        </Input>
        <Text>Username</Text>
        <HStack space="md">
          <Input
            variant="outline"
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
          >
            <InputField
              placeholder="username"
              value={username}
              onChangeText={setUsername}
            />
          </Input>
          <Button onPress={handleChangeUsername}>Aanpassen</Button>
        </HStack>
        <Button onPress={handleLogout} className="bg-red-500">
          Logout
        </Button>
      </VStack>
    </Box>
  );
}
