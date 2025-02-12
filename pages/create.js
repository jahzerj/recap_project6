import styled from 'styled-components';
import Form from '../components/Form';
import { useRouter } from 'next/router';
import { StyledLink } from '../components/StyledLink';

const StyledBackLink = styled(StyledLink)`
  justify-self: flex-start;
`;

export default function CreatePlacePage() {
  const router = useRouter();
  async function addPlace(placeData) {
    const response = await fetch('/api/places/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(placeData),
    });

    if (!response.ok) {
      throw new Error('Failed to add place');
    }

    if (response.ok) {
      router.push('/');
    }
  }

  return (
    <>
      <h2 id="add-place">Add Place</h2>
      <StyledBackLink href="/">back</StyledBackLink>
      <Form onSubmit={addPlace} formName={'add-place'} />
    </>
  );
}
