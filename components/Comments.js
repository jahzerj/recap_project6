import styled from 'styled-components';
import { useRouter } from 'next/router';
import { FormContainer, Input, Label } from './Form';
import { StyledButton } from './StyledButton';
import useSWR from 'swr';
import { Fragment } from 'react';

const Article = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  border-radius: 0.8rem;
  padding: 0.5rem;
  text-align: center;
`;

const CommentText = styled.p`
  border-bottom: solid 1px black;
  padding: 20px;
`;

export default function Comments({ placeId, locationName }) {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data: comments, mutate, isLoading, error } = useSWR(`/api/comments/${placeId}`);

  if (!isReady || isLoading) return <h2>Loading...</h2>;
  if (error) return <p>Error loading comments</p>;

  async function handleSubmitComment(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    if (!data.name || !data.comment) {
      alert('Both fields are required');
      return;
    }

    const response = await fetch(`/api/comments/${placeId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, placeId }),
    });

    if (response.ok) {
      mutate(`/api/comments/${placeId}`);
      event.target.reset(); // Clear form fields
    }
  }

  async function handleDeleteComment(_id) {
    await fetch(`/api/comments/${placeId}?commentId=${_id}`, {
      method: 'DELETE',
    });

    mutate(`/api/comments/${placeId}`);
  }

  if (error) return <p>Error loading comments</p>;
  if (!comments) return <p>Loading...</p>;

  const commentsArray = Array.isArray(comments) ? comments : [];

  return (
    <Article>
      <FormContainer onSubmit={handleSubmitComment}>
        <Label htmlFor="name">Your Name</Label>
        <Input type="text" name="name" placeholder="name" />
        <Label htmlFor="comment">Your Comment</Label>
        <Input type="text" name="comment" placeholder="comment here..." />
        <StyledButton type="submit">Send</StyledButton>
      </FormContainer>

      {commentsArray.length > 0 ? (
        <>
          <h2>{comments.length} fans commented on this place:</h2>
          {comments.map(({ _id, name, comment }) => (
            <Fragment key={_id}>
              <CommentText>
                <small>
                  <strong>{name}</strong> commented on {locationName || 'this place'}
                </small>
              </CommentText>

              <span>{comment}</span>

              <StyledButton onClick={() => handleDeleteComment(_id)}>X</StyledButton>
            </Fragment>
          ))}
        </>
      ) : (
        <p>No comments yet. Be the first to comment!</p>
      )}
    </Article>
  );
}
