import { ListItem, updateGetItemById } from "@/lib/db";
import React from "react";
import { Button, ButtonText } from "./ui/button";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "./ui/alert-dialog";
import { Heading } from "./ui/heading";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";
import { Box } from "./ui/box";

interface ListItemGetDialogProps {
  listId: string;
  item: ListItem;
}

export default function ListItemGetDialogComponent({
  listId,
  item,
}: ListItemGetDialogProps) {
  const [showAlertDialog, setShowAlertDialog] = React.useState(false);
  const handleClose = () => setShowAlertDialog(false);

  const handleGetItem = async () => {
    try {
      await updateGetItemById(listId, item.id);
    } catch (error) {
      console.error(error);
    } finally {
      handleClose();
    }
  };

  return (
    <>
      <Button className="my-2 p-2" onPress={() => setShowAlertDialog(true)}>
        <ButtonText>
          {item.id} : {item.name}
        </ButtonText>
      </Button>
      <AlertDialog isOpen={showAlertDialog} onClose={handleClose} size="md">
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading className="text-typography-950 font-semibold" size="md">
              {item.name}
            </Heading>
          </AlertDialogHeader>
          <AlertDialogBody className="mt-3 mb-4">
            <VStack space="sm">
              <Box className="bg-slate-400 m-2 p-2">
                <Text>{item.name}</Text>
              </Box>
              <Box className="bg-slate-400 m-2 p-2">
                <Text>{item.description}</Text>
              </Box>
              <Box className="bg-slate-400 m-2 p-2">
                <Text>{item.url}</Text>
              </Box>
            </VStack>
          </AlertDialogBody>
          <AlertDialogFooter className="">
            <Button
              variant="outline"
              action="secondary"
              onPress={handleClose}
              size="sm"
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button size="sm" onPress={handleGetItem}>
              <ButtonText>Ik Haal Dit</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
