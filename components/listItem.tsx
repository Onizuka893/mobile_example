import { HStack } from "@/components/ui/hstack";
import { Trash } from "lucide-react-native";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { View } from "react-native";
import SwipeListItem from "./swipeListItem";
import { ListItem } from "@/lib/db";

interface ListItemProps {
  item: ListItem;
  deleteAction: (id: number) => void;
}

export default function ListItemComponent({
  item,
  deleteAction,
}: ListItemProps) {
  const actions = [
    {
      icon: Trash,
      onPress: () => deleteAction(item.id),
    },
  ];

  return (
    <View className="m-2">
      <SwipeListItem actionButtons={actions}>
        <Card
          size="md"
          variant="elevated"
          className="w-full"
          style={{ maxWidth: "100%" }}
        >
          <HStack
            className="flex items-center gap-4"
            style={{ maxWidth: "100%" }}
          >
            <VStack className="flex-grow" style={{ maxWidth: "90%" }}>
              <HStack className="justify-between items-center">
                <Heading size="md" className="mb-1">
                  {item.name}
                </Heading>
              </HStack>
            </VStack>
          </HStack>
        </Card>
      </SwipeListItem>
    </View>
  );
}
