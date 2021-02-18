import React from "react";
import { Modal } from "react-native";
import BaseFocusBlock from "../../FocusBlocks/Base";

import * as SC from "./styles";

interface iProps {
  modalVisible: boolean;
  hideModal: () => void;
  header: string;
  confirmText: string;
  handleConfirm: () => void;
  children: React.ReactNode;
}

export default function BaseDialog({ modalVisible, hideModal, header, confirmText, handleConfirm, children }: iProps) {
  return (
    <Modal visible={modalVisible} transparent animationType="fade">
      <SC.Background>
        <SC.InvisibleArea onPress={hideModal} />
        <BaseFocusBlock>
          <SC.Header>{header}</SC.Header>
          {children}
          <SC.ActionButtonArea>
            <SC.ActionButton onPress={hideModal}>
              <SC.ActionButtonText>Cancelar</SC.ActionButtonText>
            </SC.ActionButton>
            <SC.ActionButton onPress={handleConfirm}>
              <SC.ActionButtonText>{confirmText}</SC.ActionButtonText>
            </SC.ActionButton>
          </SC.ActionButtonArea>
        </BaseFocusBlock>
      </SC.Background>
    </Modal>
  );
}
