import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { star, card, cafe, gift, home } from 'ionicons/icons';
import Home from './pages/Home';
import Cards from './pages/Cards';
import Order from './pages/Order';
import Gift from './pages/Gift';
import Stores from './pages/Stores';
import Details from './pages/Details';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/home" component={Home} exact={true} />
          <Route path="/cards" component={Cards} exact={true} />
          <Route path="/cards/details" component={Details} />
          <Route path="/order" component={Order} />
          <Route path="/gift" component={Gift} />
          <Route path="/stores" component={Stores} />
          <Route path="/" render={() => <Redirect to="/home" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={star} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="cards" href="/cards">
            <IonIcon icon={card} />
            <IonLabel>Cards</IonLabel>
          </IonTabButton>
          <IonTabButton tab="order" href="/order">
            <IonIcon icon={cafe} />
            <IonLabel>Order</IonLabel>
          </IonTabButton>
          <IonTabButton tab="gift" href="/gift">
            <IonIcon icon={gift} />
            <IonLabel>Gift</IonLabel>
          </IonTabButton>
          <IonTabButton tab="stores" href="/stores">
            <IonIcon icon={home} />
            <IonLabel>Stores</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
