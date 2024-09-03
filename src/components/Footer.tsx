import { Center } from "@chakra-ui/react";
import React from "react";

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <Center p={5} color={"green.100"} bg={"gray.900"} mt={6} boxShadow={"0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 -4px 6px -2px rgba(0, 0, 0, 0.05)"}>
      Nathan LE ROUX - 2024
    </Center>
  );
};

export default Footer;
