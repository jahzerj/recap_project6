import { useRouter } from 'next/router';
import useSWR from 'swr';
import Form from '../../../components/Form';
import { StyledLink } from '../../../components/StyledLink';

export default function EditPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data: place, isLoading, error } = useSWR(`/api/places/${id}`);

  async function editPlace(place) {
    const response = await fetch(`/api/places/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(place),
    });
    if (response.ok) {
      router.push('/');
    }
  }

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  return (
    <>
      <h2 id="edit-place">Edit Place</h2>
      <StyledLink href={`/places/${id}`} $justifySelf="start">
        back
      </StyledLink>
      <Form onSubmit={editPlace} formName={'edit-place'} defaultData={place} />
    </>
  );
}
