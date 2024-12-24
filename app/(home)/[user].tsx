import { useLocalSearchParams } from "expo-router";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { useEffect, useState } from "react";
import { getListByEmailOrUsername, List } from "@/lib/db";
import { Text } from "@/components/ui/text";
import { FlashList } from "@shopify/flash-list";
import ListItemGetDialogComponent from "@/components/listItemGetDialog";
import { useWindowDimensions } from "react-native";

export default function Route() {
  const { width } = useWindowDimensions();
  const [list, setList] = useState<List>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const local = useLocalSearchParams();

  useEffect(() => {
    // Define an async function inside useEffect
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading
        const response = await getListByEmailOrUsername(local.user as string);
        console.log(response[0].id);
        setList(response[0]);
      } catch (err) {
        setError("lijst voor opgegeven email of naam bestaat niet"); // Set the error
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData(); // Call the async function
  }, []);

  return (
    <Box className="justify-start p-5 w-full h-full">
      <VStack space="md">
        <Heading>Lijstje van: {local.user}</Heading>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <FlashList
            contentContainerClassName="mt-4"
            data={list?.list}
            renderItem={(item) => (
              <ListItemGetDialogComponent listId={list?.id!} item={item.item} />
            )}
            keyExtractor={(item) => item.id.toString()}
            estimatedItemSize={82}
            estimatedListSize={{ height: 82 * 20, width }}
          />
        )}
        {error && <Text className="text-red-500">{error}</Text>}
      </VStack>
    </Box>
  );
}
