import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    HStack,
    IconButton,
    Text,
    VStack,
    ModalProps,
    FormErrorMessage
} from "@chakra-ui/react"
import { CloseIcon } from "@chakra-ui/icons"
import { FormControl, FormHelperText } from "@chakra-ui/react"
import { Input, Button, useToast } from "@chakra-ui/react"
import { useState, FormEvent } from "react"

import { customAlphabet } from "nanoid"
import axios from "axios"
import { useRouter } from "next/router"

const Create = ({ isOpen, onClose }: ModalProps) => {
    const [idInput, setIdInput] = useState("")
    const [nameInput, setNameInput] = useState("")
    const [endpointInput, setEndpointInput] = useState("")
    const [loading, setLoading] = useState(false)

    const handleNameInputChange = (e: FormEvent<HTMLInputElement>) => {
        setIsNameError(false)
        const name = (e.target as HTMLInputElement).value
        setNameInput(name)

        if (name.trim() !== "")
            setIdInput(
                name
                    .trim()
                    .toLowerCase()
                    .replaceAll(/[^\w-\s]/gi, "")
                    .split(" ")
                    .join("-") +
                    "-" +
                    nanoid()
            )
        else setIdInput("")
    }

    const handleEnpointInputChange = (e: FormEvent<HTMLInputElement>) => {
        setIsEndpointError(false)
        const endpoint = (e.target as HTMLInputElement).value
        setEndpointInput(endpoint)
    }

    const [isNameError, setIsNameError] = useState(false)
    const [isEndpointError, setIsEndpointError] = useState(false)

    const nanoid = customAlphabet("1234567890abcdef", 6)
    const toast = useToast()
    const router = useRouter()

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="full"
            motionPreset="slideInRight">
            <ModalOverlay />
            <ModalContent bgColor="#fafafa" p={8}>
                <ModalHeader>
                    <HStack color="gray" spacing={2}>
                        <IconButton
                            fontSize="md"
                            bgColor="transparent"
                            onClick={onClose}
                            size="sm"
                            aria-label="Close"
                            icon={<CloseIcon />}
                        />
                        <Text fontSize="3xl" px={4} fontWeight="medium">
                            Create a cluster
                        </Text>
                    </HStack>
                </ModalHeader>
                <ModalBody px={20} py={8} w="60%">
                    <VStack w="100%" spacing={8} alignItems="start">
                        <Text
                            fontSize="5xl"
                            fontWeight="semibold"
                            lineHeight="1.2">
                            Let&apos;s get started with some details
                        </Text>
                        <FormControl
                            isInvalid={isNameError}
                            isDisabled={loading}>
                            <Input
                                type="text"
                                required
                                value={nameInput}
                                variant="flushed"
                                onChange={handleNameInputChange}
                                placeholder="Cluster name"
                            />
                            {!isNameError ? (
                                <FormHelperText>
                                    A name for your new cluster{" "}
                                    {nameInput.trim() !== "" &&
                                        "ID: " + idInput}
                                </FormHelperText>
                            ) : (
                                <FormErrorMessage>
                                    Cluster name is required
                                </FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl
                            isInvalid={isEndpointError}
                            isDisabled={loading}>
                            <Input
                                type="url"
                                required
                                value={endpointInput}
                                variant="flushed"
                                onChange={handleEnpointInputChange}
                                placeholder="API Endpoint"
                            />
                            {!isEndpointError ? (
                                <FormHelperText>
                                    API Endpoint URL to recieve webhooks
                                </FormHelperText>
                            ) : (
                                <FormErrorMessage>
                                    Endpoint is required
                                </FormErrorMessage>
                            )}
                        </FormControl>
                        <Button
                            colorScheme="messenger"
                            isLoading={loading}
                            onClick={async () => {
                                if (
                                    idInput.trim() == "" ||
                                    nameInput.trim() === "" ||
                                    endpointInput.trim() === ""
                                ) {
                                    if (
                                        idInput.trim() == "" ||
                                        nameInput.trim() === ""
                                    )
                                        setIsNameError(true)
                                    if (endpointInput.trim() === "")
                                        setIsEndpointError(true)
                                } else {
                                    if (
                                        !isEndpointError &&
                                        !isNameError &&
                                        idInput.trim() !== ""
                                    ) {
                                        setLoading(true)
                                        try {
                                            const {
                                                data
                                            }: { data: { error: boolean } } =
                                                await axios.post(
                                                    "/api/new/cluster",
                                                    {
                                                        id: idInput,
                                                        name: nameInput,
                                                        endpoint: endpointInput
                                                    }
                                                )
                                            if (!data.error) {
                                                toast({
                                                    title: "Success",
                                                    description:
                                                        "Cluster created successfully",
                                                    status: "success",
                                                    duration: 5000,
                                                    isClosable: true
                                                })
                                                setLoading(false)
                                                router.push(
                                                    `/cluster/${idInput}`
                                                )
                                            } else {
                                                toast({
                                                    title: "Please try again",
                                                    description:
                                                        "An error occured",
                                                    status: "error",
                                                    duration: 5000,
                                                    isClosable: true
                                                })
                                                setLoading(false)
                                                onClose()
                                            }
                                        } catch (e) {
                                            console.log(e)
                                            toast({
                                                title: "Please try again",
                                                description: "An error occured",
                                                status: "error",
                                                duration: 5000,
                                                isClosable: true
                                            })
                                            setLoading(false)
                                            onClose()
                                        }
                                    }
                                }
                            }}>
                            Create cluster
                        </Button>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default Create
