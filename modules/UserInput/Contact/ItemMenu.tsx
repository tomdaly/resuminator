import { IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Text } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import React from "react";
import { CgOptions } from "react-icons/cg";
import { FiEdit, FiEye } from "react-icons/fi";
import { IoMdRemoveCircle } from "react-icons/io";
import ActionModal from "../../../components/common/ActionModal";
import InputWithLabel from "../../../components/common/InputWithLabel";
import { ContactDataObject } from "./types";

interface Props {
  item?: ContactDataObject;
  index?: number;
  handlers?: {
    hide: (index: number) => void;
    remove: (index: number) => void;
    update?: (index: number, key: string, value: any) => void;
  };
}

const ItemMenu: React.FC<Props> = ({ item, index, handlers }) => {
  const { hide, remove, update } = handlers;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        label="Options"
        aria-label="Show-Current-Handle-Options"
        icon={<CgOptions />}
      />
      <MenuList>
        {item.identifier !== undefined && (
          <MenuItem name="identifier" icon={<FiEdit />} onClick={onOpen}>
            Change identifier
          </MenuItem>
        )}
        <MenuItem name="hide" icon={<FiEye />} onClick={() => hide(index)}>
          {item.isHidden ? "Show on resume" : "Hide from resume"}
        </MenuItem>
        <MenuItem
          name="remove"
          color="red.500"
          icon={<IoMdRemoveCircle />}
          onClick={() => remove(index)}
        >
          Remove
        </MenuItem>
      </MenuList>
      <ActionModal
        isOpen={isOpen}
        onClick={onClose}
        onClose={onClose}
        title="Edit link identifier"
        buttonText="Confirm"
        color="green"
      >
        <Text fontSize="sm" wordBreak="break-word" mb="4">
          Change the identifier for {item.link}. This will be the text which
          will show on your resume. Make sure it represents the link you are
          willing to redirect the recruiter to.
        </Text>
        <InputWithLabel
          label="New Identifier"
          value={item.identifier}
          onChange={(e) => update(index, "identifier", e.target.value)}
        />
      </ActionModal>
    </Menu>
  );
};

export default ItemMenu;