import { Flex, Radio, RadioGroup } from '@chakra-ui/react';
import React from 'react';

interface IProps {
  items: any;
  selectedItems: any;
  onItemClick: any;
}
/// List select check
const SelectRadioItem = ({ items, selectedItems, onItemClick }: IProps) => {
  selectedItems = selectedItems || [];
  return (
    <>
      <RadioGroup
        value={selectedItems.name}
        onChange={e => {
          // Find the selected item based on the value
          const selectedItem = items.find((item: any) => item.name === e);
          if (selectedItem) {
            onItemClick(selectedItem); // Return the entire object
            console.log(selectedItem); // Log the selected item
          }
        }}
      >
        <Flex flexDirection="column" gap={2} py={2}>
          {items.map((item: any) => (
            <Radio key={item.name} variant="primary" value={item.name}>
              {item.name}
            </Radio>
          ))}
        </Flex>
      </RadioGroup>
    </>
  );
};

export default SelectRadioItem;
