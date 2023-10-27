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
  console.log('Current Selected ITem ', selectedItems);
  return (
    <>
      <RadioGroup>
        <Flex flexDirection="column" gap={2} py={2}>
          {items.map((item: any) => (
            <Radio
              key={item.name}
              variant="primary"
              value={item.value}
              onClick={() => onItemClick(item)}
            >
              {item.name}
            </Radio>
          ))}
        </Flex>
      </RadioGroup>
    </>
  );
};

export default SelectRadioItem;
