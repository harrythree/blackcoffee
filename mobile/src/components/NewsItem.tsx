import React from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonImg
} from '@ionic/react';

interface NewsProps {
  title: string,
  image: string,
  description: string,
  button: string,
  link: string
}

const News: React.FC<NewsProps> = ({ title, image, description, button, link }) => {
  return (
    <IonCard>
      <IonImg src={image} />
      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        {description}
      </IonCardContent>
      <IonButton color="primary">{button}</IonButton>
    </IonCard>
  );
};

export default News;
