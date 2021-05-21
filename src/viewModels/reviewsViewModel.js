export const getReviews = async () => {
  const reviews = await fetch(
    'https://my-json-server.typicode.com/bytelion/expo_test_mock_api/reviews',
  );
  return await reviews.json();
};
