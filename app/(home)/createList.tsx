import { useState } from "react";
import { addList, List, ListItem } from "@/lib/db";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import ItemListComponent from "@/components/itemList";
import { Heading } from "@/components/ui/heading";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Input, InputField } from "@/components/ui/input";
import React from "react";
import { HStack } from "@/components/ui/hstack";
import { GetUserEmail, GetUserName } from "@/lib/authentication";
import { err } from "react-native-svg";
import { Spinner } from "@/components/ui/spinner";

export default function CreateListPage() {
  const [list, setList] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("");
  const [showListDialog, setShowListDialog] = useState(false);

  const handleClose = () => setShowListDialog(false);

  const handleAddItemToList = () => {
    addItem(name, desc, url);
    resetForm();
    handleClose();
  };

  const resetForm = () => {
    setName("");
    setDesc("");
    setUrl("");
  };

  const addItem = (name: string, description: string, url: string) => {
    const newItem = {
      id: list.length + 1,
      name: name,
      description: description,
      url: url,
      completed: false,
    };
    setList((prevItems) => [...prevItems, newItem]);
  };

  const deleteItem = (id: number) => {
    setList((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const saveList = async () => {
    try {
      setLoading(true);
      const listToAdd: List = {
        email: GetUserEmail()!,
        username: GetUserName()!,
        list: list,
      };
      await addList(listToAdd);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box className="justify-start p-5 w-full h-full">
        <VStack space="md" reversed={false}>
          <Heading className="text-center bg-slate-500 p-2 rounded-md">
            Maak een lijstje
          </Heading>
          <VStack>
            <ItemListComponent items={list} deleteAction={deleteItem} />
          </VStack>
        </VStack>
      </Box>
      <Box className="fixed bottom-0 left-0 mb-4 ml-4 px-4 py-2">
        <HStack space="lg">
          <Button onPress={() => setShowListDialog(true)}>
            <ButtonText>+</ButtonText>
          </Button>
          {loading ? (
            <Button isDisabled>
              <Spinner />
            </Button>
          ) : (
            <Button className="bg-green-500" onPress={saveList}>
              <ButtonText>Opslaan</ButtonText>
            </Button>
          )}
          <AlertDialog isOpen={showListDialog} onClose={handleClose} size="md">
            <AlertDialogBackdrop />
            <AlertDialogContent>
              <AlertDialogHeader>
                <Heading
                  className="text-typography-950 font-semibold"
                  size="md"
                >
                  Item toevoegen
                </Heading>
              </AlertDialogHeader>
              <AlertDialogBody className="mt-3 mb-4">
                <VStack space="sm">
                  <Input
                    variant="outline"
                    size="md"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                  >
                    <InputField
                      value={name}
                      onChangeText={setName}
                      placeholder="Naam"
                    />
                  </Input>

                  <Input
                    variant="outline"
                    size="md"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                  >
                    <InputField
                      value={desc}
                      onChangeText={setDesc}
                      placeholder="Beschrijving"
                    />
                  </Input>
                  <Input
                    variant="outline"
                    size="md"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                  >
                    <InputField
                      value={url}
                      onChangeText={setUrl}
                      placeholder="URL"
                    />
                  </Input>
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
                <Button size="sm" onPress={handleAddItemToList}>
                  <ButtonText>Add</ButtonText>
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </HStack>
      </Box>
    </>
  );
}
