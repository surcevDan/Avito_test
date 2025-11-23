import { Button, Field, Fieldset, Flex, For, Input, NativeSelect, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { useAppDispatch } from "@/redux";
import { postRejectStatusItemAdsThunkCreator } from "@/redux/reducers/item-reducer.ts";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay
} from "@chakra-ui/modal";


const RejectModal: React.FC<{ id: string, isOpen: boolean, onClose: () => void }> = ({ id, isOpen, onClose }) => {

  const dispatch = useAppDispatch();

  const reason: Array<string> = ["Запрещенный товар", "Неверная категория", "Некорректное описание", "Проблемы с фото", "Подозрение на мошенничество", "Другое"];
  const [valueReject, setValueReject] = useState({
    reason: "",
    comment: ""
  });
  console.log(valueReject);

  const reasonSet = (value: string) => {
    setValueReject((prev) => {
      return {
        ...prev,
        reason: value
      };
    });
  };
  const commentSet = (value: string) => {
    setValueReject((prev) => {
      return {
        ...prev,
        comment: value
      };
    });
  };

  const handleClick = async () => {
    await dispatch(postRejectStatusItemAdsThunkCreator(id, valueReject));
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent justifyContent="center" alignItems="center" mt="300px">
          <ModalBody>


            <Fieldset.Root size="lg" maxW="md" bg="gray.50" borderRadius="10px" border="1px solid gray" p="5px">
              <Flex direction="row" justify="end"><ModalCloseButton /></Flex>


              <Stack>
                <Fieldset.Legend>Отклонение объявления</Fieldset.Legend>
              </Stack>

              <Fieldset.Content>
                <Field.Root invalid={!valueReject.reason}>
                  <Field.Label>Причина</Field.Label>
                  <NativeSelect.Root>
                    <NativeSelect.Field name="reason" value={valueReject.reason}
                                        onChange={(e) => reasonSet(e.target.value)}>
                      <For each={reason}>
                        {(item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        )}
                      </For>
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                </Field.Root>

                <Field.Root>
                  <Field.Label>Комментарий</Field.Label>
                  <Input name="comment" value={valueReject.comment} onChange={(e) => commentSet(e.target.value)} />
                </Field.Root>
              </Fieldset.Content>


              <Button disabled={!valueReject.reason} type="submit"
                      onClick={() => dispatch(handleClick)}
                      alignSelf="flex-start">
                Отправить
              </Button>

            </Fieldset.Root>
          </ModalBody>

          <ModalFooter>
            {/*<Button colorScheme="blue" mr={3} onClick={onClose}>*/}
            {/*  Close*/}
            {/*</Button>*/}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>


  );

};

export default RejectModal;