import {
  IonContent,
  IonModal,
  IonButton,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonTitle,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
  IonFab
} from '@ionic/react';
import { close } from 'ionicons/icons';
import React from 'react';

interface RegistrationProps {
  isShowing: boolean,
  toggle: () => void
}

const Registration: React.FC<RegistrationProps> = ({ isShowing, toggle }) => {
  return (
    <IonModal isOpen={isShowing}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="secondary">
            <IonButton onClick={toggle}>
            <IonIcon slot="icon-only" icon={close} />
            </IonButton>
          </IonButtons>
          <IonTitle>Black Coffee Rewards</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <IonText>
          <h1>Personal Info</h1>
        </IonText>
        <IonItem>
          <IonLabel position="floating">First name</IonLabel>
          <IonInput></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Last name</IonLabel>
          <IonInput></IonInput>
        </IonItem>
        <IonText>
          <h1>Security</h1>
        </IonText>
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput type="password"></IonInput>
        </IonItem>
        <IonFab vertical="bottom" horizontal="end">
          <IonButton onClick={toggle}>Join now</IonButton>
        </IonFab>
      </IonContent>
    </IonModal>
  );
};

export default Registration;
