import {
  IonContent,
  IonPage,
  IonButton,
  IonFab,
  IonHeader,
  IonToolbar,
  IonTitle
} from '@ionic/react';
import React from 'react';
import './Tab1.css';
import Registration from '../Registration';
import useModal from '../useModal';

const Tab1: React.FC = () => {
  const { isShowing, toggle } = useModal();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Registration isShowing={isShowing} toggle={toggle}></Registration>
        <IonFab vertical="bottom" horizontal="end">
          <IonButton onClick={toggle}>Join now</IonButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
