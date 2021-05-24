import React, {useState} from 'react';
import {StyleSheet, Button, View} from 'react-native';
import {Input} from 'react-native-elements';

import STYLE_CONSTANTS from './constants/styleConstants';

const Reply = ({navigation, route}) => {
  const {currentReview, updateReview} = route.params ?? {};
  const [reply, setReply] = useState(currentReview.reply ?? {});

  const replyAndGoBack = () => {
    currentReview.reply = reply;
    updateReview(currentReview);
    navigation.goBack();
  };

  return (
    <>
      <Input
        placeholder="Type reply"
        multiline={true}
        value={reply ?? ''}
        onChangeText={value => {
          setReply(value);
        }}
      />
      <View style={styles.replyButton}>
        <Button onPress={replyAndGoBack} title="Reply" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  rating: {
    fontSize: STYLE_CONSTANTS.MEDIUM_FONT,
  },
  replyButton: {
    marginRight: STYLE_CONSTANTS.SMALL_MARGIN,
    marginLeft: STYLE_CONSTANTS.SMALL_MARGIN,
  },
});

export default Reply;
