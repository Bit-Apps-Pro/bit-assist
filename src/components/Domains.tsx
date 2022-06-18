import {
  Box,
  Button,
  Divider,
  HStack,
  IconButton,
  Text,
  VStack,
} from '@chakra-ui/react'
import { HiOutlineTrash, HiPlus } from 'react-icons/hi'

const Domains = () => {
  return (
    <>
      <Box mb="4" borderWidth={'1px'}>
        <HStack justifyContent={'space-between'} gap="4" py="2" px="4">
          <Text>bitcode.pro</Text>
          <IconButton
            isRound={true}
            aria-label="Remove Domain"
            variant="ghost"
            colorScheme="red"
            icon={<HiOutlineTrash />}
          />
        </HStack>

        <Divider />

        <HStack justifyContent={'space-between'} gap="4" py="2" px="4">
          <Text>www.bitcode.pro</Text>
          <IconButton
            isRound={true}
            aria-label="Remove Domain"
            variant="ghost"
            colorScheme="red"
            icon={<HiOutlineTrash />}
          />
        </HStack>
      </Box>

      <Button
        leftIcon={<HiPlus />}
        colorScheme="teal"
        variant="outline"
        rounded={'full'}
      >
        Add Domain
      </Button>
    </>
  )
}

export default Domains
