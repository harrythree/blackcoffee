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
import './Home.css';
import Registration from '../components/Registration';
import useModal from '../useModal';
import NewsItem from '../components/NewsItem';

const Home: React.FC = () => {
  const { isShowing, toggle } = useModal();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <NewsItem></NewsItem>
        <Registration isShowing={isShowing} toggle={toggle}></Registration>
        <IonFab vertical="bottom" horizontal="end">
          <IonButton onClick={toggle}>Join now</IonButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;
