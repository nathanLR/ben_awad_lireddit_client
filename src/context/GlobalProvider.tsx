import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface GlobalProviderProps {
  children: React.ReactNode;
}

interface ServerError {
  newError: boolean;
  type: string;
  message: string;
}

interface GlobalProviderValues {
  setServerError: React.Dispatch<React.SetStateAction<ServerError>>;
}

const GlobalContext = React.createContext<GlobalProviderValues>({
  setServerError: () => {
    return;
  },
});
export const useGlobalContext = () => React.useContext(GlobalContext);

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [serverError, setServerError] = useState<ServerError>({newError: false, type: "", message: ""});
  console.log(serverError);
  const { onClose } = useDisclosure();
  const onCloseEnhanced = () => {
    setServerError({
        newError: false,
        type: "",
        message: ""
    });
    onClose();
  }
  return (
    <GlobalContext.Provider value={{ setServerError }}>
      {children}
      <Modal isOpen={serverError.newError} onClose={onCloseEnhanced}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{serverError.type}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Box>{serverError.message}</Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              bg="green.100"
              _hover={{ bg: "green.300" }}
              onClick={onCloseEnhanced}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
