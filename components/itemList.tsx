import { FlashList } from "@shopify/flash-list";
import { useWindowDimensions } from "react-native";
import ListItemComponent from "./listItem";
import React from "react";
import { ListItem } from "@/lib/db";

interface ItemListProps {
  items: ListItem[];
  deleteAction: (id: number) => void;
}

export default function ItemListComponent({
  items,
  deleteAction,
}: ItemListProps) {
  const { width } = useWindowDimensions();

  return (
    <>
      <FlashList
        contentContainerClassName="mt-4"
        data={items}
        renderItem={(item) => (
          <ListItemComponent item={item.item} deleteAction={deleteAction} />
        )}
        keyExtractor={(item) => item.id.toString()}
        estimatedItemSize={82}
        estimatedListSize={{ height: 82 * 20, width }}
      />
    </>
  );
}
