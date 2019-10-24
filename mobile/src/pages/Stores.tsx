import React from 'react';
import { IonHeader, IonToolbar, IonPage, IonTitle, IonContent } from '@ionic/react';

const Stores: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Stores</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent />
    </IonPage>
  );
};

export default Stores;
