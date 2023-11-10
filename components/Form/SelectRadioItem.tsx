import { Box, Flex, HStack, Icon, Text } from '@chakra-ui/react';
import React from 'react';

import GroupIcon from '@/public/assets/icons/fill/group.svg';
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
      {/*    <RadioGroup
        value={selectedItems.name}
        onChange={e => {
          // Find the selected item based on the value
          const selectedItem = items.find((item: any) => item.name === e);
          if (selectedItem) {
            onItemClick(selectedItem); // Return the entire object
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
      </RadioGroup> */}
      <Flex flexDirection="column" gap={2} py={2}>
        {items.map((item: any) => (
          <HStack
            padding={3}
            key={item.name}
            onClick={() => onItemClick(item)}
            cursor="pointer"
          >
            {selectedItems.includes(item) ? (
              <Icon as={GroupIcon} color="primary.a.500" />
            ) : (
              <>
                <Box
                  height={4}
                  width={4}
                  borderRadius="full"
                  border="1.5px solid"
                  borderColor="shader.a.600"
                />
              </>
            )}

            <Text>{item.name}</Text>
          </HStack>
        ))}
      </Flex>
    </>
  );
};

export default SelectRadioItem;
