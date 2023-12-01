import { IconButton, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

const ColorModeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const SwitchIcon = isDark ? FaSun : FaMoon;

  const handleToggle = () => {
    toggleColorMode();
  };

  return (
    <IconButton
      aria-label="Toggle dark mode"
      icon={<SwitchIcon />}
      variant='solid'
      onClick={handleToggle}
      zIndex="1"
    />
  );
};


export default ColorModeSwitcher;