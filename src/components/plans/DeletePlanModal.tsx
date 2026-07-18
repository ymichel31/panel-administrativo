'use client';

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { deletePlanAction } from 'actions/plans';
import { Plan } from 'types/plan';

type DeletePlanModalProps = {
  plan: Plan | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function DeletePlanModal({
  plan,
  isOpen,
  onClose,
}: DeletePlanModalProps) {
  const router = useRouter();
  const toast = useToast();
  const [deleting, setDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const bg = useColorModeValue('white', 'navy.800');
  const color = useColorModeValue('navy.700', 'white');

  useEffect(() => {
    if (!isOpen) {
      setErrorMsg('');
      setDeleting(false);
    }
  }, [isOpen]);

  const handleCancel = () => {
    setErrorMsg('');
    onClose();
  };

  const handleClose = () => {
    if (deleting) {
      return;
    }

    handleCancel();
  };

  const handleDelete = async () => {
    if (!plan) {
      return;
    }

    setDeleting(true);
    setErrorMsg('');

    try {
      const result = await deletePlanAction(plan.id);

      if (!result.success) {
        setErrorMsg(result.error ?? 'No se pudo eliminar el plan.');
        return;
      }

      toast({
        title: 'Plan eliminado',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      handleCancel();
      router.refresh();
    } catch {
      setErrorMsg('Ocurrió un error inesperado al eliminar el plan.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      isCentered
      motionPreset="none"
      closeOnOverlayClick={!deleting}
    >
      <ModalOverlay bg="blackAlpha.600" />
      <ModalContent mx="16px" bg={bg} color={color} position="relative" zIndex={2}>
        <ModalHeader>Eliminar plan</ModalHeader>

        <ModalBody>
          ¿Estás seguro de que deseas eliminar el plan{' '}
          <strong>{plan?.name}</strong>? Esta acción no se puede deshacer.
          {errorMsg && (
            <Text color="red.500" fontSize="sm" mt="16px">
              {errorMsg}
            </Text>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            isDisabled={deleting}
            mr={3}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            colorScheme="red"
            onClick={handleDelete}
            isLoading={deleting}
          >
            Eliminar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
