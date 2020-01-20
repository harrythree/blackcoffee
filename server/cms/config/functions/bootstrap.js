'use strict';

const faker = require('faker');

module.exports = async () => {
  const permissionsQuery = strapi.query('permission', 'users-permissions');
  const publicApplicationPermissions = await permissionsQuery.find({ type: 'application' });
  const findAndFindOnePermissions = publicApplicationPermissions.filter(({ action, role }) =>
    role.type === 'public' && (action === 'find' || action === 'findone'));

  if (findAndFindOnePermissions[0].enabled === false) {
    const queryPromises = findAndFindOnePermissions.map(({ _id }) => permissionsQuery.update({ _id }, { enabled: true }));

    strapi.log.info('Setting find and findone permissions for all application content types');

    await Promise.all(queryPromises);
  }

  const menuCategoryCount = await strapi.query('menu-category').count();
  
  if (menuCategoryCount === 0) {
    const foodQuery = strapi.query('menu-category').create({name: 'Food'});
    const drinkQuery = strapi.query('menu-category').create({name: 'Drink'});

    await Promise.all([foodQuery, drinkQuery]);
    strapi.log.info('Menu Categories created');
  }

  const menuItemCount = await strapi.query('menu-item').count();
  
  if (menuItemCount === 0) {
    const menuCategories = await strapi.query('menu-category').find();
    const menuItemQueries = [];

    for(let i = 0; i < 10; i += 1) {
      const randomCategoryIndex = Math.floor(Math.random() * menuCategories.length);
      const { _id } = menuCategories[randomCategoryIndex];
  
      const menuItemQuery = strapi.query('menu-item').create({
        name: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        price: faker.finance.amount(),
        rewards: faker.random.number(),
        image: faker.image.food(),
        menu_categories: [_id]
      });

      menuItemQueries.push(menuItemQuery);
    }

    await Promise.all(menuItemQueries);

    strapi.log.info('Menu Items created');
  }

  const newsItemCount = await strapi.query('news-item').count();

  if (newsItemCount === 0) {
    const newsItemQueries = [];

    for(let i = 0; i < 10; i += 1) {
      const newsItemQuery = strapi.query('news-item').create({
        title: faker.lorem.sentence(),
        body: faker.lorem.paragraph(),
        image: faker.image.food()
      });

      newsItemQueries.push(newsItemQuery);
    }

    await Promise.all(newsItemQueries);

    strapi.log.info('News Items created');
  }

  const rewardsCount = await strapi.query('reward').count();

  if (rewardsCount === 0) {
    const rewardsQueries = [];

    for(let i = 0; i < 10; i += 1) {
      const rewardQuery = strapi.query('reward').create({
        amount: faker.random.number(),
        description: faker.lorem.paragraph()
      });

      rewardsQueries.push(rewardQuery);
    }

    await Promise.all(rewardsQueries);

    strapi.log.info('Rewards created');
  }

  const storeHoursCount = await strapi.query('store-hour').count();

  if (storeHoursCount === 0) {
    const storeHours = [
      {
        day: 'Sunday',
        open: '7am',
        close: '9pm'
      },
      {
        day: 'Monday',
        open: '7am',
        close: '9pm'
      },
      {
        day: 'Tuesday',
        open: '7am',
        close: '9pm'
      },
      {
        day: 'Wednesday',
        open: '7am',
        close: '9pm'
      },
      {
        day: 'Thursday',
        open: '7am',
        close: '9pm'
      },
      {
        day: 'Friday',
        open: '7am',
        close: '9pm'
      },
      {
        day: 'Saturday',
        open: '7am',
        close: '9pm'
      }
    ];

    const storeHoursQueries = storeHours.map(s => strapi.query('store-hour').create(s));

    await Promise.all(storeHoursQueries);

    strapi.log.info('Store Hours created');
  }

  const storesCount = await strapi.query('store').count();

  if (storesCount === 0) {
    const storeHours = await strapi.query('store-hour').find();
    const storeHourIds = storeHours.map(({ _id }) => _id);
    const storeQueries = [];

    for(let i = 0; i < 10; i += 1) {
      const storeQuery = strapi.query('store').create({
        name: faker.company.companyName(),
        street: faker.address.streetName(),
        city: faker.address.city(),
        state: faker.address.state(),
        latitude: faker.address.latitude(),
        longitude: faker.address.longitude(),
        phone: faker.phone.phoneNumber(),
        store_hours: storeHourIds
      });

      storeQueries.push(storeQuery);
    }

    await Promise.all(storeQueries);

    strapi.log.info('Stores created');
  }
};
