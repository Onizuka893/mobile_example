import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Router } from "expo-router";

export default function HomeScreen() {
  const [query, setQuery] = useState("");

  const handleQuery = async () => {
    if (!query) return;

    router.push(`/${query}`);
    // email moet dynamisch zijn en
    // na het opvragen van het lijst moet navigeren naar een andere page
  };

  return (
    <Box className="w-full h-full justify-start p-5">
      <VStack space="md">
        <Heading className="text-center">Title?</Heading>
        <VStack space="sm" className="bg-slate-400 p-5">
          <Button>
            <Link href={"/createList"}>Maak een Lijstje</Link>
          </Button>
          <Text className="text-center">OF</Text>
          <Input
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
          >
            <InputField
              value={query}
              onChangeText={setQuery}
              placeholder="Zoek op email/naam"
            />
          </Input>
          <Button onPress={handleQuery}>Zoek</Button>
        </VStack>
        <Text className="bg-slate-400 h-52 p-2">Stappenplan uitleg</Text>
        <Link href={"/camera"}>Camera</Link>
      </VStack>
    </Box>
  );
}
