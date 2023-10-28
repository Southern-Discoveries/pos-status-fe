import { Checkbox, Flex } from '@chakra-ui/react';
import React from 'react';

interface IProps {
  items: any;
  selectedItems: any;
  onItemClick: any;
}
/// List select check
const SelectListItem = ({ items, selectedItems, onItemClick }: IProps) => {
  // eslint-disable-next-line no-unused-vars
  selectedItems = selectedItems || [];

  return (
    <>
      <Flex flexDirection="column" gap={2} py={2}>
        {items.map((item: any) => (
          <Checkbox
            key={item.name}
            variant="primary"
            onChange={() => {
              onItemClick(item);
            }}
          >
            {item.name}
          </Checkbox>
        ))}
      </Flex>
    </>
  );
};

export default SelectListItem;
