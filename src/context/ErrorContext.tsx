import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { createContext, useContext, useRef, useState } from "react";

interface AppError {
  newError: boolean;
  type: string;
  message: string;
}

interface ErrorContextValue {
  setError: React.Dispatch<React.SetStateAction<AppError>>;
}

const ErrorContext = createContext<ErrorContextValue>({
  setError: () => {
    return;
  },
});
export const useErrorContext = () => useContext(ErrorContext);

const ErrorProvider = ({ children }: React.PropsWithChildren) => {
  const [error, setError] = useState<AppError>({
    newError: false,
    type: "",
    message: "",
  });
  const {onClose} = useDisclosure();
  const closeRef = useRef(null);

  const onCloseError = () => {
    setError({
        newError: false,
        type: "",
        message: ""
    });
    onClose();
  }

  return (
    <ErrorContext.Provider value={{ setError: setError }}>
      {children}
      <AlertDialog isOpen={error.newError} leastDestructiveRef={closeRef} onClose={onCloseError}>
        <AlertDialogOverlay>
          <AlertDialogContent overflow={"hidden"}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold" bg={"red.500"} >
              {error.type}
            </AlertDialogHeader>

            <AlertDialogBody>
              {error.message}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={closeRef}
                bg="green.100"
                onClick={onCloseError}
                ml={3}
              >
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </ErrorContext.Provider>
  );
};

export default ErrorProvider;