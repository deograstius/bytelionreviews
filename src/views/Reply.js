import React, {useState} from 'react';
import {StyleSheet, Button} from 'react-native';
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
        style={styles.text}
        value={reply ?? ''}
        onChangeText={value => {
          setReply(value);
        }}
      />
      <Button onPress={replyAndGoBack} title="Reply" />
    </>
  );
};

const styles = StyleSheet.create({
  rating: {
    fontSize: STYLE_CONSTANTS.MEDIUM_FONT,
  },
});

export default Reply;
