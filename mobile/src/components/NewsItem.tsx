import React from 'react';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonImg } from '@ionic/react';

const News: React.FC = () => {
  return (          
    <IonContent>
      <IonCard>
        <IonImg src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?fit=crop&w=800&q=60" />
        <IonCardHeader>
          <IonCardTitle>Card Title</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          Keep close to Nature's heart... and break clear away, once in awhile,
          and climb a mountain or spend a week in the woods. Wash your spirit clean.
        </IonCardContent>
        <IonButton color="primary">Primary</IonButton>
      </IonCard>
    </IonContent>
  );
};

export default News;
