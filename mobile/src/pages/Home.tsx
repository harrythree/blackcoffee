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
import NewsItem from '../components/NewsItem';
import useModal from '../useModal';

const news = [
  {
    title: 'News 1',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?fit=crop&w=800&q=60',
    description: 'This is news 1',
    button: 'Learn more',
    link: '/'
  },
  {
    title: 'News 2',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?fit=crop&w=800&q=60',
    description: 'This is news 2',
    button: 'Learn more',
    link: '/'
  },
  {
    title: 'News 3',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?fit=crop&w=800&q=60',
    description: 'This is news 3',
    button: 'Learn more',
    link: '/'
  },
  {
    title: 'News 4',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?fit=crop&w=800&q=60',
    description: 'This is news 4',
    button: 'Learn more',
    link: '/'
  }
]

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
        { news.map(n => <NewsItem key={n.title} {...n} ></NewsItem>) }
      </IonContent>
      <Registration isShowing={isShowing} toggle={toggle}></Registration>
      <IonFab vertical="bottom" horizontal="end">
        <IonButton onClick={toggle}>Join now</IonButton>
      </IonFab>
    </IonPage>
  );
};

export default Home;
