import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { createContext, ReactNode, useContext, useState } from "react";

interface AppInfo {
  newMessage: boolean;
  modalHeader: ReactNode;
  modalBody: ReactNode;
  modalFooter: ReactNode[];
}

interface InfoContexrValue {
  setInfo: React.Dispatch<React.SetStateAction<AppInfo>>;
  onCloseEnhanced: () => void;
}

const InfoContext = createContext<InfoContexrValue>({
  setInfo: () => {
    return;
  },
  onCloseEnhanced: () => {
    return;
  },
});
export const useInfoContext = () => useContext(InfoContext);


const InfoProvider = ({ children }: React.PropsWithChildren) => {
  const [info, setInfo] = useState<AppInfo>({
    newMessage: false,
    modalHeader: "",
    modalBody: "",
    modalFooter: [],
  });

  const { onClose } = useDisclosure();

  const onCloseEnhanced = () => {
    setInfo({
        newMessage: false,
        modalHeader: "",
        modalBody: "",
        modalFooter: []
    });
    onClose();
  }
  return (
    <InfoContext.Provider value={{ setInfo, onCloseEnhanced}}>
      {children}
      <Modal isOpen={info.newMessage} onClose={onCloseEnhanced}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{info.modalHeader}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{info.modalBody}</ModalBody>
          <ModalFooter>
            {info.modalFooter.map((button) => (
              <>{button}</>
            ))}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </InfoContext.Provider>
  );
};

export default InfoProvider;
