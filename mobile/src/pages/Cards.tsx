import React from 'react';
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab,
  IonButton
} from '@ionic/react';
import Registration from '../components/Registration';

import useModal from '../useModal';

const Cards: React.FC = () => {
  const { isShowing, toggle } = useModal();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cards</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem routerLink="/cards/details">
            <IonLabel>
              <h2>Go to detail</h2>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
      <Registration isShowing={isShowing} toggle={toggle}></Registration>
      <IonFab vertical="bottom" horizontal="end">
        <IonButton onClick={toggle}>Join now</IonButton>
      </IonFab>
    </IonPage>
  );
};

export default Cards;