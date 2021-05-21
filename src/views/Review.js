import moment from 'moment';
import React, {useState} from 'react';
import {StyleSheet, Button, View, Text} from 'react-native';
import {ListItem, Rating, Icon} from 'react-native-elements';

import STYLE_CONSTANTS from './constants/styleConstants';
import DATE_CONSTANTS from './constants/dateConstants';

const Review = ({navigation, route}) => {
  const {currentReview, updateReviews} = route.params ?? {};
  const [review, setReview] = useState(currentReview);

  const updateReview = newReview => {
    setReview({...newReview});
    updateReviews(newReview);
  };

  const vote = upVote => {
    console.log(upVote);
    if (typeof review.upVotes !== 'number') review.upVotes = 0;
    if (typeof review.downVotes !== 'number') review.downVotes = 0;

    if (upVote) {
      review.upVotes++;
    } else {
      review.downVotes++;
    }

    updateReview(review);
  };

  return (
    <>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{review.message}</ListItem.Title>
          <Rating
            style={styles.rating}
            readonly={true}
            ratingCount={5}
            imageSize={STYLE_CONSTANTS.RATING_STAR_SIZE}
            defaultRating={review.rating}
          />
          <ListItem.Subtitle>
            {moment(review.created_at).format(DATE_CONSTANTS.LONG_FORMAT)}
          </ListItem.Subtitle>
          <View style={styles.voteContainer}>
            <View style={styles.vote}>
              <Icon
                onPress={() => vote(true)}
                name="thumbs-up-outline"
                type="ionicon"
                size={STYLE_CONSTANTS.RATING_STAR_SIZE}
                color="blue"
              />
              <Text style={styles.voteCount}>{review.upVotes ?? 0}</Text>
            </View>
            <View style={styles.vote}>
              <Icon
                onPress={() => vote(false)}
                name="thumbs-down-outline"
                type="ionicon"
                size={STYLE_CONSTANTS.RATING_STAR_SIZE}
                color="blue"
              />
              <Text style={styles.voteCount}>{review.downVotes ?? 0}</Text>
            </View>
          </View>
        </ListItem.Content>
      </ListItem>

      {review.reply && (
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{review.reply}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      )}

      {!review.reply && (
        <Button
          onPress={() =>
            navigation.navigate('Reply', {updateReview, currentReview: review})
          }
          title="Reply"
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  rating: {
    marginTop: STYLE_CONSTANTS.SMALL_MARGIN,
    marginBottom: STYLE_CONSTANTS.SMALL_MARGIN,
  },
  voteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: STYLE_CONSTANTS.SMALL_MARGIN,
  },
  vote: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voteCount: {
    fontSize: STYLE_CONSTANTS.MEDIUM_FONT,
    marginLeft: STYLE_CONSTANTS.SMALL_MARGIN,
  },
});

export default Review;
