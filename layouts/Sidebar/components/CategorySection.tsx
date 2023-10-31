import { Box, Collapse, Flex, HStack, Icon, Text } from '@chakra-ui/react';
import React from 'react';

import SelectListItem from '@/components/Select/SelectListItem';
import SelectRadioItem from '@/components/Select/SelectRadioItem';
import ArrowIcon from '@/public/assets/icons/line/arrow.svg';

interface IProps {
  icon: any; // Icon of filter list
  label: string; // label text of filter list
  isOpen: boolean;
  onToggle: any;
  type: 'radio' | 'select';
  items: any;
  selectedItems: any;
  onItemClick: any;
}
const CategorySection = ({
  icon,
  label,
  isOpen,
  type,
  items,
  selectedItems,
  onItemClick,
  onToggle,
}: IProps) => {
  return (
    <>
      <Flex
        flexDirection="column"
        borderBottom="0.063rem solid"
        borderBottomColor="shader.a.200"
      >
        <HStack justifyContent="space-between" padding={4}>
          <Flex gap={2} alignItems="center">
            <Icon as={icon} height={5} w={5} color="primary.a.500" />
            <Text fontWeight="600">{label}</Text>
          </Flex>
          <Icon
            cursor="pointer"
            as={ArrowIcon}
            transform={isOpen ? 'rotate(-90deg)' : 'rotate(90deg)'}
            height={5}
            width={5}
            onClick={() => onToggle()}
          />
        </HStack>
        <Collapse in={isOpen} animateOpacity>
          <Box padding={4} paddingTop={2}>
            {type === 'radio' ? (
              <SelectRadioItem
                items={items}
                selectedItems={selectedItems}
                onItemClick={onItemClick}
              />
            ) : (
              <SelectListItem
                items={items}
                selectedItems={selectedItems}
                onItemClick={onItemClick}
              />
            )}
          </Box>
        </Collapse>
      </Flex>
    </>
  );
};

export default CategorySection;
