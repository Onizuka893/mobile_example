import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Linking, Modal, Pressable, StyleSheet, View } from "react-native";
import {
  Camera,
  PhotoFile,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { SwitchCamera, X } from "lucide-react-native";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import React from "react";

interface NoPermissionDialogProps {
  onCancel?: () => void;
  isOpen?: boolean;
}

const NoPermissionDialog: FunctionComponent<NoPermissionDialogProps> = ({
  onCancel,
  isOpen,
}) => {
  return (
    <AlertDialog isOpen={isOpen} size="md">
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading className="text-typography-950 font-semibold" size="md">
            No permission to use camera
          </Heading>
        </AlertDialogHeader>
        <AlertDialogBody className="mt-3 mb-4">
          <Text size="sm">
            We need to be granted permission to use the camera, otherwise the
            app is unable to function. Please grant us permission and try again.
          </Text>
        </AlertDialogBody>
        <AlertDialogFooter className="">
          <Button
            variant="outline"
            action="secondary"
            onPress={onCancel}
            size="sm"
          >
            <ButtonText>Cancel</ButtonText>
          </Button>
          {/*Via Linking.openSettings kan de gebruiker naar de instellingen van de app gaan om de rechten aan te passen.*/}
          {/*Dit is een standaard functie die door het React Native voorzien wordt, er zijn dus geen extra libraries nodig.*/}
          <Button size="sm" onPress={() => Linking.openSettings()}>
            <ButtonText>Grant</ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

interface CameraUIProps {
  showCamera: boolean;
  cameraType: "front" | "back";
  onClose: (photo: PhotoFile | undefined) => void;
}

const iconSize = 30;

const CameraUI: FunctionComponent<CameraUIProps> = ({
  showCamera,
  cameraType,
  onClose,
}) => {
  // Het is, voor veel modules, nodig dat we toestemming vragen aan de gebruiker om bepaalde acties uit te voeren.
  // Dit doe je best niet als je app start maar pas wanneer de gebruiker de actie uitvoert die de toestemming nodig
  // heeft.
  const {
    hasPermission: haveCameraPermission,
    requestPermission: requestCameraPermission,
  } = useCameraPermission();
  const [haveRequestedCameraPermission, setHaveRequestedCameraPermission] =
    useState<boolean>(false);

  // Vraag een referentie op naar de gewenste camera, de gebruiker kan deze switchen.
  const [activeCamera, setActiveCamera] = useState<"front" | "back">(
    cameraType === "front" ? "front" : "back"
  );
  // De informatie over het device kan gebruikt worden om informatie zoals de mogelijke formaten, zoom niveaus, ...
  // op te vragen.
  const cameraDevice = useCameraDevice(activeCamera);

  // Via useRef kunnen we camera aanspreken om een foto te nemen, een video-opname te starten of te stoppen, ...
  const camera = useRef<Camera>(null);

  useEffect(() => {
    if (showCamera && !haveCameraPermission) {
      void requestCameraPermission().then(() =>
        setHaveRequestedCameraPermission(true)
      );
    }
  }, [haveCameraPermission, requestCameraPermission, showCamera]);

  if (!haveCameraPermission && haveRequestedCameraPermission) {
    return (
      <NoPermissionDialog
        isOpen={showCamera}
        onCancel={() => onClose(undefined)}
      />
    );
  }

  // Toon niets als de camera verborgen is of als er nog geen rechten zijn aangevraagd.
  if (!showCamera || !haveCameraPermission) {
    return <></>;
  }

  // Het is mogelijk dat het toestel geen camera heeft, in dat geval gooien we hier een error naar boven,
  // het is properder om hier ook een gepaste melding voor te tonen, dit laten we als oefening.
  if (!cameraDevice) {
    throw new Error(`No ${activeCamera} camera detected.`);
  }

  return (
    <Modal>
      <View className="flex items-center justify-end h-full">
        <Camera
          ref={camera}
          device={cameraDevice}
          isActive={showCamera}
          style={styles.absoluteFill}
          photo
        />
        <Button
          size="lg"
          className="rounded-full p-3.5 h-14 w-14 absolute right-8 top-8"
          onPress={() => onClose(undefined)}
        >
          <ButtonIcon as={X} size={"md"} />
        </Button>

        <Button
          size="lg"
          className="rounded-full p-3.5 h-14 w-14 absolute right-8 bottom-8"
          onPress={() =>
            setActiveCamera(activeCamera === "front" ? "back" : "front")
          }
        >
          <ButtonIcon as={SwitchCamera} size={"md"} />
        </Button>

        <Pressable
          onPress={async () => {
            // De foto's die genomen worden door VisionCamera worden bewaard in de cache, dit is geen goede
            // plaats om foto's te bewaren omdat deze cache opgeruimd kan worden door het besturingssysteem.
            // Dit gebeurt in het geval dat er te weinig opslagruimte beschikbaar is op het toestel.
            const photo = await camera.current?.takePhoto();

            // Als alternatief gebruiken we de CameraRoll module om de foto op te slaan in de galerij.
            if (photo) {
              // Merk op dat we de file:// prefix toevoegen aan de path, dit is nodig elke keer dat we
              // met bestanden willen werken op het bestandsysteem van het mobiele toestel.
              const galleryPhoto = await CameraRoll.saveAsset(
                `file://${photo.path}`,
                { type: "photo" }
              );
              onClose({ ...photo, path: galleryPhoto.node.image.uri });
            }
            onClose(undefined);
          }}
          android_ripple={{ color: "black", borderless: false, radius: 35 }}
          className="border-2 border-neutral-800 rounded-full h-20 w-20 absolute bottom-4 opacity-50 bg-neutral-700"
        ></Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  absoluteFill: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  actionButton: {
    borderWidth: 2,
    height: 80,
    width: 80,
    borderRadius: 50,
    bottom: 20,
  },
  closeButton: {
    position: "absolute",
    right: 20,
    top: 40,
  },
  switchButton: {
    position: "absolute",
    right: 20,
    bottom: 30,
  },
  cameraContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

export default CameraUI;
