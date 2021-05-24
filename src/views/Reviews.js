import moment from 'moment';
import React, {useState, useEffect} from 'react';
import {Text, FlatList, StyleSheet} from 'react-native';
import {ListItem, Rating, Icon} from 'react-native-elements';
import {useActionSheet} from '@expo/react-native-action-sheet';

import {getReviews} from '../viewModels/reviewsViewModel';
import {showGenericError} from './utilities/viewUtilities';

import STYLE_CONSTANTS from './constants/styleConstants';
import DATE_CONSTANTS from './constants/dateConstants';

const Reviews = ({navigation, route}) => {
  const {user} = route.params ?? {};
  const [reviews, setReviews] = useState([]);
  const {showActionSheetWithOptions} = useActionSheet();

  useEffect(() => {
    getReviews()
      .then(results => setReviews(results))
      .catch(e => {
        showGenericError();
        // TODO: Log error in logger.
      });
  }, []);

  const showActionSheet = () => {
    const ORDER = {
      ASCENDING: 0,
      DESCENDING: 1,
      CANCEL: 2,
    };
    showActionSheetWithOptions(
      {
        options: ['Ascending', 'Descending', 'Cancel'],
        cancelButtonIndex: ORDER.CANCEL,
      },
      buttonIndex => {
        let sortedReviews = reviews;
        switch (buttonIndex) {
          case ORDER.ASCENDING:
            // Use moment to compare the two dates and see if they are ascending or descending.
            sortedReviews = sortedReviews.sort((a, b) =>
              moment(a.created_at).isBefore(moment(b.created_at)) ? 1 : -1,
            );
            break;
          case ORDER.DESCENDING:
            sortedReviews = sortedReviews.sort((a, b) =>
              moment(a.created_at).isBefore(moment(b.created_at)) ? -1 : 1,
            );
            break;
          default:
            return;
        }
        setReviews([...sortedReviews]);
      },
    );
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Icon
          type="ionicon"
          onPress={showActionSheet}
          name="filter-outline"
          size={STYLE_CONSTANTS.RATING_STAR_SIZE}
          containerStyle={styles.filter}
          color="blue"
        />
      ),
    });
  }, [navigation]);

  const updateReviews = review => {
    const oldReview = reviews.find(({id}) => review.id === id);
    if (!oldReview) return;

    const index = reviews.indexOf(oldReview);
    const newReviews = reviews;
    newReviews[index] = review;
    setReviews([...newReviews]);
  };

  return (
    <>
      <Text style={styles.text}>Welcome, {user.givenName}</Text>
      <FlatList
        data={reviews}
        renderItem={({item}) => (
          <ListItem
            key={item.id}
            bottomDivider
            onPress={() =>
              navigation.navigate('Review', {
                currentReview: item,
                updateReviews,
              })
            }>
            <ListItem.Content>
              <ListItem.Title>{item.message} </ListItem.Title>
              <Rating
                readonly={true}
                style={styles.rating}
                ratingCount={5}
                imageSize={STYLE_CONSTANTS.RATING_STAR_SIZE}
                defaultRating={item.rating}
              />
              <ListItem.Subtitle>
                {moment(item.created_at).format(DATE_CONSTANTS.LONG_FORMAT)}
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: STYLE_CONSTANTS.MEDIUM_FONT,
    textAlign: 'center',
    margin: STYLE_CONSTANTS.SMALL_MARGIN,
  },
  rating: {
    marginTop: STYLE_CONSTANTS.SMALL_MARGIN,
    marginBottom: STYLE_CONSTANTS.SMALL_MARGIN,
  },
  filter: {
    marginLeft: STYLE_CONSTANTS.SMALL_MARGIN,
  },
});

export default Reviews;
