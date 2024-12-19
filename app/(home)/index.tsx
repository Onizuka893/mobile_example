import ItemListComponent from "@/components/itemList";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { addList, getListByEmail, List } from "@/lib/db";
import { Link } from "expo-router";
import { useState } from "react";

export default function HomeScreen() {
  const [list, setList] = useState<List[]>([]);

  const handleGetList = async () => {
    // email moet dynamisch zijn en
    // na het opvragen van het lijst moet navigeren naar een andere page
    const list = await getListByEmail("test@tester.com");
    setList(list);
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
          <Button onPress={handleGetList}>Zoek op naam</Button>
        </VStack>
        <Text className="bg-slate-400 h-52 p-2">Stappenplan uitleg</Text>
      </VStack>
    </Box>
  );
}
